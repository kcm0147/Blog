---
title : '[Programmers] 선입선출 스케줄링'
date : 2021-03-25 17:22:12
category : 'Algorithms'
draft : false
description : "선입선출 스케줄링 문제풀이"
tags : ['이분 탐색']
---


* 이분탐색


<br/> <br/>

백준의 놀이공원문제와 동일한 문제풀이 형식입니다.

1. 이분탐색을 이용해서 `n개의 작업을 할 수 있는 시간`을 찾습니다.

2. 이분탐색에서 최소 n개의 작업 이상을 할 수 있으면 right=mid-1;로 설정하고, n개의 작업도 하지 못한다면 left를 mid+1로 설정하여 범위를 점점 줄여갑니다.

    => 이렇게 해서 정해진 answer이 바로 n개의 작업을 할 수 있는 시간이 될 것입니다.

3. 그럼 이 answer을 이용해서 바로 직전 즉 answer-1분까지 작업을 진행 한 후에, answer분째에 cores의 첫번째 코어부터 작업을 할 수있는지 없는지 count 합니다.

4. count를 진행하면서 n번째 작업을 완료했을 때의 core를 return 하여 답을 출력합니다.

백준의 놀이공원문제를 풀지못했다면 많이 힘들었을 것입니다.


<br/>



```java

class Solution {

    static int[] cores;
    static int n;

    public int solution(int In, int[] Icores) {
        cores=Icores;
        n=In;

        if(In<=Icores.length){
            return In;
        }
        else {
            int time = findTime();
            return calc(time);
        }

    }

    public int findTime(){
        int left=0;
        int right=100000000;
        int returnValue=0;

        while(left<=right){
            int answer=cores.length;

            int mid=(left+right)/2;

            for(int i=0;i<cores.length;i++){
                answer+=(mid)/cores[i];
            }

            if(answer>=n){
                right=mid-1;
                returnValue=mid;
            }
            else
                left=mid+1;
        }

        return returnValue;
    }

    public int calc(int time){
        int answer=cores.length;

        for(int i=0;i<cores.length;i++){
            answer+=(time-1)/cores[i];
        }

        for(int i=0;i<cores.length;i++){
            if((time)%cores[i]==0){
                answer++;

                if(answer==n){
                    return i+1;
                }
            }
        }

        return -1;
    }


}

```