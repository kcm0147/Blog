---
title : '[Basics] 웹서버와 WAS'
date : 2021-07-07 16:22:12
category : 'Basics'
draft : false
description : "웹서버와 WAS의 차이점에 대해서"
tags : ['Basics']
---

<br/>


### 웹서버

**웹서버와 WAS(Web Application Server**)의 차이점에 대해서 알아보면

웹서버의 클라이언트가 웹브라우저에 어떠한 페이지 요청을 하면 웹서버에서 그 요청을 받아서 정적컨텐츠를 제공하는 서버를 의미합니다.

대표적인 웹서버의 경우 **Apache 웹서버**를 의미하는데, 근데 단순 정적컨텐츠만을 제공하는 것은 아닙니다.

웹서버가 동적 컨텐츠를 요청 받으면 WAS에게 해당 요청을 넘겨주고, WAS에서 처리한 결과를 클라이언트에게 전달해주는 역할도 해줍니다.

<br/>

### WAS

WAS의 정의로는 인터넷 상에서 HTTP 프로토콜을 통해 사용자 컴퓨터나 장치에 애플리케이션을 수행해주는 미들웨어로서, 주로 동적 서버 컨텐츠를 수행하는 것으로 웹서버와 구별이 되며, 주로 데이터베이스 서버와 같이 수행하는 것을 의미합니다.

WAS는 **웹서버와 웹 컨테이너가 합쳐진 형태**로, **웹서버 단독으로는 처리할 수 없는 데이터베이스의 조회나 다양한 로직처리가 필요한 동적 컨텐츠를 제공**해줍니다. WAS는 JSP, Servlet 구동환경을 제공해주기 때문에 웹 컨테이너라고 불립니다.

대표적인 WAS의 경우 Tomcat이 있습니다.

여기서 웹컨테이너란  웹 서버가 보낸 JSP,PHP 등의 파일을 수행한 결과를 다시 웹서버로 보내주는 역할을 의미합니다.

<br/>

### ==> 중요 ! WAS만 써도 되는가?? 답은 (X)

WAS는 DB 조회 및 다양한 로직을 처리하는데 집중을 해야하기 때문에, **단순한 정적 컨텐츠는 웹 서버에게 맡기며 기능을 분리시켜 서버 부하를 방지**하게 됩니다. WAS가 정적 컨텐츠 요청까지 처리한다면 부하가 커지고 동적 컨텐츠 처리가 지연되기 때문에 수행속도가 느려질 것입니다.


또한 위와 같은 사실로 견주어 보았을 때, Tomcat(WAS) 말고 Apache Tomcat이라는 말을 많이 들어봤을 텐데 이는 WAS서버의 Tomcat에 정적 컨텐츠를 처리하는 Apache의 기능이 추가 되었기 때문입니다.


- - -

[참고URL]

[Web 웹 서버와 WAS의 차이를 쉽게 알아보자](https://codechasseur.tistory.com/25)





