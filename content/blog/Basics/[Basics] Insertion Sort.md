---
title : '[Basics] Insertion Sort'
date : 2021-03-29 10:22:12
category : 'Basics'
draft : false
description : "Insertion Sort 설명"
tags : ['Algorithms']
---

Insertion Sort에 대해서 정리를 해보려고 합니다.

Insertion Sort는 `2번째 원소부터 시작을 하여 이전 원소들과 비교하여 삽입할 위치를 지정한 후, 원소를 뒤로 옮기고 지정된 자리에 값을 삽입하여 정렬`하는 알고리즘입니다.

과정에 대해 밑에서 자세히 설명하겠습니다.

<br/>

알고리즘 수행 과정은 다음과 같습니다.

1. index(1부터 시작)의 위치 값을 temp에 저장합니다.
2. temp 이전의 원소들과 대수비교를 하며 적절한 위치에 삽입을합니다.
3. 1의 과정으로 다시 돌아가서 index++를 한 후에 temp에 값을 저장하고 반복합니다.


<br/>

### Code

```java
void insertionSort(int[] arr)
{
   for(int index = 1 ; index < arr.length ; index++){ // 1.
      int temp = arr[index];
      int prev = index - 1;
      while( (prev >= 0) && (arr[prev] > temp) ) {    // 2.
         arr[prev+1] = arr[prev];
         prev--;
      }
      arr[prev + 1] = temp;                           // 3.
   }
   System.out.println(Arrays.toString(arr));
}

```

<br/>

1. index 0부터 시작을 하면 이전의 원소가 존재하지 않기 때문에 1부터 시작을 합니다. temp에 임시로 해당 위치(index)의 값을 저장합니다.

2. 이전 위치를 가리키는 prev가 음수가 되지 않고, 이전 위치의 값이 1에서 선택한 index보다 값이 크다면, 서로 SWAP하고 prev를 더 이전위치로 설정합니다.
3. 2의 반복문이 종료되면 prev에는 현재 temp 값보다 *작은 값들 중 제일 큰 값의 위치를 가리키게 될 것*입니다. 그러므로 prev+1에 temp의 값을 insert합니다.

<br/>

### 시간복잡도 공간복잡도

시간복잡도를 고려해보면 최악의 경우에는 (n-1) + (n-2) + .. => n(n-1)/2 즉 **O(N^2)**입니다.

하지만 대부분 정렬이 되어있는 경우에는 한번씩만 대수비교를 하면 되기 때문에 **O(N)**의 시간복잡도를 가지게 됩니다.

공간복잡도를 고려해보면 주어진 배열안에서 실행되기 때문에 **O(N)** 입니다.

또한 정렬하고자 하는 배열 안에서 교환을 하기때문에 **in-place Sorting**입니다.

---

<br/>

![img](https://github.com/GimunLee/tech-refrigerator/raw/master/Algorithm/resources/insertion-sort-001.gif)

---

[참고 URL](https://gyoogle.dev/blog/algorithm/Insertion%20Sort.html)