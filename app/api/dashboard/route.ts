import { NextRequest, NextResponse } from 'next/server'
import { getDashboardMetrics } from '@/lib/queries'
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
    
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    if (startDate && endDate) {
      filters.dateRange = {
        start: new Date(startDate),
        end: new Date(endDate)
      }
    }
    
    // Get comprehensive dashboard metrics
    const metrics = await getDashboardMetrics(filters)
    
    return NextResponse.json({
      success: true,
      data: metrics,
      timestamp: new Date().toISOString(),
      filters
    })
    
  } catch (error) {
    console.error('API Error - Dashboard:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch dashboard metrics',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}