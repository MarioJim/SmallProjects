#include <iostream>

using namespace std;

int main()
{
    int t, L, v, l, r, result;
    cin >> t;

    for (int i = 0; i < t; i++)
    {
        cin >> L >> v >> l >> r;
        result = (L - (r - l)) / v - 1;
        if (((r - l) % v == 0) && (l % v != 0))
            result++;

        cout << result << "\n";
    }

    return 0;
}