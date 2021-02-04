---
title : '[BOJ] 1099 알 수 없는 문장'
date : 2021-02-04 20:11:12
category : 'Algorithms'
draft : false
description : "1099 알 수 없는 문장"
tags : ['DP']
---

* DP


<br/>

![문제사진](https://user-images.githubusercontent.com/57346393/106898572-b441b780-6737-11eb-9ac6-0a9ba8393c66.png)

<br/>

<br/>

문제를 접근할때 Dp로 접근을 해야겠다고 생각했습니다.

bottom-up 방식으로 진행하였는데 `Dp[i][j]=i에서j까지 해석하는데 드는 최소비용`으로 정의를 하였습니다

```
알고리즘 주요 로직

1) length를 0~N-1까지 루프를 돕니다.

여기서 length는 i와 j 사이의 범위를 의미합니다.

2) dp[i][j]에 딱 맞는 단어가 있는지 탐색을 진행 후 dp[i][j]에 값을 Update 합니다

3) dp[i][j]를 Mat.min(dp[i][j],dp[i][k]+[k+1][j])와 비교를 합니다. 단 여기서 k는 i보다는 같거나 크고 j보다는 작은 숫자로 정의하였습니다

```

위의 로직을 조금 더 설명을 보충하자면 

1) length가 0일때 

[0,0] [1,1] [2,2] [3,3] [4,4] ... 이렇게 탐색을 진행합니다.

2) dp[i][j]에 해당하는 단어가 있는지 판별합니다.

가령 neotowheret 에서 i가 0 j가 2라면 `neo`라는 서브 String과

주어진 N개의 단어중 neo의 서브스트링과 일치하는 단어를 찾아서 cost를 업데이트 해줍니다.


3) cost를 업데이트한 후 dp[0][2]를 dp[0][0]+dp[1][2] , dp[0][1]+dp[2][2] 의 값들과 비교를 진행합니다.

이는 neo를 해석하는데 드는 비용 중 `n을해석하는데 드는 비용 + eo를 해석하는데 드는 비용 ` 과 'ne를 해석하는데 드는 비용 + o를 해석하는데 드는 비용`을 비교하여 연산을 진행합니다.

이렇게 부분적으로 계속해서 연산을 진행한다면 dp[i][j]는 최소의 해석 비용이 담겨져 있을 것입니다.

최종적으로는 `dp[0][target.length()-1]` 에 문장을 해석 할 수 있는 최소 비용이 담길 것 입니다.


<br/> <br/>

```java

public class Main {

    static String target;
    static String[] wordAry;
    static int[][] dp;
    static int N;


    static final int INF =10000000;


    public static void main(String[] argv) throws IOException {

        init();
        int answer=calc();

        if(answer>=INF)
            System.out.println(-1);
        else
            System.out.println(answer);


    }



    public static void init() throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        target=br.readLine();
        N=stoi(br.readLine());

        wordAry=new String[N+1];
        dp=new int[target.length()+1][target.length()+1];

        for(int i=1;i<=N;i++){
            wordAry[i]=br.readLine();
        }

        for(int i=0;i<target.length();i++)
            Arrays.fill(dp[i],INF);
    }

    public static int calc(){


        for(int length=0;length<target.length();length++){
            for(int left=0;left<target.length()-length;left++){
                int right=left+length;


                for(int j=1;j<=N;j++) {
                    String curWord = wordAry[j];
                    if (curWord.length()==right-left+1 && equal(curWord, left,right)) {
                        dp[left][right] = Math.min(dp[left][right],compare(curWord, left,right));
                    }
                }
                for(int k=left;k<=right-1;k++){
                    dp[left][right]=Math.min(dp[left][right],dp[left][k]+dp[k+1][right]);
                }
            }
        }



        return dp[0][target.length()-1];

    }

    public static boolean equal(String word,int startIndex,int endIndex){
        String sub=target.substring(startIndex,endIndex+1);
        int[] subAry = new int[26];
        int[] targetAry=new int[26];

        for(int i=0;i<sub.length();i++){
            subAry[sub.charAt(i)-'a']++;
            targetAry[word.charAt(i)-'a']++;
        }

        for(int i=0;i<26;i++){
            if(subAry[i]!=targetAry[i])
                return false;
        }

        return true;


    }

    public static int compare(String word,int startIndex,int endIndex){
        String sub=target.substring(startIndex,endIndex+1);
        int cnt=0;
        for(int i=0;i<word.length();i++){
            if(sub.charAt(i)!=word.charAt(i))
                cnt++;
        }

        return cnt;
    }




    public static int stoi(String input){
        return Integer.parseInt(input);
    }

}



```