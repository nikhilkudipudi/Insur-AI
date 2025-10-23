package com.InsurAI.Arrays;


public class Array2DExample1 {
    public static void main(String[] args) {
        int[][] matrix = {{1,2,3}, {4,5,6}};
        for (int[] row : matrix) {
            for (int val : row) {
                System.out.print(val + " ");
            }
            System.out.println();
        }
    }
}
