import { NextRequest, NextResponse } from 'next/server'
import { getPosts, getTotalPostCount } from '@/lib/queries'
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
    
    const sentiments = searchParams.get('sentiments')
    if (sentiments) filters.sentiments = sentiments.split(',')
    
    const languages = searchParams.get('languages')
    if (languages) filters.languages = languages.split(',')
    
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    if (startDate && endDate) {
      filters.dateRange = {
        start: new Date(startDate),
        end: new Date(endDate)
      }
    }
    
    const minEngagement = searchParams.get('minEngagement')
    const maxEngagement = searchParams.get('maxEngagement')
    if (minEngagement && maxEngagement) {
      filters.engagementRange = {
        min: parseFloat(minEngagement),
        max: parseFloat(maxEngagement)
      }
    }
    
    const limit = searchParams.get('limit')
    if (limit) filters.limit = parseInt(limit, 10)
    
    const offset = searchParams.get('offset')
    if (offset) filters.offset = parseInt(offset, 10)
    
    // Get posts and total count
    const [posts, totalCount] = await Promise.all([
      getPosts(filters),
      getTotalPostCount(filters)
    ])
    
    return NextResponse.json({
      success: true,
      data: {
        posts,
        totalCount,
        filters,
        pagination: {
          limit: filters.limit || 1000,
          offset: filters.offset || 0,
          hasMore: (filters.offset || 0) + posts.length < totalCount
        }
      }
    })
    
  } catch (error) {
    console.error('API Error - Posts:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch posts',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}