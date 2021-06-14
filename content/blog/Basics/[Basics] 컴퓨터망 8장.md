---
title : '[Basics] 컴퓨터망 8장'
date : 2021-06-14 21:22:12
category : 'Basics'
draft : false
description : "컴퓨터망 8장 정리"
tags : ['Basics']
---


# 컴퓨터망 8장
1. Confidentiality(은닉화) : 보내는 사람과 받는사람만 message를 알 수있도록 메세지가 은닉화 되어야한다.
2. Authentication : 보내느사람과 받는사람이 서로의 identity를 확인할 수 있는 의미
3. Message integrity : 메세지의 내용은 변함이 없어야 한다
4. Access and availability : 여러가지 서비스들이 accessible 해야만 하고 유저들이 사용해야 한다.


---
## bad guys가 하는 짓들??

1. Eavesdrop : 메세지를 도청
2. 메세지를 임의로 전송을 하는것
3. 마치 다른사람이 데이터를 보내는 것 처럼 위장
4. 데이터를 중간에서 가로채는 것
5. Dos: 서버는 정상적으로 작동하되, 서비스 요청을 과도하게 함으로서 서비스가 정상적으로 제공하지 못하도록 한다.
---
(안중요)
Cipher-text only attack : ciphertext에 다양한 attack이 있을 수 있다. 
Known-plaintext attack : 일부 plaintext의 내용을 알고 있음으로서, 해킹을 시도하여 다른내용을 알 수 있다.
Chosen-plaintext attack: 하나의 임의의 문장을 선택해서 그것을 decrypt하여 나머지 문장들도 decrypt하는 것이다.

---
### Symmetric key cryptography
암호화를 하는키와 복호화를 하는 키를 동일하게 하는 것
이때 사용하는 키는 대칭키로서, 송신자와 수신자만 알아야하는 secret key 이다.

m=ks(ks(m))

여기서 key라는 것은 어떤것인가? => **substitution cipher** 라는 매핑테이블을 의미한다. 

또한 substitution cipher를 여러개 가짐으로서 여러가지 mapping table을 사용하는 것이다.

DES라고 하는 것이 있는데 미국에서 표준으로 만들어놓은 Symmetric key crpto 방식이라고 한다. 56bit의 symmetric key를 사용하여 64 bit plain text를 뽑아내는 방식이다.

AES는 DES의 좀더 향상된 방식으로서 key size가 좀 더 크다.

---
### public Key cryptography

근데 어떻게 보내는 사람과 받는사람이 동일한 키를 가지고 있을 수 있을까?

이러한 의문점으로 인해 생겨난 것이 public key cryptography 방식이 생겨났다.

Public key : 다른사람들에게 공개를 한 키
Private key : 나만 알고있는 키

Public key를 통해서 encrytpion을 하여 다른사람들이 메세지를 보내게 되면, private key(나만 가지고있는 키)를 통해서 decryption을 하여 메세지를 해석 할 수 있다.

[image:07669530-E88F-4F40-9597-8E09E21656A6-464-0000632B0D1313B6/스크린샷 2021-06-10 오전 2.14.52.png]

---
### RSA 알고리즘

그럼 이러한 public key로 암호화를하고 Private key로 복호하를 하는 알고리즘이 필요할 것인데 이러한 알고리즘을 **RSA 알고리즘**이라고한다.

RSA 알고리즘은 공개되어있는 public ket로 부터 private key를 만들수 없어야 한다!!

RSA 알고리즘은 modular 연산을 진행한다.
메세지라는 것 자체가 **bit pattern** 이기 때문에 RSA 연산 modular가 가능하다.


RSA 알고리즘은 message에 공개키를 지수화하여 encrypt message를 만들고, decrypt를 할때도 비밀키로 지수화하여 모듈화하여 decrypt message를 만든다.
[image:3F8997A1-164D-44C6-A93D-7D0284FA1688-458-000001399CA6BE83/스크린샷 2021-06-10 오후 1.11.38.png]


=> 지수화 연산을 하기 때문에 시간이 매우 오래 걸린다는 단점이 있다.
RSA보다 DES(Symmetric) 방식이 100배 더 빠르다.

그러므로 긴메시지를 보내야한다면 **DES 방식**을 사용하고, 짧은 메세지를 전송 해야한다면 **RSA 방식**을 사용해서 보낸다.

근데 Alice가 Bob에게 대칭키를 어떻게 전달을 하는가???
이때 전달을 할 때 RSA 방식(public key로 encryption) 을 이용하여 대칭키를 전송한다. ( key 데이터가 메세지보다 짧기 때문에 대칭키를 전송해도 상관없다 )

