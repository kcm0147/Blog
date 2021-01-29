---
title : '[SpringBoot] 기초 공부하기 ( 계속 )'
date : 2021-01-29 15:22:12
category : 'SpringBoot'
draft : false
description : "SpringBoot 기초 공부"
tags : ['SpringBoot']
---


### [SpringBoot]  기초 공부하기  (계속)


Spring Boot 강의를 들으면서 공부한 것을 정리해보려고 합니다.
강의를 들으면서 중요하다고 싶은 것들을 정리한 것이라, 설명이 많이 부족할 수 있습니다.


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

![MVC 템플릿 엔진 이미지]()

<br/>

- API

```java



```







