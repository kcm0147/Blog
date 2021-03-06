---
title : '[Basics] 스레드와 프로세스의 차이점'
date : 2021-03-30 10:22:12
category : 'Basics'
draft : false
description : "스레드와 프로세스의 차이점"
tags : ['OS']
---

프로세스와 스레드에 대해 정리를 해보려고합니다.

    프로세스 : 프로그램을 메모리 상에서 실행중인 작업
    스레드 : 프로세스 안에서 실행되는 여러 흐름의 단위

기본적으로 프로세스 내부에 기본적으로 최소 1개의 스레드를 소유합니다.

<br/>

### 프로세스와 스레드 구조
  
![스크린샷 2021-03-30 오후 8 39 26](https://user-images.githubusercontent.com/57346393/112982989-164af600-9198-11eb-9bee-6a217a98fab0.png)

1. Code : 코드 자체를 구성하는 메모리 영역(프로그램 소스 코드)
2. Data : 전역변수, 정적변수 등이 저장되는 영역
3. Heap : 동적할당시 사용되는 영역 (new(),malloc())
4. Stack : 지역변수, 매개변수, 리턴 값 (임시 메모리 영역)

* 프로세스 : 실행 중인 프로그램으로 `디스크로부터 메모리에 적재되어 CPU 할당을 받은 작업의 단위`


OS로부터 Code,Data,Stack,Heap 영역을 할당 받습니다
( 각각 별도의 메모리 영역을 할당 받는다 )

한 프로세스는 다른 프로세스의 변수나 자료구조에 접근할 수 없으며

프로세스 간의 접근을 위해서 IPC(Inter Process Connection)이 필요합니다

=> 파이프, 파일 , 소켓 등을 이용한 통신 방법

<br/>

* 스레드 : 프로세스의 실행단위, 프로세스 내에서 동작되는 여러 동작 흐름 ( 프로세스 내의 주소 공간이나 자원을 공유 할 수 있습니다 )

스레드는 Code, Data, Heap 영역을 다른 스레드와 공유하고 Stack 영역을 따로 할당 받습니다

스레드는 별도의 레지스터와 스택을 가지고 있습니다

<br/>

### PCB ( 프로세스 제어 블록 )

PCB (Process Control Block)

특정 프로세스에 대한 중요한 정보를 저장하고 있는 **커널 내의 자료구조**입니다

OS는 프로세스를 관리하기 위해 프로세스의 생성과 동시에 고유한 PCB를 생성합니다

프로세스는 CPU를 할당받아 작업을 처리하다가 프로세스 전환이 발생하면 진행하던 작업을 저장하고 CPU를 반환해야 합니다

 이떄의 작업상황을 모두 PCB에 저장하게 됩니다

PCB에 프로세스 식별자, 상태, PC(프로세스 카운터), 메모리 관리 정보 등이 저장됩니다




<br/>

### 멀티 프로세스

하나의 컴퓨터에 여러개의 CPU를 장착함으로서 하나 이상의 프로세스들을 동시에 처리할 수 있습니다.

* **장점** : 독립된 메모리 공간을 가지기 떄문에 프로세스에 문제가 생겨도 다른 프로세스에 영향을 끼치지 않습니다. 

OS차원에서 메모리 문제를 해결합니다.

* **단점** : 하지만 프로세스는 각각 독립된 메모리 영역을 가지고 있기 때문에

작업량이 많을 수록 오버헤드가 발생하고 Context Switching으로 성능이 저하됩니다.

<br/>

#### Context Switching

멀티 프로세스로 병렬적으로 작업을 처리하는 과정에서 동작 중인 프로세스가 대기하면서

해당 프로세스의 상태를 보관하고, 대기하고 있던 다음 순번의 프로세스가 동작하면서 이전에 

보관했던 프로세스 상태를 복구하는 과정을 의미합니다.

만약 무거운 작업을 진행한다면 많은 프로세스 데이터를 복구해야하기 때문에 오버헤드가 발생할 문제가 생기게 됩니다.

<br/>

### 멀티 스레드

하나의 응용 프로그램에서 여러개의 스레드를 구성해서 각 스레드가 작업을 나누어서 동시에 처리하는 것을 의미합니다.

* **장점** : 스레드는 Stack영역을 제외하고 메모리 영역을 공유한다는 점에서 자원 손실이 멀티 프로세스에 비해 적습니다.

* **단점** : 하지만 하나의 스레드가 데이터를 망가뜨리면, 모든 스레드가 멈추는 현상이 발생합니다. ( 메모리를 공유하기 때문)

Deadlock과 같은 Critical Section 기법을 통해서 공유 데이터 값을 변경하는 공간을 제어함으로서 위와 같은 문제를 대비합니다.
