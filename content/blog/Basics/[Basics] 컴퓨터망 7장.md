---
title : '[Basics] 컴퓨터망 7장'
date : 2021-06-13 20:22:12
category : 'Basics'
draft : false
description : "컴퓨터망 7장 정리"
tags : ['Basics']
---


wireless와 Mobile이란 다른말이다 !!

Wireless는 무선으로 통신을 한다는 말이다.
Mobility는 네트워크 영역을 이동하면서도 통신을 할 수 있음을 의미한다.

---
### Elements of a wireless network 

1. **wireless 단말기**들 (laptop,smartphone..)
=> 꼭 움직여야하는 단말기들이어야 하는 것이 아니다!
=> 링크는 유선링크가 아니라 무선링크를 사용한다!
2.  **base station**(=access point)
3. **wireless link**(모바일 단말기를 기지국과 연결을 시켜준다)
Multiple accès protocol을 고려해봐야한다. 서로 데이터를 보내려고한다.. 후에 자세히 설명

=> 상대적으로 고주파를 사용하면 셀 사이즈가 작기 때문에 기지국이 많이 필요하다.

< 무선랜 모드를 구성하는 것은 2가지 모드가 존재한다 >
4. **Infrastructure mode**
기지국 자체가 모바일단말기들을 wired network로 연결을 한다
handoff를 컨트롤 해줘야한다.
( AP1을 컨트롤 하다가 AP2를 컨트롤 하는 방법 )

5. **Ad hoc mode**
Infra structure(no base stations)가 따로 존재하지 않는다.
단말기들 사이에서 통신을 진행하는 것이다.
통신시스템이 망가져도 노드들끼리 통신시스템이 구축되기 때문에 통신이 가능하다.
V2V => 차와 차끼리 통신
V2I => 차와 infrastructures	과의 통신

Single hop : 무선통신이 한개의 hop을 거쳐서 통신을 하는 것 ( infrastructures	사용, Ap에 연결하는 것 )

Multiple hop: 무선통신이 여러개의 hop을 거쳐서 통신하는것 ( Vanet -> 차 끼리 통신 )

AP들을 유선으로 연결하지않고 서로서로 다 무선으로 연결하는 네트워크 모양을
**Wireless Mesh network**라고한다.

특정 패턴이 존재하지 않기 때문에 Mesh라고 한다!

---
### 무선링크의 특징

1. 무선신호는 거리가 멀면 멀수록 힘이 떨어진다. ( d^2 ~ d^4에따라서 에너지가 줄어든다 )
2. 다른소스로 부터 간섭이 많이 생길 수 있다.
3. 신호가 전파되는 경로가 다양하게 있다.
이거의 좋은점은 신호가 전파되는 경로가 여러가지 있어서 장애물이 있어도 신호가 도달할 수 있다.
나쁜점으로는 신호가 전달되는 경로상에서 충돌이 생길 수 있다.

4. 신호가 날아갈때는 SNR(Signal to Noise) SNR이 크다는 것은 잡음대비 signal의 크기가 크다는 의미이기 때문에 좋은 것이다.
BER가 작으면 작을수록 좋다. ( 신호의 세기가 커질 수록 BER가 낮아지는데 이는 좋아진다는 것이다 !! ) => 현실적으로 신호의 세기가 크면 그만큼 잘들린다고 생각해보면 에러가 작다는 것이다.

5. 데이터를 전송하는데 위상변화를 시켜서 하나의 신호에 여러개의 비트를 담을 수 도있다.
위상변화 및 주파수변화로 인한 데이터 전송
=> 신호의 세기가 클 수록 점의 갯수를 많이 사용하는데, 이 보내는 신호의 변화가 차이가 거의 없다면 노이즈가 조금이라도 생긴다면 상대방은 데이터 구별하기가 힘들 것이다.

### Hidden terminal problem
A가 보내는 신호가 C까지 갈수없다. 즉 A는 C의 존재를, C는 A의 존재를 알 수 없다.
A에서 B까지 데이터를 전송하려고 할때 C는 A의 존재를 모르기때문에 B에게 데이터를 보낼 수 있다고 판단하여 C가 데이터를 전송한다면 A와 C는 충돌이생긴다.

