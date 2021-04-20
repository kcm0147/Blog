---
title : '[Effective Java] 아이템6 불필요한 객체 생성을 피하라'
date : 2021-04-20 12:23:12
category : 'Effective Java'
draft : false
description : "아이템6 불필요한 객체 생성을 피하라"
tags : ['Java']
---

# 이펙티브 자바 아이템6

# 불필요한 객체 생성을 피하라

객체를 사용할 때, 새로 생성하여 객체를 사용하는 것보다 객체를 재 사용하는 편이 나을 때가 많습니다.

<br/>

### 문자열 객체 생성의 예

```java
String temp = new String("hi");
```

String을 new로 생성하면 항상 새로운 객체를 생성하게 됩니다.

```java
String temp = "hi";
```

이 코드는 새로운 인스턴스를 매번 만드는 대신 하나의 String 인스턴스를 재사용합니다.

<br/>

### static factory 메서드

생성자 대신 `정적 팩터리 메서드를 제공하는 불변 클래스에서는 불필요한 객체 생성을 피할 수 있습니다`.

생성자는 호출할 때마다 새로운 객체를 만들지만, 정적 팩터리 메서드는 그렇지 않습니다


<br/>

### 재사용 객체 - 캐싱

만드는데 메모리나 시간이 오래걸리는 객체는 반복적으로 만들어야 한다면 캐싱해두고 재사용할 수 있는지 고려하는 것이 좋습니다.

<br/>

**< 재사용 빈도가 높고 생성비용이 비싼경우 >**

```java

static boolean isRomanNumeralSlow(String s) {
    return s.matches("^(?=.)M*(C[MD]|D?C{0,3})"
            + "(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$");
}
```
<br/>

이 코드에서는 String.matches 라는 정규표현식으로 문자열 형태를 확인하는 메서드를 사용하고 있습니다. 

하지만 이 메서드가 내부에서 만드는 정규 표현식용 `Pattern`인스턴스는 한번 쓰고 버려져서 곧바로 가비지 컬렉션의 대상이 됩니다.

만약에 Pattern이 필요함이 보장되고 재사용 빈도가 높다면 아래와 같이 상수로 초기에 `캐싱`해놓고 재사용할 수 있습니다.

Pattern 인스턴스의 내부 작동은 아래와 같습니다.

<br/>

```java

public boolean matches(String regex) {
    return Pattern.matches(regex, this);
}

public static boolean matches(String regex, CharSequence input) {
    Pattern p = Pattern.compile(regex);
    Matcher m = p.matcher(input);
    return m.matches();
}


```

이러한 코드를 아래와 같이 정적 팩터리 메서드로 정의하여 사용할 수 있습니다.

<br/>

```java

 private static final Pattern ROMAN = Pattern.compile(
            "^(?=.)M*(C[MD]|D?C{0,3})"
                    + "(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$");

    static boolean isRomanNumeralFast(String s) {
        return ROMAN.matcher(s).matches();
    }


```

<br/>

### 어댑터

불변 객체인 경우에 안정하게 재사용을 해야만 합니다.

어댑터를 예로 들면, 어댑터는 인터페이스를 통해 뒤에 있는 객체로 연결해주는 `view`를 의미해서 여러개를 만들 필요가 없습니다.

즉, 같은 인스턴스를 대변하는 여러개의 인스턴스를 생성하는 것은 좋지 않습니다.

예를 들어, Map 인터페이스의 `KeySet` 메서드는 Map 객체 안의 키를 전부 담은 `Set` 인터페이스의 뷰를 반환하게 됩니다.

하지만, 동일한 Map에서 호출하는 `KeySet` 메서드는 같은 Map을 대변하기 때문에 반환한 객체 중 하나를 수정하면 다른 모든 객체가 따라서 바뀝니다.

그러므로 `KeySet`을 굳이 여러개 만들 필요가 없습니다.

<br/>

### 오토박싱

오토박싱 ?

오토박싱은 기본 타입과 박싱된 기본 타입을 섞어 쓸 때 자동으로 상호 변환해주는 기술을 의미합니다.

아래의 예를 보겠습니다.

```java

private static long sum() {
	Long sum = 0L;
	for(long i=0; i<=Integer.MAX_VALUE; i++) {
		sum += i;
	}
	return sum;
}

```

Sum 변수를 `long`이 아닌 `Long`으로 사용을 하게 된다면 long `i`를 연산하면서 Long 인스턴스가 자동으로 2^31개나 만들어집니다..

이러한 경우에는 Long으로 선언된 변수를 `long`으로 바꿔주기만 해도 훨씬 빠른 프로그램을 만들 수 있습니다.

의도치 않은 오토박싱이 생기지 않도록 주의하는 것이 좋습니다.



