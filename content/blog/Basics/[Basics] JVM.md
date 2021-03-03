---
title : '[Basics] JVM ?'
date : 2021-03-03 10:22:12
category : 'Basics'
draft : false
description : "JVM에 대하여"
tags : ['Java']
---

JVM 용어에 대하여 정리를 해보려고 합니다.


### JVM

JVM은 Java Virtual Machine이라고 하며, 말 그대로 자바 가상 머신을 의미합니다. 

=> 가상머신은 프로그램의 실행하기 위해 물리적 머신과 유사한 머신을 소프트웨어로 구현한 것을 의미합니다.

JVM이 JAVA의 'Write once, run everywhere'로서 OS마다 코드를 작성해야 하는 번거로움 없이 크로스플랫폼 이익을 취할 수 있도록 해줍니다.

자세한 특징은 아래에 작성하였습니다.

---

#### JVM 정의

1. JAVA와 OS사이에서 중개자 역할을 하며 JAVA가 OS에 구해받지 않고 사용을 가능하도록 해줍니다.
2. *메모리 관리,Garbage Collection*을 수행 해줍니다.
3. 스택기반의 가상머신
4. 자바 애플리케이션을 Class loader를 통해 읽어 들여 자바 API와 함께 실행합니다.


---

#### JAVA 실행과정

1. `JVM`이 OS로부터 프로그램이 필요하는 메모리를 할당합니다.
2. 자바 컴파일러(`javac`)가 자바 소스코드(.java)를 읽어들여 자바 바이트코드(.class)로 변환을 해줍니다.
3. `Class Loader`를 통해 class파일을 JVM으로 로딩합니다.
4. 로딩된 Class파일들을 `Execution Engine`을 통해 해석을 합니다.
5. 해석된 바이트코드(.class)는 `Runtime Data Areas`에 배치되어 실질적인 수행을 합니다.

---

### JVM 구성요소

[JVM사진추가]


* Class Loader : JVM내로 클래스파일을 로드하고 JVM에 Link되어 메모리에 로딩이 되는데, 동적 클래스 로딩이 이루어지는 곳입니다.
JVM은 클래스에 대한 정보를 알지 못하여서, 그 클래스 정보를 Class Loader가 Class 파일을 찾아 검사하고 메모리에 저장을 합니다.

* Runtime Data Area : 프로그램을 수행하기 위해 OS에 할당 받은 메모리 공간을 의미합니다.
 1. Method Area: 클래스 멤버 변수의 이름, 데이터 타입, 접근 제어자의 정보같은 필드 정보, 메소드 이름,리턴 타입,파라미터, 접근제어자 정보, Constant Pool, static 변수,final class 변수등이 저장되는 곳입니다.
   
 2. Heap Area: new 키워드로 생성된 객체와 배열이 생성되는 영역입니다. 메소드 영역에 로드된 클래스만 생성이 가능하고 GC가 참조되지 않는 메모리를 확인하고 제거하는 영역입니다.
   
 3. Stack Area: 지역변수, 파라미터, 리턴 값, 연산에 사용되는 임시 값 등이 생성되는 영역입니다.
        
        int num=11; 이면 메모리공간을 num이라고 잡고 num 메모리에 11이라는 값이 들어갑니다.
        
        Member member = new Member();라고 소스를 실행했다면, Member member는 Stack이 아닌 `Heap Area`에 저장이 됩니다.

 4. PC Register: 쓰레드가 생성될 때마다 생성되는 영역으로 Program Counter가 가리키고 있는 쓰레드의 주소와 명령어를 저장하고있는 영역입니다.
 이것을 이용해서 쓰레드를 돌아가면서 수행할 수 있게 합니다.

 5. Native Method Stack: 자바 외 언어로 작성된 네이티브 코드를 위한 메모리 영역입니다.
    
* Execution Engine: Class Load작업 후에 바이트코드(.class)는 Runtime Data Area에 배치됩니다. JVM은 `Method Area`의 바이트코드를 Execution Engine에게 제공하여 Class에 정의된 내용대로 실행을 합니다.

실행 방식에는 명령어단위로 실행을 하는데, 명령어 단위 실행에는 2가지 방식이 있습니다.

1) Interpretation : 명령어를 하나씩 수행하는 방식 입니다. 전체 수행 시간이 느립니다.
2) JIT(Just In Time Compiler) : 전체 바이트 코드를 기계어로 변환을 하여 하나 하나씩 인터프리션을 하지않고, 기계어 코드를 실행하는 방식입니다.


* Garbage Collector : Heap 영역에 생성된 객체들 중에 참조되지 않은 객체들을 제거하는 역할을 합니다. GC의 동작시간은 일정하게 정해져 있지 않기 때문에 언제 객체를 정리할지는 알 수가 없습니다. 즉, 참조가 없어지자마자 GC가 작동하는 것은 아닙니다. GC를 수행하는 동안 GC Thread를 제외한 다른 모든 Thread는 일시정지상태가 됩니다. 



--

[참조 URL1](https://jeong-pro.tistory.com/148)