---
### FDMA CDMA

FDMA : 주파수 분할하여 다른 채널로 할당
TDMA: 시간을 나눠서 호스트들에게 할당
CDMA : 서로서로 다른 Code를 node들이 할당되는데 이때의 code는 서로에게 간섭을 취하지 않는다. 누군가가 데이터를 보낼때 데이터와 code를 오퍼레이션취해서 데이터를 보내는데 수신자입장에서 code를 확인하여 누가 보낸 데이터인지 식별이 가능하다.

요즘은 OFDM 방식을 많이 사용한다.

Orthogonal frequency  : 서로 직교한 주파수를 채널로 잘라서 데이터를 동시에 보내는 기술이다.

---
무선랜은 주로 switch들을 통해서 AP들이 연결되어있는데 AP마다 하나의 Basic Service Set을 구성한다.

모바일기기는 AP로부터 becon frames들을 받을 수 있다. AP들도 마찬가지로 인접한 Ap들 끼리는 주파수채널이 달라져야한다.

AP,AP마다 고유한 MAC address가 있다, 그리고 AP마다 특정 채널을 사용을 하는데, BSS을 구별하기 위해서 고유한 id를 가지고 있는데 becon frame에 이러한 id(SSID)와 MAC address를 담아서 보낸다.

단말기는 AP로부터 beacon frames들을 받아서 AP들과 Association을 맺는데, 이 Association을 맺는다고해서 바로 통신이 가능한 것은 아니다.
Authentication 과정을 거쳐야만 통신서비스를 위한 Ip address를 얻는다

1) passive scanning : 단말기가 기다리고 있으면 AP로 부터 beacon frame이 온다
2) active scanning : 기다리는게 아니, 단말기가 먼저 beacon frame을 AP들에게 요청을 하는 방식


---

#### Multiple access

유선과 무선에서는 CSMA를 동일하게 사용을 한다.
(Listen before transmit -> 일단 데이터를 전송하기 전에 carrier sense를 해보는 것 )

하지만 collision detecion을 하기는 어렵다 !! 

왜? 전송을 하는 신호자체는 신호가 강하지만 수신을 할 때는 신호가 약하기 때문이다.
그렇기 때문에 신호를 감지하기가 힘들어서 충돌을 감지하기가 힘들다.(Collision deteciton x )

대신에 **Collision Avoidance**를 하자 !!

---
#### CSMA / CA
1. 데이터를 전송하기 전 DIFS 시간동안 IDLE한지 확인한다
=> IDLE하면 데이터를 전송한다.
2. Chanel이 busy하다면 random하게 backoff time을 설정하여 기다린다.
3. time이 지나면 데이터를 바로 보내는건가??
=> 정확히말하면 DIFS시간동안 기다린 후에 바로 데이터를 보내는 것이 아니고 Mini slot 시간을 랜덤하게 설정한후에 Mini slot 시간이 0 이 된 호스트부터 데이터를 전송한다.
5. data를 보내게 되면 ACK을 받아야하는데 ACK을 받지 못한다면 데이터가 정상적으로 전송된 것이 아니기 때문에 random back off time을 기다린다.
이때 random back off time은 2배가 늘어난다.

수신자의 입장에서 Data를 받으면 SIFS 시간동안 기다렸다가 ACK을 보내게 된다.


---
* **무선에서는 데이터를 보내고 데이터에 대한 ACK이 오지않으면 충돌이 났다고 판단**한다.
* **반면 유선에서는 데이터를 보낸 신호와 받은 신호가 다르면 충돌이 났다고 판단**한다.

두개의 다른 차이점!!
---
**Q. DIFS 시간보다 SIFS 시간을 짧게하는 이유?**

데이터를 보내고 나서는 ACK을 보내야하는데 ACK을 보낼 때 또한 채널을 누가 사용하고 있는지 확인을 하는 작업이 필요하다. ACK을 보내는 호스트에게 데이터를 보내는 호스트 보다 우선순위를 주기 위해 ACK을 전송하는데 기다리는 시간(SIFS)을 짧게 준 것이다.

