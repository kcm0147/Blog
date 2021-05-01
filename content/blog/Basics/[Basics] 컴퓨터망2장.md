---
title : '[Basics] 컴퓨터망 2장'
date : 2021-05-01 19:22:12
category : 'Basics'
draft : false
description : "컴퓨터망 2장"
tags : ['OS']
---

# 컴퓨터망 2장
#컴퓨터망

End 시스템은 모든 계층의 프로토콜이 다 필요하지만

라우터는 그렇지 않다.

---
### 서버와 클라이언트의 차이점

서버는 항상 켜져있어야하며, 영구적인 주소를 가지고 있어야한다.

클라이언트는 영구적으로 켜져있을 필요는 없고 다이나믹하게 IP를 가질 수 있다.

Peer-peer 구조에는 서버가 항상 켜져있을 필요가 없다.

---

Host에서 프로그램을 running 하는것을 ‘process’라고 한다.

두 프로세스간에 통신하는 방식을 IPC 라고하며 파이프 소켓등을 이용하여 통신을 진행해야한다. 다른 호스트의 프로세스와 통신을 하기 위해서는 message를 이용하여 통신을 진행해야한다.

Client process : 통신을 이니시에이팅하는 process
Server process : 연결이 올때까지 기다리는 process

---
구분자

1) IP address : 같은 IP address 내의 process를 구분하기 위해portnum이 필요.
**호스트가 누군가를 식별하는것**은 IP를 이용하여 구분한다

HTTP port 는 80번을 의미하고, mail server는 25번

---
Transport layer는 **data integrity, timing, throughput, security**등 필요한 것이 많다.

Transport lyaer는 application layer이 어떤서비스를 원하는지에 따라 다른특징들이 적용된다. => **data loss, through put, time sensitive(timing)**의 설정값들이 다르다.

---

**이건 진짜 중요!!!**

### TCP service와 UDP service의 차이점

[image:6E2B092F-9532-41B4-857E-20836CDBA99E-372-0000267D8BFB508E/스크린샷 2021-04-30 오후 7.25.50.png]

TCP는

1) reliable transport 보장 => 데이터의 순서에 맞게 보장해준다
2) flow control
3) congestion control
4) connection-oriented
5) **not security, timing, minimum throughput** 얘네는 보장안해준다 !!!

TCP는 느리게 보내든 말든 안전하게 보내는것을 일단 우선적으로 하기 때문
보안성 또한 보장안해준다. 이거 헷갈리지말자

=> 바닐라 TCP / UDP는 일단 보안성을 제공해주지 않는다. 암호화 x
그 위에 **TLS(Trasnport Layer Security)**를 얹어야만 한다.

UDP는 그냥 전부다 제공안해준다. 그냥 데이터의 전송만을 해준다.

근데 왜쓰냐?
데이터 자체를 빨리 받아야하는 곳에서는 UDP를 사용한다. **프로토콜이 단순하기때문에 그만큼 데이터를 빨리 전송**할수있다.

---

`WEB Page`은 객체 오브젝트들의 집합이다. 각자 다른 웹서버에 저장되어있는 오브젝트들로 구성되어있다.

HTML,이미지,java applet..

근데 이러한 오브젝트들의 위치를 나타내는 곳이 URL이라고 한다.

HTTP는 위에서 말하는 Object들을 받아오는 프로토콜이 바로 **HTTP프로토콜**이라고 한다.
HTTP는 `TCP Protocol`	 !!!

웹어플리케이션 레이어 프로토콜 중 하나로 Hypertext transfer protocol

Client는 brower가 request,receive 하여서 web object들을 요청한다면 `Web server`는 이에대한 요청에 맞는 오브젝트들을 반환해준다.

HTTP는 클라이언트가 연결요청을하면 서버는 이에대한 응답을 한다.
그다음에 HTTP 통신을 진행한후에 통신이끝나면 연결을 끊는다.

