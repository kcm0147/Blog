---
title : '[Effective Java] 아이템43 람다보다 매서드 참조를 사용하라'
date : 2021-05-23 14:22:12
category : 'Effective Java'
draft : false
description : "아이템43 람다보다 매서드 참조를 사용하라"
tags : ['Java']
---

<br/>

익명클래스를 사용하는 것 대신 람다를 사용하면 좀 더 간결하다는 것을 배웠습니다.

하지만 람다를 대신하여 **메서드 참조**라는 기능을 사용하여 좀 더 명확하고 간결하게 표현할 수 있습니다.


아래와 같은 람다식의 예제가 있습니다.

```java
map.merge(key,1,(count,incr)-> count + incr);
```


위의 식은 맵에 키가 존재한다면 기존 매핑 값에 1을 증가하는 코드입니다.

<br/>

이를 메서드 참조를 이용하여 표현을 하면 **sum이라는 간결한 표현**으로 람다를 대체할 수 있습니다.

```java
map.merge(key,1,Integer::sum);
```

<br/>

하지만 람다가 더 짧고 명료한 경우에는 람다식을 사용하는 것이 좋습니다.

이에 대한 예제는 다음과 같습니다.

```java
public class Print{
    public static void action(){
        System.out.println("action");
    }
}
```


```java
public class Main {
    public static void main(String[] args) {
        ExecutorService es = Executors.newFixedThreadPool(10);

        es.execute(Print::action);

        es.shutdown();
    }
}

```
<br/>

이를 람다로 표현하면 다음과 같이 작성하면 됩니다.

```java

public class Main {
    public static void main(String[] args) {
        ExecutorService es = Executors.newFixedThreadPool(10);

        es.execute(() -> System.out.println("action"));

        es.shutdown();
    }
}
```

위와 같이 메서드 참조 보다 람다식이 간단할 때는 **람다식을 사용하여 표현하는 것이 좋습니다**.