---
title : '[Programmers] 징검다리 건너기'
date : 2021-02-07 15:03:23
category : 'Algorithms'
draft : false
description : "징검다리 건너기 문제풀이"
tags : ['Binary Search']
---

* Binary Search


<br/>


[문제 링크](https://programmers.co.kr/learn/courses/30/lessons/64062)

<br/>

[요구사항]

징검다리를 건널 수 있는 니니즈 친구들의 최댓값을 구해야 합니다

<br/>

징검다리는 최대 K만큼 뛰어넘을 수 있지만, 건널 수 있는 디딤돌이 여러개인 경우 무조건 가장 가까운 디딤돌로만 건널 수 있습니다.

이 문제의 정석적인 풀이방법은 '이진탐색'입니다.

이진탐색의 기준값을 left=1(건널 수 있는 니니즈 친구 최소 수), right=최대 Int값 으로 설정 후

mid = left+right/2 로 잡고 이진 탐색을 진행합니다.


```java

 int jumpCount = 0;

for (int i=0; i<stones.length; i++) {
    if (stones[i] - averageCount <= 0) {
            jumpCount++;
    } 
    else {
        jumpCount = 0;
    }

```

이진탐색을 진행하면서 stone-mid 가 0보다 작은 수가 된다면, 이는 건널 수 없는 돌다리를 의미하기 때문에 한칸을 뛰어넘어야합니다.

만약 0보다 큰 수가 된다면 뛰어 넘을 수 있는 돌다리기 때문에 연속으로 뛰어넘을수 없는 count`(jumpCount)`를 0 으로 초기화합니다.

만약에 jumpCount가 최대 k로 뛰어넘을 수 있는 수를 넘어버린다면, 이는 니니즈친구들이 mid만큼 징검다리를 건널 수 없음을 의미하기 때문에 `right=mid-1`로 설정 후 다시 탐색을 진행 합니다.

이렇게 계속 탐색을 진행하면서 최대로 건널 수 있는 니니즈 친구들의 수를 구하면 됩니다.


하지만 저는 이 방법을 생각하지 못하고 다르게 풀었습니다.

```

2,4,5,3,2,1,4,2,5,1 에서 k는 3이라고 예를 들겠습니다.

1. k만큼 구간을 나눠서 처음 탐색을 진행한 후, 그 중에서 최댓값을 찾습니다.

k만큼 구간을 나눈 이유는 방금 1의 구간에서 최댓값만큼 니니즈의 친구들이 건널 수 있음을 뜻하기 때문입니다.

2. k만큼 나는 구간의 최댓값의 index를 maxIndex라고 하면, maxIndex의 다음 칸부터 k칸 만큼 다시 구간을 나눈 후 1의 연산을 반복합니다. 

(2,4,5) 구간의 최댓값은 5이며 인덱스는 3입니다.

3. 그 다음 구간은 (3,2,1)이 되는데 이중의 최댓값은 3입니다. 이전의 구간(2,4,5)의 최댓값은 5지만 그다음 구간 (3,2,1)의 

최댓값은 3이 되기 때문에 니니즈 친구들은 두번째 구간까지 오는데 최대로 올 수 있는 인원 수는 5명이 아니라 3명이 됩니다.

3의 인덱스는 4이기 때문에 4의 인덱스 다음인 5부터 다시 k만큼 구간을 나누어 1~2의 연산을 반복진행합니다.

이렇게 해서 나오는 minValue를 답으로 return 하게 된다면 문제에서 요구하는 답이 나오게 됩니다.

만약 k만큼 구간으로 나누다가 마지막에 k 만큼의 구간이 나오지 못하더라도, 이는 이전 구간에서 도착점까지 굳이 돌다리를 밟을 수 없음을 의미하기 때문에 무시하고 연산을 진행하면 됩니다.

```


이진 탐색으로 못 푼 것이 아쉽지만, 문제를 푼것에 의의를 두었습니다.


<br/> <br/>

```java


class Solution {
   static int[] stones;

    static int k;
    static int minValue;



 
   public static int solution(int[] Istones,int Ik){
       stones=Istones;
       k=Ik;

       calc();

       return minValue;
    }

    public static void calc(){
        minValue=Integer.MAX_VALUE;
        int maxIndex=-1;

        for(int i=0;i<stones.length;){
            int maxValue=Integer.MIN_VALUE;
            if(i+k-1< stones.length) {
                for (int j = i; j < i + k; j++) {
                    if(maxValue<=stones[j]){
                        maxValue=stones[j];
                        maxIndex=j;
                    }
                }
                minValue = Math.min(minValue, maxValue);
                i=maxIndex+1;
            }
            else
                break;
        }
    }
}

```