일단 Alice가 만든 symmetric key를 bob의 Public key로 encryption하고, bob에게 전송을 한다.  bob이 이것을 받아서 private key로 decryption 을 하면 alice의 symmetric key를 수신받을 수 있을 것이다.

근데 RSA의 특징 중 한가지 더는 public key로 decryption을 하고 private key로 encryption을 하던, private key로 decryption하고 public key로 encryption해도 결과는 같다!
---
#### Authentication

1. alice가 그냥 자기라고 bob에게 알려주는 것은 적합한 방법이 아니다. trudy가 자신이 그냥 alice라고 말하면 되기 때문
2. alice가 자신의 Ip address를 보여주면서 bob에게 자신임을 알리는 방식 또한 안된다.
trudy가 spoofing을 통해서 자신의 ip address를 조작할 수 있기 때문이다.
3. pasword를 enryption하여 보내는 것은 ?? => 의미가 없다… 결국엔 암호화를 한 패스워드를 결국엔 전부 다 기록해놓고 밥에게 앨리스인척하여 보내기 때문

그럼 어떻게 ??

**Nonce** 라는 것을 사용한다 !!

오직 한순간에만 사용할 수 있는 숫자를 nonce라고 한다. 

이를 이용해서 앨리스는 밥이 요청한 Nonce를 암호화(Symmetric key)하여 밥에게 다시 전송을 해줌으로서 autanticaton 한다.
트루디는 트래픽을 관찰하면서 Nonce를 기록해서 재사용을 하려고해도 Nonce는 딱 한번만 사용할 수 있는 숫자이기 때문에 재사용이 불가능하다.

---
### 위에서 symmetric key로 암호화를 하였는데, public key를 사용할 수 있을까?

앨리스가 자신의 Private key로 암호화여 밥에게 메세지를 전송한다.

밥은 앨리스의 public key로 복호화하여 nonce를 확인한다 !

이게 자신의 요청한 nonce와 같으면 Alice임이 입증된다.

---

#### 문제점??

Man in the mirror attack ??

Trudy가 중간에 딱 있어서 앨리스에게는 밥인척, 밥에게는 앨리스인척하는 문제점이 있다..

---

## 디지털 서명
보내는 문서가 누가보냈는지 알려면 어떻게 해야하는가?
=> 디지털 서명을 적는다.

M이라는 메세지를 보내는 사람(Bob)의 private key를 가지고 암호화를 한다.
이때 나온 cypertext와 plaintext를 같이 전송을 한다.

Alice는 Bob의 public key로 cypertext를 복호화하여 Plaintext와 일치하는지 비교한다
=> 내용이 같다면 밥이 보냈다는 것을 증명이 되기 때문에 디지털 서명을 했다 라고 판단한다 !

근데 문제는 ? Public key를 사용하면 encryption을 하면 시간이 너무 많이 걸려서 오버헤드가 걸리지 않는가..? => 문제점!

**Message digest**를 만들어서 보내려고 하는 메세지를 짧게 만들어 버린다!

Large message를 **hashfunction**을 이용하여 짧은 메세지를 만들어버린다.
=> Message digest(짧은 메세지)

여기서 사용하는 hashfucntion은 ??
주어진 메세지 digest로 부터 다시 m을 찾을 수 없도록 하는 hashfuntion을 이용한다
Ex) MD-5, SHA-1  ( 외울 필요 x )

### Message digest의 전송
1) 송신측에서는 Message의 원본과, Message를 digeset로 만들어서 자신의 private key로 암호화하여 상대방에게 전송을 한다.

2) 상대방은 받은 메세지를 hashfunction을 사용하여 digest로 만들고, 받은 암호화문을 상대방의 publickey로 복호화하여 나온 Diget와 비교를 해본다.

---
Man in the mirror 문제를 다시 한번 살펴보자.

밥은 앨리스에게 nonce를 보낸다, 트루디가 중간에서 nonce를 자신의 Private key로 암호화하여 밥에게 전송을하는데, 이때 밥은 앨리스인줄알고 트루디에게 public keyf를 요청해서 전달 받는다.
근데 밥은 이게 실제로 앨리스의 Public key인지 어떻게 확신을 할 수 있을 까?

=> CA라는 공인인증기관에서 상대방의 public key를 발급받을 수 있다.
CA라는 믿음직한 기관에서 받은 key라면 믿을 수 있을 것이다.

