---
title : '[Effective Java] 아이템28 배열보다 리스트를 사용하라'
date : 2021-05-11 09:22:12
category : 'Effective Java'
draft : false
description : "아이템28 배열보다 리스트를 사용하라"
tags : ['Java']
---




### 배열과 제네릭 타입의 차이

배열은 공변타입입니다. 

예를 들어, A가 B의 하위 타입이라면 배열 A[]는 배열 B[]의 하위 타입이 된다고 할 수 있습니다.

반면에 제네릭은 불공변타입입니다. 

`List<A>`는 `List<B>`의 하위타입도 아니며 상위 타입도 아닙니다.

배열을 사용했을 때 문제점이 무엇일까요? 변환이 된다는 것은 좋은게 아닐까 생각해볼 수 있습니다.

<br/>

하지만 아래의 예제코드를 보면 리스트의 경우 컴파일 시점에서 오류를 확인할 수 있는데, 반면에 배열에서는 런타임 시점에서 오류를 확인 할 수 있다는 점을 확인할 수 있습니다.

```java
// ArrayStoreException 발생(런타임시점에서)
Object[] objectArray = new Long[1];
objectArray[0] = "ChangMuk";

// 컴파일 시점에서 오류가 발생
List<Object> objectList = new ArrayList<Long>();
objectList.add("ChangMuk");
```

배열은 런타임을 하는 시점에서도 자신이 어떠한 타입의 원소를 담아야하는지 알 수 있습니다. 

반면에 제네릭 타입은 런타임 시점에 자신의 타입이 사라집니다. 

컴파일 시점에만 자신의 원소 타입을 검사하기 때문에 런타임 시점에서는 알 수가 없습니다.

런타임 시점에서 소거를 인해 매개변수화 타입 가운데 실체화가 될 수 있는 타입은 List<?> 와 같은 **비한정적 와일드 카드 타입**뿐입니다.

<br/>

### 예제코드

```java

public class Chooser {
    private final Object[] choiceArray;
    
    public Chooser(Collection choices) {
        this.choiceArray = choices.toArray();
    }
    

    public Object choose() {
        Random rnd = ThreadLocalRandom.current();
        return choiceArray[rnd.nextInt(choiceArray.length)];
    }
}

```

위의 클래스를 사용하게 되면 choose 메서드를 호출할 때마다 반환된 Object를 원하는 타입으로 형변환을 하게 됩니다.


<br/>

이때 형변환의 오류가 발생할 가능성이 있기 때문에 이를 제네릭 컬렉션을 사용하여 해결해줄 수 있습니다.


```java
public class Chooser<T> {
    private final T[] choiceArray;

    public Chooser(Collection<T> choices) {
        // 오류가 발생합니다.
        this.choiceArray = choices.toArray();
    }
}

```

하지만 incompatible types: java.lang.Object[] cannot be converted to T[] 와 같은 오류가 발생하게 되는데 

이는 this.choiceArray = `(T[])` choices.toArray() 로 작성하면 해결이 됩니다.

컴파일을 하는 과정에서의 오류는 사라졌지만 `Unchecked Cast` 경고가 발생 합니다.

T 타입은 어떤 타입인지 알 수 가 없습니다. 따라서 런타임을 하는 과정에서 형변환이 안전하게 가능한지 보장을 할 수 없다는 뜻입니다.

제네릭은 런타임시에 타입의 정보가 소거되기 때문에 무슨 타입인지 알 수 가 없습니다.

제네릭을 사용했을 때의 형변환 경고를 제거하려면 `배열 대신 리스트`를 사용하면 됩니다.

이에 대한 코드는 아래와 같습니다

<br/>

```java

class Chooser<T> {
    private final List<T> choiceList;

    public Chooser(Collection<T> choices) {
        this.choiceList = new ArrayList<>(choices);
    }

    public T choose() {
        Random rnd = ThreadLocalRandom.current();
        return choiceList.get(rnd.nextInt(choiceList.size()));
    }
}
```

