---
title : '[SpringJPA] 영속성과 준영속성 '
date : 2021-02-07 11:12:12
category : 'SpringJPA'
draft : false
description : "SpringJPA 영속성과 준영속성"
tags : ['SpringJPA']
---

### EntinyManagerFactory, EntityManager

```
* EntityMananagerFactory

- EntityManager를 생성하기 위한 Factory
- 생성을 하는데 비용이 크기 때문에 애플리케이션 전체에서 한번 생성해 공유해서 사용합니다


* EntityManager

- 생성하는데 비용이 거의 들지 않습니다
- 여러 스레드가 동시에 접근을 한다면 동시에 문제가 발생한다는 점에서 스레드 간 공유를 해서는 안됩니다
```


### 영속성과 준영속성?

영속성 컨텍스트란 `엔티티를 영구 저장하는 환경`을 일컫습니다.

EntiyManager를 이용해서 Entity를 저장하거나 조회할때 EntityManager는 영속성 컨텍스트에
Entity를 저장하고 관리합니다. 

`EntityManager.persist(Entity)` : persist(Entity)를 통해서 보통 DB에 저장한다는 의미로 많이 알고있는데 사실은 DB 저장이 아니라 영속성 컨텍스트를 통해 엔티티를 영속화 한다는 의미입니다.

이후에 EntityManager가 commit을 진행한다면 영속성 컨테스트에 저장되어있는 엔티티를 DB에 저장합니다


비영속성 코드의 예를 보겠습니다.


#### 비영속성

```java

User user = new User();
user.setName("Changmook");
user.setAge(25);

```

위의 코드는 영속성 코드와는 전혀 연관이 없습니다. 일반적인 객체생성 코드입니다.


<br/>

#### 영속성

```java

User user = new User();
user.setName("Changmook");
user.setAge(25);

EntityManager em = emf.createEntityManager(); // emf에서 Entitymanager 생성

em.persist(user); // em가 user 객체를 영속성 컨테스트에 저장한 상태


```

user 객체를 EntityManager에 의해서 영속성 컨테스트에 저장되어있는 상태입니다.

하지만 현재는 영속성 컨테스트에 저장만 되어있는 상태이지 DB에 저장이된 시점은 아닙니다.

트랙잭션의 commit이 된다면, 영속성 컨테스트의 정보들이 DB에 저장이 됩니다.

<br/>

#### 준영속성


```java

@Transactional
void upate(Item itemParam){ // itemParam은 파라미터로 넘어와서 준영속성 상태의 엔티티

    Item findItem = em.find(Item.class, itemParam.getId()); // 같은 엔티티를 조회

    findItem.setPrice(itemParam.getPrice()); // 이때의 findItem은 영속성 컨테스트에 저장되어있는 것을 조회된 엔티티이다
}

```

준영속성 상태는 DB에 저장되어있던 것이 다시 엔티티로 나왔다고 생각하면 편합니다.

itemParam은 DB에 저장되어있던 엔티티를 파라미터로 넘어 왔기 때문에 준영속성 엔티티 상태입니다.

itemParam의 값이 변한다 한들, DB의 값이 자동으로 변하지 않습니다.

다만 findItem은 Entitymanager로 인해 가져온 영속성 컨텍스트의 엔티티이기 떄문에

값이 변경되면 자동으로 Entitymanager에 의해서 DB에 값이 자동으로 변경됩니다.

다만 값이 자동으로 변경되는 시점은 EntityManager의 commit시점입니다.

commit이후 Entity를 DB에 저장되는 과정을 flush 과정이라고 합니다.


#### 준영속성 상태

영속상태와 준영속성상태의 명확한 차이점을 아는 것이 중요하다고 생각합니다.






<br/>

### 1차 캐시


![1차캐시]()


영속성 컨텍스트의 내부에는 1차 캐시가 존재합니다.

엔티티를 영속성 컨텍스트에 저장을 하는 순간 (persist) 1차 캐시에 key와 value로 저장됩니다.

그래서 em.find()가 발생됐을 때, EntityManager는 DB를 조회하는 것이 아니고 1차 캐시를 먼저 찾습니다. 

만약에 1차 캐시에 Entity가 존재하지 않는다면? 그떄 DB를 들려서 엔티티를 찾게 됩니다.

#### 동일성이 보장

1차 캐시로 인해서 엔티티의 동일성이 보장됩니다.

1차 캐시 덕분에 member1을 동일하게 조회하면, 서로 다른 엔티티가 아니고 같은 엔티티로 취급합니다

```java

User user = em.find(User.class,"mook");
User user2 = em.find(User.class,"mook");

System.out.println(user==user2) // true

```


<br/>

### 트랙잭션의 쓰기지연




### 변경감지와 병합



### 엔티티 삭제

















