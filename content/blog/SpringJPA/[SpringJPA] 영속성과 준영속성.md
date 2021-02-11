---
title : '[SpringJPA] 영속성과 준영속성 '
date : 2021-02-07 11:12:12
category : 'SpringJPA'
draft : false
description : "SpringJPA 영속성과 준영속성"
tags : ['SpringJPA']
---

**영속성 준영속성 비영속성의 차이점을 비교하고 정리하였습니다**

<br/>

### EntinyManagerFactory, EntityManager

```
* EntityMananagerFactory

- EntityManager를 생성하기 위한 Factory
- 생성을 하는데 비용이 크기 때문에 애플리케이션 전체에서 한번 생성해 공유해서 사용합니다


* EntityManager

- 생성하는데 비용이 거의 들지 않습니다
- 여러 스레드가 동시에 접근을 한다면 동시에 문제가 발생한다는 점에서 스레드 간 공유를 해서는 안됩니다
```

<br/>

### 영속성과 준영속성?

영속성 컨텍스트란 `엔티티를 영구 저장하는 환경`을 일컫습니다.

EntiyManager를 이용해서 Entity를 저장하거나 조회할때 EntityManager는 영속성 컨텍스트에
Entity를 저장하고 관리합니다. 

`EntityManager.persist(Entity)` : persist(Entity)를 통해서 보통 DB에 저장한다는 의미로 많이 알고있는데 사실은 DB 저장이 아니라 영속성 컨텍스트를 통해 엔티티를 영속화 한다는 의미입니다.

이후에 EntityManager가 commit을 진행한다면 영속성 컨테스트에 저장되어있는 엔티티를 DB에 저장합니다


비영속성 코드의 예를 보겠습니다.

<br/>

### 비영속성

```java

User user = new User();
user.setName("Changmook");
user.setAge(25);

```

위의 코드는 영속성 코드와는 전혀 연관이 없습니다. 일반적인 객체생성 코드입니다.


<br/>

### 영속성

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

### 준영속성


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


<br/>

### 준영속성과 영속성 비교

영속상태와 준영속성상태의 명확한 차이점을 아는 것이 중요하다고 생각합니다.



#### 영속상태

영속성 컨텍스트의 1차캐시에 올라간 상태가 영속 상태라고 합니다.

EntityManager가 persist()로 인해 영속성 컨텍스트로 저장한 상태도 영속 상태이지만 em.find()로 조회를 할 때, 

**영속성 컨텍스트 1차 캐시에 없어서 DB에서 조회해 1차 캐시에저장한 상태도 영속 상태**입니다.

```java

User user = em.find(User.class,100L); // entity를 db에서 가져오기 때문에 영속성 컨텍스트

user.setName("mook"); // 자동으로 Dirty Checking이 일어나서 update 쿼리를 날린다.

transcation.commit();

```

Entity를 DB에서 가져와서 영속성 엔티티가 되었는데, mook으로 이름을 바꾸게 되면 **Dirty Checking** 으로 인해 update 쿼리를 날리게 됩니다.

그 후에 commit으로 인해 update된 내용을 영속성 컨텍스트에 저장하게 됩니다.

<br/>


#### 준영속 상태

준영속 상태란 영속상태의 Entity가 컨텍스트에서 분리된 상태를 일컫습니다.

```java

User user = em.find(User.class,100L);
user.setName("mook");

em.detach(user);

transcation.commit();


```

<br/>

위의 코드와는 달리 `detach`로 인해서 user 엔티티만 준영속상태로 전환을 시킵니다.

또한 준영속 상태는 임의로 만들어낸 엔티티에 기존 식별자만 가지고 있으면 `준영속 엔티티`라고도 볼 수 있습니다.

가령 아래와 같은 예를 의미합니다.

```java

public User createUser(Long userId){
    User user = new User();
    user.setName("mook");
    user.setName(userId); //userID를 set하는 순간 준영속 엔티티라고 볼 수 있습니다.
}   

```

준영속 엔티티는 영속성 상태와는 달리 데이터가 변경되도 자동으로 트랜잭션이 업데이트 쿼리를 보내지 않습니다.



<br/>

### 1차 캐시


