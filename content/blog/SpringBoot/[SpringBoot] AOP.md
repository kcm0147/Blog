---
title : '[SpringBoot] AOP'
date : 2021-04-17 15:22:12
category : 'SpringBoot'
draft : false
description : "AOP??"
tags : ['Spring']
---

이번 시간에는 AOP에 대해 학습을 진행해보았습니다.

<br/>

Spring의 핵심 개념 중 하나인 `DI(Dependency Injection)`는 **모듈들 간의 결합도를 낮춰주는 것**이라면, AOP는 **애플리 케이션 전체에 걸쳐 사용되는 기능을 재사용**하도록 지원하는 것입니다

`AOP ( Asepect oriented Programming)`는 **관점 지향 프로그래밍**이라는 의미가 됩니다.

<br/>

쉽게 말해서  프로젝트 구조를 바라보는 **관점**을 바꿔보자는 의미이며

또한 기존의 OOP에서 바라보던 관점을 다르게 하여 

**부가기능적인 측면에서 보았을 때 공통된 요소를 추출하는 것을 의미**

<br/>




```
OOP : 비즈니스 로직의 모듈화
	ex ) 모듈화 핵심 단위는 비즈니스 로직

AOP : 인프라 혹은 부가기능의 모듈화
 ex ) 로깅, 트랜잭션, 보안.. 즉 각각의 모듈들의 주 목적 이외에 필요한 부가 기능들

```

OOP에서 바라보던 관점을 다르게 하여 **부가 기능적인 측면**에서 보았을 때 공통된 요소를 추출하고자 하는 것이며

공통된 부분을 잘라냈다고 하여 AOP를 **크로스 컷팅**이라고 합니다.

<br/>

OOP에서의 공통된 기능을 재사용하는 방법으로는 **상속이나 위임**을 사용합니다

하지만 전체 어플리케이션에서 여기저기 사용되는 부가기능들을 상속이나 위임으로 처리하기에는 깔끔하게 모듈화가 힘듭니다

AOP가 이래서 등장을 하게 되는데 이에 대한 장점은 2가지 입니다.

1) 애플리케이션 **전체에 흩어진 공통 기능이 하나의 장소에서 관리된다는 점**
2) 다른 서비스 **모듈들이 본인의 목적에만 충실하고 그외 사항들은 신경쓰지 않아도 된다는 점**

<br/>


#### AOP 용어

- - - -

**1) Target** 

부가기능을 부여할 대상을 얘기합니다

핵심기능을 담당하는 getBoard , getUser들을 하는 **Servcie**들을 의미합니다

- - - -

**2) Aspect**

**객체지향 모듈을 Obejct라고 부르는 것 처럼**

**부가기능 모듈을 Aspect라고 부르며**, 핵심기능에 부가되어 의미를 갖는 특별한 모듈이라고 생각하면 됩니다.

`Aspect`는 부가 기능을 정의한 `Advice`와 `Advice`의 적용 위치를 결정하는 `PointCut`을 포함합니다.

- - - -

**3) Advice**

**실질적으로 부가기능을 담은 구현체**를 이야기합니다.

Advice의 경우 오브젝트에 **종속 되지 않기 떄문**에 순수하게 부가기능에만 집중할 수 있습니다.

`Advice는 Aspect가 무엇을 언제 할지 정의하고 있습니다`


- - - -

**4) JoinPoint**

`Advice`가 적용될 수 있는 위치를 의미합니다.

다른 AOP 프레임 워크와는 달리 Spring에서는 **메소드 조인포인트**를 제공하고 있습니다

즉 Spring 프레임워크 내에서 조인포인트라하면 **메소드**를 가리킨다고 생각하면 됩니다


- - - -

**5) PointCut**


부가기능이 적용될 메소드를 선정하는 방법을 의미합니다.

즉 Advice를 적용할 `JoinPoint`들을 정의한 것입니다.

- - - -

**6) Proxy**

타겟을 감싸서 타겟의 요청을 대신 받아주는 Wraping Obejct

호출자(클라이언트)에서 타켓을 호출하게 되면 타겟이 아닌 **타겟을 감싸고 있는 프록시가 호출**되어 타겟 메소드 실행 전에 선처리, 타겟 메소드 실행 후, 후처리를 실행시키도록 구성되어 있습니다

(**AOP에서 프록시는 호출을 가로챈 후, Advice에 등록된 기능을 수행 후 타겟 메소드를 호출**)

- - - -

**7) Weaving**

**PointCut에 의해 JoinPoint에 Advice를 삽입하는 과정**

**지정된 객체에 애스팩트를 적용해서 새로운 프록시 객체를 생성하는 과정**

예를 들면 A라는 객체에 트랜잭션 애스팩트가 지정되어 있다면, A라는 객체가 실행되기전 커넥션을 오픈하고 실행이 끝나면 커넥션을 종료하는 기능이 추가된 프록시 객체가 생성되고, 이 프록시 객체가 앞으로 A 객체가 호출되는 시점에서 사용됩니다. 이때의 프록시객체가 생성되는 과정을 **위빙**이라 생각하시면 됩니다.

컴파일 타임, 클래스로드 타임, 런타임과 같은 시점에서 실행되지만, Spring AOP는 런타임에서 프록시 객체가 생성 됩니다.


- - - -

<br/>

< 사용법 >

![사진](https://user-images.githubusercontent.com/57346393/115104918-d1480180-9f96-11eb-929a-4f6469dd9cc5.png)

@Around -> 어드바이스를 지정하는 애노테이션

위에서 Advice는 Aspect가 `무엇을, 언제`할지를 의미한다고 하였습니다.

`무엇`은 calculatePerformanceTime() 메소드를 의미합니다.

`언제`는 @Around가 되는데, 이는 Around를 포함하여 5가지의 타입이 존재합니다

<br/>

1) Before(이전) : 어드바이스 타겟 메소드가 호출되기전에 지정된 어드바이스 기능을 수행

2) After(이후) : **타겟 메소드의 결과에 상관없이** 타겟 메소드가 완료되면 어드바이스 기능을 수행

3) AfterReturning ( 정상적 반환 이후) : 타겟 메소드가 **성공적으로 결과 값을 반환 후에** 어드바이스 기능을 수행

4) AfterThrowing (예외 발생 이후) : 타겟 메소드가 수행 중 예외를 던지게 되면 어드바이스 기능을 수행

5) Around (메소드 실행 전후) : 어드바이스 타겟 메소드를 감싸서 타겟 메소드 호출전과 호출 후에 어드바이스 기능을 수행

=> `@Around`의 경우 **반드시 proceed() 메소드가 호출**되어야 한다는 것입니다.
proceed() 메소드는 타겟 메소드를 지칭하기 때문에 proceed 메소드를 실행시켜야만 타겟 메소드가 수행이 된다는것을 잊으면 안됩니다.


<br/>

[AOP 정리 참고 URL](https://jojoldu.tistory.com/72?category=635883)
- - - -


