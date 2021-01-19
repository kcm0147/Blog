---
title : '[BOJ] 16120 PPAP'
date : 2021-01-15 18:59:04
category : 'Algorithms'
draft : false
description : "16120 PPAP 문제풀이"
tags : ['Greedy','구현']
---

* 스택

<br/>

![문제사진](https://user-images.githubusercontent.com/57346393/104731071-842d7700-577e-11eb-9ad9-907efde20ab3.png)

<br/>


[요구사항]

P를 PPAP 문자열이라고 하고, P 대신 PPAP로 치환하여 만든 문자열 또한

PPAP 문자열이라고 한다. 문자열이 주어졌을때 PPAP 문자열인지 아닌지 판단합니다

<br/><br/>

괄호 문자열 문제와 비슷한 문제입니다.

PPAP인지 아닌지를 판단하는 가장 중요한 기준은 'A'입니다.

A를 기준으로 앞에 P가 두개가 있어야하며, 바로 뒤에 나오는 문자가 P이면 

PPAP인지 아닌지 확인할 수 있습니다.

다만 주의해야할 점은 문자열의 앞에서 부터 탐색을 진행하되, PPAP를 원래의 문자인 P로 다시 치환을 하여야 합니다.

=> 그래서 저는 Stack에서 PPAP 중 PP를 스택에서 제거하고 마지막 P는 그대로 스택에 Insert 하였습니다.

그렇게 진행하다가 문자열의 끝까지 탐색을 하였을때 스택에는 'P'라는 문자 한개만 남아있어야 합니다. 이때의 경우는 PPAP 문자열이 됩니다.

다만 스택의 사이즈가 1이 아니라면? 

이때의 문자열은 PPAP 문자열이 아닙니다.








```java

public class Main {

    public static void main(String[] args) throws Exception{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String input = br.readLine();
        Stack<Character> stack = new Stack<>();

        for(int i=0; i<input.length(); i++) {
            char temp = input.charAt(i);

            if(temp=='P')
                stack.push('P');

            else {
                if(stack.size()>=2 && i<input.length()-1 && input.charAt(i+1)=='P') {
                    stack.pop();
                    stack.pop();
                }
                else {
                    System.out.println("NP");
                    return;
                }
            }
        }
        if(stack.size()==1)
            System.out.println("PPAP");
        else
            System.out.println("NP");
    }
}


```