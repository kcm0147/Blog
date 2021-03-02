---
title : '[SpringBoot] 기초 공부하기'
date : 2021-01-29 15:22:12
category : 'SpringBoot'
draft : false
description : "SpringBoot 기초 공부"
tags : ['SpringBoot']
---



Spring Boot 강의를 들으면서 공부한 것을 정리해보려고 합니다.

강의를 들으면서 중요하다고 싶은 것들을 정리한 것이라, 설명이 많이 부족할 수 있습니다.

부족한 부분은 계속해서 추가할 예정입니다

사진은 김영한 개발자님의 강의 사진을 사용하여 정리하였습니다


<br/><br/>

* MVC ?

Model, View, Controller의 약어


<br/>

- Controller 

```java

@GetMapping("hello-mvc")
public String helloMvc(@RequestParam("name") String name, Model model) {
    model.addAttribute("name", name); // parameter로 넘겨온 name
    return "hello-template";
}

```

<br/>

- View

```html

<html xmlns:th="http://www.thymeleaf.org"> 
<body>
<p th:text="'hello ' + ${name}">hello! empty</p> 
</body>

```

http://localhost:8080/hello-mvc?name=spring로 Get방식으로 접속을 하면 

Controller에서 hello-mvc template을 `View Resolver`가 찾아서 처리해줍니다.

이때 Controller가 template를 처리할때 넘겨준 name 쿼리값(예시에서는 spring) 을 Template에 전달해줍니다.

