---
title : '[Basics] MVC,MVP,MVVM 차이'
date : 2021-03-02 13:22:12
category : 'Basics'
draft : false
description : "MVC,MVP,MVVM 차이"
tags : ['Design Pattern']
---

Spring을 공부하면서 MVC 패턴에 대해서 들어는 보았지만, MVP, MVVM이라는 용어를 잘 알지 못해 이번기회에 정리를 해보려고 합니다.


MVC -> Model - View - Controller

MVP -> Model - View - Presenter

MVVM -> Model - View - ViewModel

이렇게 3가지 부분으로 나눔으로서 코드의 재 활용성을 높이고 불 필요한 중복을 막기 위함입니다.

Model과 View의 의존성을 어떻게 구성하고 제어하는지에 따라 각 패턴이 분류 됩니다!

### MVC 패턴

Model + View + Controller의 구조입니다.

- Model : 어플리케이션에서 사용되는 데이터와 데이터를 처리하는 부분입니다.

- View : 사용자에서 보여지는 UI부분입니다.

- Controller : 사용자의 입력을 받고 처리하는 부분입니다.

1. MVC패턴은 모든 입력을 Controller에서 처리가 됩니다.

2. 입력이 Controller로 들어오면 입력에 해당하는 Model을 업데이트 합니다.

3. Model을 나타내어줄 View를 선택하여 처리합니다.

4. View는 Model을 이용하여 화면을 나타냅니다.



* Controller는 여러개의 View를 선택하여 Model를 보여줄 수 있지만, View를 선택만하고 업데이트를 시켜주지 않기 떄문에 `Model`을 이용하여 업데이트를 하게 합니다.

이 때문에 MVC패턴은 `View와 Model간의 의존성이 높기 때문에 서로 간의 의존성을 피할 수 없다는 단점`이 있습니다.

<br/>

### MVP 패턴

Model + View + Presenter의 구조입니다.

- Model : 어플리케이션에서 사용되는 데이터와 데이터를 처리하는 부분입니다.

- View : 사용자에서 보여지는 UI부분입니다.

- Presenter : View에서 요청한 정보로 Model을 처리하여 View에게 다시 전달해주는 역할을 합니다.

MVC 패턴과는 다르게 입력이 Controller가 아닌 `View`에서 처리가 됩니다.

Presenter는 View의 인스턴스를 가지고 있어 View와 `1대1 관계`이며, 이에 해당하는 Model의 인스턴스 또한 가지고 있으므로 `View와 Model 사이의 다리역할`을 합니다.

1. View에서 입력이 처리가 됩니다.
2. View는 데이터를 Presenter에게 요청을 합니다.
3. Presenter는 Model에게 데이터를 요청 후 Model에게 데이터를 받습니다.
4. Presenter가 View에게 데이터를 응답합니다.
5. View는 Presenter에게 응답한 데이터를 이용하여 화면에 나타냅니다.

위와 같이 View->Presenter->Model / -> Presenter -> View 형식이기 떄문에

*Presenter*를 통해서 Model과 View를 완벽히 분리해준다는 장점이 있습니다.

장점 : MVC패턴과는 달리 View와 Model의 의존성이 없습니다. 

단점 : 다만 View와 Presenter가 1대1 관계이므로 이 둘(View<->Presenter)와의 의존성이 강하다는 단점이 있습니다.


<br/>

### MVVM 패턴

Model + View + View Model의 구조입니다.


- Model : 어플리케이션에서 사용되는 데이터와 데이터를 처리하는 부분입니다.

- View : 사용자에서 보여지는 UI부분입니다.

- View Model : View를 표현하기 위해 만든 Model입니다. Model과 유사하게 디자인이 됩니다.

MVVM패턴은 MVP패턴과 같이 `View`에서 입력이 처리가 됩니다.

다만 MVP패턴과의 차이점은 View와 Parameter과의 의존성, 즉 `View와의 의존성을 완전히 분리할 수 있다는 차이점`이 있습니다.

1. View를 통해 입력이 들어옵니다.
2. Command패턴으로 View Model에 입력(Action)을 전달합니다.
3. View Model은 Model에게 데이터를 요청합니다.
4. Model은 View Model에게 요청받은 데이터를 응답합니다.
5. View Model은 응답 받은 데이터를 가공하여 저장합니다.
6. View는 View Model과 Data Binding하며 화면을 나타냅니다.


MVVM패턴은 `Command 패턴` + `Data Binding` 두가지의 패턴을 조합하여 구현되었습니다.

`Command`를 통하여 View의 특정한 ViewAction(Event)와 연결을 할 수 있으며, ViewModel의 속성과 특정 View의 속성을 `Data Binding` 함으로서 ViewModel 속성이 변경될 떄마다 View를 업데이트 할 수 있습니다.

장점 : 이 두가지 패턴을 사용함으로서 View와 View Model사이의 의존성을 없앴습니다.

단점 : View Model의 설계가 쉽지 않습니다.



MVP,MVVM이 MVC 패턴에서 파생되어 나왔다고 할지라도, 어떤 것이 더 좋다고 말할 수는 없습니다. 

목적과 환경에따라서 어떤 패턴을 써야할지 생각을 하고 사용해야합니다.

이번 기회에 MVC, MVP, MVVM 에 대해서 정리를 해보았습니다.


<br/>
<br/>

---

[출처1](https://hackersstudy.tistory.com/71)

[출처2](https://beomy.tistory.com/43)



