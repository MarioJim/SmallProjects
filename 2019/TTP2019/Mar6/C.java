import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.Scanner;

public class C {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int tests = sc.nextInt();
        sc.nextLine();
        for (int i = 0; i < tests; i++) {
            String[] dates = sc.nextLine().split(" ");
            String[] date1Str = dates[0].split("/");
            String[] date2Str = dates[1].split("/");
            int[] date1 = new int[3];
            int[] date2 = new int[2];
            date1[0] = Integer.parseInt(date1Str[0]);
            date1[1] = Integer.parseInt(date1Str[1]);
            date1[2] = Integer.parseInt(date1Str[2]);
            date2[0] = Integer.parseInt(date2Str[0]);
            date2[1] = Integer.parseInt(date2Str[1]);

            GregorianCalendar cal1 = new GregorianCalendar(date1[2], date1[0] - 1, date1[1]);
            GregorianCalendar[] cal2 = { new GregorianCalendar(date1[2] - 1, date2[0] - 1, date2[1]),
                    new GregorianCalendar(date1[2], date2[0] - 1, date2[1]),
                    new GregorianCalendar(date1[2] + 1, date2[0] - 1, date2[1]) };

            long diff1 = Math.abs(cal1.getTimeInMillis() - cal2[0].getTimeInMillis());
            long diff2 = Math.abs(cal1.getTimeInMillis() - cal2[1].getTimeInMillis());
            long diff3 = Math.abs(cal1.getTimeInMillis() - cal2[2].getTimeInMillis());

            int chosen = 2;

            if (diff1 < diff2 && diff1 < diff3)
                chosen = 0;
            else if (diff2 < diff1 && diff2 < diff3)
                chosen = 1;

            long diff = cal1.getTimeInMillis() - cal2[chosen].getTimeInMillis();
            diff /= (3600 * 24 * 1000);

            if (diff == 0)
                System.out.println("SAME DAY");
            else if (diff == -1)
                System.out
                        .println((cal2[chosen].get(Calendar.MONTH) + 1) + "/" + cal2[chosen].get(Calendar.DAY_OF_MONTH)
                                + "/" + cal2[chosen].get(Calendar.YEAR) + " IS " + (-diff) + " DAY AFTER");
            else if (diff < 0 && diff >= -7)
                System.out
                        .println((cal2[chosen].get(Calendar.MONTH) + 1) + "/" + cal2[chosen].get(Calendar.DAY_OF_MONTH)
                                + "/" + cal2[chosen].get(Calendar.YEAR) + " IS " + (-diff) + " DAYS AFTER");
            else if (diff == 1)
                System.out
                        .println((cal2[chosen].get(Calendar.MONTH) + 1) + "/" + cal2[chosen].get(Calendar.DAY_OF_MONTH)
                                + "/" + cal2[chosen].get(Calendar.YEAR) + " IS " + (-diff) + " DAY PRIOR");
            else if (diff > 0 && diff <= 7)
                System.out
                        .println((cal2[chosen].get(Calendar.MONTH) + 1) + "/" + cal2[chosen].get(Calendar.DAY_OF_MONTH)
                                + "/" + cal2[chosen].get(Calendar.YEAR) + " IS " + (diff) + " DAYS PRIOR");
            else
                System.out.println("OUT OF RANGE");

        }
        sc.close();
    }
}