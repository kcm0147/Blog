---
title : '[Basics] 컴퓨터망 5장'
date : 2021-06-11 20:22:12
category : 'Basics'
draft : false
description : "컴퓨터망 5장 정리"
tags : ['Basics']
---


# 컴퓨터망 5장
#컴퓨터망#


라우팅알고리즘을 프로토콜로 시킨것을 OSPF,BGP,RIP… 등등이 있다. 

---

**포워딩** :  라우터의 input으로 부터 적당한 output까지 패킷을 이동하는 것
**라우팅** : 출발지로부터 목적지까지 어떠한 경로로 이동을 할건지 결정하는 것

---
* Network control plane을 만드는 방법?

1) per-router control 방법 : 라우터들끼리 메세지교환을 함으로서 각자가 알아서 라우팅 테이블을 제작 
2) centralized control 방법(SDN)  : remote controller 가 테이블을 제작하여 이것을 이용하여 데이터를 포워딩한다. 

---
라우팅 프로토콜의 대표적인 것은

1) link state
2) distance vector 
3) path vector -> BGP에서 사용하는 방법

이렇게 세가지가 존재한다.

라우팅 프로토콜은 라우팅 테이블을 만들어주는 프로토콜을 의미한다.
path는 라우터들이 거쳐야하는 순서를 의미하는데, good path라는 것은 적은 cost로 빠르고 적은 congested한 path를 의미한다.

하지만 cost라는 것은 다양한 것이 될 수 있다. 거리가 될 수 있고 시간이 될 수 있고 traffic volumne이 될 수 있다.

---
라우터 알고리즘의 대표적인 분류
1) global : 모든 라우터들이 자신의 입장에서 동일한 라우터 경로 그림을 그릴 수 있는지
=> link state 알고리즘

2) decentralized : 이웃 Router와 정보를 교환하다 보면서, 라우팅 테이블을 만드는 방법 => distance vector 라우팅 알고리즘


3) dynamic: 경로가 바뀌는 일이 자주 생기는지

4) static : 경로가 바뀌는 일이 거의 없는지 !!!

---
Link state 알고리즘

1. 이러한 링크정보를 A는 나머지 state들에게 공유를 한다.
=> **flooding 방식** ( A가 B에게 라우팅 정보를 주면 B가 B에 연결된 state들에게 link정보들을 전달하는 방식이다. ) 으로 라우팅 정보를 공유한다.

2. Centralized 방식이라고하며 이는 network topology를 모든 노드들이 전부 다 그리는 방법을 의미한다 !!!
3. 다익스트라 알고리즘을 사용해서 topology 그림을 그릴 수 있다.  (Shortest path also)

4. 매우 중요한 **oscillations possible** 문제 !!
만약에 linkcost를 **trafic volume**으로 둔다고 가정하자.
처음에는 트래픽이 적은곳으로 경로들이 설정되면서 데이터를 계속 보내게 될텐데, 이렇게 고정된 경로로만 데이터를 보내다 보면 트래픽볼륨이 증가하면서 linkcost의 양이 커질 것이다. 그래서 시간이 지나면서 트래픽볼륨이 작은쪽으로 라우팅 경로가 변경이 될 것이다. 이렇게 반복적으로 지나면 데이터를 보내는 경로들이 자꾸 변하게 되는데 이게 바로 oscillations한 현상이라고 한다.

=> traffic volume 처럼 cost가 다이나믹하게 바뀌는것을 linkcost로 사용해서 생기는 문제이다.


---
Distance vector 알고리즘

1. 벨만포드 알고리즘을 사용하여 toplogy 그림을 그린다.
=> 처음에는 아무정보도 알 수 없다.

3. Decentralized 방식이라고 하며, 주변 라우터들에게 정보를 받아서 라우팅 테이블을 만드는 방식인데, 주변 라우터들에게 정보를 받아서 라우팅 테이블이 업데이트가 된다면 자신과 연결되어있는 다른 라우터들에게 업데이트 된 정보를 전달한다.

Distance vector의 문제점???
Link state의 같은 경우 oscillation 문제가 생길 수 있다했는데, distance vector의 경우 count-infinity 문제가 생길 수 있다.

Distacen vector의 경우 자신의 라우팅 테이블이 업데이트가 된다면, 다른 라우터들에게 정보를 전파해준다. => good news를 받으면 자신의 라우팅 테이블이 업데이트 되면서 다른 라우터들에게도 정보가 금방 전파될 수 있다. 문제가 되지 않는다

하지만 bad news를 받으면 자신의 라우팅 테이블이 업데이트가 안되기 때문에 주변의 다른 라우터들은 이러한 사실을 알 수 없다..

1. Good news travels fast
linkCost가 낮아지는 것은 금방 정보가 전파 될 수 있다.

3. Bad news travels slow 문제 => count-infinity 방식
[image:242C17F4-4E90-4F59-9E98-10663ED519CA-464-0000198B357121D4/스크린샷 2021-06-07 오후 10.22.08.png]

해결방법
1) poison reverse 방법 : z가 y에게 x로 가는 cost를 무한대(potion)이라고 알려준다.
그러면 infinite count가 발생하지 않는다

2) splits horizon 방법 : z가 y에게 table을 알려줄때 z에서 x로 가는 정보를 제외하고 알려주는 것

3) trigger update 방법 : 애초에 y에서x로 가는 경로가 끊겨진다면, y가 x로 가는 경로가 못가게 됐다는 사실을 주변 라우터들에 게 알려준다.
 
---
Linkstate와  distance vector 차이점 이해하기
[image:1EFECAFF-D038-45D3-A3CB-92F0F8D28E92-464-000019F91E399A42/스크린샷 2021-06-07 오후 10.29.58.png]


