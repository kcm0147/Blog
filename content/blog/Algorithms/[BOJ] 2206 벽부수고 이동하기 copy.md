---
title : '[BOJ] 1949 우수마을'
date : 2021-03-23 15:14:04
category : 'Algorithms'
draft : false
description : "1949 우수마을 문제풀이"
tags : ['트리','DP']
---

* 트리
* DP


<br/>


![스크린샷 2021-03-23 오후 11 00 39](https://user-images.githubusercontent.com/57346393/112158850-e8abfd00-8c2b-11eb-8234-c4f98b5675ea.png)

<br/>

이 문제는 `트리에서의 DP`를 이용하여 문제를 해결 해야합니다.

저는 문제를 편하게 생각하기 위해서 1번 마을을 root로 생각하고 문제를 해결하였습니다.



<br/>

1. **현재 가리키고 있는 마을을 우수마을로 선택을 한다면** 

=> 이 마을과 연결되어있는 마을들은 `우수마을이 되서는 안됩니다`

1번의 이유는 문제에서 인접한 마을끼리는 우수마을이 되면 안된다고 하였기 때문입니다.

---

2. **현재 가리키고 있는 마을을 우수마을로 선택하지 않는다면** 

=> 이 마을과 연결되어있는 다음 마을들은 `우수마을이 될 수 도 있고` `우수마을이 안될 수 도` 있습니다

2번의 경우에는 현재 가리키고 있는 마을을 우수마을로 선택하지 않는다면 다음 마을이 우수마을이 안될 수 도 있다고 하였습니다.

<br/>

다만 여기에서 의아해 할 수 있습니다.

이 말은  **연속으로 우수마을을 선택하지 않는 경우를 고려한다는 말**이며 이는 곧 문제의 3번 조건에 위배되는 경우입니다.

하지만 저희가 구해야할 것은 `우수마을의 주민 수의 총 합`입니다. 

즉 **최댓값을 구하는 것이기 떄문에 연속으로 우수마을을 선택하지 않는 경우의 수는 답에 영향을 끼치지 않습니다**.


따라서 이렇게 로직을 구성해도 상관이 없게 됩니다.

<br/>

문제에서 저는 0번이라는 임의의 node를 만들어서 -> 1번을 연결한 후 연산을 진행하였습니다.


dp를 구성할 때는 `dp[nodeIndex][우수마을선정유무]로 정의`를 하였으며, 

배열의 값은 `Index마을에서 우수마을이 선정되었을때 or 되지않았을때의 최대 우수마을 수로 정의`하였습니다. 

연산을 할 때는 nodeIndex에서 경우의 수가 두가지가 나올 수 있기 때문에 

아래와 같이 `0(다음 마을을 우수마을로 선정하지 않을 때)` `1(다음 마을을 우수마을로 선정했을 때)`로 나누어서 연산을 진행하였습니다.



<br/>

```java

int result=0;

 for(int i=0;i<edgeList.size();i++){
            
    if(parent==edgeList.get(i)) continue;
        int tmp=0;

        tmp=Math.max(tmp,calc(edgeList.get(i),0,index));
        if(check==0){
            tmp=Math.max(tmp,calc(edgeList.get(i),1,index)+cost[edgeList.get(i)]);
        }

        result+=tmp;
 }

 ```



---




<br/> <br/>

```java

public class Main {

    static int N;
    static int[] cost;
    static int[][] dp;
    static List<List<Integer>> tree;

    static final int INF = 99999999;

    public static void main(String[] args) throws IOException {

        init();

        tree.get(0).add(1);
        System.out.println(calc(0,0,-1));
    }


    public static void init() throws IOException{
        BufferedReader br =new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st =new StringTokenizer(br.readLine());
        N=stoi(st.nextToken());
        tree=new ArrayList<>();
        cost=new int[N+1];

        dp=new int[N+1][2];

        for(int i=0;i<=N;i++) {
            tree.add(new ArrayList<>());
            Arrays.fill(dp[i],-INF);
        }

        st=new StringTokenizer(br.readLine());

        for(int i=1;i<=N;i++){
            cost[i]=stoi(st.nextToken());

        }

        for(int i=1;i<N;i++){
            st=new StringTokenizer(br.readLine());
            int index=stoi(st.nextToken());
            int index2=stoi(st.nextToken());
            tree.get(index).add(index2);
            tree.get(index2).add(index);

        }
    }

    public static int calc(int index,int check,int parent){

        if(dp[index][check]!=-INF) return dp[index][check];

        int result=0;
        List<Integer> edgeList=tree.get(index);

        for(int i=0;i<edgeList.size();i++){
            if(parent==edgeList.get(i)) continue;
            int tmp=0;

            tmp=Math.max(tmp,calc(edgeList.get(i),0,index));
            if(check==0){
                tmp=Math.max(tmp,calc(edgeList.get(i),1,index)+cost[edgeList.get(i)]);
            }

            result+=tmp;
        }

        return dp[index][check]=result;
    }


    public static int stoi(String input){
        return Integer.parseInt(input);
    }


}



```