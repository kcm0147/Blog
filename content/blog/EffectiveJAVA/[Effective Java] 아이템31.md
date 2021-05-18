---
title : '[Effective Java] 아이템31 한정적 와일드카드를 사용해 API 유연성을 높이라'
date : 2021-05-16 11:22:12
category : 'Effective Java'
draft : false
description : "아이템31 한정적 와일드카드를 사용해 API 유연성을 높이라"
tags : ['Java']
---


아이템 28. 배열보다 리스트를 사용하라 에서 확인 해본 것 처럼 매개변수화 타입은 **불공변** 입니다. 

예를 들어, Type1과 Type2가 있을 때 List<Type1>과 List<Type2>는 하위 타입 또는 상위타입이라는 관계가 성립될 수 없습니다.

다음과 같은 Stack 클래스가 있습니다.

<br/>

```java

public class Stack<E> {
    public Stack();
    public void push(E e);
    public E pop();
    public boolean isEmpty();
}

```

위 스택 클래스에서 **Push() 메서드**를 다음과 같이 추가한다고 가정합니다.

<br/>

```java
public void pushAll(Iterable<E> src) {
    for (E e : src)
        push(e);
}

```

위 메서드는 정상적으로 컴파일 되지만 stack을 Stack<Number>로 선언한 후에 pushAll( intVal(**Integer타입**) )을 호출하면 오류가 나타납니다.

위에서 말했던 것처럼 제네릭은 불공변 타입이기 때문에 상위-하위 자료형의 관계가 없습니다.

<br/>

그래서 아래와 같이 **한정적 와일드카드**를 사용하여 코드를 작성하면 됩니다.


```java
public void pushAll(Iterable<? extends E> src) {
        for (E e : src) {
            push(e);
        }
}
```

`Iterable<? extends E> src`는 E의 하위타입의 Iterable을 의미합니다.

<br/>

다음은 popAll() 부분의 코드를 확인해보겠습니다.

```java
public void popAll(Collection<E> dst) {
    while (!isEmpty())
        dst.add(pop());
}

```

```java
Stack<Number> numberStack = new Stack<>();
Collection<Object> objects = ...;
numberStack.popAll(objects);
```

위 코드는 Collection<Object>가 Collection<Number>의 하위 타입이 아니기 때문에 문제가 발생합니다.

<br/>

이를 해결하기 위해서 마찬가지로 한정적 와일드카드 타입을 활용합니다.

이번에 사용하는 타입은 E의 상위 타입의 Collection임을 표현하는
`Collection<? Super E>`를 사용합니다.

<br/>

아래와 같이 코드를 고칠 수 있습니다.

```java
public void popAll(Collection<? super E> dst) {
        while (!isEmpty()) {
            dst.add(pop());
        }
}
```


매개변수화 타입 T가 생산자라면 `<? Extends T>`를 사용하고, 소비자라면 `<? Super T>`를 사용해야 한다는 공식입니다.

pushAll 메서드에서 매개변수 src는 stack이 사용할 인스턴스를 생산하므로 `생산자`역할을 합니다.

반대로 popAll 메서드의 dst 매개변수는 stack 원소들을 소비한다는 의미에서 `소비자`역할을 합니다.

<br/>