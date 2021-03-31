---
title : '[Basics] Merge Sort'
date : 2021-03-31 10:22:12
category : 'Basics'
draft : false
description : "Merge Sort"
tags : ['Algorithm']
---

Merge Sort에 대해서 정리를 해보려고 합니다.

Merge Sort는 Quick Sort처럼 `분할 정복`을 이용하여 구현합니다.

Quick Sort는 `불안정 정렬`인 반면에, Merge Sort는 `안정 정렬`입니다.

<br/>

알고리즘 수행 과정은 다음과 같습니다.

<br/>

1. 정렬되지 않는 리스트를 각각 하나의 원소만 포함하는 n개의 부분리스트까지 분할을 합니다.
   
2. 분할 된 리스트를 쪼개어지지 전에 같이 있던 원소들과 비교하여 정렬을 시행합니다.
   
3. 2번 과정을 반복시행하여 분할되었던 리스트들을 병합하여 정렬된 리스트를 만듭니다.


---

    퀵소트와 비교해보면, 퀵소트는 피벗을 정하고 정렬을 한 후에 영역을 쪼갰지만

    머지소트는 영역을 쪼갤 수 있을 만큼 나눈 후에, 정렬을 시행합니다.


<br/>

### Code

<br/>

* 분할

```java

public void mergeSort(int[] array, int left, int right) {
    
    if(left < right) {
        int mid = (left + right) / 2;
        
        mergeSort(array, left, mid);
        mergeSort(array, mid+1, right);
        merge(array, left, mid, right);
    }
    
}


```

mergeSort를 통해 리스트를 나눌 수 있을 만큼 나눈 후에

merge() 함수를 통해서 쪼개어지기 전 리스트와 대수비교를 통해 정렬을 시행합니다.


<br/>

* 정렬

```java

public static void merge(int[] array, int left, int mid, int right) {
    int[] L = Arrays.copyOfRange(array, left, mid + 1);
    int[] R = Arrays.copyOfRange(array, mid + 1, right + 1);
    
    int i = 0, j = 0, k = left;
    int ll = L.length, rl = R.length;
    
    while(i < ll && j < rl) { 
        if(L[i] <= R[j]) { // 1.
            array[k] = L[i++];
        }
        else {
            array[k] = R[j++];
        }
        k++;
    }
    
    // remain
    while(i < ll) { // 2.
        array[k++] = L[i++];
    }
    while(j < rl) {
        array[k++] = R[j++];
    }
}


```

merge() 함수는 두개의 나누어진 리스트들을 하나의 리스트로 합쳐주는 메소드입니다.

두개의 리스트들은 이미 정렬이 되어있는 상태이므로 순차적으로 대수비교를 하면 됩니다.

<br/>

1. array[]가 L와 R을 합친 배열이기 떄문에, 대수 비교후에 array에 값을 넣어줍니다.
2. L,R 배열 중 한쪽이 먼저 array 배열에 전부 들어 갈 수 있기 떄문에 이후에 L나 R배열에 남은 원소들을 array배열에 그대로 값을 넣어주면 정렬이 완료됩니다.

<br/>



<br/>
---

### 시간복잡도 공간복잡도

시간복잡도를 고려해보면 최적의 경우나 최악의 경우나 둘다 **O(NlogN)**입니다.

배열의 분할과정에서 logN번 횟수가 사용되며, 대수비교를 하기위해 N번 연산이 시행됩니다.

합병정렬의 경우 공간복잡도는 **O(N)**이지만 추가적인 메모리 공간이 필요하다는 점이 존재합니다.

하지만 최대의 장점은 정렬 시 같은 값이라도 기존 데이터의 순서를 유지하기 때문에 **안정 정렬**입니다.

---

![img](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile6.uf.tistory.com%2Fimage%2F2748243C58BBF920230735)


---

