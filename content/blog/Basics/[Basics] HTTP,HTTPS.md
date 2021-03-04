---
title : '[Basics] HTTP,HTTPS 차이점'
date : 2021-03-05 09:22:12
category : 'Basics'
draft : false
description : "HTTP,HTTPS 차이점 설명"
tags : ['HTTP']
---

이번에는 HTTP와 HTTPS의 차이점에 대해서 공부를 하였습니다.

간단하게 정의하면 HTTPS는 HTTP에서 보안성이 강화되었다고 생각합니다.


### HTTP

HTTP는 Hypertext transfer protocol의 약자입니다. 

`인터넷에서 사용하는 웹 서버와 사용자 인터넷 브라우저 사이에 문서를 전송하기 위한 통신 규약`입니다. 

인터넷에서 Hypertext를 교환하기 위해 사용되는 통신규약이며 포트번호 80번호를 사용하고 있습니다.

따라서 HTTP 서버는 80번 포트에서 대기하고 있으며 클라이언트는 TCP 80번 포트를 사용해서 연결을 하게됩니다.

단순 텍스트를 주고 받기 때문에, 누군가 네트워크에서 신호를 가로채어 본다면 내용이 노출되는 문제점이 생길 수 있습니다.

이러한 보안상의 문제를 해결해주는 프로토콜이 HTTPS입니다.

### HTTPS

HTTPS는 `인터넷 상에서 정보를 암호화하는 SSL 프로토콜을 이용하며 서버와 클라이언트가 데이터를 주고받는 통신 규약`입니다.

HTTPS는 Hypertext Transfer protocol over Secure Socket Layer, HTTP over SSL 등으로 불립니다.

끝의 S는 SSL이나 Secure의 보안을 의미합니다. 모든 통신이 암호화가 되어있음을 의미하죠.

HTTPS는 소켓통신에서 일반 텍스트를 이용하는 대신에, SSL이나 TLS 프로토콜을 통해 세션 데이터를 암호화합니다.

따라서 데이터의 암호화를 통해 보안성을 강화 및 보호를 보장합니다. HTTPS의 포트번호는 443번을 사용하고 있습니다.


HTTPS 프로토콜을 사용하려면, 자신의 도메인에 SSL 인증서를 설치하여야지만 HTTPS 프로토콜을 사용할 수 있습니다.

보안 인증서 발급에 따른 비용이 들 수 있기 때문에, 민감하지 않은 정보를 다루는 간단한 웹 서비스 같은 경우에는 HTTPS를 사용할 필요가 없다고 생각합니다.

---

* 팀 프로젝트로 웹서비스를 개발을 하는 중 사용자로부터 웹캠과 녹음기능을 구현해야만 하는 프로젝트가 있었습니다. 
* 웹캠 + 마이크와 같은 인식 기능을 사용하려면 HTTP 프로토콜이 아닌 HTTPS 프로토콜을 사용해야지 정상적으로 작동이 됩니다.

--

[참조 URL1](http://blog.wishket.com/http-vs-https-%EC%B0%A8%EC%9D%B4-%EC%95%8C%EB%A9%B4-%EC%82%AC%EC%9D%B4%ED%8A%B8%EC%9D%98-%EB%A0%88%EB%B2%A8%EC%9D%B4-%EB%B3%B4%EC%9D%B8%EB%8B%A4/)