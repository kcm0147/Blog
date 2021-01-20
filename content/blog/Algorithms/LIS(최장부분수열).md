---
title : 'LIS(최장부분수열)'
date : 2021-01-14 21:12:04
category : 'Algorithms'
draft : false
description : "LIS(최장부분수열)에 관하여"
tags : ['DP','LIS','Binary Search']
---

## 연관 문제 : 백준 12015 가장 긴 부분수열 길이 구하기

* 다이나믹 프로그래밍
* 이진 탐색


가장 긴 증가하는 부분 수열을 보통 LIS라고 한다.

EX) 10 20 15 30 11 32 를 예로 들면

가장 긴 증가하는 부분 수열은 **10** 20 **15** 30 **19** **28** 이 된다


LIS를 구하는 방법은 두가지가 존재하는데,

1) DP(Dynamic Programming)을 이용해서 구하는 방법

2) 이진탐색을 이용해서 구하는 방법

이렇게 두가지가 존재한다. 2번의 경우를 사용했을때 좀 더 빠르게 LIS를 구할 수 있다.

### 1번의 경우는 
`Dp[j] = arr[j]를 마지막 원소를 사용하였을 때의 최장 부분 수열의 길이`를 배열 Dp[]로 정의를 한다.

```java
public static void lis_dp(int n){ // dp를 이용한 lis algorithm
    int i,j;
    int max = 1;
    for(i=0;i<n;i++){
        dp[i] = 1;
        for(j=0;j<i;j++){
            if(arr[j] < arr[i] && dp[j]+1 > dp[i]){
                dp[i] = dp[j]+1;
                if(max < dp[i]){
                    max = dp[i];
                }
            }
        }
    }
    return max;
}
```

Arr의 i를 0부터 n까지 순회하되, j는 i-1까지 순회한다.
i의 이전 값(j)가 i보다 작다면 수열의 조건에 해당하고, 이때의 Dp[j]값이 Dp[i]보다 크다면? Dp[i] 는 Dp[j]에다가 1을 더한 값이 된다 (자신의 수 i를 수열에 포함시키기 때문)

이는 시간복잡도가 O(N^2)가 되기 때문에 배열의 길이가 길면 길수록 시간이 매우 오래걸리게 된다.

---
---

### 2번 - Binary Search를 이용하여 Lower Bound를 찾아 LIS를 구하는 방법

2번의 경우 로직은 간단하다.

`1) LIS의 rear값과 현재 탐색하고 있는 numAry[]의 숫자를 비교한다`

`2) numAry[i] < LIS[rear] 이면`
BinarySerach를 이용하여 numAry[I]의 Lower Bound를 찾아서 그 자리에 numAry[i]의 값을 집어 넣는다.

`3) numAry[i] > LIS[rear] 이면`
LIS[rear]  바로 뒤에 numAry[i]를 붙인다.

예제를 들어보면
10 20 11 30 15 50 으로 해보자.

10 => LIS[] = {**10**}
20 => LIS[] = {10 **20** }
11 => LIS[] = {**11** 20}
30 => LIS[] = {11 20 **30**}
15 => LIS[] = {11 **15** 30}
50=> LIS[] = {11 15 30 **50**} 의 결과가 되며, 최장 부분 수열의 길이는 4가 된다.

### 그런데 이 과정을 보면 의문사항이 생길 수도 있을 것이다.

```
Q. LIS에 들어있는 11 15 30 50이 실제로 최장 부분 수열인가? 
A. 아니다 존재 하지 않는 수열이다. 그런데 우리가 구하는 것은 부분 수열의 길이이기 때문에 답이 될 수 있는 것이다.
```

위의 과정을 다시 보면 원래라면 11대신 10, 15대신 20이 LIS에 들어가야한다.
그런데 10과 20을 덮어도 되는 이유는 11과 15가 뒤에 나오는 숫자인 30 50을 만족하여 부분 수열을 만들 수 있기 때문이다.

그러면 우리는 최장 부분 수열을 어떻게 구할 수 있는가 ?
LIS에 숫자를 넣을 때 몇번 째에 넣었는지 기록을 하기 위한 Index[]을 하나 만들자

예로들어 10 20 11 30 15 50을 넣는다면?

NumAry    10  20 11 30  15  50
Index[]는     1   2   1    3    2   4 로 채워질 것 이다.

그럼 이것을 이용해서 어떻게 수열을 찾을까? 

문제의 11과 15를 보자. 11은 20과 30사이에 있고, 15는 30과 50 사이에 있다.
Index 값이 이전과 다음 숫자 보다 작으면 문제가 생기는 것이다. 
근데 이렇게 판단을 하는 것보다 
Index의 끝 값 부터 하나씩 숫자를 출력하면 된다

```
NumAry의 끝에서 부터 탐색을 하여, 
처음에 Index 4를 찾았으니 50을 출력 o
그다음 index 3을 찾아야하는데 15(2)가 나오니 출력 x
Index 3인 30을 발견하였으니 출력 o
Index 2를 찾아야하는데 11(1)이 나왔으니 출력 x
Index 2인 20을 발견하였으니 출력 o
Index 1인 10을 발견하였으니 출력 o
```

이 값들을 역순으로 다시 출력시키면  `10 20 30 50` 이 나오게 된다.






```java
class Main{

    static int[] numAry;
    static int[] LIS;
    static int rear;


    public static void main(String[] argv) throws IOException {

        init();
        calc();
        System.out.println(rear+1);

    }

    public static void init() throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int size=Integer.parseInt(br.readLine());
        numAry=new int[size];
        LIS=new int[size];

        StringTokenizer st = new StringTokenizer(br.readLine());
        for(int i=0;i<size;i++){
            numAry[i]=Integer.parseInt(st.nextToken());
        }
    }

    public static void calc(){
        LIS[0]=numAry[0];
        
        for(int i=1;i<numAry.length;i++){
            if(LIS[rear]>numAry[i]){
                int index=binarySearch(0,rear,numAry[i]);
                LIS[index]=numAry[i];
            }
            else if(LIS[rear]==numAry[i])
                continue;
            else{
                LIS[++rear]=numAry[i];
            }
        }
    }

    public static int binarySearch(int start,int end,int insertNum){
        int middle;

        while(start<end){
            middle=(start+end)/2;
            if(LIS[middle]<insertNum){
                start=middle+1;
            }
            else{
                end=middle;
            }
        }

        return end;
    }


}


```