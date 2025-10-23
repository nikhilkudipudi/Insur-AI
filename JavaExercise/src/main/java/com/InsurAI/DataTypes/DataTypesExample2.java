package com.InsurAI.DataTypes;


public class DataTypesExample2 {
    public static void main(String[] args) {
        double num = 10.75;
        int value = (int) num; // Explicit casting
        float newVal = value;  // Implicit casting

        System.out.println("Original double: " + num);
        System.out.println("After casting to int: " + value);
        System.out.println("Implicit cast to float: " + newVal);
    }
}
