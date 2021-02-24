---
title : '[SpringJPA] 다대다 매핑 표현'
date : 2021-02-20 16:53:12
category : 'SpringJPA'
draft : false
description : '다대다(ManyToMany) 매핑'
tags : ['SpringJPA']
---


### 다대다[N:N] 매핑 기초


관계형 데이터베이스에서는 일반적으로 정규화된 테이블 2개로 다대다 관계를 표현할 수 없습니다.

그래서 보통 다대다 관계를 일대다, 다대일 관계로 풀어내는 *연결테이블*을 사용해야만 합니다.

![스크린샷 2021-02-20 오후 5 25 40](https://user-images.githubusercontent.com/57346393/108590704-47215980-73a8-11eb-8128-edbe6b052b1b.png)

<br/>

하지만, 객체의 입장에서는 테이블과는 달리 다대다 관계를 만들 수 있습니다.

`@ManyToMany` 어노테이션을 사용하고 `@JoinTable` 어노테이션을 이용해서 다대다 관계를 매핑할 수 있습니다.

![스크린샷 2021-02-20 오후 5 25 45](https://user-images.githubusercontent.com/57346393/108590708-48eb1d00-73a8-11eb-8c3d-66330c20a804.png)


<br/>

### 다대다 단방향

```java

@Entity
public class Member {
    ...
    
    @ManyToMany
    @JoinTable(name = "member_product", joinColumns=@JoinColumn(name="MEMBER_ID"), inverseJoinColumns=@JoinColumn(name= "PRODUCT_ID"))
    private List<Product> products = new ArrayList<>();
    
    ...
}

```


```java

@Entity
public class Product {
    
    @Id @Column(name = "PRODUCT_ID")
    private String id;

    private String name;
    
    ...
}

```

이렇게 `@ManyToMany`와 `@JoinTable`을 사용해서 연결 테이블을 바로 매핑할 수 있습니다.

회원과 상품을 연결하는 회원_상품 엔티티를 따로 선언하지 않고, 매핑할 수 있습니다.

`@JoinTalbe`에는 name을 선언해서 연결테이블 이름을 정의하고, `joinColumns`는 회원과 매핑할 조인 컬럼 정보를 지정해주어야합니다.

`inverseJoinColumns`에는 반대 방향인 상품과 매핑할 조인 컬럼 정보를 지정해주어야 합니다.


### 다대다 양방향

위의 다대다 단방향 (Member->Prouct 참조) 에서 양방향 참조로 변환하기 위해서는

Product Entity에도 Member Entity를 참조할 수 있는 객체를 추가해주어야 합니다.

```java

public class Product{

    @ID
    private String id;

    @ManyToMany(mappedBy= "products") // 이렇게 역방향 관계를 추가해줍니다.
    private List<Member> members;
}


```

<br/>


### 다대다 매핑의 한계 극복

`@ManyToMany` 를 사용하면 연결테이블을 자동으로 매핑해주기 때문에 편리합니다.

다만, 실무에서는 잘 사용하지 않습니다.

그 이유로는 조인 테이블 자체에 다양한 정보들이 추가될수가 있는데 가령, 주문시간이나 주문수량과 같은 데이터들이 들어갈 수 있기 때문입니다.

그래서 이러한 한계점을 극복하고자 `@ManyToMany`를 사용하지않고 *연결 테이블을 하나의 엔티티로 만들어서 매핑*을 시켜야합니다.

즉 `@ManyToMany`를 각각 일대다, 다대일 관계로 맺어줍니다.


#### 양방향, 단방향 연결 분리


<br/>

![스크린샷 2021-02-20 오후 5 51 58](https://user-images.githubusercontent.com/57346393/108590709-4ab4e080-73a8-11eb-9116-0f2d3c7e653c.png)

<br/>

* Member 엔티티

```java

@Entity
public class Member {
    ...
        
    @OneToMany(mappedBy = "member")
    private List<MemberProduct> memberProducts = new ArrayList<>();
​
    ...
}
```

이렇게 Member에는 MemberProduct 엔티티를 참조할 수 있는 List를 포함해야합니다.

<br/>

* Product 엔티티

```java

@Entity
public class Product {
​
    @ID @Column(name="PRODUCT_ID")
    private String id;
    
    ...
}


```

위의 그림에서는 회원_상품엔티티가 상품엔티티만을 참조할 수 있으므로 Product엔티티는 연관관계를 추가하지 않았습니다.

이때의 회원_상품엔티티는 다음과 같습니다.

```java

@Entity
@IdClass(MemberProductId.class)
public class MemberProduct{

    @ID
    @ManyToOne
    @JoinColumn(name ="MEMBER_ID")
    private Member member;

    @ID
    @ManyToOne
    @JoinColumn(name ="PRODUCT_ID")
    private Product product;

    private int orderAmount;
    private int ...

}

```

회원_상품 엔티티를 보면 기본키를 매핑하는 `@ID`와 외래키를 매핑하는 `@JoinColumn`을 동시에 사용했기 때문에 기본키 + 외래키를 한번에 매핑하였습니다. 

그리고 둘 이상의 기본키를 구성하고있기 떄문에 `@IdClass` 어노테이션을 사용하여 복합키를 매핑하였습니다.

복합키를 매핑하기 위해서는 따로 식별자 클래스를 선언해주어야만 합니다.

`@IdClass`를 사용하는 방법 과 `@EmbeddedId`를 사용하는 방법이 있는데, 다음에 자세히 공부하도록 하겠습니다.

`@IdClass`에 선언된 클래스는 다음과 같이 구성되어있습니다.

```java

public class MemberProductId implements Serializble{

    private String member;
    private String product;

    //hashCode and equals

    @Override
    public boolean equals(){...}


}


```

* 복합키는 별도의 식별자 클래스로 만들어야 합니다

* Serializble을 구현해야 합니다

* 기본생성자가 있어야 하며, 식별자 클래스는 public이어야 합니다


<br/>

다만 회원_상품엔티티와 상품엔티티를 양방향관계의 참조를 할 수 있도록 할려면 아래와 같이 List를 추가해주면 됩니다.

```java

@Entity
public class Product {
​
    ...
​
    @OneToMany(mappedBy = "product")
    private List<MemberProduct> memberProducts = new ArrayList<>();
    
    ...
}


```


위에서 기본키를 두개이상 사용하다보니 복합키를 이용하여 회원_상품엔티티를 선언하였는데,

새로운 기본키하나를 두고 회원과 상품의 외래키를 둠으로서, 엔티티를 선언해도 됩니다.

```java

@Entity
public class MemberProduct{

    @Id @GeneratedValue
    @Column(name="ORDER_ID")
    private Long id; // 이렇게 따로 기본키를 선언해줍니다.


    @ManyToOne
    @JoinColumn(name ="MEMBER_ID")
    private Member member;

   
    @ManyToOne
    @JoinColumn(name ="PRODUCT_ID")
    private Product product;

    private int orderAmount;
    private int ...

}


```

기본키를 한개 사용하기 때문에 복합키를 따로 클래스로 선언하지 않아도 됩니다.

다대다 관계를 일대다 다대일 관계로 풀어내기 위해 연결 테이블을 만들 때 식별자를 어떻게 구성할지 선택해야합니다.

* `식별 관계` : 받아온 식별자를 기본키 + 외래키로 사용합니다. 이때 복합키를 선언해주어야 합니다.

* `비식별 관계` : 받아온 식별자는 외래키로만 사용하고 새로운 식별자를 추가합니다.


다음에는 복합키, 상속키와 같은 고급매핑에 대해서 공부해보겠습니다.







