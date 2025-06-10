export interface SocialMediaPost {
  post_id: string
  timestamp: string
  day_of_week: string
  platform: string
  user_id: string
  location: string
  language: string
  text_content: string
  hashtags: string
  mentions: string
  keywords: string
  topic_category: string
  sentiment_score: number
  sentiment_label: string
  emotion_type: string
  toxicity_score: number
  likes_count: number
  shares_count: number
  comments_count: number
  impressions: number
  engagement_rate: number
  brand_name: string
  product_name: string
  campaign_name: string
  campaign_phase: string
  user_past_sentiment_avg: number
  user_engagement_growth: number
  buzz_change_rate: number
}

export interface PostFilters {
  platforms?: string[]
  brands?: string[]
  campaigns?: string[]
  sentiments?: string[]
  dateRange?: {
    start: Date
    end: Date
  }
  engagementRange?: {
    min: number
    max: number
  }
  languages?: string[]
  locations?: string[]
  limit?: number
  offset?: number
}

export interface PlatformStats {
  platform: string
  post_count: number
  avg_engagement: number
  total_likes: number
  total_shares: number
  total_comments: number
  total_impressions: number
  sentiment_breakdown: {
    positive: number
    negative: number
    neutral: number
  }
}

export interface BrandStats {
  brand_name: string
  post_count: number
  avg_engagement: number
  avg_sentiment: number
  total_reach: number
  top_campaign: string
}

export interface CampaignStats {
  campaign_name: string
  brand_name: string
  post_count: number
  avg_engagement: number
  total_likes: number
  campaign_phase: string
  performance_score: number
}

export interface SentimentAnalysis {
  sentiment_label: string
  count: number
  percentage: number
  avg_engagement: number
  avg_toxicity: number
}

export interface EngagementTrend {
  date: string
  avg_engagement: number
  post_count: number
  total_likes: number
  total_shares: number
  total_comments: number
}

export interface TopPost {
  post_id: string
  platform: string
  brand_name: string
  campaign_name: string
  engagement_rate: number
  likes_count: number
  shares_count: number
  comments_count: number
  sentiment_label: string
  timestamp: string
  text_content: string
}

export interface DashboardMetrics {
  totalPosts: number
  avgEngagement: number
  totalLikes: number
  totalShares: number
  totalComments: number
  totalImpressions: number
  sentimentBreakdown: SentimentAnalysis[]
  platformStats: PlatformStats[]
  topBrands: BrandStats[]
  topCampaigns: CampaignStats[]
  engagementTrends: EngagementTrend[]
  topPosts: TopPost[]
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  error?: string
}