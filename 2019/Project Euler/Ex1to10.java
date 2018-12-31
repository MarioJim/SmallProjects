import java.math.BigInteger;
import java.util.ArrayList;

class Ex1to10 {
    public static void main(String[] args) {
        System.out.println("Exercise 1: " + ex1());
        System.out.println("Exercise 2: " + ex2());
        System.out.println("Exercise 3: " + ex3());
        System.out.println("Exercise 4: " + ex4());
        System.out.println("Exercise 5: " + ex5());
        System.out.println("Exercise 6: " + ex6());
        System.out.println("Exercise 7: " + ex7());
        System.out.println("Exercise 8: " + ex8());
        System.out.println("Exercise 9: " + ex9());
        System.out.println("Exercise 10: " + ex10());
    }

    static int ex1() {
        int result = 0;
        for (int i = 1; i < 1000; i++)
            if (i % 3 == 0 || i % 5 == 0)
                result += i;
        return result;
    }

    static int ex2() {
        int result = 2, x = 1, y = 2;
        int z = x + y;
        while (y < 4000000) {
            x = y;
            y = z;
            if (z % 2 == 0)
                result += z;
            z = x + y;
        }
        return result;
    }

    static long ex3() {
        long i, n = 600851475143l;
        for (i = 2; n > 1; i++)
            if (n % i == 0)
                n /= i;
        return --i;
    }

    static int ex4() {
        int biggest = 0;
        for (int i = 1000; i > 100; i--) {
            for (int j = 1000; j > 100; j--) {
                String num = Integer.toString(i * j);
                String rev = new StringBuilder(num).reverse().toString();
                if (num.equals(rev) && i * j > biggest)
                    biggest = i * j;
            }
        }
        return biggest;
    }

    static int ex5() {
        int result = 1;
        for (int i = 2; i < 20; i++) {
            BigInteger gcdBig = BigInteger.valueOf(i).gcd(BigInteger.valueOf(result));
            int gcd = gcdBig.intValue();
            result *= i;
            result /= gcd;
        }
        return result;
    }

    static int ex6() {
        int sqSum = 0, sumSq = 0;
        for (int i = 1; i <= 100; i++) {
            sumSq += i * i;
            sqSum += i;
        }
        sqSum *= sqSum;
        return sqSum - sumSq;
    }

    static int ex7() {
        ArrayList<Integer> primes = new ArrayList<Integer>();
        int posPrime = 1;
        boolean isPrime;
        while (primes.size() < 10001) {
            isPrime = true;
            posPrime++;
            for (int prime : primes)
                if (posPrime % prime == 0)
                    isPrime = false;
            if (isPrime)
                primes.add(posPrime);
        }
        return primes.get(primes.size() - 1);
    }

    static long ex8() {
        String giantNum = "7316717653133062491922511967442657474235534919493496983520312774506326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450";
        long maxNum = 0, possible;
        for (int i = 0; i <= giantNum.length() - 13; i++) {
            possible = 1;
            for (int x = 0; x < 13; x++)
                possible *= giantNum.charAt(i + x) - '0';
            maxNum = Math.max(maxNum, possible);
        }
        return maxNum;
    }

    static int ex9() {
        int c;
        for (int a = 1; a < 998; a++) {
            for (int b = a + 1; b < 999; b++) {
                c = 1000 - a - b;
                if (a * a + b * b == c * c)
                    return a * b * c;
            }
        }
        return -1;
    }

    static long ex10() {
        long sum = 2;
        for (int posPrime = 3; posPrime < 2000000; posPrime += 2) {
            int max = (int) Math.ceil(Math.sqrt(posPrime));
            boolean isPrime = true;
            for (int i = 3; i <= max; i++)
                if (posPrime % i == 0)
                    isPrime = false;
            if (isPrime)
                sum += posPrime;
        }
        return sum;
    }
}