* RTS CTS를 이용하여 Hidden terminal problem을 해결
=> 데이터를 보내고 싶은 사람이 수신자에게 RTS를 보낸다. 수신자는 RTS를 수신받으면 CTS를 연결된 호스트들에게 전부 보내게 된다. 그러면 CTS를 수신받은 호스트들 중에 RTS를 이전에 보낸 호스트가 있을텐데, 그 호스트는 데이터를 보내도 좋다고 생각하여 데이터를 보내게 된다.
하지만 다른 호스트의 입장에서는 RTS를 아직 보내지도 않았는데 CTS를 받았다고 하면 데이터를 현재 보내면 안된다는 것을 알 수 있을 것이다. 

---

**Q. 무선랜에서 frame의 format에서는 왜 다양한 address들을 이용하는가??**

무선은 AP를 거쳐야하기 때문에 일단 단말기는 AP에게 먼저 전송을 해주어야 한다.

유선은 반면에 라우터에게 바로 보내면 되기 때문에 Destination, Source address 둘다 필요하다.

1. 일단 frame에  AP MAC  address가 들어가고, 자신 모바일 기기의 Mac address도 들어가고, 라우터의 MAC address가 담겨서 프레임을 전송하게 된다.
[image:711CFCA8-5809-4CA2-ABFD-B39A65716BAE-464-000037CB49BB5E03/스크린샷 2021-06-08 오후 4.24.51.png]

2. 
[image:7732E63F-1443-420B-836D-CD271819E37D-464-000037D399EBD058/스크린샷 2021-06-08 오후 4.25.26.png]

AP와 라우터는 유선으로 연결되어있기 떄문에 ethernet frame이다 !

---
### 단말기가 BBS에서 다른 BBS로 이동했을때 서비스를 받을 수 있는 이유?

똑같은 IP subnet이라는 점에서 **스위치 입장에서 단말기가 어디에 있는지 알 수 있기 때문**이다. 
어떻게 ? Self-Learning 때문에 이게 가능하다 !! 
( 스위치 입장에서 단말기에서 보내는 메세지를 수신하면서 단말기가 현재 어디서 메세지를 보내고 있는지 알 수 있기 떄문이다 - Self Learning )

---
### 802.11에서의 Rate adapation(advanced capabilities)

802.11은 무선을 의미한다. 이는 Rate adaptation를 하는데 이는 서로간의 신호세기를 측정해서, 신호가 세면 좀 더 좋은 coding 방식을 사용해서 데이터를 많이 보내고 신호가 약하면 데이터를 적게 보내는 방식 
---
### 802.11에서의 Power management(advanced capabilities)

Power를 아끼는것은 아예 통신에 참여 자체를 하지않는 것을 의미한다.

단말기에는 Sleep모드가 있고 Awake 모드가 존재한다.
평소에는 Sleep모드로 유지를 한다.
데이터를 보내려고 할때 Sleep모드에서 깨어나서 데이터를 보내면 되는데 
데이터를 받으려고 할때 Sleep모드라서 못받을 것이다.. 수신 host가 sleep모드라서 AP가 host에게 데이터를 전송하지 못하는 상태라면 AP의 버퍼에다가 데이터를 버퍼링 해놓는다. 그러다가 AP가 주기적으로 becone message를 단말기들에게 보내는데, 이떄 단말기들은 Awake모드로 변경이 된다. 그러면 이때 단말기들이 AP의 버퍼에 있는 데이터를 확인하면서 필요한 데이터를 수신받게 된다.

---
블루투스는 케이블을 대체하기 위한 것으로 만들어졌다.
Ad hoc mode !! -> no infrastructure..

Master / slave 관계로 동작을 한다
79개의 주파수 대역으로 나누었다.
---
### 셀룰러 네트워크

넓은 영역으로 모바일 인터넷을 사용하기 위해서 만든 해결법이다.

유선인터넷과의 비슷한점은 
1. edge / core로 분리된다.
2. 셀룰러 네트워크들끼리 네트워크를 구성하여있다
3. 다양한 프로토콜들을 사용한다

