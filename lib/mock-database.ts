// Mock database implementation for development when better-sqlite3 is not available
import { SocialMediaPost, PostFilters } from './types'

// This would normally be loaded from the SQLite database
// For now, we'll create mock data based on the CSV analysis
export const mockPosts: SocialMediaPost[] = [
  {
    post_id: 'mock_001',
    timestamp: '2024-12-09 11:26:15',
    day_of_week: 'Monday',
    platform: 'Instagram',
    user_id: 'user_001',
    location: 'Melbourne, Australia',
    language: 'en',
    text_content: 'Just tried the new product from Google. Amazing experience! #Tech',
    hashtags: '#Tech',
    mentions: '@GoogleSupport',
    keywords: 'innovative, amazing, quality',
    topic_category: 'Product',
    sentiment_score: 0.85,
    sentiment_label: 'Positive',
    emotion_type: 'Happy',
    toxicity_score: 0.05,
    likes_count: 1264,
    shares_count: 342,
    comments_count: 156,
    impressions: 8991,
    engagement_rate: 0.195,
    brand_name: 'Google',
    product_name: 'Pixel Pro',
    campaign_name: 'Innovation2024',
    campaign_phase: 'Launch',
    user_past_sentiment_avg: 0.75,
    user_engagement_growth: 0.15,
    buzz_change_rate: 12.5
  },
  {
    post_id: 'mock_002',
    timestamp: '2024-12-08 15:30:22',
    day_of_week: 'Sunday',
    platform: 'Twitter',
    user_id: 'user_002',
    location: 'New York, USA',
    language: 'en',
    text_content: 'Disappointed with Microsoft latest update. Buggy and slow. #TechFail',
    hashtags: '#TechFail',
    mentions: '@MicrosoftSupport',
    keywords: 'buggy, slow, disappointed',
    topic_category: 'Support',
    sentiment_score: -0.65,
    sentiment_label: 'Negative',
    emotion_type: 'Angry',
    toxicity_score: 0.35,
    likes_count: 89,
    shares_count: 245,
    comments_count: 67,
    impressions: 5432,
    engagement_rate: 0.074,
    brand_name: 'Microsoft',
    product_name: 'Windows 11',
    campaign_name: 'UpdateWave',
    campaign_phase: 'Post-Launch',
    user_past_sentiment_avg: 0.25,
    user_engagement_growth: -0.22,
    buzz_change_rate: -8.3
  },
  // Add more mock data...
]

export function getMockPosts(filters: PostFilters = {}): SocialMediaPost[] {
  let filteredPosts = [...mockPosts]

  if (filters.platforms?.length) {
    filteredPosts = filteredPosts.filter(post => 
      filters.platforms!.includes(post.platform)
    )
  }

  if (filters.brands?.length) {
    filteredPosts = filteredPosts.filter(post => 
      filters.brands!.includes(post.brand_name)
    )
  }

  if (filters.sentiments?.length) {
    filteredPosts = filteredPosts.filter(post => 
      filters.sentiments!.includes(post.sentiment_label)
    )
  }

  const limit = filters.limit || 1000
  const offset = filters.offset || 0
  
  return filteredPosts.slice(offset, offset + limit)
}

export function getMockTotalCount(filters: PostFilters = {}): number {
  // Return mock total based on filters
  return 12000 // From our original CSV analysis
}

// Mock analytics data
export const mockPlatformStats = [
  { 
    platform: 'YouTube', 
    post_count: 2436, 
    avg_engagement: 0.324,
    total_likes: 987432,
    total_shares: 234567,
    total_comments: 156789,
    total_impressions: 9876543,
    sentiment_breakdown: { positive: 1000, negative: 1200, neutral: 236 }
  },
  { 
    platform: 'Facebook', 
    post_count: 2431, 
    avg_engagement: 0.298,
    total_likes: 876543,
    total_shares: 198765,
    total_comments: 134567,
    total_impressions: 8765432,
    sentiment_breakdown: { positive: 950, negative: 1100, neutral: 381 }
  },
  { 
    platform: 'Twitter', 
    post_count: 2406, 
    avg_engagement: 0.267,
    total_likes: 754321,
    total_shares: 176543,
    total_comments: 123456,
    total_impressions: 7654321,
    sentiment_breakdown: { positive: 890, negative: 1050, neutral: 466 }
  },
  { 
    platform: 'Reddit', 
    post_count: 2372, 
    avg_engagement: 0.315,
    total_likes: 698765,
    total_shares: 154321,
    total_comments: 187654,
    total_impressions: 6987654,
    sentiment_breakdown: { positive: 980, negative: 950, neutral: 442 }
  },
  { 
    platform: 'Instagram', 
    post_count: 2355, 
    avg_engagement: 0.342,
    total_likes: 1234567,
    total_shares: 298765,
    total_comments: 198765,
    total_impressions: 12345678,
    sentiment_breakdown: { positive: 1200, negative: 850, neutral: 305 }
  }
]

export const mockBrandStats = [
  { brand_name: 'Microsoft', post_count: 1239, avg_engagement: 0.341, avg_sentiment: 0.25, total_reach: 8765432, top_campaign: 'Innovation2024' },
  { brand_name: 'Google', post_count: 1216, avg_engagement: 0.257, avg_sentiment: 0.45, total_reach: 9876543, top_campaign: 'TechForward' },
  { brand_name: 'Apple', post_count: 1192, avg_engagement: 0.273, avg_sentiment: 0.55, total_reach: 7654321, top_campaign: 'ThinkDifferent' },
  { brand_name: 'Samsung', post_count: 1216, avg_engagement: 0.276, avg_sentiment: 0.35, total_reach: 6543210, top_campaign: 'NextGen' },
  { brand_name: 'Nike', post_count: 1219, avg_engagement: 0.287, avg_sentiment: 0.65, total_reach: 5432109, top_campaign: 'JustDoIt2024' }
]

export const mockSentimentAnalysis = [
  { sentiment_label: 'Positive', count: 4839, percentage: 40.33, avg_engagement: 0.315, avg_toxicity: 0.12 },
  { sentiment_label: 'Negative', count: 4854, percentage: 40.45, avg_engagement: 0.267, avg_toxicity: 0.58 },
  { sentiment_label: 'Neutral', count: 2307, percentage: 19.23, avg_engagement: 0.298, avg_toxicity: 0.25 }
]