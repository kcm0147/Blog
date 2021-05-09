---
title : '[Effective Java] 아이템27 비검사 경고를 제거하라'
date : 2021-05-10 01:22:12
category : 'Effective Java'
draft : false
description : "아이템27 비검사 경고를 제거하라"
tags : ['Java']
---


### 비검사 경고

제네릭을 사용하면 수 많은 컴파일러 경고가 나올 수 있습니다.

비검사 형변환 경고, 메서드 경고, 매개변수화 경고 등…

비검사 경고는 할 수 있는 한 모두 제거하는 것이 좋습니다.

<br/>

### @SuppressWarnings

경고를 제거할 수는 없지만 타입이 안전하다고 확신할 수 있다면 `@SupperessWarnings(“unchecked”)`  애너테이션을 이용하여  경고를 숨기는 것이 좋습니다.

하지만 안전하다고 검증된 비검사 경고를 그대로 둔다면 진짜 문제가 발생했음에도 눈치 챌 수가 없습니다.

 따라서 가능한 위의 애노테이션은 좁은 범위에서 신중히 적용해야 합니다.

자칫 심각한 경고를 놓칠 수 있으니 절대로 클래스 전체 적용해서는 안됩니다.

아래는 애노테이션을 적용한 예입니다.

```java
public <T> T[] toArray(T[] a) {
    if (a.length < size)
        return (T[]) Arrays.copyOf(elements, size, a.getClass());
    System.arraycopy(elements, 0, a, 0, size);
    if (a.length > size)
        a[size] = null;
    return a;
}
```

위의 코드는 ArrayList의 toArray() 메서드 입니다. ArrayList를 컴파일 하면 `unchecked cast` 경고가 발생합니다. 

애너테이션은 선언에만 달 수 있기 때문에 return 문에는 `@SuppressWarnings`를 다는 것이 불가능합니다. 

메서드 전체에 달 수도 있지만 범위가 필요 이상으로 넓어집니다. 따라서 반환 값을 담을 지역변수를 선언하고 그 변수에 애너테이션을 달아주는 것이 좋습니다.

<br/>

그에 대한 예가 아래의 코드입니다.

```java
public <T> T[] toArray(T[] a) {
    if (a.length < size) {
        // 애노테이션을 적용한 변수
        @SuppressWarnings("unchecked") T[] result =
            (T[]) Arrays.copyOf(elements, size, a.getClass());
        return result;
    }
    System.arraycopy(elements, 0, a, 0, size);
    if (a.length > size)
        a[size] = null;
    return a;
}

```