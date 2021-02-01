---
title : '[SpringBoot] 멀티 모듈화'
date : 2021-02-01 10:22:12
category : 'SpringBoot'
draft : false
description : "SpringBoot 멀티 모듈화"
tags : ['SpringBoot']
---

#### 내용은 계속해서 추가하고 있습니다


토이 프로젝트를 진행하면서 Spring 프로젝트를 멀티 모듈로 나누는 실습을 하였기에, 

이번 글에서는 스프링 프로젝트를 멀티모듈로 나누는 방법에 대해서 알아보려고 합니다.

멀티 모듈로 나누어서 개발을 진행하는 이유는 작고 단순한 프로젝트 기능에서 시간이 지날수록 크고 

복잡한 프로젝트로 변경되면서 서비스가 커지게 되고 관리가 힘들어지기 때문에 모듈별로 나누어서

개발을 진행합니다.


### 신규 모듈 생성

기존 프로젝트에서 New->Module을 선택하여 모듈을 생성합니다.

Gradle 모듈로 생성해야하기에 Gradle -> Java -> 모듈명을 입력 후 모듈을 생성합니다

![사진1](https://user-images.githubusercontent.com/57346393/106406931-2f784480-647e-11eb-9c63-fa1f906fe4c0.png)

![사진2](https://user-images.githubusercontent.com/57346393/106406937-31da9e80-647e-11eb-89e4-0a1c27dac45b.png)


저 같은 경우는 다음과 같은 4개의 모듈을 생성하였습니다

* core

* pc-web

* admin

* batch

<br/> <br/>

### 4개의 모듈이 추가된 후의 프로젝트 구조

![사진](https://user-images.githubusercontent.com/57346393/106406941-330bcb80-647e-11eb-9913-735e5fd715dd.png)

<br/>

프로젝트의 root build 디렉터리 및 src 디렉터리 필요없으니 삭제하였습니다

setting.gardle 파일을 보시면 신규로 생성한 모듈의 내용이 추가되어있음을 확인할 수 있습니다

![사진2](https://user-images.githubusercontent.com/57346393/106407017-4d45a980-647e-11eb-9bc4-85474b0d7b08.png)


### build.gradle 수정

후의 build.gradle의 파일을 to-be 형식으로 변경하여야 합니다

<br/>

```gradle

buildscript {
    ext {
        springBootVersion = '2.4.2'
    }
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath("org.springframework.boot:spring-boot-gradle-plugin:${springBootVersion}")
    }
}

allprojects {
    repositories {
        mavenCentral()
    }
}

subprojects {
    apply plugin: 'java'
    apply plugin: 'org.springframework.boot'
    apply plugin: 'io.spring.dependency-management'

    group = 'com.gongsung.gallery'
    version = '0.0.1-SNAPSHOT'
    sourceCompatibility = '11'

    dependencies {
        implementation 'org.springframework.boot:spring-boot-starter-web'
        implementation 'org.springframework.boot:spring-boot-starter-aop'

        implementation 'org.springframework.boot:spring-boot-starter'

        // use lombok
        compileOnly 'org.projectlombok:lombok'
        annotationProcessor 'org.projectlombok:lombok'

        // commons-io
        implementation group: 'commons-io', name: 'commons-io', version: '2.6'

        // test
        testCompile group: 'junit', name: 'junit', version: '4.12'
        testImplementation 'org.springframework.boot:spring-boot-starter-test'
    }

    test {
        useJUnitPlatform()
        useJUnit()
    }
}

def executableProjects = [project(':admin'), project(':batch'), project(':pc-web')]
def jarProjects = [project(':core')]

configure(executableProjects) {
    dependencies {
        // executable projects에서 필요한 것들
    }
}

configure(jarProjects) {
    dependencies {
        // jar projects에서 필요한 것들
    }
}

project(':pc-web') {
    dependencies {
        compile project(':core')
    }
}

project(':admin') {
    dependencies {
        compile project(':core')
    }
}

project(':batch') {
    dependencies {
        compile project(':core')
    }
}


```

<br/>


root 디렉토리의 build.gradle에 sub project에 필요한 라이브러리들을 추가하였습니다

subprojects는 `settings.gradle`에 `include`된 프로젝트 전부를 관리합니다

하단의 project는 각 모듈별 의존성을 관리하는 곳입니다

만약에 모듈별로 라이브러리를 적용하고 싶으시면, 모듈 내부의 build.gradle에 의존성을 추가해도 됩니다


```gradle

project(':pc-web') {
    dependencies {
        compile project(':core')
    }
}

project(':admin') {
    dependencies {
        compile project(':core')
    }
}

project(':batch') {
    dependencies {
        compile project(':core')
    }
}


```

또한 build.gradle에서 위의 코드 내부에 각 모듈별 적용될 라이브러리를 선언할 수 있습니다.

저는 core 모듈을 다른 모듈에서 공통적으로 사용할 domain 등 클래스를 모아놓은 모듈로 설정하였기 때문에

각 모듈에 `compile project(`:core`)`를 넣었습니다

또한 core 모듈은 jar 파일을 실행하지 않기 위해서 core 모듈 내부에 build.gradle에 이를 추가하였습니다

<br/>

```gradle

bootJar{
    enabled=false
}

jar{
    enabled=true
}


```

여기까지 진행하셨으면 모듈 설정은 완료되었습니다

저는 모듈별 실행을 할 때 `gradle :모듈이름:bootRun`으로 실행하여 모듈별 확인을 하였습니다

전체실행을 하려면 `gradle bootRun`을 하면 정상적인 실행이 됩니다

각 모듈 별 Application을 만드셔서 테스트하시면 성공적으로 작동하는 것을 볼 수있습니다.



