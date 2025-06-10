import { NextRequest, NextResponse } from 'next/server'
import { 
  getPlatformStats, 
  getBrandStats, 
  getCampaignStats, 
  getSentimentAnalysis,
  getEngagementTrends 
} from '@/lib/queries'
import { PostFilters } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Parse query parameters into filters
    const filters: PostFilters = {}
    
    const platforms = searchParams.get('platforms')
    if (platforms) filters.platforms = platforms.split(',')
    
    const brands = searchParams.get('brands')
    if (brands) filters.brands = brands.split(',')
    
    const campaigns = searchParams.get('campaigns')
    if (campaigns) filters.campaigns = campaigns.split(',')
    
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    if (startDate && endDate) {
      filters.dateRange = {
        start: new Date(startDate),
        end: new Date(endDate)
      }
    }
    
    // Get analytics data
    const [
      platformStats,
      brandStats,
      campaignStats,
      sentimentAnalysis,
      engagementTrends
    ] = await Promise.all([
      getPlatformStats(filters),
      getBrandStats(filters),
      getCampaignStats(filters),
      getSentimentAnalysis(filters),
      getEngagementTrends(filters)
    ])
    
    return NextResponse.json({
      success: true,
      data: {
        platformStats,
        brandStats,
        campaignStats,
        sentimentAnalysis,
        engagementTrends,
        filters
      }
    })
    
  } catch (error) {
    console.error('API Error - Analytics:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch analytics data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}