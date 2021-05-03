---
title : '[Basics] 컴퓨터망 1장'
date : 2021-04-30 19:22:12
category : 'Basics'
draft : false
description : "컴퓨터망 1장"
tags : ['OS']
---

**1) Nuts and bolts : 인터넷의 구성요소 별로 정의를 한 관점**
(Devices, packet switches, connection link, networks)

Device : 여러개의 device들이 link로 network를 구성한다
 Packet switches : packet들을 forward 해주는 swtich를 의미
Network : 디바이스, 라우터 링크들의 모음
Communication links : fiber, copper, ..

여기서 `internet`이란 ?
::네트워크들끼리 연결이되어 있는 네트워크들을 의미한다.::

ISP들이 서로서로 연결되어있다.

**2) Service View : 인터넷의 서비스별로 보는 관점**

1) 인터넷은 애플리케이션에게 서비스를 제공해주는 InfraStructure

2) 애플리케이션에게 programming interface를 제공해준다

---

프로토콜이란 ? 

**호스트와 호스트간에 통신을 할때 정의한 메세지의 형태와 순서를 정의**하고 **메세지를 전송하거나 수신할때 어떤 행동을 취할지 정의하는 통신 약속**

가장자리는 Network Edge 라고 하며, 중간부분을 Network Core라고 한다
그 사이에는 Access Network, Physical Media들이 존재한다

Network Edge에는 네트워크 서버, 클라이언트들이 존재하며
Network Core에는 여러 라우터들이 존재한다.
---

 Access  Network들은 ::위의 호스트들이 인터넷을 사용하기위해 거쳐야 하는 곳을 의미::
Edge Router들이 core Router에 연결하는 방법은 ?
access network

1) 주거접근망 사용
2) 학교 공용 네트워크 사용
3) 모바일 액세스 네트워크

Access Network 종류들

1) cable-based access : 주거접근망의 종류 중 하나를 의미
Spliter를 통해서 **선하나에 주파수들을 서로서로 나누어서 서로 다른 채널을 이용하게 하여 데이터를 송수신 할 수 있게 해준**다.

**HFC** 선을 사용하여 cable-based access를 구현하는데 **HFC란 구리와 광케이블의 혼합선**을 의미한다.

2) digital subscriber line (DSL) : 전화주파수대역과 컴퓨터주파수대역을 나눠준다. HFC선을 사용하지않고 **전화선**을 사용한다.

다른가정집의 DSL들을 모아서 외부로 보내는 특징을 가지고 있음

=> **cable-based access와 DSL의 차이점은 ?**

3) Wireless access network : 다양한속도로 지원을 하고 다양한 프로토콜을 지원한다.
1G : Analog
2G : Digital
3G : voiceData
4G : 통합된 망 사

4) enterPrise network : 대학 회사에서 구성되어있는 네트워크를 의미한다.

---

Host는 `endSystem`이라고도 불리며, packet을 보내는 주체이다.

패킷길이가 Lbit라고 하고 Host의 Pakcet Late가 R이라고 하면

L/R 은 L길이의 패킷을 보내는데 보내는 시간을 의미한다.
이때 R을 (transmission Rate)라고하는데 이는 패킷을 전송하는 속도가 아니라 내보내는 속도를 의미하는 것이다. 주의 !
L/R은 이떄 capacity, link bandwidth라고 한다.

---

Link => 물리적 링크를 의미한다.
Physical link : 송신자와 수신자 사이의 물리적 연결선을 의미

Guided media : 유선 ( Cooper,fiber,coas,HFC..)
Unguided media : radio, signals

Twisted Pari : 꼬임쌍선
Coaxial cable : 구리선으로 구성되어있다.
Fiber Optic cable : 광섬유 케이블을 의미한다. 

---

Network core 부분에는 다수의 라우터들이 존재하고 있다.
즉 정형화된 형태로 라우터들이 연결되어있는 것을 의미한다.

Q. 라우팅과 **패킷스위칭**의 차이점은?

차이점이라기보단 라우팅의 방식중에 하나가 패킷스위칭 방식이라고 생각하면된다.

즉 패킷의 헤더를 확인해서 패킷헤더의 목적지를 확인하고 라우팅을 해주는 것을 의
미

스위칭은 2계칭 라우팅은 3계칭의 작업을 의미
---

`Packet-swithicng`은 들어오는 Packet을 저장하고 Header의 목적지 정보를 보고 어디로 전송할지 결정한다. => `store-and-forward` 라고 한다

Packet queuing 현상과 이로 인해서 loss 현상이 발생할 수 있다.

패킷들이 도착하면 que에 저장되면서 다음 패킷이 나갈때까지 기다리고 있는데, 이때 버퍼가 가득차있는 상태이면 패킷이 들어왔을때 그 패킷이 loss되는 현상이 발생한다.
Packet 처리속도 < 패킷이 들어오는 속도

---
라우터는 패킷헤더의 목적지주소를 확인 후 라우팅 테이블을 look up 한 후에 해당하는 outputlink로 패킷을 forwarding 한다.

