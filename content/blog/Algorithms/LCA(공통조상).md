---
title : 'LCA(공통조상)'
date : 2021-01-23 13:12:04
category : 'Algorithms'
draft : false
description : "LCA(공통조상)에 관하여"
tags : ['Tree','LCA']
---

* Tree
* LCA

#### 연관문제 11438 LCA2

<br/> <br/>

### LCA(Lowest Common Ancestor)

트리에서 정의되는 LCA란?

두 정점에서 (자신을 포함한) 조상들을 거슬러 올라갈 때 처음으로 공통되게 만나는 정점을 의미합니다.
<br/>

![사진1](https://user-images.githubusercontent.com/57346393/105565951-cc472d80-5d6c-11eb-8475-3d0276fcfaa7.png)

<br/>

다음과 같은 트리에서 6번 정점과 10번 정점의 LCA를 구하게 되면 2번 정점이 6번 정점과 10번정점의 LCA가 됩니다.

<br/>

![사진2](https://user-images.githubusercontent.com/57346393/105565953-cea98780-5d6c-11eb-82ae-3a398dae03d9.png)

<br/>

LCA가 무엇인지 알아보았습니다.

이제 이것을 어떤 방식으로 구현할 수 있을까요??

### LCA를 구하는 두 정점의 높이를 동등하게 맞춰준 후 동시에 조상을 탐색하면서 LCA를 구할 수 있습니다
<br/>

![사진3](https://user-images.githubusercontent.com/57346393/105566021-2a741080-5d6d-11eb-9327-022ebde127d7.png)

<br/>

예를 들어 7번 정점과 10번 정점의 LCA를 구한다면 7번 정점의 깊이는 2이고 10번 정점의 깊이는 3이므로 10번 정점의 깊이를 2에 맞춰주어 5번 정점을 보게합니다.
<br/>

![사진4](https://user-images.githubusercontent.com/57346393/105566071-80e14f00-5d6d-11eb-81a0-ba277eaf9218.png)

<br/>

5번 정점과 7번 정점이 공통된 조상을 찾을 때까지 Bottom up을 한다면 LCA를 찾을 수 있습니다.

하지만 이 방법을 사용한다면 최악의 경우 정점의 개수에 비례하여 높이를 맞추게 되니 O(N)의 시간복잡도를 가지게 됩니다.

노드의 수가 많아지게 된다면 시간초과가 발생 할 수 있습니다.

그래서 O(logN)의 시간복잡도를 이용하여 LCA를 구하는 방법을 알아보겠습니다.

1. DFS를 이용하면서 각 정점의 깊이와 부모를 저장합니다


이때 한 정점에는 2^N의 부모를 저장할 것이기 때문에 parent[x][i]배열을 정의하였습니다. (x: 정점번호 i: 2^i번째 조상을 의미)

`parent[x][I]=parent[parent[x][i-1]][i-1]` 이라는 수식을 이용하여 부모를 채울 수 있습니다.

여기서 제일 중요한 것은 x의 2^i번째 조상은 x의 2^i-1 번째 조상의 2^i-1번째 조상과 같다는 점입니다.

예로들어 x의 8번째 조상은 x의 4번째 조상의 4번째 조상과 동일하다는 것입니다.

그림을 이용해서 확인하면 이해하시기 편할 것 입니다.

2. 이렇게 부모 노드를 다 저장하고 나서 똑같이 두 정점의 높이를 동등하게 맞춰줍니다

다만 저희는 2^i번째 조상들을 구했기 떄문에, 2^i만큼 지수승 씩 높이를 증가시킬 수 있습니다.

<br/>

![그림](https://user-images.githubusercontent.com/57346393/105566683-d539fe00-5d70-11eb-8671-67b0862c54d4.png)

<br/>

다음 사진에서 16번과 13번 노드의 LCA를 구하려고 합니다. 

3. 일단 16번과 13번의 깊이가 다르기 때문에 2^i씩  조상을 비교하면서 16번과 13번 노드의 깊이를 맞추도록하겠습니다.

`만약 16번 노드의 조상이 13번 노드의 깊이와 같은 경우가 없다면, 13번노드의 깊이보다 깊은 곳에서 탐색을 멈추고 

다시 그 노드에서 13번노드의 깊이와 같아지는 조상을 만날때까지 3의 연산을 반복해서 실행합니다`

16번과 13번의 경우 16의  2^1번째 부모로 갱신이되어 12번 정점과 13번 정점의 깊이가 같아지게 됩니다.
<br/>

![그림2](https://user-images.githubusercontent.com/57346393/105566695-e1be5680-5d70-11eb-9ca6-9f7053e403b3.png)

<br/>

4. 12번 정점과 13번 정점의 조상은 2^2번째 조상= 1 까지는 같지만 2^1번째 조상은 서로 다르게 됩니다. 

5. 이렇게 서로 달라질 수 있는 최소의 깊이까지의 부모까지 같이 거슬러 올라갑니다.

<br/>

![그림3](https://user-images.githubusercontent.com/57346393/105566844-a2443a00-5d71-11eb-936c-76e22bf8f9a2.png)

<br/>
바로 위 그림과 같이 2번과 3번노드의 정점까지 거슬러 올라오게 됩니다.

이후 연산이 종료되고 두 정점중 아무정점이나 상관없이 첫번째 부모가 두 정점의 LCA가 됩니다.

`만약에 두 정점의 높이를 맞추기 위해 부모를 거슬러 올라가다가 두 정점이 같아지게 된다면, 그 때는 두 정점 중 아무 정점 그 자체가 LCA가 됩니다`



### LCA를 어떠한 경우에 활용할 수 있을까요?

1. 트리에서 두 정점 사이의 거리를 빠르게 계산 할 수 있습니다.


2. 두 정점 사이를 연결하는 간선들의 가중치의 최소값과 최댓값들을 저장하여 계산을 할 수도 있습니다.



<br/><br/>


```java

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.StringTokenizer;

public class Main{

    static int[][] parent;
    static int[] depthAry;
    static boolean[] visit;
    static int N,level;
    static Tree tree;

    public static void main(String[] argv) throws IOException{

        init();
    }

    public static void init() throws IOException {
        BufferedReader br =new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;
        N=stoi(br.readLine());
        level=20;

        parent=new int[N+1][level+1];
        depthAry=new int[N+1];
        visit=new boolean[N+1];
        tree = new Tree(N+1);


        for(int i=1;i<=N-1;i++){
            st = new StringTokenizer(br.readLine());
            tree.linkBinary(stoi(st.nextToken()),stoi(st.nextToken()));
        }

        dfs(1,0);
        depthAry[0]=-1; // 1위의 노드에게는 depth를 -1 넣어줘야한다
        updateParent();

        int tc= stoi(br.readLine());

        for(int i=0;i<tc;i++){
            st=new StringTokenizer(br.readLine());
            int num=stoi(st.nextToken());
            int num2=stoi(st.nextToken());
            System.out.println(lca(num,num2));
        }


    }


    public static int lca(int index1,int index2){


        if(depthAry[index1]!=depthAry[index2]) {
            if (depthAry[index1] > depthAry[index2]) {
                int tmp = index1;
                index1 = index2;
                index2 = tmp;
            }

            for (int i = level; i >= 0; i--) {
                if (depthAry[index1] <= depthAry[parent[index2][i]]) {
                    index2 = parent[index2][i];
                }
            }
        }

        if(index1==index2) return index1;

        if(index1!=index2) {
            for (int i = level; i >= 0; i--) {
                if (parent[index1][i] != parent[index2][i]) {
                    index1 = parent[index1][i];
                    index2 = parent[index2][i];
                }
            }
        }

        return parent[index1][0];

    }

    public static void dfs(int index,int depth){
        ArrayList<Integer> linklist = tree.getLinkList(index);

        depthAry[index]=depth;
        visit[index]=true;

        for(int i=0;i<linklist.size();i++){
            int curIndex=linklist.get(i);

            if(!visit[curIndex]){
                parent[curIndex][0]=index;
                dfs(curIndex,depth+1);
            }
        }
    }


    public static void updateParent(){
        for (int j = 1; j <= level; j++) {
            for (int i = 1; i <= N; i++) {
                parent[i][j] = parent[parent[i][j - 1]][j - 1];
            }
        }

    }



    public static int stoi(String string){
        return Integer.parseInt(string);
    }
}

class Tree{
    static ArrayList<ArrayList<Integer>> edgeList;

    Tree(int size){
        edgeList=new ArrayList<>();

        for(int i=0;i<=size;i++)
            edgeList.add(new ArrayList<>());
    }

    public static void linkBinary(int index,int index2){
        edgeList.get(index).add(index2);
        edgeList.get(index2).add(index);
    }

    public static ArrayList<Integer> getLinkList(int index){
        return edgeList.get(index);
    }


}

```