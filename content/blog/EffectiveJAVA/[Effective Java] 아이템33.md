---
title : '[Effective Java] 아이템33 타입 안전 이종 컨테이너를 고려하라'
date : 2021-05-17 14:22:12
category : 'Effective Java'
draft : false
description : "아이템33 타입 안전 이종 컨테이너를 고려하라"
tags : ['Java']
---


<br/>

Set<E> , Map<K,V> 등 의 컬렉션과 ThreadLocal<T>와 같은 단일원소 컨테이너에 제네릭이 사용됩니다.

이와 같은 것들의 매개변수화 되는 대상은 컨테이너 자신이 됩니다.

따라서 하나의 컨테이너에서 매개변수화 할 수 있는 타입의 수가 제한됩니다.

타입의 수에 제한을 두지 않기 위해서 타입 안전 이종 컨테이너 패턴을 이용할 수 있습니다.


<br/>

#### 타입 안전 이종 컨테이너 패턴 ?

컨테이너에 값을 넣거나 뺄 때 매개변수화를 한 키를 함께 제공하는데 이를 **타입 안전 이종 컨테이너 패턴**이라고 합니다.

즉, `각 타입의 Class 객체를 매개변수화 한 키 역할`로 사용하는 것입니다.

참고로 String.class의 타입은 Class<String> , Integer.class 타입은 Class<Integer> 입니다.

또한 이때의 class 리터럴을 **컴파일 타입 정보**와 **런타임 타입 정보**를 알아내기 위해 주고 받는 **타입 토큰**이라고 불립니다


<br/>

아래는 타입 안전 이종 컨테이너 패턴을 사용하는 예제 코드입니다.

```java

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class Favorites {
    private Map<Class<?>, Object> favorites = new HashMap<>();

    public <T> void putFavorite(Class<T> type, T instance) {
        favorites.put(Objects.requireNonNull(type), instance);
    }

    public <T> T getFavorite(Class<T> type) {
        return type.cast(favorites.get(type));
    }
}


```

<br/>

```java

public class Main {
    public static void main(String[] args) {
        Favorites f = new Favorites();

        f.putFavorite(String.class, "Muk");
        f.putFavorite(Integer.class, 0xabcdefg);
        f.putFavorite(Class.class, Favorites.class);

        String favoriteString = f.getFavorite(String.class);
        int favoriteInteger = f.getFavorite(Integer.class);
        Class<?> favoriteClass = f.getFavorite(Class.class);

        System.out.printf("%s %x %s%n", favoriteString,
                favoriteInteger, favoriteClass.getName());
    }
}

```


위의 코드가 실행되는 것처럼 Favorites의 타입은 Map<Class<?>,Object> 로 

키가 와일드 카드타입임을 의미합니다. 

이는 **모든 키가 서로 다른 매개변수화 타입을 가질 수 있음을 의미**합니다.

또한 값이 Obejct 타입이기 때문에 아래와 같은 cast() 메서드를 사용해서 해당 객체 참조를 Class 객체가 가리키는 타입으로 동적 형변환을 하고 있습니다.

```java
public class Class<T> {
    T cast(Object obj);
}
```


<br/>

#### 타입 안전 이종 컨테이터 제약

1. **타입 안전 이종 컨테이너는 실체화 불가 타입에는 사용할 수 없습니다**.

String[], String은 사용 가능 하지만, List<String>은 실체화 불가 타입이라 사용할 수 없습니다.

List<String>과 List<Integer>은 List.class 라는 같은 Class 객체를 공유하고 있기 때문입니다.

<br/>

2. **로 타입으로 넘기면 안전성이 깨질 수 있습니다**

Favorite 객체가 타입 불변식을 어기는 일이 없도록 보장하려면 

putFavroite() 메서드의 **매개변수로 주어진 instance 타입**이 키의 **Class type과 같은지 확인하도록 수정**합니다.


```java
public <T> void putFavorite(Class<T> type, T instance) {
       favorites.put(Objects.requireNonNull(type), type.cast(instance));
}

```

<br/>

#### 한정적 타입 토큰

위에서 Favorite에 사용하는 타입 토큰은 한정적이지 않습니다.

이 타입 토큰을 한정시키기 위해서는 **한정적 타입 매개변수** **한정적 와일드카드**를 사용하여 표현 가능한 타입을 제한 시키면 됩니다.