---
title : '[Effective Java] 아이템44 표준 함수형 인터페이스를 사용하라'
date : 2021-06-03 18:22:12
category : 'Effective Java'
draft : false
description : "아이템44 표준 함수형 인터페이스를 사용하라"
tags : ['Java']
---

<br/>

#### 표준 함수형 인터페이스

추상 메서드가 1개인 인터페이스를 **함수형 인터페이스**라고 합니다.

필요한 용도에 맞는게 존재한다면 직접 구현하는 것보다 **표준 함수형 인터페이스**를 사용하는게 좋습니다.

 `java.util.funtion` 패키지 하위에 총 43개의 인터페이스들이 존재하는데  이 중 6개의 편리한 인터페이스를 알아보겠습니다.


1. **UnaryOperator<T>**

**함수 시그니처** : T apply(T t)

**의미** : 반환값과 인수의 타입이 같은 함수이며 인수는 1개

**예시** : `String::toLowerCase`

<br/>


2. **BinaryOpearator<T>**

**함수 시그니처** : T apply(T t1, T t2)

**의미** : 반환값과 인수의 타입이 같은 함수이며 인수는 2개

**예시** : `BigInteger::add`

<br/>

3. **Predicate<T>**

**함수 시그니처** : boolean test(T t)

**의미** : 한개의 인수를 받아서 boolean을 반환

**예시** : `Collection::isEmpty`

<br/>

4. **Fucntion<T,R>**

**함수 시그니처** : R apply(T t)

**의미** : 인수와 반환 타입이 다른 함수

**예시** : `Arrays::asList`

<br/>

5. **Supplier<T>**

**함수 시그니처** : T get()

**의미** : 인수를 받지 않고 값을 반환, 제공하는 함수

**예시** : `Instant::now`

<br/>

6. **Consumer<T>**

**함수 시그니처** : void accept(T t)

**의미** : 한 개의 인수를 받고 반환값이 없는 함수

**예시** : `System.out::println`


<br/>

표준 함수형 인터페이스는 **기본 타입**만을 지원합니다.

**박싱된 기본 타입을 넣어서 사용해서도 안됩**니다.

동작은 하지만 **계산이 많아지는데다가 성능이 매우 느려질 수 있기 때문**입니다.

필요한 용도에 맞는게 없으면, 직접 구현해서 사용하는 것이 좋습니다.

---


표준 함수형 인터페이스는 기본 타입인 int,long,double 용으로 각 3개씩 변형이 생겨납니다.

int를 받는 predicate는 `IntPredicate`가 되고 long을 받아 long을 반환한다면 `LongBinaryOpearator`가 됩니다.


<br/>

위에서 Function 인터페이스는 입력 매개변수와 반환 매개변수가 다르다고 하였습니다.

그래서 입력 매개변수타입과 결과 매개변수타입에 따라 좀 더 많은 변형이 생길 수 있습니다.

예를 들어 LongFucntion<int[]>는 long형을 받아 Int[]를 반환합니다.

이는 Long형은 기본타입 입력매개변수이고, 결과 타입은 객체타입일때를 의미합니다.

만약에 **결과값 또한 기본타입**이면 Long**ToInt**Fucntion을 사용이 됩니다.  
=> 입력이 Long형 결과 값이 Int형

만약에 **입력이 객체타입이고 결과값이 기본타입**이라면 **ToLongFunction<int[]>로 표현을 하여 int[] 인수를 받고 long형을 반환시키는 것을 의미합니다.**

인수를 2개씩 받고싶다면 , BI 접두사를 붙입니다.
예를 들어 BiPredicate<T,U>, BiFunction<T,U,R>


<br/>

#### @FunctionalInterface

직접 함수형 인터페이스를 작성해야할 경우 항상 **@FucntionalInterface** 애너테이션을 사용해야 합니다.

이를 사용하는 이유는 다음과 같습니다.

1. 해당 클래스의 코드나 설명 문서를 읽는 사람에게 **인터페이스가 람다용으로 설계된 것**이라는 것을 알려줄 수 있습니다.

2. 해당 인터페이스가 추상 메서드를 오직 하나만 가지고 있어야 컴파일 되게 합니다.

3. 2와 같은 이유로 유지보수 과정에서 누군가가 메서드를 추가하지 못하게 막아줄 수 있습니다.

<br/>

#### 함수형 인터페이스를 사용할 때의 주의점

함수형 인터페이스를 API에서 사용할 때 서로 다른 함수형 인터페이스를 **같은 위치의 인수로 받는 메서드들을 다중 정의해서는 안됩니다**

클라이언트에게 불필요한 모호함을 안겨주며 **올바른 메서드르 알려주기 위해 형변환을 할 때가 빈번하게 생기게 됩니다**.


```java
public interface ExecutorService extends Executor {
    <T> Future<T> submit(Callback<T> task);
    Future<?> submit(Runnable task);
}
```

위의 예제코드는 submit을 다중정의 하였습니다.

아래와 같이 submmit을 실행할 때 **형 변환**이 없으면 컴파일 에러가 발생합니다.

```java
    void test() {
        ExecutorService executorService = Executors.newSingleThreadExecutor();

        executorService.submit((Runnable) System.out::println); // Runnable로 형변환을 하여 실행해야 합니다.

        //람다는 가능
        executorService.submit(() -> 1);
        executorService.submit(() -> {});
    }

```




