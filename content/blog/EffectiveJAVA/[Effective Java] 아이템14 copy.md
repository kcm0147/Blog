---
title : '[Effective Java] 아이템26 raw 타입을 사용하지마라'
date : 2021-05-09 14:22:12
category : 'Effective Java'
draft : false
description : "아이템26 raw 타입을 사용하지마라"
tags : ['Java']
---

# 이펙티브 자바 아이템 26

<br/>

### 로(rwa) 타입?

**로 타입**은 제네릭 타입에서 **타입 매개변수를 전혀 사용하지 않은 때**를 말합니다.
반대로 클래스와 인터페이스 선언에 타입 매개변수가 쓰인 경우를 **제네릭 타입**이라고 합니다.

예를 들어 `List`는 로 타입이고, `List<Integer>`는 제네릭 타입입니다.

List의 매개변수를 받는 메서드에는 List<Integer>을 넘길 수는 있지만

List<Integer>의 경우에는 제네릭의 하위 규칙 때문에 List<Integer>를 받는 메서드에는 매개변수로 넘길 수가 없습니다.

또한 아래의 예제코드를 확인해보겠습니다.

```java

public static void main(String[] args) {
    List<String> strings = new ArrayList<>();
    
    unsafeAdd(strings, Integer.valueOf(42));
    String s = strings.get(0);
}

// 로 타입
private static void unsafeAdd(List list, Object o) {
    list.add(o);
}

```

위의 코드는 매개변수의 자료형을 로 타입으로 사용하였을 때의 코드입니다.

컴파일은 성공하지만 로 타입인 `List`를 사용하였기 때문에 경고메세지가 발행이 됩니다. 

다만만 실행을 하게 되었을 때 `string.get(0)`의 결과를 형변환 하려 할 때 `ClassCastException`이 발생하게 되면서 실행이 중단됩니다.

<br/>


아래의 코드는 `List`를 `List<Object>`로 변경 하였을 때 입니다.

```java
public static void main(String[] args) {
    List<String> strings = new ArrayList<>();

    unsafeAdd(strings, Integer.valueOf(42));
    String s = strings.get(0);
}

// List<Object>
private static void unsafeAdd(List<Object> list, Object o) {
    list.add(o);
}

```

애초에 이 코드는 컴파일 오류가 발생하여 실행 조차 되지 않습니다. 

즉, 제네릭 타입을 사용함으로서 실행 시점이 아닌 컴파일 시점에 오류를 확인할 수 있어 보다 안전합니다.

<br/>



### 와일드카드

제네릭타입을 사용하고는 싶지만, 실제 자료형이 무엇인지 모를 때는 와일드카드를 사용할 수 있습니다.

와일드카드는 `Set<?>`으로 ? 를 넣어서 사용할 수 있습니다.

와일드카드 타입은 안전하고, 로 타입은 안전하지 않습니다.

로타입의 컬렉션에는 아무 원소나 넣을 수 있으나 타입 불변식을 훼손하기가 쉬우며

반면에  와일드카드를 사용한 컬렌션인 Collection<?>에는 (null 외에는) 어떤 원소도 넣을 수 없습니다.


<br/>


### 로타입을 사용해야하는 예외

클래스 리터럴은 로 타입을 사용해야합니다. 

클래스 리터럴이란 데이터가 변하지 않도록 설계를 한 클래스를 의미합니다.

자바 명세에는 클래스 리터럴에 매개변수화 타입을 사용하지 못하게 하여서 클래스 리터럴에는 로 타입을 사용하여야 합니다.

<br/>


예를 들어 , List.class , String[].class , int.class는 허용하고 List<String>.class, List<?>.class는 허용을 하지 않습니다.

또한 `instanceof` 연산자와도 관련이 있습니다.

 `런타임`에는 제네릭 타입 정보가 지워지므로 `instanceof` 연산자는 비한정적 와일드 카드 타입외에 매개변수화 타입에는 적용할 수 없습니다. 

로 타입이든 와일드 카드 타입이든 `instanceof`는 똑같이 동작을 합니다.

```java

if( o instanceof Set) { // 이렇게 로타입으로 instance of를 사용합니다
    Set<?> s = (Set<?>) o;
}

```