---
AS들끼리 프로토콜이 다 달라도 상관이없다. 
(Domains)라고 한다.

AS 내부에서 작동하는 프로토콜을 **infra-as** 프로토콜이라고 한다.
하지만 AS들 끼리의 프로토콜을 **inter-as** 프로토콜이라고 한다.

Inter-as 프로토콜의 대표적인 예는 **BGP 프로토콜**( path Vector  )이라고한다.

서로 **다른 AS들**을 연결시키는 주체를 **Gate Way**라고 하며, **inter-domain-routing(inter-as-routing)**을 담당한다 !!!

어느 게이트웨이로 데이터를 보내는지 결정하는 것은 **inter-domain routing protocol**에 의해서 결정이 되는 것이다 !!!! -> 혼동 주의
----
### Intra as routing protocol - RIP(DV 사용) ,OSPF(link-state routing)

규모가 클때는 계층 구조의 **OSPF 라우팅 프로토콜 알고리즘**을 사용한다.

Area border router -> Area들과 backbone을 연결하는 router를 의미한다.

서로 다른 Area들을 연결하는 것은 backbone 망이라고 한다.
 
---
### Inter as routing protocol - BGP를 많이사용

BGP는 Path vector 방식을 사용하는데, eBGP와 iBGP가 존재한다

Q. IBGP가 존재하는 이유 ??

[image:8A03B7F9-7C31-4A35-882B-30E5C052B27A-464-00001B17F9C93065/스크린샷 2021-06-07 오후 10.50.32.png]

BGP session : BGP rotuer들끼리 path 정보를 주고받는다(**TCP connection**을 통하여 ) 즉 **어떠 어떠한 네트워크 주소로 가기 위한 path 정보를 제공**한다.

BGP 프로토콜에 따라서 inter routing 경로를 확인할 수 있는데, 목적지로 가기 위해서 다양한 path 정보들을 받을텐데 이 중 어떠한 경로를 선택해야하는가?
policy에 따라 다르다.


---
### Hot potato routing

**주변 라우터** 중에서 linkcost가 낮은 쪽으로 보낸다. 하지만 전체적으로 봤을때는 linkCost가 무조건 낮다고 볼순없다.

---
### SDN
Remote controller가 정의한 대로 라우터 테이블이 정의가되고 라우터들이 이 테이블에 따라서 동작을 한다.

만약에 pre-router 방식으로 라우팅 테이블을 만들게 되면, 좀더 트래픽이 낮은곳이나 로드밸런싱을 위해서 다른 경로로 라우팅 경로를 쉽게 바꾸는 작업을 하기에는 힘들다.

다만, SDN으로는 쉽게 라우팅 경로를 바꿀 수 있다 !
=> 트래픽을 우리가 컨트롤 할 수 있다는 것이다.

**Flow-based forwarding !!!!**

SDN의 control plane에 Application들을 추가시킬수 있는데 이를 이용해서 다양한 middleware를 만들 수 있다

**76p**
SDN controller에서 스위치들을 컨트롤하게 해주는 API를 **southbound api**라고 한다.
=> 대표적인 protocol ( Openflow protocol)
SDN controller에서 제공하는 정보를 이용해서 routing, access control.. 등을 할 수 있는 기능을 구현할 수 있는데 그러한 API를 **northbound API**라고한다.
---

#### ICMP 프로토콜
ICMP 프로토콜은 데이터를 보내다보면, 어떠한 이벤트가 한번씩 생길텐데 이러한 이벤트를 알려주는 프로토콜을 의미한다.

ICMP 형태로 packet을 만들어서 전송한다 !

ICMP의 Type을 보고 어떠한 형태의 메세지 유형인지 확인을 하고, Code를 보고 Type에 대한 구체적인 메세지 내용을 식별할 수 있다.

1) Error Reporting => 어떠한 에러가 발생했는지 알려줄 수 있다.
2) Echo Request / Reply


Ping : 상대방 컴퓨터가 살았는지 죽었는지 check를 할 수 있다. 

ping의 장점으로는 내컴퓨터에서만 작동을 하는건데, 서버프로그램이 필요없이 모든컴퓨터 기본적으로 ICMP 모듈이 있어서 가능하다 ! - echo request / reply를 작동시킬 수 있다.

---

### Traceroute 
ICMP 패킷을 전송함으로서 TTL이 0이 되면, 송신자에게 메세지가 TTL이 0이 됐음을 알려주는 것을 이용하여 라우터의 path 정보를 알 수 있다.

UDP segement가 도착지까지 도착을할때까지 계속해서 traceroute를 진행한다.

---
#### Network management
Autonomous systems : 관리주체가 있는 망

Managing server(관리를 하는 사람) -> Managed device (관리를 받는 사람)
Network management protocol : Managing server에서 사용하는 protocol
Data : device의 상태정보, 각종 device 통계

SNMP : simple network management protocol로
DB를 MIB(Management information base)라고 하는데, 예전에는 SNMP를 통해서 MIB에 접근하고 관리하였는데

최근에는 NETCONF 라고하는 표준을 만들어서 좀더 제너럴하게 만들었다.
YANG이라는 것은  데이터들을 모델링하는 language라고한다.

SNMP는 MIB infromation을 protocol이다
1) request / response mode : Managing server에서 request를 해서 그에 대한 MIB information을 전달해준다.  
2) trap mode : 자발적으로 어떤 event가 생기면, MIB information을 전달해준다.


NETCONF는 managing server와 managed network device들 사이에서 작용을 하는 연산같은 것이다.
XML 형식으로 메세지를 인코딩하여 메세지 교환을 진행한다.

YANG이라는 언어를 사용해서 NETCONF 네트워크 매니지먼트 데이터들을 모델링하는데 사용을 한다. ( 자세히 몰라도 됨 ) 