---
title : '[SpringJPA] 연관관계 매핑기초'
date : 2021-02-18 22:12:12
category : 'SpringJPA'
draft : false
description : '연관관계 매핑기초(단방향 연관관계, 양방향 연관관계, 양방향 연관관계 편의메소드 정의)'
tags : ['SpringJPA']
---


### 연관관계 종류

객체의 연관관계는 참조(주소)값으로 연관관계를 맺고, 테이블의 연관관계는 외래키로 연관관계를 맺는 차이점이 있습니다.

연관관계의 종류는 `다대일(@ManyToOne)` `일대다(@OneToMany)` `다대다(@ManyToMany)` `일대일(@OneToOne)`가 있습니다.

엔티티를 매핑하기 위해서는 엔티티간의 연관관계에 따라 위의 4가지의 어노테이션 중 하나를 선언해주어야합니다.

`@JoinColumn(name="외래키")` 어노테이션은 엔티티간의 외래키를 매핑할 떄 사용합니다. 

<br/>

### 단방향 연관관계

단방향 연관관계는 말그대로 A Entity -> B Entity로만 참조가 가능한 관계입니다.

Member와 Team을 예로들어서 설명하면, Member와 Team 다대일(ManyToOne) 관계입니다.  

Member마다 Team의 외래키를 가지고 있어야만, Team의 참조가 가능하게 됩니다.

```java

class Team{

    @ID
    @Column(name="TEAM_ID")
    private Long id;

}
```


```java

class Member{

    ...

    @MantyToOne
    @JoinColumn(name="TEAM_ID")
    private Team team;

}
```

Member는 `TEAM_ID` 라는 이름의 column을 외래키로 사용하여 연관관게를 맺고있습니다.



<br/>

### 양방향 연관관계

양방향 연관관계는 A Entity -> B Entity, B Entity -> A Entity 이렇게 서로서로 참조가 가능한 관계입니다.

단방향 연관관계와의 차이점을 코드로 보겠습니다. 

Member Entity와 Team Entity를 예로들겠습니다.


```java

class Team{

    @ID
    @Column(name="TEAM_ID")
    private Long id;

    @OneToMany(mappedBy="team")
    private List<Member> members = new ArrayList<Member>();
}
```

```java

class Memeber{

    ...

    @ManyToOne
    @JoinColumn(name="TEAM_ID")
    private Team team;
}


```

위의 단방향 연관관계때와는 달리, Team 엔티티에서 Member 엔티티의 정보를 참조할 수 있도록 List<Member> 자료형 리스트를 추가하였습니다.

리스트를 추가함으로서 Team 쪽에서 Member의 객체를 참조할 수 있습니다.


<br/>


### 연관관계의 주인

연관관계의 주인은 양방향 연관관계에서 매우 중요하다고 생각합니다.

두 객체의 엔티티는 서로를 참조할 수 있지만, 외래키는 한개로 설정이 되어있습니다. 둘 중 어디를 기준으로 엔티티를 관리해야하는지 정하는 것이 좋습니다.

이를 정하기 위해서 mapped 속성을 사용해서 연관관계의 주인을 설정을 합니다.

연관관계의 주인만이 `데이터베이스 연관관계와 매핑되고 외래키를 관리(등록,수정,삭제)를 할 수 있습니다. 반면에 주인이 아닌 쪽은 읽기만 할 수 있습니다`

* 주인은 MappedBy 속성을 사용하지 않습니다.

* 주인이 아니면 mappedBy 속성을 사용해서 연관관계 주인을 지정해야만 합니다.

연관관계의 주인을 정하는 것은 *외래키의 주인을 설정하는 것*과 같습니다.

위의 예를 다시 본다면, Member와 Team의 관계에서 외래키를 가지고 있는 엔티티는 Member이기 때문에 Member가 연관관계의 주인이 되는 것이 좋습니다.

```java

class Team{

    @ID
    @Column(name="TEAM_ID")
    private Long id;

    @OneToMany(mappedBy="team")
    private List<Member> members = new ArrayList<Member>();
}
```

---

### 양방향 연관관계의 저장


양방향 연관관계에서 엔티티를 저장할때는 단방향 연관관계떄 처럼 em.persist()로 그냥 엔티티를 저장해서는 안됩니다.

Team이 Member의 외래키가 되기 떄문에, Member를 저장하기 위해서는 *먼저 Team Entity를 저장해야만 합니다*

또한 Member 엔티티를 EntityManger로 저장을 하기전에 `member.setTeam(team1)`을 이용하여 연관관계를 설정해주어야만 합니다.

```java

Team team=new Team("팀이름");
em.persist(team1);

Member member = new Member();
member.setTeam(team1); // 연관관계설정
em.persist(member);

```

여기서 궁금한점이 생길 수 있습니다.

Q. team 객체의 List<Member>에도 엔티티 연관관계를 추가해주어야 하는 것이 아닌가??

양방향 연관관계는 연관관계의 주인이 외래키를 관리하기때문에, 주인이 아닌 곳에서 입력된 값은 데이터베이스에 저장되지 않고 무시되고 자동으로 저장이됩니다.


*하지만, 실제로는 객체 관점에서 양쪽방향에 모두 값을 입력해주는 것이 좋습니다.*

양쪽 방향 모두 값을 입력하지 않으면 JPA를 사용하지 않는 테스트에서는 심각한 문제가 생길 수 있기 떄문입니다.

```java

Team team=new Team("팀이름");
em.persist(team1);

Member member = new Member();
member.setTeam(team1); 
team1.getMembers().add(member); // 이렇게 team1에도 연관관계를 추가해주는 코드를 작성하는 것이 좋습니다.
em.persist(member);

```

#### 연관관계 편의 메소드 정의하기

위에서 언급한 것처럼 엔티티간의 연관관계를 서로 설정을 해주어야하는데, 실수로 둘 중 하나만 호출해서 양방향 연관관계에 오류가 생기는 것을 방지하기 위해서

하나의 메소드로 만들어서 사용하는 것이 좋습니다.

연관관계의 주인인 Member쪽에 연관관계를 설정하는 부분을 추가하였습니다.

```java

public void setTeam(Team team){
    this.team=team;
    team.getMembers().add(this);
}
```

이렇게 하나의 메소드로 양방향 관계를 설정하는 메소드를 *연관관계 편의 메소드*라고 합니다.

<br/>

### 연관관계 편의 메소드 정의시 주의사항

위에서 설명했던 연관관계 편의메소드의 하나의 오류가 있습니다.

```java

member.setTeam(teamA);
member.setTeam(teamB);

Member findMember = teamA.getMembers().get(0);

```

이렇게 실행을 하게 되면 teamA의 memberlist에는 여전히 member가 포함되어있는 오류가 있습니다.

분명 member가 teamB로 속했음에도 불구하고 teamA에는 member가 제거되지 않았습니다.

이를 방지하기 위해서 `setTeam` 메소드를 다음과 같이 정의해주는 것이 좋습니다.


```java

public void setTeam(Team team){
    
    if(this.team!=null){
        this.team.getMembers().remove(this); // 원래 속해있던 team에서 member 객체를 제거해줍니다.
    }

    this.setTeam(team);
    team.getMembers().add(this);
}


```


*이렇게 단방향 연관관계, 양방향 연관관계에 대해서 알아보았습니다. 양방향 연관관계에서 주인은 되도록 외래키가 있는 쪽을 주인으로 설정해주는 것이 좋습니다*























