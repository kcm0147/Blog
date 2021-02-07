---
title : '[GraphQL] REST API 문제점'
date : 2021-01-31 11:32:12
category : 'GraphQL'
draft : false
description : "REST API 문제점"
tags : ['GraphQL']
---

```
GraphQL 강의 공부 하면서 공부한 것을 정리해보려고 합니다.

강의를 들으면서 중요하다고 싶은 것들을 정리한 것이라, 설명이 많이 부족할 수 있습니다.

부족한 부분은 계속해서 추가할 예정입니다
```

### REST API?

GraphQL의 등장 이유를 알기 전에 `REST API`가 무엇인지 간단히 알고 가면 좋습니다.

`REST API`란 소프트웨어간 정보를 주고받는 방식이라고 생각하면 편합니다.

예를 들어, 저희가 기상청 어플로 각 지역별 날씨를 확인하고 싶으면 기상청 서버로 들어가서

날씨정보를 받아와야 하는데, 필요한 정보들의 요청이 `API` 라는 방식을 이용하여

날씨정보를 서버로부터 받을 수 있습니다.

API를 이용한 방식 중 하나인 'REST API'는 요청을 보내준 주소만으로도 대략 이것이 어떠한 정보를

요청하는 것인지 파악이 가능하다는 것입니다.

`REST API`에서는 HTTP 통신 규약을 따라 사용이 되는데

대표적으로 `GET` `POST` `PUT` `DELETE` 가 많이 사용이 됩니다

이들은 목적에 따라 사용이되는데, 

`GET`은 보통 정보를 받아오는데 사용되며

`POST`는 새로운 정보를 추가할떄 사용합니다

`PUT`은 기존의 정보를 업데이트 할 떄 사용합니다

`DELETE`는 기존의 정보를 삭제할 때 사용합니다

이중 `POST` `PUT`은 BODY에 정보를 담아, 감춰서 정보를 전송합니다.


### REST API의 한계

REST API에는 `Overfetching` `Underfetching` 이라는 문제점이 있습니다

#### 1) Overfetching

Overfetching은 원하는 정보에 비하여 더 많은 정보를 받아오는 현상을 의미합니다

예로 들어, team이라는 객체안에는 다음과 같은 정보들이 담겨져있습니다.

![사진](https://user-images.githubusercontent.com/57346393/106373163-1f972c80-63ba-11eb-92ef-44dfb244bc11.png)

이렇게 localhost:3000/api/team 이라고 GET방식으로 요청을 하면 다음과 같이 team의 정보들을 받을 수 있습니다

하지만 저희가 원하는 정보는 manager들과 office의 정보인데 team 전체의 정보를 받게되는 현상이 일어나게 됩니다



<br/>

#### 2) Underfetching

Underfetching은 한번의 요청으로 필요한 정보보다 적은 정보들을 제공받는 현상입니다

예로 들어, 위의 팀 객체 이외에 people이라는 객체에는 다음과 같은 정보들이 담겨져 있습니다

![사진2](https://user-images.githubusercontent.com/57346393/106373164-20c85980-63ba-11eb-8821-32847b5470e6.png)

만약 저희가 각 manager들과 함께 속한 팀원들의 first_name과 last-name의 정보들을 원하지만

`REST API`를 사용 했을 때는, 먼저 위에서 team객체의 manager들이 속한 팀의 id들을 한번의 요청으로 가져온 후

두번째로 people 객체에 위에서 얻은 id로 다시 한번 요청을 해야지만, 원하는 정보를 얻을 수 있게 됩니다.


<br/>

Overfetching, Underfetching의 문제점을 해결할 수 있는 방안이 `GraphQL`입니다

`GraphQL`은 한번의 요청으로 사용자가 원하는 정보만을 가져올 수 있습니다

이와 같은 장점으로 `GraphQL`을 한번 공부해보려고 합니다