HTTP의 가장 큰 특징은 `stateless`라는 것이다 !!
과거의 client정보에 대한것을 저장하지 않는다. History 저장 x
즉 서버는 그냥 클라이언트가 요청하는 객체를 확인하고 전송을 해주는 역할을 하는 것이지 과거의 통신이 영향을 끼치지 않는다.

stateless의 반대개념이 statefull이다.

Non-persistent HTTP는 한번의 통신을하면 연결을 끊어야한다.
즉 많은 오브젝트들을 받으려면 여러번의 연결이 필요하다.

하지만 Persistent HTTP는 전송을하고 나서 끊지 않고 여러 object들을 받을 때까지 계속해서 연결을 유지한다.

---

`RTT` : 작은 패킷을 서버에서 클라이언트까지 전송하고 돌아오는데까지 걸리는 시간을 의미한다. Round Tree Time

Non-psersisten HTTP time = 2RTT + file transmsitonn time(파일을 내보내는데 걸리는 시간)

HTTP 1.1 부터 persistent http를 가지는데, ASCII를 사용한다.
하지만 HTTP 2부터는 Binary를 사용하여 HTTP format을 정의한다.

request에 대한 response Http 메세지에는 body에 reqeust에 대한 내용들이 담겨져서 보내지게 된다.

HTTP response code !!!
200 -> Ok.
301 -> Moved Permanently ( Object가 다른곳으로 이동했으니 다른곳으로 요청 )
400 -> Bad Request ( Request 형식이 잘못 됐다 )
404 -> Not Found ( 요청한 document가 없다 )
505 -> HTTP version Not supported => HTTP version이 지원되지 않음

---
위에서 http는 stateless라고 하였는데, 이러한 히스토리들을 관리하는 테크닉인 ‘cookies’를 사용한다.
=> cookie를 통해 statelss가 아닌 statefull이 가능해진다.

`Proxy server` : 웹 캐시를 프록시서버라고 한다. Proxy server를 통해서 이전에 들어온 요청과 동일한요청이들어오면 origin server를 거치지않고 proxy server에서 바로 요청에 대한 응답을 처리해줄수있다.

[image:C5A61539-8835-4828-BACC-81DF2D6A8429-372-0000325E01D353AA/스크린샷 2021-05-01 오전 1.44.27.png]

**Conditional get**을 이용하여 proxyserver에서 발생할 수 있는 문제를 방지한다.

---
HTTP/2의 목표…
HTTP/1.1은 다행히도 persistent -http를 지원한다 하지만 하나의 회선에서 패킷을 전송하기 떄문에 앞의 패킷이 전송되기전까지 전송이 지연되는 HOL 현상이 발생한다.

HTTP/2는 이러한 현상을 해결하기 위한 2버전 프로토콜이다.
HTTP/2는 1과다르게 데이터를 **1freame단위로 잘라서, 균등하게 전송**을 한다.
그리고 요청이 들어오지 않은 **object를 클라이언트에게 전송을 해준다**.
1.1은 아스키 2와 3버전은 binary !!!

하지만 HTTP/2는 바닐라 TCP이기떄문에 암호화가 되지않아 TLS layer를 위에둠으로서 보안성을 보장해야한다.

**HTTP/3**는 1,2와 달리 TCP가 아닌 **UDP 위에서 작동을 하며** quic이라는 프로토콜을 위에서 통신을 진행한다.
[image:1A464D7B-B787-4320-A086-553557276FF7-372-000032FFB018290F/스크린샷 2021-05-01 오전 1.56.15.png]

TCP와 TLS 연결을 하는데에도 3way handshaking이 2번이나 최소 이루어져야한다..

하지만 HTTP/3은 quic 프로토콜 위에서 작동을 하는데 연결과 동시에 보안성을 보장하기때문에 3way handsahking을 1번만 진행해주면된다.

왜? UDP는 TCP처럼 연결을 만들필요가 없기 때문이다.

---

Email은 3가지의 구성요소가 존재한다.

1) User agent -> outlook, mail 애플리케이션
2) Mail server
3) SMTP protocol

