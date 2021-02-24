---
title : '[SpringBoot] IoC(의존성 역전) DI(의존성 주입)'
date : 2021-01-29 15:22:12
category : 'SpringBoot'
draft : false
description : "IOC(의존성 역전) DI(의존성 주입)"
tags : ['SpringBoot']
---



### IoC

Ioc란, `Inversion of Control`라고 합니다. 

이는 객체의 생성부터 생명주기 관리를 컨테이너가 도맡으면서 제어권이 컨테이너로 넘어가게 됨을 의미하는데, 다시 말하면 제어권의 흐름이 바뀌었다고 하여 제어의 역전, 의존성 역전이라고 부릅니다.


스프링에서는 컨테이너안에 Bean이라는 인스턴스 형태로 관리를합니다.

만약에 IoC가 없다면, `@AutoWirded`를 통한 의존성 주입을 할 수 없을 것입니다.

```java

public class MemberServcie{

     private MemberRepository memberRepository = new MemberRepository();
}

``
위와 같이 new를 통해 의존 객체를 직접 생성해야 합니다.

허나, 제어권이 컨테이너로 넘어오면서 DI(의존성 주입), AOP(관점 지향 프로그램)등이 가능하게 됩니다.

```java

@RequiredArgsConstructor
@Service
public class MemberService{

    private final MemberRepository memberRepository;
}

```

이렇게 `@RequiredArgsContstructor`를 사용하여 final형의 객체를 Autworied 시켜서 의존성 연결을 할 수 있게 해줍니다.



#### Bean, BeanFactory

스프링 컨테이너에 등록된 Bean들은 `싱클톤의 형태`를 띠고있습니다.

BeanFactory는 스프링 빈 컨테이너에 접근하기 위한 최상위 인터페이스로서, *Bean 객체를 생성하고 관리하는 인터페이스*라고 생각하면 됩니다.

BeanFactory는 컨테이너가 구동될 때 Bean 객체를 생성하는 것이 아니라, 클라이언트의 요청이 있을 때 Bean객체를 생성합니다.


### Component Scan

Spring boot Project에서 `@SpringBootApplication` 어노테이션이 `@ComponentScan`이라는 어노테이션을 포함하고 있습니다.

@SpringBootApplication = @SprinBootConfiguration + @ComponentScan + @EnableAutoConfiguration

SpringBootApplication은 Bean을 2번 등록하게 되는데,

@ComponentScan(packagename)은 해당 패키지의 하위패키지의 @Component, @Repository, @Service, @Controller,@Resoucre 등의 어노테이션이 선언된, 빈의 코드를 스캔하여 등록하게 합니다.

@EnableAutoConfiguration은 Bean을 등록하는 자바 설정파일, Configuration의 Bean들을 등록하게 합니다.




### DI

DI란, `Dependency Injeciton`으로 의존 관계주입이라고 하며, 어떤 객체가 사용하는 의존 객체를 직접 생성하는 것이 아니라 주입하는 방법을 의미합니다.


의존성 주입 방법 3가지에 대해 공부해보았습니다.

1. Field Injection

가장 간단한 방법으로, Bean으로 등록된 객체를 사용하고자 하는 클래스에 Field로 선언된 후

`@Autowired` 키워드를 붙여주면 자동으로 주입이 됩니다.


```java

@Service
public class MemberService{

    @Autowired
    private MemberRepository memberRepository;
}

```

매우 간단한 방법이지만, 단점이 있습니다.

생성자 주입방식과는 달리 final로 선언을 할 수 없기 때문에, 객체 자체가 변할 수 있다는 위험성이 있습니다.

또한 DI를 사용한다는 것은 클래스가 자신의 의존성만을 책임지는 것이 아니라 제공된 의존성 또한 책임을 집니다.

클래스가 어떠한 의존성을 책임지지 않을 때, 메소드나 생성자를 통해서 표현이 되어야하는데 Field Injection을 사용하면 그 의존성을 보여줄 수가 없습니다.


2. Setter Injection

Setter Methoad에 @Autworied를 붙여서 DI를 구현하는 방식입니다.

```java

@Service
public class MemberService{


    private MemberRepository memberRepository;

    @Autowired
    public void setMemberRepository(MemberRepository memberRepository){
        this.memberRepository=memberRepository;
    }
}



```


3. Constructor Injeciton

```java

@Service
public class MemberService{

    private MemberRepository memberRepository;

    // @Autowired Spring 4.3 버젼 부터 @Autowired 생략가능
    public memberRepository(emberRepository memberRepository){
        this.memberRepository=memberRepository;
    }
}

```

이렇게 생성자를 사용해서 객체 의존성을 주입하는 방법입니다. 

생성자 주입방법은 field, setter injection과는 달리 Bean을 주입하는 순서가 다릅니다.

생성자 주입방법은 둘과는 달리 먼저 빈을 생성하지않고 생성자의 인자에 사용되는 빈을 찾거나 factory에서 만들게 됩니다. 그 후에 찾은 인자 빈으로 주입하려는 빈의 생성자를 호출합니다.

=> 객체 생성시점에 빈을 주입하기 때문에, 서로 참조하는 객체가 생성되지 않는 상태에서 그 빈을 참조하게 된다면, 사전에 오류가 발생하여 어플리케이션 구동이 되지 않습니다.


Lombok을 사용하면 다음과 같이 간단하게 표현할 수 있습니다. 

다음 코드는 final을 선언함으로서 Immutability 특성을 추가할 수 있습니다.

```java

@RequiredArgsConstructor
@Service
public class MemberService{

    private final MemberRepository memberRepository;
}

```


### 의존성 주입을 사용하는 이유

1. 재사용성을 높여줍니다.
2. 코드를 단순화 시켜줍니다.
3. 사용하는 이유를 파악하기 수월하고 코드가 읽기 쉬워 집니다.
4. 객체간의 의존관계를 설정할 수 있습니다.
5. 테스트에 용이합니다.