---
`Circuit swtiching`은 1) packet loss나 dealy가 발생하지 않는다.
2) **데이터의 순서**에 맞춰서 잘 전달할 수 있다.
-=> Packet swithicng은 circuit swithcing과 다르게 목적지로 가는 경로가 정해져있지가 않다. 그렇기 떄문에 데이터가 순서대로 도착한다는 보장이 없다.
대신 Circuit switching과 같이 자원을 낭비하는 일은 없다.

다만 자원을 무조건적으로 확보를 해야지만 데이터 전송이 가능하다.
이로 인해서 ::자원낭비 문제가 발생할 수 있다.

---

ISP 라는 것이 없이 **라우터**끼리 전부 네트워크를 구성하게 되면 비용이 엄청날 것이다. ISP를 둠으로서 네트워크 간의 계층구조를 가지도록 한다.

---

`Packet delay 요소 4가지` => **중요 !!!**

Processing delay + queueing deal + transmission delay + propagation deal
(data를 processing하는데 걸리는 시간)

Transmission delay => 데이터를 내보내는데 걸리는 시간
(L bit / R(데이터를 처리하는 rate) =bandwidth )
Propagation delay => 데이터를 다음 Node까지 전송하는데 걸리는 시간
(Distance / s(spedd) 처리속도 ) 의 시간이 걸린다.


Queuing delay

La/R 가 0에 가깝다는 것은 R이 굉장이 크다는 의미다.
즉 이는 데이터를 처리하는속도가 매우 빠르기떄문에 queding dealy가 없다.

La/R이 1이라는것은 들어오는속도와 처리하는속도가 비슷하다는 의미이다.
이는 Delay가 생길 것 같지는 않지만 실제로는 엄청나게 트래픽이 몰리기 때문에 딜레이가 엄청나게 생기게된다. 트래픽이 Bursty하기 때문


**traceroute** : 내가 위치한 곳에서 목적지까지 가기 위해 어디 라우터를 거치는지 알려주는 프로그램

=> 라우터가 멀수록 왕복시간이 더 만히 걸리지 않는가 ?

그건아니다. 라우터에 있는 버퍼 상태에 따라 라우터마다 다르기 때문에, 큐잉딜레이 시간이 다를 수가 있다.

Thorugput : 위의 R에 해당하는 Rate를 의미한다. 즉 ( L bit / time ) 의미

---

Malware : 나쁘게 동작하는 무엇 ( 바이러스, 멀웨어 같은 것 )

Botnet : 감염시킨 컴퓨터들끼리 네트워크를 형성한다.
이러한 감염시킨 컴퓨터들끼리 어떤 service를 공격하는데 이를 Dos라고 한다.
Sniffing : B가 A에게 전송하려고하는 정보를 중간에 다른 호스트가 이를 가로채어 정보를 확인할 수 있다

Ip spoofing : 데이터를 보내는 사람을 조작하여 수신자에게 데이터를 전송하는 것

---

Internet protocol stack 8계층!!

Pyshical : bits on the wire ( wire를 통해 전송되는 bit들 .. 데이터 1, 0을 말하는지 결정하는 프로토콜 )

Link 계층 : 보내는 데이터와 받는 데이터가 동일하도록 어떤 프로토콜을 설정해야하는데, Pyshical Layer에서 전송되는 데이터에 오류가있는지 확인해준다.
즉 에러없이 데이터를 전송하기 위해서 link계층이 필요로 한다
Error control, Error correction(재전송방법, 데이터의 에러위치를 찾아서 바꾸는 것)

Newokr 계층은 IP 프로토콜을 사용하는데, 전송하려는 데이터를 목적지에게 전송하기 위한 목적지 식별을 위한 계층이다. 라우팅테이블을 만들어서 목적지까지 가도록 도와준다

Transport 계층은 데이터를 전송할때 순서에 맞지않게 도착할 수 가 있다. 이를 순서에 맞게 데이터전송을하게 해주며 데이터에 오류가있는지 검사를 하여, 누락된 데이터에 대한 처리를 해준다.

Application 계층은 애플리케이션간의 메세지를 전송하는데 내용과 형식을 정의해주는 프로토콜을 설정하는 계층이다.

Transport ~ pyhiscal은 OS에서 정의가 되어있다.

만약에 응용계층에서 realiable service, unrealibe service 중 원하는 서비스가 있을 텐데, **Transport 계층은 Network에서 제공하는 서비스를 Application 계층에서 원하는 서비스에 맞게 변환하는 계층이라고 볼 수 있다**.

위의 Internet은 5계층 프로토콜이지만 OSI는 7계층을 의미한다.

Internet대신 OSI에는 Session계층이나 presentation 계층이 추가되어있다.

Session : 응용 프로그램간의 연결을 성립하게하고 안정적으로 유지되도록 도와준다.
연결세션에서 데이터 교환시 에러가 발생하면 데이터를 복구 관리하는 계층을 의미

Presentation : 상대방과의 데이터 표현방식에 관해 정의를 하는 계층을 의미
Interenet 계층에서는 session계층이나 presentation 계층을 응용계층에서 구현이 되어야한다.


