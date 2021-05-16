---
title : '[Effective Java] 아이템29 이왕이면 제네릭타입으로 만들라'
date : 2021-05-16 09:22:12
category : 'Effective Java'
draft : false
description : "아이템29 이왕이면 제네릭타입으로 만들라"
tags : ['Java']
---



```java

import java.util.Arrays;
import java.util.EmptyStackException;

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
        Object result = elements[--size];
        elements[size] = null;
        return result;
    }

    private void ensureCapacity() {
        if (elements.length == size)
            elements = Arrays.copyOf(elements, 2 * size);
    }
}

```

여기서 만든 Stack클래스는 클라이언트가 스택으로부터 객체를 꺼낸 후에 형변화를 해야합니다.

이는 런타임 오류가 날 위험이 있습니다.

<br/>

따라서 제네릭 타입으로 구현함으로서 런타임 오류를 방지하는 것이 좋습니다.

일반 클래스를 제네릭 클래스로 만드는 첫 단계는 클래스 선언에 타입 매개변수를 추가합니다.




```java
import java.util.Arrays;
import java.util.EmptyStackException;

public class Stack<E> {
    private E[] elements;
    private int size = 0;
    private static final int DEFAULT_INITIAL_CAPACITY = 16;

    public Stack() {
        elements = new E[DEFAULT_INITIAL_CAPACITY]; // 컴파일 에러
    }

    public void push(E e) {
        ensureCapacity();
        elements[size++] = e;
    }

    public E pop() {
        if (size == 0)
            throw new EmptyStackException();
        E result = elements[--size];
        elements[size] = null;
        return result;
    }

    private void ensureCapacity() {
        if (elements.length == size)
            elements = Arrays.copyOf(elements, 2 * size);
    }
}

```

하지만 위 코드에서는 컴파일에러가 생길 수 있는데 E와 같은 타입으로는 배열을 생성할 수 없기 때문입니다.

<br/>

이에 대한 해결책으로는 두 가지가 있습니다.

<br/>

**첫번째 방법으로는 제네릭 배열 생성을 금지하는 제약을 우회하는 방법**입니다.

Object 배열을 생성한 다음 제네릭 배열로 형변환을 하면 됩니다.

하지만 컴파일러는 해당 형변환의 타입이 안전한지 알 수가 없기 때문에 비검사 형변환 경고를 띄울 것입니다. 

위의 코드에서는 element 배열은 private 배열이고, 클라이언트로 반환되거나 다른 메서드로 전달되는 일이 없습니다. 

그리고 Push() 메서드를 통해 배열에 저장되는 원소의 타입이 E임을 알고 있습니다.

따라서 비검사 형변환은 확실하게 안전하므로 `@SuppressWarnings` 애네테이션을 사용하여 경고를 숨기는 것이 좋습니다.

```java

@SuppressWarnings("unchecked") // 비검사 경고 제거
    public Stack() {
        elements = (E[]) new Object[DEFAULT_INITIAL_CAPACITY]; // Object배열을 생성하여 형변환
    }
```

<br/>

두번째 방법은 elements 필드의 타입을 E[]로 선언하지 않고 Object[]로 바꾸는 것입니다. 

이렇게되면 pop() 메서드에서 타입 에러가 발생하기 때문에 해당원소를 E로 형변환하도록 수정합니다.

형변환을 하면 이전과 마찬가지로 비검사 형변환에 대한 경고가 나타나는데

push()에서는 E 타입만을 허용하게 하였기 때문에 타입 안정성을 보장할 수 있으므로 `@SuppressWarning` 애너테이션으로 경고를 숨겨줍니다.

코드는 아래와 같습니다.

```java
import java.util.Arrays;
import java.util.EmptyStackException;

public class Stack<E> {
    private Object[] elements;
    private int size = 0;
    private static final int DEFAULT_INITIAL_CAPACITY = 16;
    
    public Stack() {
        elements = new Object[DEFAULT_INITIAL_CAPACITY];
    }

    public void push(E e) {
        ensureCapacity();
        elements[size++] = e;
    }

    public E pop() {
        if (size == 0)
            throw new EmptyStackException();
        
        // 경고를 제거
        @SuppressWarnings("unchecked")
        E result = (E) elements[--size]; // 형변환
        elements[size] = null;
        return result;
    }

    private void ensureCapacity() {
        if (elements.length == size)
            elements = Arrays.copyOf(elements, 2 * size);
    }
}

```
