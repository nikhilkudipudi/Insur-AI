package com.InsurAI.Arrays;

public class Array1DExample3 {
    public static void main(String[] args) {
        int[] nums = {5, 10, 15};
        int sum = 0;
        for (int n : nums) sum += n;
        double avg = (double) sum / nums.length;
        System.out.println("Sum: " + sum + ", Average: " + avg);
    }
}
