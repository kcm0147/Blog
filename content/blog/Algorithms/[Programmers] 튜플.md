---
title : '[Programmers] 튜플'
date : 2021-02-07 14:01:23
category : 'Algorithms'
draft : false
description : "튜플 문제풀이"
tags : ['문자열','구현']
---

* 문자열


<br/>


[문제 링크](https://programmers.co.kr/learn/courses/30/lessons/64065)

<br/>

[요구사항]

특정 튜플을 표현하는 집합이 담긴 문자열 s가 주어질 때, s가 표현하는 튜플을 배열에 담아야 합니다.


<br/>

일단 이 문제를 봤을 때 문제를 이해하는데 조금 힘들었습니다.

문제의 예시를 보면 규칙을 찾을 수 있었는데,

```
{{2}, {2, 1}, {2, 1, 3}, {2, 1, 3, 4}}
{{2, 1, 3, 4}, {2}, {2, 1, 3}, {2, 1}}
{{1, 2, 3}, {2, 1}, {1, 2, 4, 3}, {2}}

이 세개가 다 같은 튜플을 의미 합니다.

```

각 숫자마다 집합에 담긴 빈도수가 다름을 알 수 있습니다.

`2가 4번`, 그다음 `3이 3번` `1이 2번` 마지막으로 `4가 1번`

이러면 답은 {2,3,1,4} 가 됩니다.


문제에서 주어지는 튜플의 원소는 100,000이하의 자연수라고 했으니 

메모리절약을 위해서 HashMap을 사용하여 원소의 등장빈도를 측정하였습니다.

문자열 파싱을 한 후에 원소의 등장빈도를 오름차순으로 Sorting 후

result[] 배열에 값을 insert 하여 Return 하였습니다.


<br/> <br/>

```java


import java.util.*;

class Solution {
    
     static String target;
    static Map<Integer,Integer> map;
    static int[] answer;
    
     public static int[] solution(String Itarget){
       target=Itarget;
       map=new HashMap<>();


       calc();

       return answer;
    }

    public static void calc(){

        StringBuilder sb = new StringBuilder();

        for(int i=0;i<target.length();i++){
            char cur = target.charAt(i);

            if(cur!='{'){
                if(cur=='}'){
                    if(!sb.toString().equals("")){
                        int num=Integer.parseInt(sb.toString());
                        if(map.containsKey(num)){
                            map.replace(num,map.get(num)+1);
                        }
                        else{
                            map.put(num,1);
                        }
                        sb=new StringBuilder();
                    }
                }
                else if(cur!=',') {
                    sb.append(cur);
                }
                else if(cur==',' && !sb.toString().equals("")){
                    int num=Integer.parseInt(sb.toString());
                    if(map.containsKey(num)){
                        map.replace(num,map.get(num)+1);
                    }
                    else{
                        map.put(num,1);
                    }
                    sb=new StringBuilder();
                }
            }
        }

        sort();
    }


    public static void sort(){

        List<Integer>  keySet = new ArrayList<>(map.keySet());

        Collections.sort(keySet,(o1,o2)->(map.get(o2).compareTo(map.get(o1))));

        answer=new int[keySet.size()];

        int index=-1;
        for(Integer key : keySet){
            answer[++index]=key;
        }
    }

}


```