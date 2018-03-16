#include <bits/stdc++.h>
using namespace std;

#define smy				ios::sync_with_stdio(false);	cin.tie(NULL);
#define T()				int tc;	cin>>tc; while(tc--)
#define pb				push_back
#define mk				make_pair
#define ll 				long long
#define all(c)			(c).begin(), (c).end()
#define tr(c,i)			for( typeof((c).begin()) i = (c).begin(); i != (c).end(); i++)
#define fr(i,a,b)		for(int i=a; i<b; i++)
#define F				first
#define S				second
#define MOD				1000000007
#define INF				2147483647
#define INFL			9023372036854775807LL
#define MAX				1000007  //10^6+7
#define gcd(a,b) 		__gcd(a,b)
#define count_1(ans)    	__builtin_popcountll(ans)
#define clr(x,__)		memset(x,__,sizeof(x))
#define SQ				1007


int main()
{
	smy
    int ans;
    cin>>ans;
    long long vec[ans][2];
    for(int i=0; i<ans; i++)
    cin>>vec[i][0]>>vec[i][1];
    long double min = INT_MAX;
    if(ans%2==0)
    {
        int sum=ans/2;
    for(int i=0 ;i<sum; i++)
    {
        
        long double lel =  sqrt(pow((vec[i][0]-vec[i+sum][0]),2)+pow((vec[i][1]-vec[i+sum][1]),2));
        if(lel<min)
        min=lel;
    }
    }
    else
    {
         int sum=(ans-1)/2;
    for(int i=1 ;i<=sum; i++)
    {
        long long lel =  sqrt(pow((vec[i][0]-vec[i+sum][0]),2)+pow((vec[i][1]-vec[i+sum][1]),2));
        if(lel<min)
        min=lel;
    }
    }
    cout<<std::setprecision(3)<<min/(2*(1+min))<<endl;
    return 0;
}
