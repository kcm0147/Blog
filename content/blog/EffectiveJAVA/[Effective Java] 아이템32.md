---
title : '[Effective Java] 아이템32 제네릭과 가변인수를 함께 쓸 때는 신중하라'
date : 2021-05-17 11:22:12
category : 'Effective Java'
draft : false
description : "아이템32 제네릭과 가변인수를 함께 쓸 때는 신중하라"
tags : ['Java']
---



가변인수는 메서드에 넘기는 인수의 개수를 클라이언트가 조절할 수 있게 해줍니다.

형태는 다음과 같습니다.

```java
public static void example(String... args) {
    //생략
}
```

<br/>

가변인수 메서드는 호출하면 가변인수를 담기 위한 `배열`이 자동으로 하나 만들어집니다.

하지만 이 가변인자 배열이 **클라이언트에 노출이 된다는 문제점이 존재**합니다.

이게 왜 문제가 되냐면, **varags(가변인자)에 제네릭이나 매개변수화 타입이 포함되면 컴파일 경고가 발생**하기 때문입니다.

제네릭과 같은 실체화 불가 타입은 런타임에는 컴파일타임보다 타입관련 정보를 적게 담고 있기 때문에 경고가 발생하게 되는 것입니다.

<br/>

#### 제네릭과 가변인수로 인한 타입안정성이 깨진 예제

```java
  static void dangerous(List<String>... stringLists) {
        List<Integer> integerList = List.of(42); 
        Object[] objects = stringLists;
        objects[0] = integerList;   // 힙 오염 발생(타입다름)
        String s = stringLists[0].get(0);
    }

```

위 메서드는 형변환하는 곳이 보이지 않는데도 인수를 건네 호출하면 `ClassCastException`을 던지게 되는데 마지막 줄에 컴파일러가 생성한 형변환이 숨어있기 때문입니다.

<br/>

#### @SafeVarargs

자바7에서 추가된 애너테이션으로서 제네릭 가변인수로 인해 발생하는 경고를 숨길 수 있는 기능을 합니다.

하지만 메서드가 안전한지 확신을 하고 이 애너테이션을 달아서 경고를 없애야 합니다.

<br/>

#### 안전한 제네릭 가변인수 메서드를 사용하는 방법?

Varargs 배열에 아무것도 저장하지 않고, 그 배열의 참조가 밖으로 노출이 되지 않는다면 타입 안정성이 보장 될 수 있습니다.

아래와 같이 제네릭 매개변수 배열의 참조를 노출 시켜서는 안됩니다.

```java
  static <T> T[] toArray(T... args) {
        return args;
}
```

이 메서드가 반환하는 배열의 타입은 이 메서드에 인수를 넘기는 **컴파일 시점에 결정**이 되는데 

이때는 컴파일러에게 타입의 정보가 주어지지 않아 잘못 판단을 할 수 있습니다.

따라서 자신의 varargs 매개변수 배열을 그대로 반환하면 이 메서드를 호출한 곳 까지 전이가 될 수 있습니다.


<br/>

#### 제네릭 varargs 매개변수를 안전하게 사용하는 메서드

```java
@SafeVarargs
    static <T> List<T> flatten(List<? extends T>... lists) {
        List<T> result = new ArrayList<>();
        for (List<? extends T> list : lists) {
            result.addAll(list);
        }
        return result;
 }
```


@SafeVarargs 애너테이션을 사용해야 할 때를 정하는 규칙으로는 그냥 **가변 매개변수를 받는 모든 메서드에 @SafeVarargs를 달아야 합니다** 

즉 안전하지 않는 varargs 메서드는 절대 작성해서는 안됩니다.

1. **Varargs 매개변수 배열에 값을 저장하면 안됩니다**
2. **Varargs 매개변수 배열을 외부에 노출시키지 않습니다**

=> 재정의 할 수 없는 메서드에만 @SafeVarargs 애너테이션을 달아야합니다.

**재정의한 메서드도 안전할지는 보장을 할 수 없기 때문**입니다.

<br/>

#### flattern() 메서드를 적용하여 경고를 없애는 방법

Varargs 매개변수 배열을 List 매개변수로 바꾸어서 수정한 코드 입니다.

위의 코드에서 매개변수 부분만 수정한 코드 입니다. 

```java
static <T> List<T> flatten(List<List<? extends T>> lists) {
        List<T> result = new ArrayList<>();
        for (List<? extends T> list : lists) {
            result.addAll(list);
        }
        return result;
}
```

이렇게 작성을 하면 저희는 정적 팩토리 메서드인 List.of()를 활용하면 다음 코드와 같이 이 메서드에 임의 개수의 인수를 넘길 수 있습니다.

```java

lists = flattern(List.of(friends,peoples));

```