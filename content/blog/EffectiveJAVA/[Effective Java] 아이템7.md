---
title : '[Effective Java] 아이템7 다 쓴 객체 참조를 해제하라'
date : 2021-04-20 13:22:12
category : 'Effective Java'
draft : false
description : "아이템7 다 쓴 객체 참조를 해제하라"
tags : ['Java']
---

# 이펙티브 자바 아이템 7

# 다 쓴 객체 참조를 해제하라

<br/>

### 메모리 직접 관리

자바에 GC(가비지 콜렉터)가 있기 때문에 GC가 다 쓴 객체를 알아서 회수해간다고 해서 메모리 관리에 신경을 쓰면 안되는 것은 아닙니다.

<br/>

```java
public class Stack {
    private Object[] elements;
    private int size = 0;
    private static final int DEFAULT_INITIAL_CAPACITY = 16;

    public Stack() {
        elements = new Object[DEFAULT_INITIAL_CAPACITY];
    }

    public void push(Object e) {
        ensureCapacity();
        elements[size++] = e;
    }

    public Object pop() {
        if (size == 0)
            throw new EmptyStackException();
        return elements[--size];
    }

    /**
     * 원소를 위한 공간을 적어도 하나 이상 확보한다.
     * 배열 크기를 늘려야 할 때마다 대략 두 배씩 늘린다.
     */
    private void ensureCapacity() {
        if (elements.length == size)
            elements = Arrays.copyOf(elements, 2 * size + 1);
    }
}


```


실제로 이 element 배열 스택에서 사용하지 않는 부분은 제거가 되지 않습니다.

그저 size를 줄이면서, 사용 범위를 제한시키는 것이지 실제로는 메모리들이 차지 하고 있는 상태입니다.

<br/>

- - - -


이러한 문제를 해결하기 위해서는 다 쓴 객체에 `null` 처리를 해주면 메모리 사용을 줄일 수 있습니다.


```java
public Object pop() {
    if (size == 0)
        throw new EmptyStackException();
    Object result = elements[--size];
    elements[size] = null; // 다 쓴 참조 해제
    return result;
}

```

pop을 하는 시점에 객체의 참조가 더 이상 필요없는 시점에 `null`로 설정을 하여 다음 GC가 발생할 때 객체 레퍼런스들이 정리되게 합니다.

또한 null 로 처리를 하여, 만약에 실수로 사용하려던 프로그램에 접근을 하게된다면 `NPE`를 던지면서 프로그램을 종료시킵니다.

만약에 미리 null 처리를 하지 않았다면 무언가 잘못된 일을 수행할 수 있을 것입니다.

하지만 Null 처리를 하나하나 설정하는데 집중할 필요는 없습니다.

후에 그 참조를 담은 변수를 유효범위 밖으로 밀어냄으로서 다 쓴 참조를 해제할 수 있습니다. 

이는 후에 **item 57**을 공부할 때 더 자세히 말하겠습니다.

<br/>

- - - -


### 왜 스택은 메모리 누수에 취약할까..

왜냐하면 Stack은 **자기가 메모리를 직접 관리하기 때문**입니다.

Stack의 활성 영역에 속한 원소들이 사용되고 비활성 영역은 쓰이지 않습니다.

하지만 `GC는 이러한 사실을 인지하지 못합니다`

GC 의 입장에서는 비활성 영역에서 참조하는 객체 또한 유효한 객체입니다.

그렇기 때문에 `null`처리를 통해 직접 메모리를 해제 해주어야합니다.


<br/>

- - - -

### 캐시


캐시를 사용할 때도 메모리 누수 문제를 조심해야 합니다. 

객체의 레퍼런스를 캐시에 넣어 놓고, 캐시를 비우는 것을 잊기 쉽습니다.



* 캐시 사용의 안좋은 예

```java

public class CacheSample {
	public static void main(String[] args) {
		Object key = new Object();
		Object value = new Object();

		Map<Object, List> cache = new HashMap<>();
		cache.put(key, value);
		...
	}
}


```


Key의 사용이 없어지더라도 cache가 key의 레퍼런스를 가지고 있으므로, GC 대상이 될 수 없습니다.

<br/>


**캐시의 키**에 대한 레퍼런스가 캐시 밖에서 필요 없어지면 해당 엔트리를 캐시에서 자동으로 비워주는 `WeakHashMap`을 사용할 수 있습니다.

```java

public class CacheSample {
	public static void main(String[] args) {
		Object key = new Object();
		Object value = new Object();

		Map<Object, List> cache = new WeakHashMap<>();
		cache.put(key, value);
		...
	}
}

```


캐시 값이 무의미해진다면 자동으로 처리해주는 `WeakHashMap`은 Key 값을 모두 Weak 레퍼런스로 감싸 strong reference가 없어지면 GC의 대상으로 만듭니다.

=> 일반적으로 객체를 만드는 모든 레퍼런스는 `String 레퍼런스`라고 불립니다

반면에 Weak 레퍼런스로 감싸면 `Weak 레퍼런스`라고  말합니다.

Weak 레퍼런스는 Strong한 레퍼런스가 없어지면 Weak 레퍼런스를 GC의 대상이 될 수 있습니다.

아래의 예에서는 `widget`을 가리키던 레퍼런스가 없어지면 `weakWidget`도 가비지 컬렉션의 대상이 됩니다.

```java
WeakReference weakWidget = new WeakReference(widget);
```

<br/>

- - - -


### 콜백

세번째 메모리 누수의 범인은 `콜백`과 `리스너`입니다.

클라이언트가 콜백을 등록만 하고 명확하게 해지하지 않는다면, 콜백은 계속해서 쌓여갑니다.

이럴때 콜백음 Weak reference로 저장을 하게 되면 GC가 이를 감지하고 메모리 해제를 해줍니다.
