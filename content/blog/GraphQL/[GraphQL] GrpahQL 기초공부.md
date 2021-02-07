---
title : '[GraphQL] 기초 공부하기'
date : 2021-01-31 12:10:12
category : 'GraphQL'
draft : false
description : "GraphQL 기초 공부하기"
tags : ['GraphQL']
---

GraphQL의 query, mutation의 기초를 공부하였습니다

### Query 루트 타입

```js

type Query {
        teams: [Team]
}
type Team {
        id: Int
        manager: String
        office: String
        extension_number: String
        mascot: String
        cleaning_duty: String
        project: String
}

```

쿼리의 루트 타입에는 자료요청에 사용될 쿼리들을 정의합니다

teams라는 쿼리문이 들어오게되면 teams는 `Team`이라는 객체 배열들을 return 해주도록 지정하였습니다

Team이라는 데이터 타입을 반환하기 위해서는 Team 객체를 선언해주어야 합니다

<br/>

```js

const resolvers = {
  Query: {
    teams: () => database.teams
  }
}

```

위에서 Query의 데이터 형태를 저장하였다면 실질적으로 Query문이 실행되는 곳이 바로 `resolver` 부분입니다

`Query`란 object의 항목들로 데이터를 반환하는 함수를 선언하였는데 여기서 teams쿼리를 사용하면 database.teams를 반환해주도록 지정하였습니다


###