![MVC 템플릿 엔진 이미지](https://user-images.githubusercontent.com/57346393/106349250-f0c47c00-630f-11eb-9d4b-9d8e624c146c.png)

<br/>

- API

```java

@Controller
  public class HelloController {

    @GetMapping("hello-api")
    @ResponseBody
    public Hello helloApi(@RequestParam("name") String name) {
        Hello hello = new Hello(); 
        hello.setName(name); 
        return hello;
    }
}

```

`@ResponsBody` 를 사용하면 viewRosolver를 사용하지 않습니다.

대신에 HTTP의 Body에 문자 내용을 직접 반환을 합니다

만약 에 `http://localhost:8080/hello-api?name=spring`으로 접속을 한다면

Hello의 객체에 name이 Spring으로 저장되어 JSON형식으로 반환이 됩니다.

<br/><br/>

`@ResponseBody` 사용원리


![image](https://user-images.githubusercontent.com/57346393/106349432-1f8f2200-6311-11eb-9b50-0d7714138abd.png)

HTTP의 Body에 문자 내용을 직접 반환

viewSolver 대신에 `HttpMessageConverter`가 작동합니다

기본 문자처리는 `StringHttpMessageConverter`가 처리한다면, 객체처리는 `JasonConverter`가 처리합니다.



<br/><br/>

### < 일반적인 웹 애플리케이션 계층 구조 >

1. 컨트롤러 : 웹 MVC의 컨트롤러 역할입니다

2. 서비스 : 핵심 비즈니스 로직을 구현하는 부분으로서 웹 어플리케이션의 기능부분을 담당하는 곳입니다

3. 리포지토리 : DB에 접근하거나 도메인 객체를 DB에 저장 및 관리하는 역할입니다

4. 도메인 : 비즈니스 도메인 객체를 가지고 있느 부분입니다, 주로 도메인 객체가 DB에 저장되고 관리됩니다

![계층구조](https://user-images.githubusercontent.com/57346393/106350202-5a945400-6317-11eb-9f8f-e68ba84258d7.png)


DB가 선정되지 않아서 개발을 할 때 인터페이스로 구현클래스를 변경할 수 있도록 설계합니다

데이터 저장소는 메모리 기반을 사용할 수도 있으며, RDB 등 다양한 저장소를 사용할 수 있습니다.

![인터페이스 계층구조](https://user-images.githubusercontent.com/57346393/106350203-5bc58100-6317-11eb-9408-68b3cb687066.png)



<br/><br/>

### 테스트 케이스

스프링에서 개발한 기능을 실행해서 테스트 할 때는 자바의 Main 메서드를 통해서 실행하거나

컨트롤러를 통해서 해당 기능을 실행하지만 이는 시간이 오래걸리기 떄문에 JUnit이라는 프레임워크로

테스트를 실행해서 문제를 해결합니다

<br/>

```
test 코드를 작성할 때

//given

//when

//then

형식으로 테스트 코드를 작성하는 것이 좋습니다


```

<br/>

테스트코드에서 한번에 여러번의 테스트를 실행한다면 메모리 DB에 직전 테스트의 결과가 남을 수 있습니다

이렇게 되면 다음 이전 테스트 때문에 다음 테스트가 실패할 수 있는데, `@AfterEach`를 사용하면 각 테스트가 종료될 때마다 선언된 기능을 실행시킬 수 있습니다.

메모리 DB에 저장된 데이터를 삭제하도록 선언하였습니다

이를 토대로 본다면 테스트는 각각 독립적으로 실행되는 것이 좋습니다. 순서에 의존관계가 있는 것은 좋지 않습니다

<br/><br/>

### 스프링 빈과 의존관계

```java

@Controller
  public class MemberController {
      private final MemberService memberService;

        @Autowired
        public MemberController(MemberService memberService) {
            this.memberService = memberService; }
        }
}

```
생성자에 `@Autowired`라는 것이 있으면 스프링이 연관된 객체를 스프링 컨테이너에 찾아서 넣어줍니다

이렇게 객체 의존관계를 외부에서 넣어주는 것을 DI(Dependency Injection) 의존성 주입이라고 합니다

<br/>

위에서는 MemeberService를 Controller와 자동으로 연결시키는 컷을 보여주는데 

MemeberService의 DI를 위해서는 아래와 같이 MemeberService 클래스에 `@Service` 애노테이션을 선언해주어야 합니다.

```java

@Service
    public class MemberService {
        private final MemberRepository memberRepository;

        @Autowired
        public MemberService(MemberRepository memberRepository) {
            this.memberRepository = memberRepository; }
        }
}


```

`@Component` 애노테이션이 있으면 스프링 컨테이너안에 빈으로 등록이 됩니다.

` 아래의 세가지 애노테이션이 스프링 빈으로 자동이 등록될 수 있는데 그 이유로는

* `@Controller`
* `@Service`
* `@Repository` 가 `@Component` 애노테이션을 포함하기 때문입니다.

![사진3](https://user-images.githubusercontent.com/57346393/106350204-5c5e1780-6317-11eb-9095-1fd9d132d253.png)

컨테이너 내에서 보통 컨트롤러 - 서비스 - 레포지토리로 자동연결을 진행합니다


* 참고로 생성자가 1개만 있으면 `@Autowried` 는 생략할 수 있습니다




<br/>

### 스프링 빈을 등록하는 방법 2가지

1. 앞서 설명 드렸던 컴포넌트 스캔과 자동 의존관계를 설정하는 방법 - `@Autowired` 사용

2. 자바 코드로 직접 스프링 빈을 등록하는 방법


이번에는 자바 코드로 직접 스프링 빈을 등록하는 방법을 알아보겠습니다

앞에서 선언 했던 `@Service` `@Repository` `@Autowired` 애노테이션을 제거하고 진행합니다

SpringConfig 파일을 하나 생성해서 `@Confiuration` 애노테이션을 등록합니다

그리고 다음과 같이 `@Bean` 애노테이션을 직접 등록을 해줍니다

`@Bean`으로 인해서 스프링 컨테이너에 빈으로 직접 등록이 됩니다

<br/>

```java

@Configuration
    public class SpringConfig {

        @Bean
        public MemberService memberService() {
            return new MemberService(memberRepository());
        }

        @Bean
        public MemberRepository memberRepository() {
          return new MemoryMemberRepository();
        }
}

```

위에서 언급했듯이 보통 스프링 컨테이너는 Controller - Service - Repository 순으로 연결합니다

위 코드에서도 meberService의 생성자에 `memberRepository()`를 주입을 해주어야 합니다

직접 Bean을 등록하면 좋은점은 앞에서 스프링의 DI를 사용할 때 기존 코드를 전혀 손대지 않고, 설정만으로 구현 클래스를 변경할 수 있다는 점 입니다.

예로들면 메모리 데이터 저장소를 JDBC 저장소로 바꾸려고 한다면, SpringConfiguartion 파일에서 '@Bean' 애노테이션을 메모리 레포지토리 클래스에서 JDBC 레포지토리 클래스로 변경만 하면 됩니다

<br/><br/>

---

### JPA


JPA는 기존의 JDBC API에서 사용한 반복코드는 물론이고 기본적인 SQL문도 JPA가 직접 만들어서 실행해줍니다

JPA를 사용하면 SQL과 데이터 중심의 설계에서 객체 중심의 설계로 패러다임을 전환할 수 있습니다!

JPA는 따로 Post를 만들어서 하나씩 공부한 내용을 추가할 예정입니다