유선인터넷과의 차이점은
1. 당연히 무선서비스를 받는다. 
2. 이동을 최우선으로 한다
3. SIM card를 사용해서 사용자를 식별한다

---
### 셀룰러망의 구성요소들 ( 중요 )

1G : 아날로그
2G:  디지털 하지만 보이스 위주
3G:  디지털 보이스(circuit 망 사용)에 data(packet 망 사용)까지 전송이 가능하다
4G:  죄다 Packet망으로 사용하여 voice와 data를 전송했다.


1. Mobile Device : SIM 카드를 통해서 디바이스들을 구분할 수 있다.
2. Base station : 기지국 당 하나의 셀을 담당한다. WIFI에서의 AP와 비슷한 역할
3. Home subscriber Service : 모바일 디바이스에 대한 정보를 저장하는 곳
HSS는 Mobility Management Entity와 함께 작동을 하는데, authentication(검증 과정을 함께 한다)
4. S-GW, P-GW : 실제로 데이터를 보낼때는 S-GW를 거쳐서 P-GW를 통해 외부망으로 나간다. S-GW(내부에서 처리하는 Gateway), P-GW(외부망으로 연결해주는 gateway)
5. Mobility Management Entity : handover(Cell에서 다른 Cell로 이동한다 한들 서비스를 계속해서 제공을 해주는 기능)


Data plane : 그저 데이터를 전송하는 부분을 의미(S-GW를 거쳐 P-GW를 통해)
Control plane : data를 날려 보내기 위해 추가적인 작업을 하는 부분을 의미한다.
(단말기를 찾거나, 검증과정을 거치거나.. )

OFDM을 사용한다 !! -> 서로 간섭을 일으키지 않는 주파수로 나눠서 데이터와 함께 전달하는 기술 ( LTE 에서 사용한다 )

근데 기지국에 오면 기지국에 맞는 프로토콜 계층들을 사용 ( 안중요 )

---
### 셀룰러에서 Base station과 associating 하는 과정

1. 기지국에서 자신의 정보를 단말기들에게 계속해서 동기화 신호를 보내서 자신이 누군지 알려준다.
2. 단말기는 기지국에서 보낸 첫번째 Primary 동기화 신호를 받으면 2번째 동기화 신호를 확인하는데 거기는 기지국에 대한 여러가지 정보들이 담겨져있다.
3. 단말기는 여러 기지국 중 하나를 선택하고 이후에 검증과정 등 필요한 과정을 진행한다.

---
### Global cellar network

셀 단위로 서비스를 해주는 영역을 묶은 것

모바일기기에 대한 정보를 Home mobile carrier network에 저장이 되어있다.
( 여기에 있는 HSS에 정보들이 저장이 된다 )

한 네트워크에서 다른 네트워크로 이동을 하는 것을 roaming이라고 한다!
(사업자를 달리 할때 쓰는 용어)

1세대는 아날로그 통신 (FDMA)
2세대는 디지털 통신(TDMA)
3세대는 voice(CS) + data(PS) 를 함께 보낸다.
4세대는 All IP 서비스
6세대는 AI를 탑재

---
주파수가 커지면 wave length가 짧아지고,  셀 사이즈가 작아진다. 기지국의 수가 많아진다.

5G의 특징으로는 주파수를 두 가지로 나누었다.(하나는 상대적으로 고주파 주파수를 사용했다)
Millimeter wave 사용
5G는 4G에 비해 호환성이 없다.

**MIMO** : 안테나를 여러개 사용함으로서 **주어진 시간안에 데이터를 더 빨리 보낼 수 있다** !  또한 **안테나 한개가 고장이나면 다른 안테나를 이용함으로서 데이터를 좀 더 안전하게 보낼 확률이 증가**한다.


---
#### Mobility?

이동한다는 말로, 차타고 막 이동하거나 기차타고 이동하면서 서비스를 받을 수 있는 것

#### 단말기가 이동하는 것에 대한 문제점?

단말기 A가 이동을 하면 IP주소가 바뀌게 될텐데, 누군가가 A에게 데이터를 전송하려고 해도 A가 이동을 통해서 주소가 바뀌기 때문에 데이터가 정상적으로 수신이 될 수가 없다.

