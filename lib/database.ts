// Database implementation - using mock data for development
// TODO: Replace with better-sqlite3 when compatibility issues are resolved
import { SocialMediaPost, PostFilters } from './types'
import { getMockPosts, getMockTotalCount } from './mock-database'

// Mock database implementation for development
export function getDatabase() {
  // This would return a real database connection in production
  return {
    prepare: (sql: string) => ({
      all: (...params: any[]) => getMockPosts(),
      get: (...params: any[]) => ({ count: getMockTotalCount() })
    })
  }
}

export function buildWhereClause(filters: PostFilters): { where: string; params: any[] } {
  const conditions: string[] = []
  const params: any[] = []

  if (filters.platforms?.length) {
    const placeholders = filters.platforms.map(() => '?').join(',')
    conditions.push(`platform IN (${placeholders})`)
    params.push(...filters.platforms)
  }

  if (filters.brands?.length) {
    const placeholders = filters.brands.map(() => '?').join(',')
    conditions.push(`brand_name IN (${placeholders})`)
    params.push(...filters.brands)
  }

  if (filters.campaigns?.length) {
    const placeholders = filters.campaigns.map(() => '?').join(',')
    conditions.push(`campaign_name IN (${placeholders})`)
    params.push(...filters.campaigns)
  }

  if (filters.sentiments?.length) {
    const placeholders = filters.sentiments.map(() => '?').join(',')
    conditions.push(`sentiment_label IN (${placeholders})`)
    params.push(...filters.sentiments)
  }

  if (filters.languages?.length) {
    const placeholders = filters.languages.map(() => '?').join(',')
    conditions.push(`language IN (${placeholders})`)
    params.push(...filters.languages)
  }

  if (filters.dateRange) {
    conditions.push('timestamp >= ? AND timestamp <= ?')
    params.push(filters.dateRange.start.toISOString(), filters.dateRange.end.toISOString())
  }

  if (filters.engagementRange) {
    conditions.push('engagement_rate >= ? AND engagement_rate <= ?')
    params.push(filters.engagementRange.min, filters.engagementRange.max)
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''
  return { where, params }
}

export function validateFilters(filters: PostFilters): PostFilters {
  const validated: PostFilters = {}

  if (filters.platforms) validated.platforms = filters.platforms.filter(Boolean)
  if (filters.brands) validated.brands = filters.brands.filter(Boolean)
  if (filters.campaigns) validated.campaigns = filters.campaigns.filter(Boolean)
  if (filters.sentiments) validated.sentiments = filters.sentiments.filter(Boolean)
  if (filters.languages) validated.languages = filters.languages.filter(Boolean)
  if (filters.locations) validated.locations = filters.locations.filter(Boolean)
  
  if (filters.dateRange) {
    validated.dateRange = {
      start: new Date(filters.dateRange.start),
      end: new Date(filters.dateRange.end)
    }
  }

  if (filters.engagementRange) {
    validated.engagementRange = {
      min: Math.max(0, filters.engagementRange.min),
      max: Math.min(100, filters.engagementRange.max)
    }
  }

  validated.limit = Math.min(filters.limit || 1000, 10000)
  validated.offset = Math.max(filters.offset || 0, 0)

  return validated
}

export function closeDatabaseConnection(): void {
  if (db) {
    db.close()
    db = null
  }
}

// Graceful shutdown
if (typeof process !== 'undefined') {
  process.on('exit', closeDatabaseConnection)
  process.on('SIGINT', closeDatabaseConnection)
  process.on('SIGTERM', closeDatabaseConnection)
}