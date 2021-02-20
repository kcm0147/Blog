---
title : '[Programmers] 입국 심사'
date : 2021-02-20 14:03:23
category : 'Algorithms'
draft : false
description : "입국 심사 문제풀이"
tags : ['이분탐색']
---

* 비트마스킹
* DFS


<br/>


[문제 링크](https://programmers.co.kr/learn/courses/30/lessons/43238)

<br/>

이분탐색 문제를 연습해보기 위해서 풀어본 문제입니다.

이분탐색으로 풀어야함을 알면서도 어떻게 해결해야할지 조금은 생각을 해야하는 문제였습니다.

일단 구하려고하는 것은 '시간의 최솟값'이기 떄문에 시간의 최솟값에 focuse를 두었습니다.

그럼 left와 Right의 범위를 정해야하는데, 입국심사를 할때 최대로 걸릴 수 있는 시간은

심사관들 중 가장 오랜 심사시간이 걸리는 분에게 n명을 전부 다 검사할 때입니다.

그래서 left와 right의 중심인 mid를 구해서, 이분탐색을 진행해주어야하는데

```java

 for(int i=0;i<times.length;i++){
                tmp+=(mid / times[i]);

                if(tmp>=n){
                    break;
                }
 }

```

위의 코드와 같이 mid가 심사를 하는데 걸리는 최대 시간이므로, 

`mid / times[i]는 심사관 i가 mid 시간 내의 심사를 할 수 있는 사람의 수`를 나타냅니다.

근데 이렇게 for문을 진행하다가 tmp값이 입국 심사를 하는 n보다 더 많이 검사를 할 수 있게 된다면

right의 값을 mid-1로 설정하고 다시 재 연산을 진행합니다.

반대로 n보다 적게 검사를 할 수 있다면 left의 범위를 mid+1로 재설정하고 다시 연산을 진행해야합니다.

이렇게 left와 right가 서로 같아질때까지 연산을 진행하다보면 n명의 사람을 심사하는데 걸리는 최소시간이 answer에 저장이 됩니다.





<br/> <br/>

```java


import java.util.Arrays;

class Solution {
    public long solution(int n, int[] times) {
        long answer = Long.MAX_VALUE;
        Arrays.sort(times);

        long left;
        long right=Long.MIN_VALUE;

        for(int i=0;i<times.length;i++){
            right=Math.max(right,times[i]);
        }

        left=0;
        right*=n;

        while(left<=right){
            long mid=(left+right)/2;
            long tmp=0;

            for(int i=0;i<times.length;i++){
                tmp+=(mid / times[i]);

                if(tmp>=n){
                    break;
                }
            }

            if(tmp>=n){
                answer=Math.min(answer,mid);
                right=mid-1;
            }
            else
                left=mid+1;

        }
        return answer;

    }
}


```