![1차캐시](https://user-images.githubusercontent.com/57346393/107151264-f885bf80-69a4-11eb-8447-6d3c886b1aaf.png)



영속성 컨텍스트의 내부에는 1차 캐시가 존재합니다.

엔티티를 영속성 컨텍스트에 저장을 하는 순간 (persist) 1차 캐시에 key와 value로 저장됩니다.

그래서 `em.find()`가 발생됐을 때, EntityManager는 DB를 조회하는 것이 아니고 1차 캐시를 먼저 찾습니다. 

만약에 1차 캐시에 Entity가 존재하지 않는다면? 그떄 DB를 들려서 엔티티를 찾게 됩니다.

### 동일성 보장

1차 캐시로 인해서 엔티티의 동일성이 보장됩니다.

1차 캐시 덕분에 member1을 동일하게 조회하면, 서로 다른 엔티티가 아니고 `같은 엔티티로 취급`합니다

```java

User user = em.find(User.class,100L);
User user2 = em.find(User.class,100L);

System.out.println(user==user2) // true

```


<br/>

### 트랙잭션의 쓰기지연

트랜잭션 내부에서 `persist()`가 일어날 때, 엔티티들을 1차 캐시에 저장한 후, 

논리적으로 쓰기 지연 SQL 저장소에 INSERT 쿼리들을 생성해 쌓아 놓습니다.

SQL은 `commit()`을 하는 시점에서 DB에 저장소의 쿼리들을 보내게 됩니다.

그런데 저장소의 쿼리를 보내는 것은 `commit()`이 아니라 `flush()`가 하게 됩니다.

즉 commit을 하는 시점에서 flush()를 같이하게 되는 것이죠 !

만약에 `flush()`를 직접 호출을 하게 되면 `commit()`을 하는 시점 이전에 SQL 쿼리를 데이터베이스에 저장하게 됩니다.

flush는 `직접 호출` `commit() 이후 자동으로 호출` `JPQL 쿼리 실행시 자동 호출` 세가지 방식으로 실행이 됩니다.

단, `flush()`를 호출한다 한들 1차캐시는 삭제 되지 않습니다 ! **엔티티들은 그대로 남아**있습니다.


---

**주의**

Entity의 영속상태가 되려면 식별자(ID)를 필요로 합니다.` persist()`를 호출한다 한들, `INSERT`

Query문이 데이터베이스로 전송되지 않고 쓰기지연을 한다고 배웠지만, 

만약 식별자가 `IDENTITY 식별자 전략` 이라면 `persist()`를 호출하는 즉시 `INSERT`를 데이터베이스에 전송이 됩니다 !! 

즉 쓰기지연이 작동하지 않는다는 것입니다.


---

<br/>

### 엔티티 삭제

엔티티를 삭제하는 방법으로는 아래와 같습니다.

```java

User user = em.find(User.class,100L);

em.remove(user); // 엔티티 삭제


```


<br/>


### 변경감지와 병합

엔티티의 데이터 변경감지 및 병합방법을 소개하겠습니다.

실무에서는 보통 데이터 변경감지 기능을 사용하여 데이터를 수정합니다.

아래는 **변경감지** 입니다.

```java

@Transactional
void update(Item itemParam) { //itemParam: 파리미터로 넘어온 준영속 상태의 엔티티
    Item findItem = em.find(Item.class, itemParam.getId()); // 같은 엔티티를 조회 -> 영속성 엔티티
    findItem.setPrice(itemParam.getPrice()); //데이터를 수정한다. 

}

```

영속성 컨텍스트에서 엔티티를 다시 조회한 후에 데이터를 수정하는 방법으로, 트랙잭션의 커밋시점에서

변경을 감지하여 데이터베이스에 Update SQL을 실행하여 값을 수정합니다.


아래는 **병합** 입니다.


```java

@Transactional
void update(Item itemParam) { //itemParam: 파리미터로 넘어온 준영속 상태의 엔티티

        mergeItem = em.merge(item);
}

```

병합의 동작 방식은 아래와 같습니다.




1. `merge()`를 실행합니다

2. 파라미터로 넘어온 준영속 엔티티의 식별자 값으로 1차 캐시에서 엔티티를 조회합니다

    이때 1차캐시에 엔티티가 없으면 데이터베이스에서 엔티티를 조회 후, 1차 캐시에 저장합니다.

3. 조회한 영속 엔티티에 item엔티티의 값을 채워넣습니다.

4. merge 후 반환된 mergeItem을 반환합니다. 이때의 `mergeItem은 영속상태 엔티티`입니다.























