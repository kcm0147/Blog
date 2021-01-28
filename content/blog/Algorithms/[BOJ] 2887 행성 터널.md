---
title : '[BOJ] 2887 행성터널'
date : 2021-01-27 13:18:12
category : 'Algorithms'
draft : false
description : "2887 행성터널 문제풀이"
tags : ['최소 스패닝 트리']
---

* 최소 스패닝 트리

<br/>

![문제사진](https://user-images.githubusercontent.com/57346393/106080967-718e4700-615b-11eb-86f9-6d07a14461e5.png)

<br/>

[요구사항]

N개의 행성들을 N-1개의 터널을 건설해서 모든 행성이 연결되게 하여야 합니다. 

A(xA, yA, zA) , B(xB, yB, zB) 행성들의 간선의 가중치는 min(|xA-xB|, |yA-yB|, |zA-zB|) 입니다.

행성들을 연결하는데 필요한 최소비용을 구하는 프로그램을 구해야 합니다.

<br/>

N개의 행성 중 N-1개의 간선을 만들어야하는 문제이기 때문에 최소 스패닝 트리를 만들어야하는 문제라고 생각하고 크루스칼 알고리즘을 사용하려고 했습니다.

보통 크루스칼 알고리즘을 사용하려면 간선을 오름차순으로 정렬한 뒤 N-1개를 선택하는 방식인데

이번 문제는 행성과 행성사이에 연결하는 간선이 min(|xA-xB|, |yA-yB|, |zA-zB|) 을 의미하기 때문에 오름차순으로 정렬하기가 쉽지 않았습니다.

그래서 생각 한 방식이 x는 x끼리 오름차순을 진행 후 간선 N-1개를 구하고, y는 y끼리 오름차순을 진행 후 N-1개를 구하고 z는 z끼리 오름차순 진행후 N-1개의 간선을 구합니다.

그 다음 간선을 모두 합친 후, 다시 가중치를 기준으로 오름차순 정렬을 진행합니다.

그 중에서 N-1개의 간선을 선택하게 된다면 연산을 종료하고 답을 출력하는 식으로 문제를 해결했습니다.

이 문제의 keypoint는 어떻게 간선을 오름차순을 시킬 것인가 였던 것 같습니다.

<br/> <br/>

```java



public class Main {


    static int N;
    static ArrayList<Node> edgeList;
    static ArrayList<Planet> planetList;
    static int[] rootAry;

    public static void main(String[] argv) throws IOException {

        init();
        findEdge();
        System.out.println(calc());

    }

    public static void init() throws IOException {

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        N = Integer.parseInt(st.nextToken());

        planetList=new ArrayList<>();
        edgeList=new ArrayList<>();
        rootAry=new int[N+1];

        for(int i=1;i<=N;i++){
            st=new StringTokenizer(br.readLine());
            planetList.add(new Planet(i,stoi(st.nextToken()),stoi(st.nextToken()),stoi(st.nextToken())));
            rootAry[i]=i;
        }
    }

    public static void findEdge(){

        Collections.sort(planetList,new xcompare());
        for(int i=0;i<N-1;i++){
            Planet curPlanet=planetList.get(i);
            Planet otherPlanet=planetList.get(i+1);
            edgeList.add(new Node(curPlanet.index, otherPlanet.index, Math.abs(curPlanet.xcost- otherPlanet.xcost)));
        }

        Collections.sort(planetList,new ycompare());

        for(int i=0;i<N-1;i++){
            Planet curPlanet=planetList.get(i);
            Planet otherPlanet=planetList.get(i+1);
            edgeList.add(new Node(curPlanet.index, otherPlanet.index, Math.abs(curPlanet.ycost- otherPlanet.ycost)));
        }

        Collections.sort(planetList,new zcompare());

        for(int i=0;i<N-1;i++){
            Planet curPlanet=planetList.get(i);
            Planet otherPlanet=planetList.get(i+1);
            edgeList.add(new Node(curPlanet.index, otherPlanet.index, Math.abs(curPlanet.zcost- otherPlanet.zcost)));
        }


    }

    public static int calc(){

        int sum=0;
        int cnt=0;

        Collections.sort(edgeList);

        for(int i=0;i<edgeList.size();i++){
            Node cur = edgeList.get(i);

            if(union(cur.index,cur.index2)){
                sum+=cur.cost;
                cnt++;
            }

            if(cnt==N-1){
                return sum;
            }

        }
        return sum;
    }

    public static int find(int index){
        if(rootAry[index]==index){
            return index;
        }
        else
            return rootAry[index]=find(rootAry[index]);
    }

    public static boolean union(int index1,int index2){
        int root1=find(index1);
        int root2=find(index2);

        if(root1==root2)
            return false;
        else{
            rootAry[root2]=root1;
            return true;
        }
    }


    public static int stoi(String string){
        return Integer.parseInt(string);
    }



}

class Node implements Comparable<Node>{
    int index,index2,cost;

    Node(int index,int index2,int cost){
        this.index=index;
        this.index2=index2;
        this.cost=cost;
    }

    @Override
    public int compareTo(Node other){
        if(this.cost<other.cost)
            return -1;
        else if(this.cost==other.cost)
            return 0;
        else
            return 1;
    }
}

class Planet{
    int index;
    int xcost,ycost,zcost;

    Planet(int index,int xcost,int ycost,int zcost){
        this.index=index;
        this.xcost=xcost;
        this.ycost=ycost;
        this.zcost=zcost;
    }
}

class xcompare implements Comparator<Planet>{

    @Override
    public int compare(Planet o1, Planet o2) {
        if(o1.xcost<=o2.xcost)
            return -1;
        else
            return 1;
    }
}

class ycompare implements Comparator<Planet>{

    @Override
    public int compare(Planet o1, Planet o2) {
        if(o1.ycost<=o2.ycost)
            return -1;
        else
            return 1;
    }
}

class zcompare implements Comparator<Planet>{

    @Override
    public int compare(Planet o1, Planet o2) {
        if(o1.zcost<=o2.zcost)
            return -1;
        else
            return 1;
    }
}


```