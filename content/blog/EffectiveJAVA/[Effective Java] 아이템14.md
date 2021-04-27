---
title : '[Effective Java] 아이템14 Comparable을 구현할지 고려하라'
date : 2021-04-26 14:22:12
category : 'Effective Java'
draft : false
description : "아이템14 Comparable을 구현할지 고려하라"
tags : ['Java']
---

# 이펙티브 자바 아이템 14

# Comparable을 구현할지 고려하라


Comparable의 compareTo()는 단순 동치성 비교뿐만 아니라 순서까지 비교할 수 있으며, 제네릭하게 사용가능합니다.

이 말은 인스턴스 간의 순서가 있음을 의미하고 정렬을 할 수 있음을 의미합니다.

<br/>

### CompareTo의 일반 규약

CompareTo의 규약은 equals()의 규약과 비슷합니다.

다만 equals()처럼 타입이 다른 객체를 고려할 필요가 없습니다

비교할 수 없는 타입이 주어지면 `ClassCaseException`과 같은 예외를 처리하면 됩니다.

**1. 대칭성**
* Comparable을 구현한 클래스는 모든 x, y에 대해 sgn(x.compareTo(y)) == -sgn(y.compareTo(x))여야 합니다
* 따라서 x.compareTo(y)가 예외를 던지면, y.compareTo(x)도 예외를 던져야 합니다

**2. 추이성**
* (x.compareTo(y) > 0 && y.compareTo(z) > 0)이면 x.compareTo(z) > 0 입니다

**3. 반사성**
* x.compareTo(y) == 0이면 sgn(x.compareTo(z)) == sgn(y.compareTo(z)) 입니다

**4. equals()** 
* 이는 필수는 아니지만 꼭 지키는 것이 좋습니다
* (x.compareTo(y) == 0) == (x.equals(y)) 이어야 합니다


<br/>

### CompareTo 구현 패턴

1. 관계 연산자 `< >`를 사용하는 것보다 기본 타입 클래스의 compare()함수, 비교 클래스 자체의 compare()을 사용하는 것이 좋습니다

```java
public int compareTo(int x, int y) {
	return (x < y) ? -1 : ((x == y) ? 0 : 1);
}

public int compareTo (int x, int y) { // 이것을 사용
	return Integer.compare(x, y);
}
```

<br/>

2. 필드가 여러개 있으면 핵심적인 필드부터 비교하여 불필요한 연산을 줄이는 것이 좋습니다

```java
public int compareTo(PhoneNumber pn) {
	int result = Short.compare(this.areaCode, pn.areaCode);
	if(result == 0) {
		result = Short.compare(this.prefix, pn.prefix);
		if(result == 0) {
			result = Short.compare(this.lineNum, pn.lineNum);
		}
	}
    return result;
}

```

areaCode > prefix > linkNum 이렇게 핵심 필드부터 비교를 진행합니다

<br/>

3. 비교자 생성 메서드를 활용하여 구현하여도 됩니다

```java
private static final Comparator<PhoneNumber> COMPARATOR 
	= comparingInt((PhoneNumber pn) -> pn.areaCode)  
		.thenComparingInt(pn -> pn.prefix)  
		.thenComparingInt(pn -> pn.lineNum);

public int compareTo(PhoneNumber pn){
	return COMPARATOR.compare(this, pn);
}
```

<br/>

### hashCode를 이용한 비교연산

```java

// X
static Comparator <Object> hashCodeOrder = new Comparator <> () {
  public int compare(Object o1, Object o2) {
    return o1.hashCode() - o2.hashCode();
  }
};

```

위와 같이 비교자를 생성하면  `오버플로` `부동 소수점 계산방식`에 따른 오류를 낼 수 있습니다.

그렇기 때문에 이와 같이 사용하는 것 보다 밑의 코드와 같이 구현을 하는 것이 좋습니다

<br/>

```java

// static compare method
static Comparator <Object> hashCodeOrder = new Comparator <> () {
  public int compare(Object o1, Object o2) {
    return Integer.compare (o1.hashCode (), o2.hashCode())
  }
};

// Comparator construction
static Comparator <Object> hashCodeOrder =
  Comparator.comparingInt (o-> o.hashCode ());


```