User agent에서 메일을 작성하여 전송하면 mail server로 메일을 전송한다.
이때 전송을 하는데 사용하는 프로토콜을 SMTP protocol이라한다.

mailserver는 message box, message que를 가지고 있다.
Message que는 전송되려는 메세지가 저장되는 mail server의 큐
Message box는 도착된 메세지가 저장되는 message box(우편함)

SMTP 프로토콜은 TCP 프로토콜을 사용한 예이다.
메세지는 **7bit의 아스키코드**로 전송이 된다.

---
이메일을 HTTP 로 전송하지 않는 이유?
=> HTTP는 Pull 서비스이다. 즉 요청이 들어오면 응답을 하는 건데

SMTP는 push 서비스이다. 요청이들어오지않아도 먼저 전송가능

또한 HTTP는 하나의 객체를 전송하는 것이라면, SMTP는 하나의 메세지에 이미지,텍스트 등 여러 객체가 포함될 수 있다.

또한 메세지를 읽는 사람의 경우는 push 서비스가 아니라 pull을 해야하기 때문에 SMTP 프로토콜이 아니라 **HTTP나 IMAP**과 같은 access protocol을 사용해야한다.

---

DNS 서버는 계층적으로 분포되어있으며, DB가 분산되어있다.
그리고 DNS서버는 무엇보다도 Application layer이다 !!!

DNS service

1. Hostname <-> IP address
2. **Mail server, host aliasing ( 간단한 별칭 호스트 네임을 복잡한 정식 호스트네임으로 변환해준다 )**
3. Load 밸런싱역할을 해준다.
(DNS가 서비스하는 서버의 IP주소를 한가지만 알려주는 것이 아니라, 여러개 돌아가면 서가르쳐준다. )

DNS service가 분산되어있는 이유는 무엇인가?
1) 하나의 서버가 고장나면 전체적으로 문제가 생기기 때문이다.
2) 트래픽처리 해야할 양이 너무 많아진다. 분산이 필요하다.
3) db의 위치가 일정하지 않아서 위치에 따라 처리속도가 다를것이다.
4) 유지보수 관리가 힘들다.

즉 혼자서는 크기감당하기가 힘들다.

또한 계층별로 DNS 서버가 나누어져있다.
Root, top level domain(TLD) -> Authroiation(마지막)

---
IIterated query , recursive query 
Iterated Query : Iterated query는 local DNS server가 rootDNS 서버부터 차례로 계층별로 질의를 진행하여 ip address를 얻는 방식이다.

Recursive query는 iterated query와는 다르게 local DNS server가 차례대로 질의하는것이 아니라, 다음 계층에게 도메인 ip를 질의하는 것을 넘긴다. 각 계층별로 다음 계층의 Dns 서버를 알아서 ip adress를 얻는 방식이다.

DNS records는 캐시를 사용하지만 계속해서 정보가 유지되는것은 아니다 TTL 시간 동안만 살아남을수있다. 왜? ip주소가 바뀔수 있기 때문이다.

DNS는 resource record 로 구성되어 데이터베이스에 저장이 되어있다.
하지만 RR의 type에 따라서 저장되어있는 종류가 다르다.

Type A => Adress
Type CName -> canonical name 
**CNAME**은 Canonical Name의 약자로 도메인 주소를 또 다른 도메인 주소로 매핑 시키는 형태의 DNS **레코드** 타입이다.
Type NS => Name server
domain과 관련되어잇는 **name server의 호스트 네임**이 들어있다.
Type MX => Mail server의 name이 적혀있다.

1) DDos attacks => root DNS 서버를공격
2) Redirect attack -> 잘못된 응답을 주게 하는 것

---
Peer-peer의 특징이라면 서버의 개념이 없다.

서버가 항상 켜져있을 필요가 없고, 클라이언트-클라이언트끼리 통신이 가능하다.

이때 peer는 ip address가 변해도 상관없다.

서버가 하나있으면 파일을 공유하는 단말기수가 늘어나면 늘어날수록 오래걸린다.
하지만 P2P 서비스는 그렇지 않다.

