import { getDatabase, buildWhereClause, validateFilters } from './database'
import { mockPlatformStats, mockBrandStats, mockSentimentAnalysis } from './mock-database'
import { 
  SocialMediaPost, 
  PostFilters, 
  PlatformStats, 
  BrandStats, 
  CampaignStats, 
  SentimentAnalysis,
  EngagementTrend,
  TopPost,
  DashboardMetrics 
} from './types'

export async function getPosts(filters: PostFilters = {}): Promise<SocialMediaPost[]> {
  const db = getDatabase()
  const validatedFilters = validateFilters(filters)
  const { where, params } = buildWhereClause(validatedFilters)
  
  const sql = `
    SELECT * FROM social_media_posts 
    ${where} 
    ORDER BY timestamp DESC 
    LIMIT ${validatedFilters.limit || 1000} 
    OFFSET ${validatedFilters.offset || 0}
  `
  
  const stmt = db.prepare(sql)
  return stmt.all(...params) as SocialMediaPost[]
}

export async function getTotalPostCount(filters: PostFilters = {}): Promise<number> {
  const db = getDatabase()
  const validatedFilters = validateFilters(filters)
  const { where, params } = buildWhereClause(validatedFilters)
  
  const sql = `SELECT COUNT(*) as count FROM social_media_posts ${where}`
  const stmt = db.prepare(sql)
  const result = stmt.get(...params) as { count: number }
  
  return result.count
}

export async function getPlatformStats(filters: PostFilters = {}): Promise<PlatformStats[]> {
  // Using mock data for development
  // TODO: Replace with real database queries when better-sqlite3 is available
  return Promise.resolve(mockPlatformStats)
}

export async function getBrandStats(filters: PostFilters = {}): Promise<BrandStats[]> {
  // Using mock data for development
  return Promise.resolve(mockBrandStats)
}

export async function getCampaignStats(filters: PostFilters = {}): Promise<CampaignStats[]> {
  // Mock campaign data
  return Promise.resolve([
    { campaign_name: 'Innovation2024', brand_name: 'Google', post_count: 245, avg_engagement: 0.342, total_likes: 156789, campaign_phase: 'Launch', performance_score: 83.8 },
    { campaign_name: 'TechForward', brand_name: 'Microsoft', post_count: 198, avg_engagement: 0.298, total_likes: 134567, campaign_phase: 'Active', performance_score: 59.0 },
    { campaign_name: 'NextGen', brand_name: 'Samsung', post_count: 167, avg_engagement: 0.287, total_likes: 98765, campaign_phase: 'Launch', performance_score: 47.9 }
  ])
}

export async function getSentimentAnalysis(filters: PostFilters = {}): Promise<SentimentAnalysis[]> {
  return Promise.resolve(mockSentimentAnalysis)
}

export async function getEngagementTrends(filters: PostFilters = {}): Promise<EngagementTrend[]> {
  // Mock engagement trends data
  return Promise.resolve([
    { date: '2024-12-09', avg_engagement: 0.324, post_count: 156, total_likes: 45678, total_shares: 12345, total_comments: 6789 },
    { date: '2024-12-08', avg_engagement: 0.298, post_count: 142, total_likes: 43210, total_shares: 11234, total_comments: 6543 },
    { date: '2024-12-07', avg_engagement: 0.315, post_count: 168, total_likes: 48765, total_shares: 13456, total_comments: 7234 }
  ])
}

export async function getTopPosts(filters: PostFilters = {}, limit: number = 10): Promise<TopPost[]> {
  // Mock top posts data
  return Promise.resolve([
    {
      post_id: 'top_001',
      platform: 'Instagram',
      brand_name: 'Nike',
      campaign_name: 'JustDoIt2024',
      engagement_rate: 0.456,
      likes_count: 12345,
      shares_count: 3456,
      comments_count: 1234,
      sentiment_label: 'Positive',
      timestamp: '2024-12-09 15:30:00',
      text_content: 'Amazing new sneakers that will change your workout game! #Nike #Fitness'
    }
  ])
}

export async function getDashboardMetrics(filters: PostFilters = {}): Promise<DashboardMetrics> {
  const [
    posts,
    totalPosts,
    platformStats,
    brandStats,
    campaignStats,
    sentimentAnalysis,
    engagementTrends,
    topPosts
  ] = await Promise.all([
    getPosts({ ...filters, limit: 1 }),
    getTotalPostCount(filters),
    getPlatformStats(filters),
    getBrandStats(filters),
    getCampaignStats(filters),
    getSentimentAnalysis(filters),
    getEngagementTrends(filters),
    getTopPosts(filters, 5)
  ])

  // Calculate aggregate metrics
  const allPosts = await getPosts({ ...filters, limit: 10000 })
  const totalLikes = allPosts.reduce((sum, post) => sum + post.likes_count, 0)
  const totalShares = allPosts.reduce((sum, post) => sum + post.shares_count, 0)
  const totalComments = allPosts.reduce((sum, post) => sum + post.comments_count, 0)
  const totalImpressions = allPosts.reduce((sum, post) => sum + post.impressions, 0)
  const avgEngagement = allPosts.reduce((sum, post) => sum + post.engagement_rate, 0) / allPosts.length

  return {
    totalPosts,
    avgEngagement: Number(avgEngagement.toFixed(4)),
    totalLikes,
    totalShares,
    totalComments,
    totalImpressions,
    sentimentBreakdown: sentimentAnalysis,
    platformStats,
    topBrands: brandStats.slice(0, 10),
    topCampaigns: campaignStats.slice(0, 10),
    engagementTrends,
    topPosts
  }
}