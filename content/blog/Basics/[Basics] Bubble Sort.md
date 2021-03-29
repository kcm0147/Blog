---
title : '[Basics] Bubble Sort'
date : 2021-03-29 09:22:12
category : 'Basics'
draft : false
description : "Bubble Sort"
tags : ['Algorithms']
---

Bubble Sort에 대해서 정리를 해보려고 합니다.

Bubble Sort는 `서로 인접한 두 원소의 대소를 비교하고, 조건에 맞지 않다면 자리를 교환하며 정렬하는 알고리즘`입니다.

<br/>

알고리즘 수행 과정은 다음과 같습니다.

1. 첫번째원소와 두번째 원소를, 두번째 원소와 세번째 원소를.. 이렇게 N-1, N번째원소를 비교하여 조건에 맞지 않는다면 서로 교환합니다.

2. 위의 과정을 수행하게 되면 가장 큰 원소가 맨 뒤로 이동을 하기 때문에 맨 끝에 있는 원소는 정렬에서 제외하고 다시 첫번째 과정을 수행합니다.

3. 이렇게 정렬을 시행할 때마다 한개씩 정렬이 됩니다.


<br/>

### Code

```java

void bubbleSort(int[] arr) {
    int temp = 0;
	for(int i = 0; i < arr.length; i++) {       // 1.
		for(int j= 1 ; j < arr.length-i; j++) { // 2.
			if(arr[j-1] > arr[j]) {     // 3.         
				temp = arr[j-1];
				arr[j-1] = arr[j];
				arr[j] = temp;
			}
		}
	}
	System.out.println(Arrays.toString(arr));
}


```

<br/>

1. 제외될 원소의 갯수를 의미합니다. 배열의 마지막 위치에는 가장 큰 원소가 위치하기 때문에 하나씩 증가를 시킵니다.

2. 원소를 비교할 index를 뽑을 반복문입니다. j는 현재 원소를 가리키고 j-1은 이전 원소를 가리키게 되므로, j는 1부터 시작하게 했습니다.

3. 현재 가르키고 있는 두 원소의 대소를 비교한 후 SWAP을 합니다.

<br/>
---

### 시간복잡도 공간복잡도

시간복잡도를 고려해보면 최적의 경우나 최악의 경우나 둘다 **O(N^2)**입니다.

공간복잡도를 고려해보면 주어진 배열안에서 실행되기 때문에 **O(N)** 입니다.

또한 정렬하고자 하는 배열 안에서 교환을 하기때문에 **in-place Sorting**입니다.

---

![img](https://github.com/GimunLee/tech-refrigerator/blob/master/Algorithm/resources/bubble-sort-001.gif?raw=true)


---

[참고 URL](https://gyoogle.dev/blog/algorithm/Bubble%20Sort.html)