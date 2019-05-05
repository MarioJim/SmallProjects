#include <iostream>
#include <string>

using namespace std;

int main()
{
    int t, hour, minute, twoPoints;
    string str;
    cin >> t;

    for (int i = 0; i < t; i++)
    {
        cin >> str;
        twoPoints = str.find(":");
        if (twoPoints == 2)
        {
            hour = (str[0] - '0') * 10 + str[1] - '0';
            minute = (str[3] - '0') * 10 + str[4] - '0';
        }
        else if (twoPoints == 1)
        {
            hour = str[0] - '0';
            minute = (str[2] - '0') * 10 + str[3] - '0';
        }
        if (minute != 0)
            cout << "0\n";
        else if (hour <= 12)
            cout << (hour + 12) << "\n";
        else
            cout << (hour - 12) << "\n";
    }
    return 0;
}