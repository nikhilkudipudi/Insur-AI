package com.InsurAI.Arrays;

public class Array1DExample2 {
    public static void main(String[] args) {
        int[] arr = {4, 7, 2, 9, 5};
        int max = arr[0];
        for (int n : arr) {
            if (n > max) max = n;
        }
        System.out.println("Max: " + max);
    }
}

