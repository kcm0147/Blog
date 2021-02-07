---
title : '[Programmers] 호텔 방 배정'
date : 2021-02-07 16:03:23
category : 'Algorithms'
draft : false
description : "호텔 방 배정 문제풀이"
tags : ['Union-find']
---

* Union-find


<br/>


[문제 링크](https://programmers.co.kr/learn/courses/30/lessons/64063)

<br/>

[요구사항]

고객이 원하는 방이 있으면 원하는 방으로 우선배정을 해주고, 만약에 배정된 방을 요구하는 고객에게는 배정된 방 이상의 번호 중 최소 번호의 방을 배정 해줍니다.

이때, 고객에게 배정되는 방 번호를 순서대로 배열에 담아 return 배열을 구하는 것이 문제의 요구사항입니다.

<br/>

이 문제는 아주 운이 좋게 해결할 수 있었던 것 같습니다.

문제를 해결하는 방법은 "Union-find" 함수를 사용하여 문제를 해결하였습니다.

단순히 이 문제를 해결할 때 이미 배정된 방을 어떻게 처리할지가 문제였습니다.

세그먼트 트리를 써서 최솟값을 구할까? 

그러기에는 구간 내의 최솟값은 구할 수 있지만, 구간 내의 최솟값이 이미 배정된 방이라면 최솟값을 구하기에는 알맞지 않다고 생각했습니다.

단순히 이미 배정된 방의 다음 수부터 최솟값을 구하면 되는데 쉽지가 않았습니다.

제가 이 문제를 해결하는 방법을 생각해낸 과정은 다음과 같았습니다.

```
다음과 같은 예를 가정하고 누군가 처음에 1을 배정받았습니다. 

그러면 다음에 배정받는 사람은 바로 2를 배정받을 수 있게 1의 배열 값에 2 인덱스를 두었습니다.

1(배정) 2(배정x) 3(배정x) 4(배정) 5(배정) => 이렇게 다음과 같으며 1에는 2가 저장되어있습니다.

하지만 누군가 2를 배정받았습니다. 2는 당연히 다음 수(3)을 가리키게 됩니다. 

누군가 1번방을 예약하고 싶다했으나 1번방이 가득차버렸으니 2번방을 배정받으려고합니다. 

하지만 2번방이 배정받은 상태입니다. 그러면 2번방을 통해 빈방을 다시 찾으러 연결된 방을 봐야하는데 그게 3번방임을 알 수 있었습니다. 

이러한 로직을 통해서 Union-find 연산이 생각이 떠올랐습니다.

하지만 union find 연산을 하기 위해서는 하나의 긴 배열이 필요한데, 문제에서 주어진 수 k의 최대수는 10^12이기 떄문에

저는 HashMap을 이용하여 union-find를 해결하였습니다.

```

union-find 연산을 하면 되는데, 가장 중요한 것은 find를 하면서 **경로압축**을 해야합니다.

경로압축을 하지 않으면 계속해서 find() 연산을 실행하여 시간이 엄청 오래 걸릴 수 있기 떄문입니다.



<br/> <br/>

```java

import java.util.*;
class Solution {
    
    static long k=10;
    static long[] room_number={1,3,4,1,3,1};
    static Map<Long,Long> rootMap;

    static long[] result;
    
    
    
    public static long[] solution(long Ik,long[] Iroom_number){
        k=Ik;
        room_number=Iroom_number;

        rootMap=new HashMap<>();
        result=new long[Iroom_number.length];

        calc();

        return result;

    }

    public static void calc(){

        for(int i=0;i<room_number.length;i++){
            long curIndex= room_number[i];

            if(rootMap.containsKey(curIndex)){
                result[i]=find(curIndex,rootMap.get(curIndex));
            }
            else{
                rootMap.put(curIndex,curIndex+1);
                result[i]=curIndex;
            }
        }

    }

    public static long find(long curIndex,long curRoot){
        if(!rootMap.containsKey(curRoot)){
            rootMap.put(curRoot,curRoot+1);
            return curRoot;
        }
        else{
            long index=find(curRoot,rootMap.get(curRoot));
            rootMap.replace(curIndex,index);

            return index;
        }
    }

}



```