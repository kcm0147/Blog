---
title : '[BOJ] 11657 타임머신'
date : 2021-02-02 15:14:04
category : 'Algorithms'
draft : false
description : "11657 타임머신 풀이"
tags : ['벨만포드']
---

* 벨만포드

<br/>

![문제사진](https://user-images.githubusercontent.com/57346393/106752088-652f5000-666d-11eb-8eb9-4807acc62d1b.png)

<br/>

[요구사항]

주어진 N개의 도시와 도시마다 이동할 수 있는 경로가 주어집니다.

시간을 계속해서 뒤로 돌릴 수 있다면 -1을 출력하여야 하며 그렇지 않다면 1번 출발지로부터 

각 도시로 갈 수 있는 최단시간을 구해야 합니다


<br/>

도시마다 이동할 수 있는 경로에 음수 간선이 있다는 것을 확인하여야 합니다.

음수 간선이 없으면, 다익스트라 알고리즘으로 문제를 해결하면 되지만, 음수간선에 사이클이 존재하는 

그래프에서 최단거리를 구하는 알고리즘은 `벨만포드 알고리즘` 을 생각 해야합니다.


벨만포드 알고리즘의 자세한 설명은 아래 블로그를 참조하였습니다

[벨만포드 알고리즘 참조](https://m.blog.naver.com/kks227/220796963742)


벨만 포드 알고리즘의 전제조건은 

```
1. 최단거리를 구한다는 전제하에 최대 |V|-1개의 간선만을 사용할 수 있습니다

2. 최단 거리가 업데이트 되는 노드가 없어질 때까지 계속해서 반복하여 구해주고, 음의 가중치로 인해
업데이트를 무한히 하게 되는 경우는 탈출시킵니다. 
(보통 무한히 반복할때는 최단거리가 존재하지 않는다고 생각합니다)

```
다익스트라 알고리즘는 하나의 노드에 연결된 간선들만을 탐색하는 것이지만

벨만포드 알고리즘은 한 루프마다 연결되어있는 모든 간선들을 탐색하여 거리가 짧아지는 경우가 생긴다면

계속해서 업데이트를 해준다는 방식에서 조금 다릅니다.

시간복잡도는 `O(VE)`로 시간은 다익스트라 알고리즘에 비해 좀 더 걸립니다.

V-1번의 루프를 도는 이유는 적어도 모든 정점을 방문하기 위해서는 V-1번을 방문해야 모든 정점을 

방문할 수 있기 때문입니다.

<br/>

```java

 public static boolean calc(int start){
        cost[start]=0;

        for(int i=1;i<=N;i++){

            for(int j=1;j<=N;j++){
                ArrayList<Node> curEdge = getEdgeList(j);

                for(int k=0;k<curEdge.size();k++){
                    Node curNode = curEdge.get(k);
                    int nextIndex=curNode.index;
                    int d = curNode.weight;

                    if(cost[j]!=INF && cost[j]+d<cost[nextIndex]){
                        cost[nextIndex]=cost[j]+d;

                        if(i==N)
                            return true;
                    }
                }
            }

        }

        return false;

    }

```
<br/>

다만 주의할 점은 방문되지 않은 정점에서 출발하지는 edge는 고려하지 않습니다

그래서 내부루프에서 `cost[j]!=INF`를 통해 아직 방문하지 않은 정점에 대해서는 탐색하지 않도록 하였습니다.



그런데 V-1만큼만 Release한다고 했는데 왜, N만큼 루프를 돌게 코드를 짰을지 궁금해 하실 수도 있습니다.

V-1번 만큼만 루프를 돌았다면 이 이상 루프를 돌지 않아도 최단거리가 업데이트 되지 않아야 정상적인데

최단거리가 구해졌음에도 불구하고 계쏙해서 최단거리가 갱신이 된다면, 이는 `음의 싸이클`이 존재하는 

사실이 됩니다. 그래서 N번째에 갱신이 된다면, 이는 음의 싸이클이 있다고 판단하고 `계속해서 시간을

역행한다`라는 결과를 출력시키는 겁니다.

또한 문제에서 가중치의 값이 -10000이 최소값이어서, 계산 중간에 4byte 정수형의 값을 넘어갈 수
 
있기 때문에 **8byte 정수형**을 사용하는 것이 좋습니다.




<br/> <br/>

```java


public class Main {

    static int N,M;
    static ArrayList<ArrayList<Node>> graph;
    static long[] cost;

    static final int INF = Integer.MAX_VALUE;


    public static void main(String[] argv) throws IOException {

        init();

        if(calc(1)){
            System.out.println(-1);
        }
        else{
            for(int i=2;i<=N;i++){
                if(cost[i]==INF)
                    System.out.println(-1);
                else
                    System.out.println(cost[i]);
            }
        }


    }

    public static void init() throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));


        StringTokenizer st = new StringTokenizer(br.readLine());
        N=stoi(st.nextToken());
        M=stoi(st.nextToken());

        cost=new long[N+1];
        graph=new ArrayList<>();

        Arrays.fill(cost,INF);

        for(int i=0;i<=N;i++)
            graph.add(new ArrayList<Node>());

        for(int i=0;i<M;i++){
            st = new StringTokenizer(br.readLine());
            int from = stoi(st.nextToken());
            int to = stoi(st.nextToken());
            int weight = stoi(st.nextToken());
            insertSingle(from,to,weight);
        }


    }

    public static boolean calc(int start){
        cost[start]=0;

        for(int i=1;i<=N;i++){

            for(int j=1;j<=N;j++){
                ArrayList<Node> curEdge = getEdgeList(j);

                for(int k=0;k<curEdge.size();k++){
                    Node curNode = curEdge.get(k);
                    int nextIndex=curNode.index;
                    int d = curNode.weight;

                    if(cost[j]!=INF && cost[j]+d<cost[nextIndex]){
                        cost[nextIndex]=cost[j]+d;

                        if(i==N)
                            return true;
                    }
                }
            }

        }

        return false;

    }

    public static void insertSingle(int from,int to,int weight){
        ArrayList<Node> edgeList = getEdgeList(from);
        edgeList.add(new Node(to,weight));
    }

    public static ArrayList<Node> getEdgeList(int index){
        return graph.get(index);
    }


    public static int stoi(String input){
        return Integer.parseInt(input);
    }

}

class Node{
    int index;
    int weight;

    Node(int index,int weight){
        this.index=index;
        this.weight=weight;
    }
}


```