Public key를 공인기관에 저장(발급)을 하기 위해서는 자신의 키를 CA의 private key로 암호화를 하여 CA가 가지고 있다.
공인인증키를 받기 위해서는 **CA의 public key**로 복호화를 하면 된다.

다른사람들의 public key를 확인하기 위해서는 CA에서 certficate를 뽑아내서 CA의 public key로 복호화하여 확인해본다

---
### Secure하게 email 보내기 => 다시들어보기

중요 !!!

1. Confidentiality를 보장하는 것


2. Message integrety와 Authentication


3. 위의 세가지를 전부 다 보장하는 방법
[image:AE323B0C-0451-4E51-BF58-E7E5D3FD7E2F-458-0000443664C1FA80/스크린샷 2021-06-12 오후 6.08.22.png]

이거에 대한 밥의 입장을 그림으로 그려야하는 것.. 등 1,2번을 그림으로 그려야할 수 도 있다

---
### transport layer에서의 secure

우리는 앞에서 application 계층에서의 secure에 대해 배웠는데, transport layer(end-to-end)에서 secure를 제공하는 방법은??
A. TLS Layer를 TCP 계층 위에 올린다.

### TLS에서의 제공하는 기능
Confidentiality : 는 symmetric encryption을 사용(대칭키)
Integrity : cryptographic hashing(message digest를 만들어서 hashing 해서 비교하는 것)
Authentication : public key를 사용한 암호화

#### TLS 과정 !!! ( 중요 )
1. Handshake : 서로의 존재에 대해서 authenticate 한다. 그러고나서 shared secret key를 만든다.
2. Key derivation : 이 Key를 방향별로 derivation 한다. ( 키를 encryption 용 , decryption 용으로 derivation 한다 ) - MAC용키와 encryption용 키 
3. 데이터 전송
4. Connection closure


데이터를 보낼때, TCP 입장에서 레코드단위로 잘라서 보내기 때문에 레코드 단위마다 MAC(message autentication code)를 붙여서 전송을한다. MAC을 붙이는 이유는 authenticaiton을 위함이다 !

데이터의 순서를 무작위로 변경하는 짓을 방지하기위해서 `TLS-seq`를 사용하고
Nonce를 사용하여 Replay 공격을 방지한다

Truncation attack : 아직 전달 받아야하는 데이터도 많은데 강제로 연결을 끝내는 것을 의미
=> record data에 type을 추가시켜서 암호화를 시켜버린다. ( 0 이면 데이터 1 이면 연결 종료 와 같은 ? )

---
### network layer에서의 secure

datagram에서의 secure을 의미한다.
Packet header + payload로 구성이 되어있음

1) transport mode: 헤더는 그대로 있고 payload 만이 encryption 하는 것
2) tunnel mode : 통째로 encryption 하는것(헤더 + payload)

AH 프로토콜, ESP 프로토콜 이렇게 두개가 정의 되어있다.

데이터를 전송하기 전에 **securtiy associaiton(SA)**를 **sending entity에 구축을 해야하는데, 이 SA의 R1(입구 라우터)**에 SPI라는 값을 두어서 메세지에 대한 encryption, authentication key 등 다양한 보안정보들이 DB에 저장이 되어있다.

이 DB는 무엇인가?

일단 라우터(R1) 입장에서 데이터를 받았을때 encryption을 해야하나 말아야하나를 결정해야하는데 이러한 결정은 SPD라는 DB를 조회하여 결정한다.
만약 SPD를 조회하여 보안처리를 해야된다고 결정을 하면구체적으로 어떻게 해서 보내야하는지는 SAD를 조회하여 결정한다.
또한 수신받은 datagram을 구체적으로 어떻게 ip sec(ip security) 처리를 해야하는지도 SAD를 보고 확인한다.


그럼 ipsec의 Association을 어떻게 해야하는가?
IPsec IKE 프로토콜을 사용한다.
---

### 무선네트워크, 모바일 네트워크에서의 Security

1) AP와 Association을 맺는다
2) Associaton을 맺는다고해서 통신이 되는것이 아니고, **Authenticaiton server**와 mobile 단말기가 authentication을 해야만 통신이 가능하다 !

=> 이거에 대한 세부 과정은 아래와 같다

1. 모바일 단말기가 요청해서 정보를 얻어오고나, AP가 BSS에 사용하는 authetication과 encryption이 어떠한 방식으로 제공이 되는지 broadcast하여 알려준다.
2. 이를 통해서 서로간에 **authentication 과정을 진행하고 서로  확인을 한다**, 그 이후에 **Symmetric session키를 derivation 한다** => Symmetric 암호화를 한다는 의미다.
=> 서로간의 authentication 과정은 hash function, nonce(prevent relay attack),secret key 공유로 이루어진다.
이러한 위의 과정이 있는 후에 symmetric session key를 derivation 한다.

