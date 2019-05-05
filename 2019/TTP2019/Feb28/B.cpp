#include <iostream>
#include <string>

using namespace std;

int main()
{
    int t, curr1, curr2, carrying, sizeDiff;
    string num1, num2, tmp, res, largest, smallest;
    cin >> t;

    for (int i = 0; i < t; i++)
    {
        cin >> num1 >> num2;
        res = "";
        carrying = 0;
        if (num1.size() > num2.size())
        {
            largest = num1;
            smallest = num2;
        }
        else
        {
            largest = num2;
            smallest = num1;
        }
        sizeDiff = largest.size() - smallest.size();
        for (int i = largest.size() - 1; i >= 0; --i)
        {
            curr1 = largest[i] - '0';
            if (i >= sizeDiff)
                curr2 = smallest[i - sizeDiff] - '0';
            else
                curr2 = 0;

            if (curr1 + curr2 + carrying == 0)
                res = "0" + res;
            else if (curr1 + curr2 + carrying == 1)
                res = "1" + res;
            else if (curr1 + curr2 + carrying == 2)
                res = "0" + res;
            else
                res = "1" + res;

            if (curr1 + curr2 + carrying > 1)
                carrying = 1;
            else
                carrying = 0;
        }
        if (carrying == 1)
            res = "1" + res;
        cout << res << "\n";
    }
    return 0;
}