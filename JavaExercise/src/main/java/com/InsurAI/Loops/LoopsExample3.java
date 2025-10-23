package com.InsurAI.Loops;

public class LoopsExample3 {
    public static void main(String[] args) {
        int i = 0;
        do {
            i++;
            if (i == 3) continue;
            System.out.println(i);
        } while (i < 5);
    }
}
