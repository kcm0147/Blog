---
title : '[Programmers] 불량 사용자'
date : 2021-02-07 13:03:23
category : 'Algorithms'
draft : false
description : "불량 사용자 문제풀이"
tags : ['비트마스킹','DFS']
---

* 비트마스킹
* DFS


<br/>


[문제 링크](https://programmers.co.kr/learn/courses/30/lessons/64064)

<br/>

[요구사항]

주어진 userId 중 불량 사용자와 mapping이 되는 집합의 set을 구하는 문제입니다.

<br/>

이 문제는 응모자 아이디 중 불량 사용자와 mapping이 되는 집합의 set을 구하는 문제입니다.

처음에 이 문제를 접근할 때는 재귀함수로 풀려고 했으나, 생각보다 로직이 나오지 않고 반례가 나와서

다른 접근방법을 생각했습니다. 그리고 응모자아이디가 8개, 불량 사용자가 최대 8개가 나올 수 있기때문에

완전 탐색을 해도 괜찮다고 생각을 했습니다. 

하지만 완전탐색을 하기 위해서는 중복적으로 탐색하는 것을 방지해야하는데, 이를 해결하기 위한 방법을 

생각해내야 했고 일반적인 visit[]를 사용하기에는 문제에 맞지 않았습니다.

왜냐하면 우리가 판단해야할 것은 중복적인 집합의 set입니다.

문제에서 문자열의 순서는 고려하지않고 같음으로 취급하기 때문입니다.

그래서 `비트 마스킹` 방법을 생각해서 최종적으로 응모자아이디의 set을 비트로 표현하여 visit의 여부를 

확인 한 후 result+1을 하였습니다.


visit와 visitIndex를 따로 둔 이유로는 `visitIndex는 완전탐색을 하기 위해서 응모자 아이디의 중복 탐색 방지를 위한 것` 이며

`visit는 최종 결과에 응모자 아이디 set이 이미 존재하는지의 여부를 확인하기 위한 것`입니다.


완전 탐색을 한 후에 result 값을 리턴하면 원하는 답이 나오게 됩니다.





<br/> <br/>

```java


class Solution {
    
  static String[] user_id;
    static String[] banned_id;
    static boolean[] visit;
    static boolean[] visitIndex;
    static int answer=0;




    public static int solution(String[] Iuser_id,String[] Ibanned_id){
        user_id=Iuser_id;
        banned_id=Ibanned_id;

        visit=new boolean[1<<(Iuser_id.length+1)];
        visitIndex=new boolean[user_id.length];
        calc(0,0,0);

        return answer;
    }

    public static void calc(int sBanIndex,int cnt,int curBit){

        if(cnt==banned_id.length && !visit[curBit]) {
            visit[curBit] = true;
            answer++;
            return ;
        }

        for(int i=0;i<user_id.length;i++){

            int nBit = curBit | (1<<i);
            if(!visitIndex[i]) {
                for (int j = sBanIndex; j < banned_id.length; j++) {
                    if (compare(user_id[i], banned_id[j])) {
                        visitIndex[i]=true;
                        calc(j + 1, cnt + 1, nBit);
                        visitIndex[i]=false;
                    }
                }
            }
        }

    }


    public static boolean compare(String user,String ban){

        if(user.length()==ban.length()){
            for(int i=0;i<user.length();i++){

                if(user.charAt(i)==ban.charAt(i) || ban.charAt(i)=='*')
                    continue;
                else
                    return false;
            }
            return true;
        }
        return false;
    }
}


```