p2p서비스는 공유하고 싶은 파일을 chunk 단위로 나누어서 peer 들끼리 공유를 진행한다. tracker와 torrent라는 구성요소로 나누어진다.

Trackers는 torrent 망에 참여하고 있는 peer들이 누군지 전부 다 알수있다.
즉 파일을 공유하고 싶은 사람들 peer들끼리 네트워크를 형성하여 데이터를 공유한다.

**Tit-for-tat** : 데이터를 줄 떄 나에게 많이 제공해준 친구에게 데이터를 많이 주는 방식

---

비디오 스트리밍 서비스를 런치할때, 하나의 서버가 있으면 트래픽이 너무몰리고 처리해야하는 양이 너무 많기 떄문에 서비스를 진행할 수 없을 것이다.

또한 하나의 서버만 둔다면, 클라이언트마다 성능들이 죄다 다르기떄문에 제공받는 서비스의 차이도 죄다 다를 것이다.

이를 위해서 하나의 서버가 아니라 여러개의 서버를 분산해서 두어야한다.
이렇게 이때의 여러개 서버를 CDN이라고 한다.

근데 video의 품질을 동일하게 제공하려고 한다면 엄청나게 많은 양을 보내줘야할수도있다.

이를 위해서 `coding`이라는 것을 통해서 **특성이 비슷한 불필요한 중복데이터를 제거해준다**.

coding의 종류에는 spatial coding, temporal coding이 존재한다.

```
Spatial coding 은 공간적으로 색상이 비슷한 픽셀들을 제거하는 방식이다.
Temporal coding은 시간적으로 봤을 때 비슷한 이미지를 제거하는 방식이다.


CBR : 일정한 video encoding rate
VBR : 공간적, 시간적으로 coding을 통해서 video encoding rate가 변하는 경우를 말한다.
```


네트워크 상황에 따라 딜레이지터가 들쑥날쑥하다. 딜레이지터가 크다는 것은 비디오가 일정하게 전송되는 것이 아니라는 뜻이다.

딜레이지터가 없다면 항상 일정하게 전송된다.

딜레이지터가 존재한다면, 플레이어는 playout buffer에 일정한 비디오영상이 찰때까지 기다려야한다. 이떄 기다리는 것을 playout dealy라고 한다..

Fixed palyout dealy, adaptive playout delay

Fixed playout delay는 layout 데이터를 받는시점에 따라 시간이 달라질 수 있어야하는데 고정되어있으면 계속해서 기다려야 될 수도있다.

Adaptive playout delay는 **데이터를 받는 시간의 평균오차를 고정 delay시간에 더하고** 그 값을 기준으로 playout 시점을 구하는 것이다.

네트워크 딜레이가 생긴다면 데이터가 아직 오지 않기 떄문에 **silence period 구간**을 늘린다.

---

DASH : Dynamic, Adaptive Streaming over HTTP ( DASH )

DASH 프로토콜은 **HTTP 프로토콜 위에서 작용하는 프로토콜의 종류 중 하나**이다.

DASH에서 서버는 비디오파일을 chunk단위로 나누어서 그 chnuk에 대한 URL을 메니페스트파일로 관리하고있다.

클라이언트는 주기적으로 자신의 bandwidth를 측정한다. 그리고 메니페스트 파일을 확인하여 자신의 bandwidth에 맞는 Chunk들을 확인하여 그 chunk를 가져온다.

---

CDN(Content distribution networks) => 복사된 서버들

하나의 메가서버를 가지고있으면, 이는 서버에 오류가 발생하면 전체적으로 서비스가 중단이 되어버리는 현상이 발생하며, 클라이언트마다 서버까지의 거리가 달라서 어떤 클라이언트는 서비스 제공이 원활하지 않을수도있다. 또한 요청양이 매우 크기때문에 하나의 서버가 처리하기에는 무리가 있을 것이다.

Enter deep : cdn server들을 여러곳곳에 access netwroks에 깊게 배치하는 것
Bring home : 적은 지점에 상대적으로 큰 규모의 서버클러스터를 구축하는 방식