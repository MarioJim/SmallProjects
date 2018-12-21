class Staircase {
    public static void main(String[] args) {
        int[] steps = { 1, 3, 5 };

        long startTime = System.currentTimeMillis();
        System.out.println(recursiveStair(45, steps));
        long stopTime = System.currentTimeMillis();
        System.out.println("Time with recursive solution: " + (stopTime - startTime));

        startTime = System.currentTimeMillis();
        System.out.println(stairWithMemoization(45, steps));
        stopTime = System.currentTimeMillis();
        System.out.println("Time with memoization: " + (stopTime - startTime));

    }

    static long recursiveStair(int size, int[] steps) {
        long result = 0;
        for (int step : steps) {
            if (size - step == 0)
                result += 1;
            else if (size - step > 0)
                result += recursiveStair(size - step, steps);
        }
        return result;
    }

    static long stairWithMemoization(int size, int[] steps) {
        long[] numbers = new long[size + 1];
        numbers[0] = 1;
        long result;
        for (int tempStep = 1; tempStep <= size; tempStep++) {
            result = 0;
            for (int step : steps)
                if (tempStep - step >= 0)
                    result += numbers[tempStep - step];
            numbers[tempStep] = result;
        }
        return numbers[size];
    }
}
