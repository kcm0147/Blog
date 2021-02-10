---
title : '[BOJ] 10282 해킹'
date : 2021-02-10 16:11:12
category : 'Algorithms'
draft : false
description : "10282 해킹"
tags : ['다익스트라']
---

* 다익스트라


<br/>


![스크린샷 2021-02-10 오후 11 04 38](https://user-images.githubusercontent.com/57346393/107520076-5c51f780-6bf4-11eb-864c-5641da4453fa.png)

<br/>

N개의 컴퓨터가 주어지고, 처음 컴퓨터가 해킹이 당했을 때, 해킹을 당한 컴퓨터와 연결된 컴퓨터들은 시간이 지남으로 인해 감염이 됩니다.

이때 마지막으로 감염된 컴퓨터의 시간 및 감염된 컴퓨터의 수를 구하라고 하였습니다.

잘 생각해보면 마지막으로 감염된 컴퓨터의 시간은 결국 출발지의 컴퓨터로부터 가장 먼 곳에 있는 컴퓨터를 의미합니다.

하지만 단순 가장 멀리있는 컴퓨터를 의미하는 것이 아니고, 처음 감염된 컴퓨터로부터 최단거리로 가되, 가장 멀리 있는 컴퓨터를 의미하는 것입니다.

이는 곧 `다익스트라 알고리즘`을 이용하여 출발지로부터 연결된 모든 노드들의 최단거리를 구하고, 감염된 컴퓨터의 수를 카운팅하면 됩니다.

감염된 컴퓨터의 수는 distance가 INF가 아닌 것을 찾으면 됩니다 !



<br/> <br/>

```java

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

public class Main {

    static List<ArrayList<Node>> graph;
    static int N,K,start,maxTime,cnt;
    static int[] dist;
    static final int INF = 987654321;

    public static void main(String[] argv) throws IOException{

        init();

    }


    public static void init() throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;
        int tc=stoi(br.readLine());

        for(int i=0;i<tc;i++){
            st=new StringTokenizer(br.readLine());
            N=stoi(st.nextToken());

            graph = new ArrayList<>();
            dist= new int[N+1];
            maxTime=0;
            cnt=0;

            Arrays.fill(dist,INF);

            for(int j=0;j<=N;j++){ // init graph
                graph.add(new ArrayList<>());
            }
            K=stoi(st.nextToken());
            start = stoi(st.nextToken());

            for(int j=0;j<K;j++){
                st=new StringTokenizer(br.readLine());
                int index1=stoi(st.nextToken());
                int index2=stoi(st.nextToken());
                int weight=stoi(st.nextToken());
                linkNode(index2,index1,weight);
            }

            calc(start);
            findAnswer();
            System.out.print(cnt+" "+maxTime);
            System.out.println();
        }



    }


    public static void calc(int start){
        dist[start]=0;
        PriorityQueue<Node> que = new PriorityQueue<Node>((o1,o2)->o1.weight-o2.weight);
        que.add(new Node(start,0));


        while(!que.isEmpty()){
            Node cur = que.poll();
            ArrayList<Node> edgeList =getEdgeList(cur.index);

            for(int i=0;i<edgeList.size();i++){
                Node linkNode = edgeList.get(i);

                if(dist[linkNode.index]>dist[cur.index]+linkNode.weight){
                    int nDist=dist[cur.index]+linkNode.weight;
                    dist[linkNode.index]=nDist;
                    que.add(new Node(linkNode.index,nDist));
                }
            }

        }
    }

    public static void findAnswer(){
        for(int i=1;i<=N;i++){
            if(dist[i]!=INF) {
                cnt++;
                maxTime = Math.max(maxTime, dist[i]);
            }

        }
    }


    public static void linkNode(int index1,int index2,int weight){
        graph.get(index1).add(new Node(index2,weight));
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