---
title : '[Effective Java] 아이템30 이왕이면 제네릭 메서드로 만들라'
date : 2021-05-16 15:22:12
category : 'Effective Java'
draft : false
description : "아이템30 이왕이면 제네릭 메서드로 만들라"
tags : ['Java']
---

클래스와 마찬가지로 메서드도 제네릭으로 만들 수 있습니다.

매개변수화 타입을 받는 정적 유틸리티 메서드는 보통 제네릭 형태입니다.


<br/>

#### 타입 안정성이 보장되지 않는 메서드

```java
public static Set union(Set s1, Set s2) {
        Set result = new HashSet(s1);
        result.addAll(s2);

        return result;
}
```

위 메서드는 컴파일은 되지만 타입 안정성이 보장되지 않으므로 **new HashSet(s1)**, **result.addAll(s2)** 부분에서 경고가 발생합니다.

위의 코드를 타입 세이프하게 만들려면 제네릭을 사용해서 만들면 됩니다.

이에 대한 코드는 아래와 같습니다.

<br/>

#### 제네릭 메서드를 활용한 메서드

```java
public static <E> Set<E> union(Set<E> s1, Set<E> s2) {
        Set<E> result = new HashSet<>(s1);
        result.addAll(s2);

        return result;
    }

```

  

++ 공부를 좀 더 하고 자세히 이해한 후에 다시 정리하기..