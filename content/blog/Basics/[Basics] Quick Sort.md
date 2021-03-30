---
title : '[Basics] Quick Sort'
date : 2021-03-30 10:22:12
category : 'Basics'
draft : false
description : "Quick Sort 설명"
tags : ['Algorithms']
---

오늘은 Quick Sort에 대해서 정리를 해보려고 합니다.

Quick Sort는 `분할정복 기법을 사용하여 배열을 정렬`하는 알고리즘입니다.

Pviot을 정하여 오름차순 기준으로 Pivot보다 작은 값들은 왼쪽, 큰 값들은 오른쪽에 오도록 정렬을 합니다.

자세한 과정은 밑에서 다루겠습니다.

<br/>

알고리즘 수행 과정은 다음과 같습니다.

1. 배열의 가운데서 원소를 하나 고르는데, 이렇게 고른 원소를 `피벗(Pivot)`이라고 합니다.
=> 피벗은 어떤 수를 골라도 상관은 없습니다.

2. 피벗앞에는 피벗보다 작은 원소들을 배치하고 피벗 뒤에는 피벗보다 큰 원소들을 배치하도록 합니다. 
3. 이렇게 양쪽 좌우로 분리된 두개의 배열에 대해서 **재귀**적으로 1-2과정을 반복합니다.

=> 재귀 호출이 한번 진행될 때 마다 최소한 하나의 원소는 최종적으로 위치가 정해집니다.


<br/>

### Code

위에서 언급했듯이 퀵정렬은 **정복** **분할**로 이루어지기 때문에 두가지로 나누어 코드를 작성합니다.

* 정복(Conquer)

```java
public void quickSort(int[] array, int left, int right) {
    if(left >= right) return;
    
    // 분할 
    int pivot = partition(array,left,right); 
    
    // 피벗은 제외한 2개의 부분 배열을 대상으로 순환 호출
    quickSort(array, left, pivot-1);  // 정복(Conquer)
    quickSort(array, pivot+1, right); // 정복(Conquer)
}

```

* 분할(Divide)

```java
public int partition(int[] array, int left, int right) {
    
    int pivot = array[left]; 
    int i = left, j = right;
    
    while(i < j) {
        while(pivot < array[j]) { //1.
            j--;
        }
        while(i < j && pivot >= array[i]){ // 2.
            i++;
        }
        swap(array, i, j); //3.
    }
    array[left] = array[i]; //5.
    array[i] = pivot;
    
    return i;
}}

```



1. 오른쪽에서 왼쪽으로 가면서 피벗보다 작은 수를 찾습니다.
2. 왼쪽에서 오른쪽으로 가면서, 피벗보다 큰 수를 찾습니다.
3. 1과 2에서 선택한 수를 교환합니다.
4. 1-3번 과정을 반복합니다.
5. 1번과 2번을 더 이상 진행을 할 수 없다면, 현재 피벗과 교환을 합니다.
6. 1-5를 진행하면, 선택한 피벗을 기준으로 왼쪽은 작은 수들이 존재하고, 오른쪽은 큰수들만 존재하게 됩니다.

<br/>

### 연산 순서

![img](https://t1.daumcdn.net/cfile/tistory/999E373A5ACB53AE07)

<br/>

![img2](https://t1.daumcdn.net/cfile/tistory/99AD09415ACB54170D)

이렇게 마지막에 피벗 30을 기준으로 왼쪽은 피벗보다 작은수가 되고 오른쪽은 큰 수인 모습을 확인할 수 있습니다.

<br/>

### Quick Sort 개선법

partition()함수에서 **피벗 값이 최소나 최대값으로 지정이되어서 파티션이 나누어지지 않는다면**, **O(N^2)** 시간복잡도를 가집니다.

정렬하고자하는 배열이 오름차순 정렬이 되어있거나 내림차순 정렬이 되어있으면 이러한 시간복잡도를 가지게 됩니다. 

이 코드에서는 피벗을 배열의 첫번째 수로 지정하였는데 중간수를 피벗으로 정하면 최악의 경우인 O(N^2)을 피할 수는 있습니다.

이때 배열에서 가장 앞의 값과 중간값을 교환해준다면 확률적으로나마 시간복잡도 개선이 가능합니다.

<br/>

### 시간복잡도 공간복잡도

시간복잡도에 대해 살펴보겠습니다.

**최선의 경우**라면 비교 횟수가 **log2n**이 됩니다.

log2n번 정복하고 총 **n번 대수 비교**를 하기때문에 총 시간복잡도는 **O(nlog2n)**이 됩니다.

---

**최악의 경우** 정렬하고자하는 배열이 오름차순 정렬이 되어있거나 내림차순 정렬이 되어있을 때를 의미합니다.

이 경우에는 n번 정복을 해야하고 총 n번 대수 비교를 해야하기 때문에 시간복잡도는 **O(N^2)**이 됩니다.

---

주어진 배열 안에서 교환이 이루어지기 떄문에 공간복잡도는 **N**입니다.

<br/>

![img](https://github.com/GimunLee/tech-refrigerator/raw/master/Algorithm/resources/quick-sort-001.gif)

---

[참고 URL](https://gyoogle.dev/blog/algorithm/Quick%20Sort.html)
[참고 URL2](https://mygumi.tistory.com/308)