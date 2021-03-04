---
title : '[JAVA] Garbage Collector'
date : 2021-03-05 10:22:12
category : 'JAVA'
draft : false
description : "Garbage Collector에 대하여"
tags : ['Java']
---

JVM 구조를 공부하면서 Garbage Collector가 무엇인지 궁금하여 좀 더 공부를 진행하였습니다.

### Garbage Collector

Garbage Collector, 줄여서 GC는 힙영역에서 사용하지 않는 객체들을 제거하는 작업을 총징합니다.

객체를 제거하는 작업이 필요한 이유는 자바는 개발자가 메모리를 직접 해제해 줄 수 없는 언어이기 때문입니다.

따라서 객체를 사용하고 제거하는 기능이 필요하게 되는데 이를 GC가 수행하게 됩니다.

GC는 Minor GC, Major GC로 구분할 수 있습니다. 

```
Minor GC - Young 영역에서 발생하는 GC

Major GC - Old,Perm 영역에서 발생하는 GC

```

GC를 수행할 때는 GC를 수행하는 스레드 이외에는 모두 정지를 합니다.

이를 `Stop-the-world`라고 합니다. 

<br/>

### Young 영역

- Young 영역(Yong Generation 영역): 새롭게 생성한 객체의 대부분이 여기에 위치하게 됩니다. 대부분의 객체가 금방 접근 불가능 상태가 되기 때문에 매우 많은 객체가 Young 영역에 생성되었다가 사라지게되는데, 이때 이 영역에서 객체가 사라질때 Minor GC가 발생한다고 말합니다.

Young 영역은 `Eden` 1개, `Survivor` 2개 총 3개의 영역으로 나누어집니다.

#### Minor GC

Minor GC는 Young 영역에서 일어나며, Eden 영역이 가득참에서 부터 시작 됩니다. Eden 영역에서 참조가 남아있는 객체를 Mark하고 survivor 영역으로 복사합니다. 

그리고 Eden 영역을 비웁니다. Survivor 영역도 가득차면 같은 방식으로 다른 Survivor 영역에 복사하고 비웁니다.

이를 반복하다 보면 계속해서 살아남는 객체는 Old 영역으로 이동하게 됩니다.

두 Survivor 영역 중 하나는 반드시 비어있는 상태로 남아있어야하며, 만약 두 Survivor 영역에 모두 데이터가 존재하거나, 사용량이 0이라면 정상적인 상황은 아니라고 판단할 수 있습니다.


<br/>

### Old 영역

- Old 영역(Old Generation 영역): 접근 불가능 상태로 되지 않아 Young 영역에서 살아남은 객체가 여기로 복사되어집니다. 대부분 Young 영역보다 크게 할당하며, 크기가 큰 만큼 Young 영역보다 GC는 적게 발생합니다. 이 영역에서 객체가 사라질 때 Major GC(혹은 Full GC)가 발생한다고 말합니다.


#### Serial GC

Major GC는 Old 영역에서 일어납니다. Old영역에서는 기본적으로 `데이터가 가득차면 GC를 실행`하게 됩니다.

GC 방식은 여러가지가 있는데, 저는 일단 `Serial GC`방식에 대해 설명하려고 합니다.


처음에는, Old 영역에서 살아있는 객체를 Mark합니다. 그리고 힙의 앞부분 부터 확인하여 살아있는 것만을 남깁니다(Sweep).

이때, 메모리는 단편화 된 상태이므로 이를 힙의 가장 앞부분 부터 채워면서 모아주는 과정을 `Compaction`이라 하며 compact라고 합니다. 

그래서 `Mark-Sweep-Compaction` 알고리즘이라고 합니다.

Serial GC는 적은 메모리와 CPU 코어 개수가 적을때 사용하기 적합한 방식입니다. 

#### Parallel GC

Parallel GC는 Serial GC와 기본적인 알고리즘은 같으나, GC를 처리하는 스레드가 하나인 것에 비해 Parallel GC는 GC를 처리하는 쓰레드가 여러개입니다.

그렇기에 Serial GC보다 빠르게 객체를 처리할 수 있습니다.


#### Parallel Old GC

Parallel Old GC는 Parallel GC와 비교하여 Old 영역의 GC 알고리즘만 다릅니다.

Mark-Sweep-Compaction이 아닌 `Mark-Summary-Compaction` 알고리즘이라 하며, 

Summary 단계는 앞서 GC를 수행한 영역에 대해서 별도로 살아 있는 객체를 식별한다는 점에서 다릅니다.


---

GC가 중요한 이유는 GC 수행시 시스템이 멈추기 때문에 의도치 않은 장애의 원인이 될 수 있습니다. 

따라서 이를 위해 힙 영역을 조정하는 것을 `GC 튜닝`이라고 합니다.

대개 GC 튜닝이란 `stop-the-world`시간을 줄이는 것을 의미합니다.

<br/>

---

[참조](https://d2.naver.com/helloworld/1329)