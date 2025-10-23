package com.InsurAI.Operators;

public class OperatorsExample3 {
    public static void main(String[] args) {
        int x = 5;
        x++;
        int result = (x % 2 == 0) ? 100 : 200;
        System.out.println("x = " + x);
        System.out.println("Result = " + result);
    }
}
