---
title : '[Effective Java] 아이템10 equals는 일반 규약을 지켜 재정의하라'
date : 2021-04-24 13:22:12
category : 'Effective Java'
draft : false
description : "아이템10 equals는 일반 규약을 지켜 재정의하라"
tags : ['Java']
---

# 이펙티브 자바 아이템 10

# equals는 일반 규약을 지켜 재정의하라

<br/>

### equals 재정의를 하지 않아야 할 때

Equals 메소드는 재정의를 해서 사용하는 것이 끔찍한 결과를 초래할 수 있어서

재정의를 하지 않는 것이 옳은 선택 일 수 있습니다.

특히 다음과 같은 상황에서는 **재정의를 하지 않는 것이 좋습**니다.


1. 각 인스턴스가 본질적으로 고유하다.
	* 값을 표현하는 객체가 아니고 동작하는 개체를 표현하는 클래스는 사용할 필요가 없습니다

2. 인스턴스의 논리적 동일성을 검사할 일이 없다.
	* 논리적으로 동일성을 검사할일이 없으면 기본 equals만으로 해결이 됩니다

3. 상위 클래스에서 재정의한 equals가 하위 클래스에도 딱 들어맞는다
	* 예를 들어, AbstractSet은 Set, AbstractList는 List로 상위 클래스로 부터 equals를 구현 받아 사용합니다.

4. 클래스가 private하거나 package-private(protected)이고, equals 메소드를 호출할 일이 없다

    * 이러한 경우에는 equals 메서드를 반드시 오버라이딩을 하여 호출될일이 없도록 설정하여야 합니다.

```java
@Override
public boolean equals(Object o){
	throw new ..Exception(); // 예외처리
}

```

<br/>

### 그러면 언제 equals 메소드를 정의해야 할까요?

* 객체 식별성이 아니라 논리적 동일성이 같을 때 확인을 해야하는데, 상위 클래스 equals가 논리적 동일성을 비교하도록 재정의 하지 않을 때입니다.

**객체식별성 ( 두 객체가 물리적으로 주소가 같은지 ? )**

**논리적 동일성 ( 값이 같은지 ? )**


* 하지만 인스턴스가 둘 이상 만들어지지 않은 싱글톤 객체라면 굳이 equals를 사용하지 않아 재정의를 할 필요가 없습니다.

<br/>

### equals() 재정의 시 따라야할 규약

* **반사성(reflexivity)** : null이 아닌 모든 참조 값 x에 대해, x.equals(x)는 true이다.

* **대칭성(symmetry)** : null이 아닌 모든 참조 값 x, y에 대해, x.equals(y)가 true이면 y.equals(x)도 true이다.

* **추이성(transitivity)** : null이 아닌 모든 참조 값 x, y, z에 대해, x.equals(y)가 true이면 y.equals(z)도 true면, x.equals(z)도 true이다.

* **일관성(consistency)** : null이 아닌 모든 참조 값 x,y에 대해, x.equals(y)를 반복해서 호출하면 항상 true를 반환하거나 항상 false를 반환한다.

* **null - 아님** : null이 아닌 모든 참조 값 x에 대해, **x.equals(null)은 false**이다.

<br/>

### equals 메서드를 해야할 때 지켜야할 점

1. `==` 연산자를 이용하여 입력이 자기 자신의 참조인지 확인합니다
2. `instanceof` 연산자로 입력이 올바른 타입인지 확인합니다
3. 입력을 올바른 타입으로 형변환 합니다
4. 입력 객체와 자기 자신의 대응 되는 핵심 필드들이 모두 일치하는지 하나씩 검사합니다
5. Float,double을 제외한 기본타입은 `==`을 통해 비교하고 참조타입은 `equals()`를 통해 비교합니다

<br/>

### equals 메서드 재정의시 주의사항

1. equals를 재정의 할 때는 hashCode도 반드시 재정의 해야한다
2. Object 외의 타입을 매개변수로 받는 equals 메소드는 선언하지 말자