즉 위의 authentication 과정은 다음과 같다.
1) nonce를 생성하여 모바일 단말기에게 전송한다
2) 모바일 단말기가 nonce를 수신받으면 그 nonce를 session key로 암호화를 하고, 자신의 nonceM을 같이 보낸다.
3) AS가 session key를 derivation 한다
3. Authentication server는 AP에게 mobile 단말기를 허용해줬다고 shared key를 derviation 한다 ( 위의 authtentication 과정에서 AS가 Symmetric session 키를 생성하기 때문 ! )
4. Mobile 단말기가 AP와 통신을 시작할 수 있다

---

### 위에는 WIFI 네트워크(AP) 였지만 셀룰러 네트워크에서는 어떻게 Security를 제공하는가?

WIFI 네트워크에서는 Authenticaiton server라는 AS가 있지만, 셀룰러 네트워크에서는 HSS와 MMS가 합쳐서 AS 역할을 대신한다.

또한 WIFI 네트워크에서는 AP가 있다면 셀룰러네트워크에는 BS가 대신 존재한다.

셀룰러 네트워크에서는 SIM card 내부에 shared key를 가질 수 있다.

Authenticaiton 과정은 똑같이 거쳐야 한다!

—> 네트워크가 와이파이가 아니라 셀룰러 네트워크를 사용을 한다면

모바일 디바이스는 AP가 아니라 BS과의 association을 맺어야 한다.

결국 앞에서 WIFI 망에서 autehntcation 하는 과정과 비슷하다 !!

그저 WIFI망과 셀룰러망에서의 차이점을 알고있자 !!

---

### Firewalls
내부 네트워크를 외부 네트워크로 부터 보호하거나, 내부 네트워크에서 외부 네트워크로 데이터를 보내는 것을 방지

#### 쓰는 이유?
1) DOS 공격을 막기 위해서 ex) SYN flooding 공격
2) data에 대한 불법접근 / 수정을 방지
3) 허용된 사용자만 access를 시키기 위해서


#### 구현방법 ?
1) stateless packet filters : 어떤 패킷은 허용하고 어떤패킷은 드랍을 하도록 하는데, 상태관리를 안한다는말은 흘러다니는 패킷을 일일히 하나씩 검사하여 패킷을 허용할지 허용하지 않을지 패킷단위로 검사를 한다는 것이다.

이때 패킷단위로 허용을 할지 말지 결정하는 정보는 패킷의 모든 헤더정보를 활용하여 결정을 한다. **Ex) source ip address, destiantion ip address**

**ACL ( Access Control List)를 보고 결정 !**

2) stateful packet filters - 무조건 packet 단위로 처리를 하는 것이 아니고, 우선 tcp connection이 우선 이루어져있는것에 대한 데이터인지 확인을 하고 데이터를 허용할지 말지 결정한다. 이때 tcp connection에 대한 정보를 확보를 한다는 점에서 state가 있다고 하는 것이다.

3) application gateways : 내부에서 데이터를 외부로 보내려고 하면, 일단 무조건 gateway 쪽으로 보내야하는데 이때 gateway를 거치치 않고 직접 데이터를 보내는 데이터는 라우터에서 필터링(드랍)을 시킨다.

#### firewall의 한계점 ( Spoofing )

주소를 멋대로 변경하여 보내는 것을 의미한다. => 라우터가 허용하는 주소로 임의로 변경을 해서 데이터를 보내거나 허용되지 않은 주소로 변경을 시켜서 데이터를 외부로 전송못하도록 한다.


### Intrusion detection systems ( IDS )

허용되지 않은 데이터가 internal로 들어오는 경우를 intrusion이라고 하는데 이를 detect하는 시스템을 의미한다.

**Deep packet inspection** 방식을 사용하여 검사를 한다 !!
=> 1) **Signature - based 방식** : 알려져있는 공격 유형을 DB에 저장을 함으로서, 이러한 공격유형을 검사하여 방지를 한다.
=> 하지만 새로운 공격유형이 들어온다면 check를 하지 못하는 문제점이 생긴다.
2)  **Anormally-detection** : 공격 유형을 하나하나 기록하는 것이 아니고, 트래픽을 분석하여 정상적인지 비정상적인 트래픽인지 분류하여 검사를 하는 방식이다.

