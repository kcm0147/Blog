---
title : '[Effective Java] 아이템1 생성자 대신 정적 팩터리 메서드를 고려하라'
date : 2021-04-19 10:22:12
category : 'Effective Java'
draft : false
description : "아이템1 생성자 대신 정적 팩터리 메서드를 고려하라"
tags : ['Java']
---

# 이펙티브 자바 아이템1


오늘 부터 이펙티브 자바 스터디를 진행하기 때문에, 천천히 공부를 시작해보려고 합니다.

아무래도 처음 접하고 공부하기에는 상당히 난이도가 있는 것 같지만 열심히 해보겠습니다.

- - - -


<br/>

보통 인스턴스를 생성하는 방법에는 `Public 생성자`  `정적 팩터리 메서드`를 이용하는 방법이 존재합니다.

## public 생성자

```java
public class Book{
		public Book(){}
}
```



## 정적 팩터리 메서드

```java
public class Book{
		private static Book book = new Book();

		private Book(){

		}

		public static final Book getInstance(){
			return book;
		}
}
```


## 정적 팩터리 메서드란 ?

static으로 선언된 메서드를 의미하며, new Object()와 같이 객체 생성을 하지 않고 사용할 수 있는 메서드를 의미합니다.

<br/>


## 정적 팩터리 메서드가 생성자보다 좋은 이유?

### 1. 이름을 가질 수 있다

객체의 생성자로 여러개를 오버로딩 하게되면 ,  모든 생성자의 이름은 같지만 매개변수는 다릅니다. 

이러한 경우 **단순히 매개변수만 보고 의미하는 바를 정확하게 알기 힘든 경우가 많습니다**

반면에 `정적 팩터리 메서드`는 이름만 잘 지으면 반환될 객체의 특성을 쉽게 묘사할 수 있습니다.

즉 메서드의 이름만을 확인하여 어떠한 작업을 하는지 쉽게 유추할 수 있습니다

- - - -


### 2. 호출이 될때마다 인스턴스를 새로 생성하지 않아도 된다

정적 팩터리 메소드 호출을 위해 새로운 인스턴스를 생성하지 않기 때문에

불변 클래스는 인스턴스를 캐싱하여 재활용하는 식으로 불필요한 객체 생성을 피할 수 있습니다.

* 불변 클래스는 인스턴스를 미리 만들어 놓거나, 새로 생성한 인스턴스를 캐싱하여 재활용해 불필요한 객체 생성을 막아 성능을 끌어올려 줍니다.



```java

public class Book{
		private static Book book = new Book();

		private Book(){

		}

		public static final Book getInstance(){
			return book;
		}
}
```

위의 코드를 다시 한번 확인하면 , 생성자를 `private`로 선언하여 new 키워드를 통한 객체 생성을 막아두고, `getInstance` 메서드를 이용하여 인스턴스를 없다면 생성하고 있으면 반환하도록 하였습니다.


- - - -

### 3. 반환 타입의 하위 타입 객체를 반환할 수 있는 능력이 있다

정적 메서드로부터 인터페이스 자체를 반환하여, 구현 클래스를 공개하지 않고도 그 객체를 반환 할 수 있습니다.

인터페이스에서 객체의 클래스를 선택할 수 있는 `유연성`을 부여합니다.

리턴 타입을 인터페이스로 지정하고 구현 클래스를 API에 노출시키지 않고 객체를 반활 할 수 있어서, 리턴 타입을 인터페이스로 지정하고 구현 클래스를 API에 노출 시키지 않고도 객체를 반환 할 수 있습니다.

이는 `인터페이스 기반 프레임 워크`를 만드는 핵심 기술 중에 하나입니다.


- - - -

### 4. 입력 매개변수에 따라 매번 다른 클래스의 객체를 반활 할 수 있다

철저히 인터페이스 기반의 구현을 이루어짐으로서, 사용자는 팩토리 메서드가 반환하는 인스턴스가 어떠한 클래스인지 알 수도 없고, 알 필요가 없어집니다.



```java

public interface MyBook {
    static MyBook of(int cnt) {
        MyBook instance;

        if (cnt > 50) {
            instance = new MyBigBook(cnt);
        } else {
            instance = new MySmallBook(cnt);
        }

        return instance;
    }

    String getValue();

    class MyBigBook implements MyBook {
        private int value;
        MyBigBook(int cnt) {
            this.value = cnt;
        }

        @Override
        public String getValue() {
            return "MyBigBook's count : " + this.value;
        }
    }

    class MySmallBook implements MyBook {
        private int value;

        MySmallBook(int cnt) {
            this.value = cnt;
        }

        @Override
        public String getValue() {
            return "MySmallBook's count : " + this.value;
        }
    }
}

```



- - - -

### 5. 정적 팩터리 메서드를 작성하는 시점에는 반활한 객체의 클래스가 존재하지 않아도 된다

인터페이스나 클래스가 만들어지는 시점에서 하위 타입의 클래스가 존재하지 않아도 `나중에 만들 클래스가 기존의 인터페이스나 클래스를 상속 받는 상황이라면 언제든지 의존성을 주입받아서 사용이 가능합니다`


이러한 유연함은 `서비스 제공자 프레임워크`를 만드는 근간이 됩니다


- - - -
<br/>

#### * **서비스 제공자 프레임워크란?**

다양한 서비스 제공자들이 하나의 서비스를 구성하는 시스템으로 클라이언트가 실제 구현된 서비스를 이용할 수 있도록 하는데 

클라이언트는 세부적인 구현 내용을 몰라도 서비스를 이용할 수 있습니다. 

Ex) JDBC

<br/>

#### * **서비스 제공자 프레임워크의 구성**

1. 구현체의 동작을 정의하는 **서비스 인터페이스**
2. 제공자가 구현체를 등록할 때 사용하는**제공자 등록 API** 
3. 클라이언트가 서비스의 인스턴스를 얻을 때 사용하는**서비스 접근 API**
4. 서비스 인터페이스의 인스턴스를 생성하는 팩터리 객체를 설명해주는 **서비스 제공자 인터페이스**

- - - -

<br/>

## 정적 팩터리 메서드의 단점

### 1. 정적 팩터리 메서드만 제공하면 하위 클래스를 만들 기가 어렵다

상속을  하게 되면 `super()`를 호출하면서 부모 클래스의 함수들을 호출하게 됩니다.

그러나 부모 클래스의 생성자를 `private`로 설정하면 상속이 불가능합니다.


- - - -

### 2. 정적 팩터리 메서드는 프로그래머가 찾기가 힘들다

어떤 라이브러리를 사용하기 위해 API 문서를 보면 정적 팩터리 메서드에 대해서 확인하기가 쉽지 않습니다.

그렇기 때문에 사용자는 API 문서를 작성하고 메서드 이름도 널리 알려진 규약을 따라 짓는 방식으로 문제를 완화해주어야 합니다.



