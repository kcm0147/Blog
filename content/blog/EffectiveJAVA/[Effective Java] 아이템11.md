---
title : '[Effective Java] 아이템11 equals를 재정의 하려거든 hashCode도 재정의하라'
date : 2021-04-24 14:22:12
category : 'Effective Java'
draft : false
description : "아이템11 equals를 재정의 하려거든 hashCode도 재정의하라"
tags : ['Java']
---

# 이펙티브 자바 아이템 11

# equals를 재정의 하려거든 hashCode도 재정의하라


<br/>

### hashCode를 재정의 하지 않을 때 문제점 ?

**equals를 재정의한 클래스 모두에서는 hashCode도 재정의 해야합니다**

만약, hashCode를 재정의하지 않을 시, **HashMap이나 HashSet 같은 컬렉션의 원소로 사용할 때 문제를 일으킬 수 있습니다**

Object 명세를 확인했을 때, **equals(Object)가 두 객체를 같다고 판단한다면 두 객체의 HashCode는 똑같은 값을 반환해야 한다고 적혀있습니다**

즉, 논리적으로 같은 객체는 `같은 hashCode`를 반환해야 합니다.

equals는 물리적으로 다른 두 객체를 논리적으로 같다고 판단할 수 도 있습니다.

하지만 확인해보면 hashCode()는 이 둘이 전혀 다르다고 말해줍니다.


```java
Map<PhoneNumber, String> m = new HashMap<>();
m.put(new PhoneNumber(707, 867, 5309), "제니");
```

```java
m.get(new PhoneNumber(707, 867, 5309))
```

<br/>

위의 코드를 실행하면 `제니`가 나올 것 같지만, 실질적으로 Null을 반환합니다.

그 이유는 **PhoneNumber 클래스는 hashCode를 재정의하지 않았기 때문에** 논리적 동치인 두 객체가 서로 다른 해시코드를 반환하기 때문입니다.

- **new를 통해서 서로 다른 객체를 key로 사용하여 hashCode를 뽑아내어 두 객체는 서로 다른 해시코드가 반환됩니다**
	
- get 메소드는 엉뚱한 해시 버킷을 찾아가서 객체를 찾으려고 했던 것입니다 **다만, 두 객체가 동일한 버킷에 존재했더라도 결과값은 null이었을 것입니다**
	
- 그 이유로는 **HashMap은 해시코드가 다른 엔트리끼리는 동치성 비교를 시도조차 하지 않도록 최적화 되어있기 때문입니다.**


<br/>

```java
@Overrdie
public int hashcode() {
  return 42;
}
```


바로 위의 문제는 이렇게하면 해결됩니다.

하지만 **이렇게 문제를 해결해서는 안됩니다**.

이렇게 해시코드를 고정값으로 지정하면 같은 해시 버킷에 축적되어 마치 링크드리스트와 동작하게 될것입니다..

그러면 탐색 속도인 O(1)이 아닌 **O(N)으로 느리게 작동 될 수 있습니다**.

<br/>

### hashCode 어떻게 만드는게 좋을까?

```java

@Override 
public int hashCode() {
  int result = Short.hashCode(areaCode);
  result = 31 * result + Short.hashCode(prefix);
  result = 31 * result + Short.hashCode(lineNum);
  return result;
}
```

* 위의 코드는 PhoneNumber **인스턴스의 핵심 필드 3개(areaCode, prefix, lineNum)만을 사용해 간단한 계산만 수행한 예**입니다.

<br/>

핵심 필드란 `equals 비교에 사용되는 필드`를 말합니다

1. int형 변수를 선언하여 핵심필드의 첫번째 필드를 `Type.hashCode(f)`를 수행하여 값을 저장합니다.
2. 이 후에 핵심필드를 result=31 * result + c(해시코드) 로 계속해서 Update 합니다.

31을 사용하는 이유는 31이 primeNum이자 홀수인데 전통적으로 이렇게 사용해왔다고 합니다.

<br/>

### 주의사항

* 혹여나 성능을 향상시키기 위해서 hashCode() 계산에서 중요한 필드를 제외해서는 안됩니다.
* hashCode가 반환하는 값의 생성 규칙을 API 사용자에게 보여주어서는 안됩니다.