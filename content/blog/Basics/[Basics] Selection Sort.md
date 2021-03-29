---
title : '[Basics] Selection Sort'
date : 2021-03-29 10:22:12
category : 'Basics'
draft : false
description : "Selection Sort"
tags : ['Algorithms']
---

Selection Sort에 대해서 정리를 해보려고 합니다.

Selection Sort는 `해당 자리를 선택하고 그 자리에 오는 값을 찾아서 정렬하는 알고리즘` 입니다.

<br/>

알고리즘 수행 과정은 다음과 같습니다.

1. 주어진 배열 중에 최소 값을 찾습니다.
2. 그 값을 배열의 맨 앞 자리(정렬이 된 숫자를 제외한)수와 교체합니다.
3. 2번과정을 통해 맨 앞자리는 정렬이 되었기 때문에 맨 앞 자리를 뺀 나머지 배열을 같은 방법으로 1~2 과정을 반복합니다.


<br/>

### Code

```java
void selectionSort(int[] arr) {
    int index, temp;
    for (int i = 0; i < arr.length-1; i++) {        // 1.
        index = i;
        for (int j = i + 1; j < arr.length; j++) {  // 2.
            if (arr[j] < arr[index]) {           // 3.
                index = j;
            }
        }
        // 4. swap(arr[index], arr[i])
        temp = arr[index];
        arr[index] = arr[i];
        arr[i] = temp;
  }
  System.out.println(Arrays.toString(arr));
}


```

<br/>

1. 일단 정렬하고자하는 위치(index)의 초기값을 i로 선택해줍니다.
2. i+1번째 원소부터 선택한 위치(index)값과 비교를 시작합니다.
3. 현재 선택한 자리(index)에 있는 값보다 작다면, index를 갱신해줍니다.
4. '2'번 반복문이 끝난 뒤에는 index에는 선택한 위치에 들어가야하는 값의 위치가 있기 때문에 index와 i를 swap 해줍니다.
5. 이렇게 4번 과정을 실행하게 되면 맨 앞자리는 sorting이 되어있는 상태가 되며 N번째까지 1-4 과정을 반복합니다.

<br/>

### 시간복잡도 공간복잡도

시간복잡도를 고려해보면 최적의 경우나 최악의 경우나 둘다 **O(N^2)**입니다.

=> (n-1) + (n-2) + ... + 2+ 1 = n(n-1)/2

공간복잡도를 고려해보면 주어진 배열안에서 실행되기 때문에 **O(N)** 입니다.

또한 정렬하고자 하는 배열 안에서 교환을 하기때문에 **in-place Sorting**입니다.

---

<br/>

![img](https://github.com/GimunLee/tech-refrigerator/blob/master/Algorithm/resources/selection-sort-001.gif?raw=true)

---

[참고 URL](https://gyoogle.dev/blog/algorithm/Selection%20Sort.html)