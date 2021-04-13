---
title : '[SpringBoot] Bean'
date : 2021-04-13 15:22:12
category : 'SpringBoot'
draft : false
description : "Bean 이란"
tags : ['Spring','Java']
---

<br/>

Spring관점에서의 Bean이란 Spring IOC 컨테이너가 관리하는 자바 객체를 의미합니다.

우리가 new 연산자로 생성했을 때의 그 객체는 빈이라고 할 수 없습니다.

ApplicationContext.getBean()으로 얻어질 수 있는 객체를 빈이라고 하는데 즉 스프링 컨테이너에 의해 생성되는 객체를 빈이라고 합니다.

Spring에서의 빈은 ApplicationContext가 알고있는 객체, 즉 ApplicationContext가 만들어서 담고있는 객체를 의미합니다.

Spring IOC 컨테이너에 빈을 등록하는 방법은 두가지가 있습니다.

**1) Component Scanning**

**2) Bean 설정파일에 직접 빈을 등록하는 방법**

- - - -

<br/>

### 1) Component Scanning 방법

ComponentScan과 Component의 차이점에 대해 먼저 살펴보겠습니다

`@ComponentScan` 어노테이션은 어느 지점부터 컴포넌트를 찾으라고 알려주는 역할을 하고, `@Component`는 실제로 찾아서 빈으로 등록할 클래스를 의미합니다.

Spring IOC 컨테이너가 IOC 컨테이너를 만들고 그 안에 빈으로 등록할 때 사용하는 인터페이스를 `라이프 사이클 콜백`이라고 부릅니다.

이 라이프 사이클 콜백에는 `@Component` 어노테이션을 찾아서 이 어노테이션을 붙어있는 모든 클래스의 객체를 생성해서 빈으로 등록하는 작업을 수행하는 어노테이션 프로세서가 등록되어 있습니다.

바로 위에서 말하는 프로세스가 바로 클래스에 `@ComponentScan` 애노테이션이 붙어있는 클래스를 의미합니다.


<br/>

### 2) 빈 설정파일에 직접 빈을 등록하는 방법

`@Configuration` 애노테이션을 붙인곳에 `@Bean` 애노테이션을 사용해서 직접 빈을 정의할 수 있습니다.

빈을 등록하는  `@Configuration` 애노테이션에도 `@Component`가 붙어있기 때문에 `@ComponentScan`의 스캔대상이 되기 때문에 빈으로 등록될 수 있습니다.

- - - -

<br/>

### JavaBean?

자바 빈 규약에 따르는 클래스를 자바빈이라고 부릅니다.

자바빈은 데이터 표현을 목적으로 하는 클래스입니다.

```
자바 빈 규약

1) 클래스는 인자가 없는 기본생성자를 갖는다
2) 클래스의 멤버 변수는 프로퍼티(ProPerty)라고 하며 Private접근제한자를 가져야한다
3) 클래스의 Property들은 Geeter / Setter 들을 통해 접근할 수 있어야 한다
4) 자바 빈 클래스는 패키징이 되어야 한다

```

프로퍼티는 자바빈에 저장되어 있는 값을 의미하며, 메서드 이름을 사용해서 프로퍼티의 이름을 결정하게 됩니다.

읽기 전용 프로퍼티 - get 또는 is만 존재(Boolean)
읽기 / 쓰기 전용 프로퍼티 - get/set/is/set 다 존재




