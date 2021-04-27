---
title : '[Effective Java] 아이템13 Clone 재정의는 주의해서 진행해라'
date : 2021-04-25 12:22:12
category : 'Effective Java'
draft : false
description : "아이템13 Clone 재정의는 주의해서 진행해라"
tags : ['Java']
---

# 이펙티브 자바 아이템 13

# Clone 재정의는 주의해서 진행해라


<br/>

### Cloneable ?

Cloneable은 어떤 클래스를 복제해도 된다고 알려주는 인터페이스 입니다.

Java Cloneable 인터페이스를 확인하면 아무런 메소드가 확인되지 않지만 사실 **Object의 Clone() 메소드의 동작방식**을 결정하고 있습니다.

즉, **Cloneable을 구현한 인스턴스에서 clone() 메소드를 호출하게 되면,**해당 객체를 복사한 객체를 반환하게 됩니다.**

하지만 주의해야할 것은 Cloneable을 구현하지 않은 인스턴스에서 clone() 메소드를 호출하게 되면 **CloneNotSupportedException 예외**를 던집니다.


<br/>

### Clone 재정의 


```java

public class User implements Cloneable { 
   private String name; 

   public User(String name) { this.name = name; } 
   public String getName() { return name; } 
   public void setName(String name) { this.name = name; } 

   @Override public User clone() throws CloneNotSupportedException 
   { 
      return (User) super.clone(); 
    } 
}

```

소스를 살펴보면 재정의한 clone() 메소드는 다른 패키지에서 접근이 가능하기 위해 접근 제한자를 **protected가 아닌 public으로 구현한 것을 볼 수** 있습니다.

또한, super.clone() 메소드에 의해서 User 인스턴스에 대한 복제가 완벽히 이루어지고 있고, 

**공변 반환 타입**으로 인해 상위 클래스의 메소드가 반환하는 타입(Object)의 하위 타입으로 변환 되어질 수 있습니다.


<br/>

```java

User user = new User("mook"); 
User user2 = (User) user.clone(); Assert.assertEquals(user.getName(), user2.getName());

```

이 처럼 clone()을 통해 객체간의 완벽한 복제가 일어난 것을 확인할 수 있습니다.

<br/>

#### 가변객체 객체 복사는 X

위의 객체 처럼 고정 객체만 있을 때는 괜찮지만, 만약 리스트와 같은 **가변 객체가 포함되어 있으면 super.clone()**을 호출하는 것을 주의해야합니다.

User 클래스에 `private List<String> friendList` 의 **List**를 추가하였습니다.

<br/>

```java

User user = new User("mook"); 
user.addFriendName("soo");

User user2 = (User) user.clone(); 
user2.addFreindName("seok");

Assert.assertEquals(1, user.getFriendNames().size()); // error
Assert.assertEquals(2, user2.getFriendNames().size());

```

위 소스의 결과값을 확인해보면 `Assert.assertEquals(1, user.getFriendNames().size())` 에서 에러가 발생됩니다.

이유는 **복제된 인스턴스의 가변 객체를 변경하게 되면 원본 객체도 동일하게 변경되는 현상이 나타나게 되기** 때문입니다.

<br/>

```java

 @Override public User clone() throws CloneNotSupportedException 
   { 
      // return (User) super.clone(); 

		User copyUser = (User) super.clone();
		
		List<String> copyList = new ArrayList<>();

		for(String name : this.freindList){
			copyList.add(name);
		}
		
		copyUser.freindList=copyList;
		
		return copyUser;
    } 

```

이러한 것을 고치기 위해서는 super.clone() 메소드 호출 이후 **가변 객체도 복제가 될 수 있도록 로직을 추가**해야 합니다.


즉 Cloneable을 구현하는 모든 클래스는 clone() 메소드를 재정의 해야하며

접근 제한자는 public으로 구현하여 모든 패키지에서 접근이 가능하게 합니다.

또한 반환 타입은 클래스 자신으로 변경하고 가변 객체가 존재할 시 가변 객체도 복제될 수 있는 로직을 구성하여 재정의를 해야합니다.


<br/>

### 정적배열을 사용한 깔끔하게 구현할 수 있다

User 클래스에 `private Object[] elements` 의 정적배열을 추가하면 정적배열은 아래와 같이 clone() 이 가능합니다.

```java
 @Override public User clone() throws CloneNotSupportedException 
   { 
      // return (User) super.clone(); 

		User copyUser = (User) super.clone();
		List<String> copyList = new ArrayList<>();
		for(String name : this.freindList){
			copyList.add(name);
		}
		copyUser.freindList=copyList;
		

		copyUser.elements = this.elements.clone(); // 정적배열

		return copyUser;
    } 

```

<br/>

### 복사 생성자와 복사 팩토리

#### 복사 생성자 ?

복사 생성자는 **자신과 같은 클래스의 인스턴스를 매개 변수로 받는 생성자**를 말하는 것입니다.

Ex) public Color(Color red){]

<br/>

#### 복사 팩토리 ?

복사 팩토리란 **복사 생성자를 정적 팩토리 형식으로 정의**한 것입니다.

Ex) public static Color newInstance(Color red){}


복사 생성자와 복사 팩토리를 사용하면 Cloneable 방식처럼 불필요한 Check exception 처리가 필요 없고, 형변환도 필요 없습니다. 

또한, 직접적인 인스턴스가 아닌 인터페이스 타입의 인스턴스를 매개 변수로 받을 수 있어 유연성 또한 향상될 수 있는 장점이 있습니다.

