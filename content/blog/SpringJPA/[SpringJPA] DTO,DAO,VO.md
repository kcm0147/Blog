---
title : '[SpringJPA] VO,DTO,DAO'
date : 2021-02-24 16:53:12
category : 'SpringJPA'
draft : false
description : 'VO,DTO,DAO'
tags : ['SpringJPA']
---


Spring에 대해서 공부하면서 DTO,DAO,VO라는 개념들을 많이 접했는데 정확히 어떠한 것을 의미하는지 몰라서 이번기회에 정리를 해보았습니다.


### VO

VO는 `Value Object`라는 말로, 말그대로 데이터를 담는 객체를 의미합니다.

특히 DB에서는 테이블에서 컬럼들과 매칭하여 사용하는 것으로 많이 사용됩니다.

DAO(Data Access Object)에서 테이블에 대한 결과를 VO에 담아서 처리하는 방식을 많이 사용합니다.

`readOnly 특징`을 가지는 객체입니다. 

```java

public class Member{

    private int id;
    private String name;
    private String email;
    ...

    Setter..

}

```



### DTO

DTO는 'Data Transfer Object'라는 말로, 데이터 전송에 쓰이는 객체를 의미합니다.

VO와 같은 객체를 그대로 전송을 한다면 불필요한 정보까지 같이 전송을 해야하는 상황이 생길 수 있는데

이를 해결하고자 `정보를 전달하고자하는 것만을 DTO 객체로 만들어서 사용`합니다.

VO와는 달리 `가변의 성격`을 가진 객체입니다.


### DAO

DAO는 `Data Access Object`라는 말로, DB에 접근을 하기 위한 로직과 비즈니스 로직을 분리하기 위해서 사용하는 객체입니다.

간단하게 DB에 접속하여 데이터의 CRUD의 작업을 시행하는 클래스입니다.