첫번째 해결방법 ?
1) Longest prefix matching을 통해서 해결해 줄 수 있지 않을까?
=> 단말기들이 자신이 이동을 할때마다 IP가 변경된다고 라우터들에게 알려줄 수 있다.
가능은 하지만 **scable 하지가 않다**. Mobiles의 갯수가 엄청나게 증가를 해버리면 불가능한 방법이다. 
이동 단말 하나하나가 움직일때마다 네트워크에게 알려준다면 처리하기가 쉽지 않을 것이다.

2) Indirect routing 방법 : 상대방이 나와 커뮤니케이션을 하기 위해선는 home network를 거쳐야하는데, 이때 home network에서 모바일기기쪽으로 forwarding 해준다. ( Home network안의 Home subscriber server에 내 정보가 저장 되어 있다 )

3) direct routing 방법 : 상대방이 직접 mobile의 foreign address를 얻어서 직접 데이터를 mobile쪽을 보내는 방식이다.

---

### 59P

1) 상대방이 home network쪽을 데이터를 보내게되는데, Home network에서 내가 있는 visited network 쪽 gateway에게 데이터를 전송하여 나에게 데이터를 전송해준다. - > **indirect 방식**

2) 상대방이 home network 쪽에게 모바일기기가 어디 네트워크에 위치해있는지 직접 적으로 물어보고 주소를 얻은뒤에 직접 데이터를 전송하는 방식이 **direct 방식**이다.

---

단말기마다 perment ip 주소를 가지고 있는데 이는 변경이 될 수 없다.(IMSI SIM카드로서 고유적인 식별번호이다.)

하지만 **NAT**라는 새로운 네트워크로 이동을 하면 새로운 망에 맞는 주소를 따로 할당 받게 되는데 이를 받는 과정은 다음과 같다.

1) 이동을 하게되면 주소를 할당받고 mobility manager와 assocation을 하게 된다.
2) Mobility Manager가 hss에게 단말기가 현재 이 네트워크에 있다고 알린다

---
### indirect routing 문제 ( triangle routing ) 그리고 direct routing이 필요한 이유

데이터를 전송하려는 상대방과 mobiler기기가 서로 다른 네트워크에 존재한다면 indircet routing을 하는데는 비효율적이지는 않는다.

다만 데이터를 전송하려는 상대방과 mobile 기기가 서로 같은 네트워크에 존재한다면 굳이 데이터를 전송하는데 HSS를 거쳐서 데이터를 전송할 필요가 없을 것이다..
Direct routing을 통해서 데이터를 전송하게 된다면 HSS를 거칠 필요가 없이 데이터를 보낼 수 있다.

=> triangle routing 문제라고 한다.

----

#### mobile IP 프로토콜 ( 이전에 했던것과 비슷하다 )

1) 단말기가 새로운 네트워크에 오면 base station과 association을 맺는다.
2) mobility manager가 hss에게 establish한다. => control plane에 해당한다.
3) data들을 전송시킬 수 있는 하나의 터널을 만든다.
4) mobile 기기가 visited network안의 cell에서 다른 cell로 이동하는 경우를 handover라고 한다.

이 셀 안에서 막 이동하는 것을 handover이라고 한다.
handover를 할때 어떻게 네트워크 서비스를 계속해서 받을 수 있을까?


---

### 네트워크의 이동이 아니라, 네트워크 내부에서 의 Cell 이동(HandOver) 처리

1) 지금 나에게 서비스 하고있는 base station(source 기지국)이 target BS(다른 기지국)에게 handover request를 보낸다.
2) target BS가 1)에대한 ACK을 보낸다.
3) 그리고 source base station이 단말기에게 새로운 BS정보를 전송해준다.
4) source BS의 서비스를 멈추고 새로운 BS에게 서비스 권한을 넘겨준다.
5) 새로운 BS이 MME에게 pgw-sgw로 오는 데이터를 자신에게 보내야한다고 요청을 한다.
6) target bs가 source bs에게 ACK을 보냄으로서 자원을 릴리즈하라고 알려준다.
7) 이제 새로운 터널을 거쳐서 모바일 기기에게 데이터가 전송이 된다.
