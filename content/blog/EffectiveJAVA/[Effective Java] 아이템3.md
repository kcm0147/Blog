---
title : '[Effective Java] 아이템3 Private 생성자나 열거타입으로 싱글톤임을 보증하라'
date : 2021-04-20 11:22:12
category : 'Effective Java'
draft : false
description : "아이템3 Private 생성자나 열거타입으로 싱글톤임을 보증하라"
tags : ['Java']
---

# 이펙티브 자바 아이템3

## Private 생성자나 열거타입으로 싱글톤임을 보증하라

<br/>

### 싱글톤이란?

* 인스턴스를 오직 하나만 생성할 수 있는 클래스를 의미합니다
* 한번의 객체 생성으로 재상사용이 가능하기 때문에 메모리 낭비를 방지할 수 있습니다
* 싱글톤으로 생성된 객체는 전역성을 띄기에 다른 객체와 공유

생성자를 Private로 만들어서 new를 통해서 밖에서 호출하지 못하게 설정합니다

<br/>

### 싱글톤의 한계

1. Private 생성자를 가지고 있기 때문에 상속이 불가능하다.
2. 싱글톤은 테스트를 하기가 어렵다
3. 서버환경에서 싱글톤이 하나만 만들어지는 것을 보장하지 못한다
4. 싱글톤의 사용은 전역 상태를 만들 수 있기 때문에 바람직하지 못하다.

<br/>

### 싱글톤을 사용하는 이유

싱글톤을 만드는 방식에는 두가지가 있습니다.

두 방식 모두 생성자는 `private`로 감춰두고

유일한 인스턴스에 접근할 수 있는 수단으로 `public static` 멤버를 마련해둡니다.

<br/>

#### public static 멤버가 final 필드인 방식

```java

public class Elvis {
	public static final Elvis INSTANCE = new Elvis();
	private Elvis() { ... }

}

public class ElvisMain{
	public static void main(String[] args){
		Elvis elvis = Elvis.INSTANCE;
	}	
}

```


<br/>

Private 생성자는 `public static final` 필드인 `Elvis.INSTANCE`를 초기화 할때 딱 한번만 호출 됩니다.

public static 필드가 final이니 절대로 다른 객체를 참조할 수 없습니다.

- - - -

* 예외적으로, 리플렉션 API `AccessibleObject.setAccessible`을 사용해 private 생성자를 호출할 수 있습니다.

<br/>

```java
Constructor<Elvis> constructor = (Constructor<Elvis>) elvis2.getClass().getDeclaredConstructor();
constructor.setAccessible(true);

Elvis elvis3 = constructor.newInstance();
assertNotSame(elvis2, elvis3); // 실패

```

이럴때는 아래와 같이 두번째 객체가 생성 되려 할 때 예외를 던지게하면 됩니다.

<br/>

```java
private Elvis() {
	if(INSTANCE != null){
		throw new RuntimeException("생성자를 호출할 수 없습니다");
	}
}

```

<br/>

#### 정적 팩터리 메서드를 public static 멤버로 제공하는 방식

```java

public class Elvis {
	private static final Elvis INSTANCE = new Elvis();
	private Elvis() { ... }
	public static Elvis getInstance() { return INSTANCE; }
}


public class ElvisMain{

	public static void main(String[] args){
		Elvis elvis = Elvis.getInstance();
	}	
}


```

이렇게 사용하면 `Elvis.getInstance()`는 항상 같은 객체의 참조를 반환하므로 제2의 `Elvis` 인스턴스는 만들어지지 않습니다.

하지만 `리플렉션 예외는 똑같이 적용`이 됩니다.

<br/>

- - - -

#### 이 방식의 장점 ?

1. API를 바꾸지 않고도 싱글턴이 아니게 변경할 수 있습니다.
=> getInstance() 호출부의 수정없이 내부에서 private static이 아닌 새 인스턴스를 생성해주면 됩니다.

2. 원한다면 정적 팩터리를 제네릭 싱글턴 팩터리로도 만들 수 있습니다.

<br/>

- - - -

### 위 두 방식의 문제점?

**각 클래스를 직렬화 후 역 직렬화할 때 새로운 인스턴스를 만들어 반환합니다.**
역 직렬화는 기본 생성자를 호출하지 않고 값을 복사해서 새로운 인스턴스를 반환합니다.

이를 방지하기 위해서 `readResolve()` 를 사용하는데, 이를 이해서 모든 인스턴스 필드를 일시적이라고 선언하고 `readResolve()` 메서드를 제공해야 합니다.

* 일시적 : 필드를 직렬화 대상에서 제외하는 것을 의미

이렇게 하지 않으면 직렬화된 인스턴스를 역 직렬화 할때 마다 새로운 인스턴스가 생성이 됩니다.

그래서 가짜 객체 탄생을 방지하고 싶으면 `readResolve()` 메서드를 추가하여 사용하여야 합니다.

<br/>

```java
private Obejct readResolve() {
	return INSTANCE;
}

```

<br/>

### 원소가 하나인 열거 타입을 선언하는 방식

대부분의 상황에서 원소가 하나뿐인 열거 타입이 싱글턴을 만드는 가장 좋은 방법

<br/>

```java

public enum Elvis {
	INSTANCE; 
	
	public String getName() {
		return "Elvis";
	}
}

String name = Elvis.INSTANCE.getName();


```

하지만 만들려는 싱글턴이 Enum 이외의 상위 클래스를 상속을 해야 한다면 이 방법은 사용할 수 없습니다.
