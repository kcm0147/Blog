---
title : '[Effective Java] 아이템4 인스턴스화를 막으려거든 private 생성자를 사용하라'
date : 2021-04-20 12:02:12
category : 'Effective Java'
draft : false
description : "아이템4 인스턴스화를 막으려거든 private 생성자를 사용하라"
tags : ['Java']
---

# 이펙티브 자바 아이템4

## 인스턴스화를 막으려거든 private 생성자를 사용하라

<br/>

### 정적 메서드와 정적 필드만을 담은 유틸리티 클래스

`유틸리티 클래스 -> 정적 메서드와 정적 필드만을 담은 클래스`

유틸리티 클래스는 객체 지향적 방식과는 다르지만, 쓰임새가 존재합니다.

* `java.lang.Math` , `java.util.Arrays`, `java.util.Collections`
특정 인터페이스를 구현하는 객체를 생성해주는 정적 메서드 모음

* final 클래스와 관련한 메서드들의 모음

하지만 생성자를 만들지 않은 경우에도 컴파일러가 기본적으로 아무 인자가 없는 public 생성자를 만들어주기 때문에 인스턴스를 만들 수 있습니다.

따라서 인스턴스화를 막기 위해서는 명시적으로 **private 생성자**를 추가하여야 합니다.

<br/>

### private 생성자를 추가하여 클래스의 인스턴스화를 막는다

```java

public class UtilityClass {
	
	private UtilityClass() {
		throw new AssertionError(); // 생성자 내부 호출시 명시적 에러
	}
	...
}


```

1. 위의 코드는 명시적 생성자가 private이기 때문에 **클래스 바깥에서 접근을 할 수** 없습니다

2. 또한 클래스 안에서 실수로 생성자를 호출할수 없도록 Error()를 명시하였습니다.

3. private로 생성자를 선언하여서 하위 클래스가 상위 클래스의 생성자에 접근 할 수 없습니다.  즉  `상속을 불가능 하게 하는 효과`가 있습니다


