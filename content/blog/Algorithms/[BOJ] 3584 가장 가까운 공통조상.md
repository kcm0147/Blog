---
title : '[BOJ] 3584 가장 가까운 공통 조상'
date : 2021-02-10 17:11:12
category : 'Algorithms'
draft : false
description : "3584 가장 가까운 공통 조상 문제풀이"
tags : [,'Tree','LCA']
---

* Tree
* LCA


<br/>

문제 그대로 가장 가까운 공통조상 LCA를 구하는 문제입니다.

LCA를 구하는 것을 복습하고자 이렇게 다시 문제를 풀었습니다.

자세한 문제풀이는 [LCA 설명](https://chmook.netlify.app/Algorithms/LCA(%EA%B3%B5%ED%86%B5%EC%A1%B0%EC%83%81)/) 에 적혀있습니다.

이 문제에서 Root는 주어지지 않기 때문에 parent가 0으로 설정되어있는 것을 root로 찾아주는 작업이외에는 LCA 알고리즘과 동일하게 문제를 해결할 수 있습니다.
 

<br/>




<br/> <br/>

```java

public class Main {

    static ArrayList<ArrayList<Integer>> tree;
    static int[][] parent;
    static int[] depth;
    static int N,maxLevel,root;


    public static void main(String[] argv) throws IOException{

        init();

    }


    public static void init() throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;

        int tc=stoi(br.readLine());

        for(int i=0;i<tc;i++){
            N=stoi(br.readLine());
            maxLevel=(int)(Math.log(N+1)/Math.log(2));
            parent=new int[N+1][maxLevel+1];
            depth=new int[N+1];
            depth[0]=-1;
            tree=new ArrayList<>();
            for(int j=0;j<=N;j++)
                tree.add(new ArrayList<>());
            for(int j=0;j<N-1;j++){
                st=new StringTokenizer(br.readLine());
                int index = stoi(st.nextToken());
                int index2 = stoi(st.nextToken());
                parent[index2][0]=index;
                tree.get(index).add(index2);
            }

            for(int j=1;j<=N;j++){
                if(parent[j][0]==0){
                    root=j;
                    break;
                }
            }

            updateParent(root,0);

            st=new StringTokenizer(br.readLine());
            System.out.println(lca(stoi(st.nextToken()),stoi(st.nextToken())));
        }

    }

    public static int lca(int index1,int index2){

        if(depth[index1]!=depth[index2]){

            if(depth[index1]>depth[index2]){
                int tmp=index1;
                index1=index2;
                index2=tmp;
            }

            for(int i=maxLevel;i>=0;i--){
                if(depth[index1]<=depth[parent[index2][i]]){
                    index2=parent[index2][i];
                }
            }
        }

        if(index1==index2)
            return index1;

        if(index1!=index2){

            for(int i=maxLevel;i>=0;i--){
                if(parent[index1][i]!=parent[index2][i]){
                    index1=parent[index1][i];
                    index2=parent[index2][i];
                }
            }
        }

        return parent[index1][0];
    }

    public static void updateParent(int cur,int parentIndex){

        parent[cur][0]=parentIndex;
        depth[cur]=depth[parentIndex]+1;

        for(int i=1;i<=maxLevel;i++){
            parent[cur][i]=parent[parent[cur][i-1]][i-1];
        }

        for(int i=0;i<tree.get(cur).size();i++){
            int next=tree.get(cur).get(i);
            updateParent(next,cur);
        }
    }



    public static int stoi(String input){
        return Integer.parseInt(input);
    }

}

```