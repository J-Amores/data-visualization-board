import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, TrendingUp, Users, MessageSquare } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl">
            Social Media Analytics
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Analyze engagement across platforms with real-time insights from 12,000+ social media posts.
            Track sentiment, optimize campaigns, and discover trending content.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/dashboard">
              <Button size="lg" className="px-8">
                View Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/analytics">
              <Button variant="outline" size="lg" className="px-8">
                Analytics
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,000</div>
              <p className="text-xs text-muted-foreground">
                Across 5 major platforms
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0.29</div>
              <p className="text-xs text-muted-foreground">
                Engagement rate across brands
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Platform</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">YouTube</div>
              <p className="text-xs text-muted-foreground">
                2,436 posts (20.3%)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sentiment</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">40.3%</div>
              <p className="text-xs text-muted-foreground">
                Positive sentiment ratio
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle>Platform Coverage</CardTitle>
              <CardDescription>
                Comprehensive analysis across major social media platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { name: 'YouTube', posts: 2436, color: 'bg-red-500' },
                  { name: 'Facebook', posts: 2431, color: 'bg-blue-600' },
                  { name: 'Twitter', posts: 2406, color: 'bg-sky-500' },
                  { name: 'Reddit', posts: 2372, color: 'bg-orange-500' },
                  { name: 'Instagram', posts: 2355, color: 'bg-pink-500' },
                ].map((platform) => (
                  <div key={platform.name} className="text-center">
                    <div className={`w-12 h-12 ${platform.color} rounded-lg mx-auto mb-2`} />
                    <div className="font-medium">{platform.name}</div>
                    <div className="text-sm text-muted-foreground">{platform.posts.toLocaleString()} posts</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}