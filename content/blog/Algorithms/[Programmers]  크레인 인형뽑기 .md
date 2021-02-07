---
title : '[Programmers] 크레인 인형뽑기 게임'
date : 2021-02-07 13:01:23
category : 'Algorithms'
draft : false
description : "크레인 인형뽑기 게임"
tags : ['구현','Programmers']
---

* 구현


<br/>


[문제 링크](https://programmers.co.kr/learn/courses/30/lessons/64061)

<br/>

[요구사항]

주어진 moves배열에 따라 움직이는 크레인에 의해서 사라진 인형의 갯수를 구해야합니다.


<br/>

바구니에 담기는 인형은 마치 Stack과 같은 구조로 선입후출의 형식의 작동방식을 가지고 있기 때문에

Stack으로 구현을하면 된다고 생각했습니다.

인형을 바구니에 넣을 때 Stack의 top을 확인하여 현재 바구니에 넣으려는 인형과 같다면, 

stack을 pop() 시키고 `answer+=2`를 하여 answer의 값을 구합니다.



<br/> <br/>

```java


import java.util.*;

class Solution {
    
    static int[][] board;
    static int[] moves;
    static int answer;

    static Stack<Integer> stack;
    
      public static int solution(int[][] Iboard,int[] Imoves){

        board=Iboard;
        moves=Imoves;
        stack=new Stack<>();

        for(int i=0;i<moves.length;i++){
            int catchIndex=catchDoll(moves[i]-1);

            if(catchIndex!=-1){
                insert(catchIndex);
            }
        }

        return answer;
    }


    public static int catchDoll(int curMove){

        for(int j=0;j<board.length;j++){
            if(board[j][curMove]!=0) {
                int returnValue=board[j][curMove];
                board[j][curMove] = 0;
                return returnValue;
            }
        }

        return -1;
    }

    public static void insert(int index){
        if(stack.empty()){
            stack.add(index);
        }
        else{
            if(stack.peek()==index){
                stack.pop();
                answer+=2;
            }
            else
                stack.add(index);
        }
    }

}


```