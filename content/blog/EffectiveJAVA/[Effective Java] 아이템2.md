---
title : '[Effective Java] 아이템2 생성자에 매개변수가 많다면 빌더를 고려하라'
date : 2021-04-20 10:22:12
category : 'Effective Java'
draft : false
description : "아이템2 생성자에 매개변수가 많다면 빌더를 고려하라"
tags : ['Java']
---

# 이펙티브 자바 아이템2 

# 생성자에 매개변수가 많다면 빌더를 고려하라



아이템2를 통해서 **점층적 생성자 패턴, 자바빈즈 패턴, 빌더 패턴**에 대해서 공부하였습니다.

생성자와 정적 팩터리 메서드를 사용할 때 **선택적 매개변수가 많을 때 사용하기가 힘들다**는 단점이 존재합니다.

<br/>

- - - -

## 점층적 생성자 패턴

`필수 매개변수를 받는 생성자 1개, 그리고 선택 매개변수를 하나씩 늘여가며 생성자를 만드는 패턴`

필수 매개변수 생성자 1개를 중심으로, 선택적 매개변수를 하나씩 늘려가면서 생성자를 하나하나 늘려가는 방식입니다.

<br/>

```java

public class NutritionFacts {
    private final int servingSize;
    private final int servings;
    private final int calories;
    private final int fat;
    private final int sodium;
    private final int carbohydrate;

    public NutritionFacts(int servingSize, int servings) {
        this(servingSize, servings, 0);
    }

    public NutritionFacts(int servingSize, int servings, int calories) {
        this(servingSize, servings, calories, 0);
    }

    public NutritionFacts(int servingSize, int servings, int calories, int fat) {
        this(servingSize, servings, calories,  fat, 0);
    }

    public NutritionFacts(int servingSize, int servings, int calories, int fat, int sodium) {
        this(servingSize, servings, calories,  fat,  sodium, 0);
    }

    public NutritionFacts(int servingSize, int servings, int calories, int fat, int sodium, int carbohydrate) {
        this.servingSize = servingSize;
        this.servings = servings;
        this.calories = calories;
        this.fat = fat;
        this.sodium = sodium;
        this.carbohydrate = carbohydrate;
    }
}

<br/>

```

### 점층적 생성자 패턴의 단점

1. 초기화하고 싶은 필드만 포함한 생성자가 없다면, 설정하길 원치 않는 필드까지 매개변수에 값을 지정 해 주어야 합니다.

2. 매개변수의 수가 늘어날 수록 사용하기가 어려워 집니다. 

<br/>

- - - -


## 자바 빈즈 패턴

`매개 변수가 없는 생성자로 객체를 만든 후, setter 메서드를 호출해 원하는 매개변수 값을 설정하는 방식`


```java
public class NutritionFacts {
    private int servingSize = -1;
    private int servings = -1;
    private int calories = 0;
    private int fat = 0;
    private int sodium = 0;
    private int carbohydrate = 0;

    public NutritionFacts() {}

    public void setServingSize(int servingSize) {
        this.servingSize = servingSize;
    }

    public void setServings(int servings) {
        this.servings = servings;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }

    public void setFat(int fat) {
        this.fat = fat;
    }

    public void setSodium(int sodium) {
        this.sodium = sodium;
    }

    public void setCarbohydrate(int carbohydrate) {
        this.carbohydrate = carbohydrate;
    }
}


```

<br/>

```java

public class Main {
    public static void main(String[] args) {
        NutritionFacts cocaCola = new NutritionFacts();
        cocaCola.setServingSize(120);
        cocaCola.setServings(4);
        cocaCola.setCalories(120);
        cocaCola.setFat(5);
        cocaCola.setSodium(31);
        cocaCola.setCarbohydrate(14);
    }
}


```

### 자바빈즈 패턴의 단점

1. 객체 하나를 만들려면 메서드를 여러 개 호출해야 한다.
2. 객체가 완성되기 전까지는 **일관성**이 무너진 상태에 놓이게 된다.

한번 수정하고 또 수정해야 하므로 **불변**한 클래스를 만들 수 없게 됩니다.

<br/>

- - - -

## 빌더 패턴
`빌더 패턴은 Builder를 이용하여 필수 매개변수로 객체를 생성하고, Setter를 사용하여 선택 매개 변수를 초기화 한 뒤 Build() 메서드를 호출하여 객체를 생성하는 패턴`

빌더 패턴을 이용하여 객체를 생성할 때, 필수 매개변수만으로 생성자를 호출 한 후에
Setter메서드들로 원하는 선택적 매개변수들을 설정합니다.

마지막으로 `build()` 메서드를 호출하여 객체를 얻는 방식입니다.

<br/>

```java

public class NutritionFacts {
    private final int servingSize;
    private final int servings;
    private final int calories;
    private final int fat;
    private final int sodium;
    private final int carbohydrate;

    private NutritionFacts(Builder builder) {
        servingSize = builder.servingSize;
        servings = builder.servings;
        calories = builder.calories;
        fat = builder.fat;
        sodium = builder.sodium;
        carbohydrate = builder.carbohydrate;
    }

    public static class Builder {
        
			// 필수
        private final int servingSize;
        private final int servings;

        
        private int calories = 0;
        private int fat = 0;
        private int sodium = 0;
        private int carbohydrate = 0;

        // 필수 매개변수만을 담은 Builder 생성자
        public Builder(int servingSize, int servings) {
            this.servingSize = servingSize;
            this.servings = servings;
        }

       
        public Builder calories(int val) {
            calories = val;
            return this;
        }

        public Builder fat(int val) {
            fat = val;
            return this;
        }
        
        public Builder sodium(int val) {
            sodium = val;
            return this;
        }
        
        public Builder carbohydrate(int val) {
            carbohydrate = val;
            return this;
        }
        
        // build() 호출로 최종 객체 반환
        public NutritionFacts build() {
            return new NutritionFacts(this);
        }
    }
}

```

<br/>

- - - -

### 자바빈즈와 빌더 패턴의 차이점 ??

빌더 패턴과 자바 빈즈 패턴의 가장 큰 차이점은 **불변성**입니다.

자바 빈즈 패턴은 객체를 생성한 후, 값을 Setter 메서드를 통해 설정합니다.

그렇기 때문에 객체 사용 도중에 Setter를 사용하여 유효하지 않은 값, 정확하지 않은 값들이 Setting이 될 수 있습니다.

반면, 빌더 패턴의 경우 객체 생성 전에 값을 Setter를 통해 설정하기 때문에 도중에 Setter 메서드를 통해서 값이 변경될 우려가 없어 불변성을 보장할 수 있습니다.

<br/>

- - - -

### 빌더 패턴의 단점 ?

객체를 생성하려면 빌더부터 만들어야하는 과정이 필요합니다.

빌더 생성 비용이 크지는 않지만, 성능 자체에 민감한 상황에서는 문제가 될 수 있습니다.



