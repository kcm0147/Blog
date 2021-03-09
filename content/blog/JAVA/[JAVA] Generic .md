---
title : '[JAVA] Java Generic'
date : 2021-03-09 10:22:12
category : 'JAVA'
draft : false
description : "Java Generic ?"
tags : ['Java']
---

이번에는 제네릭이라는 개념에 대해서 공부를 해보려고합니다.



### Generic 필요성

제네릭Generic)은 자바의 타입 안정성을 맡고 있습니다.

자바의 컴파일 과정에서 타입체크를 해주는 기능으로 객체의 타입을 *컴파일 시에 체크하여 객체의 타입 안정성*을 높여주고 *객체에 대하여 재사용을 할 수 있게* 해주는 기법입니다.

```java

ArrayList list1 = new ArrayList();
list1.add("temp1");

String temp = (String) list1.get(0); // 형변환을 해야만 합니다.


ArrayList<String> list2 = new ArrayList();
list2.add("temp1");

String temp=list2.get(0); // 형변환이 필요없습니다.
```

제너릭 타입은 타입을 `파라미터로 가지는 클래스와 인터페이스`를 뜻합니다.

일단, 제너릭 타입을 사용하지 않고, Object객체를 사용하여 객체를 표현한다면 String,Integer 등 빈번한 타입 변환이 발생해야함으로 성능저하로 이어질 수 있습니다.

또한 타입만 변경해야하고 중복된 코드를 작성해야하는 불편함이 생길 수도 있습니다.

<br/>

<String 코드>

```java

public class SampleString{
       private String value;

       public String get(){
              return value;
       }

       public void set(String input){
              this.value=input;
       }

}

```

<br/>

<Integer 코드>

```java

public class SampleInt{
       private int value;

       public int get(){
              return value;
       }

       public void set(int input){
              this.value=input;
       }

}

```

이렇게 타입만 다르다면, 중복된 코드를 작성해야하는 불편함이 생길수도 있습니다.

* 위는 간단한 코드이지만, ArrayList를 사용하거나 객체가 복잡하게 되어있으면 Object 객체를 사용하여 통일하거나, 코드를 재작성해야하는 불편함이 생깁니다.


<br/>

이를 해결하기 위해서 제너릭 타입을 사용할 수 있습니다.

제너릭 타입은 아래와 같은 형식을 가지고 있습니다.

```java

public class 클래스명<T>{..} // class

public interface 인터페이스명<T>{...} // interface

```

```java

class Temp<T>{
       private T t;

       public T get(){
              return t;
       }

       public void set(T input){
              this.t=input;
       }
}

```

<T>를 이용하여 표현한 것이 `제네릭`입니다. 
Temp의 객체를 생성할 때 타입을 지정한다면, 생성되는 객체안에서는 `T의 위치에 지정된 타입이 대체되어 컴파일러가 인식`합니다.

제네릭 타입의 객체를 아래와 같이 사용할 수 있습니다.

```java

public static void main(String[] args){
       Temp<String> test = new Temp();
       temp.set("this is test");
       System.out.println(test.get());
}

```
Temp<T> 의 T 대신 String으로 사용하였기 때문에 set(T) => set(String)
get()은 `return T;` 대신 `return String;`이 됩니다.

<br/>



