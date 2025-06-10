import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toLocaleString()
}

export function formatPercentage(num: number): string {
  return (num * 100).toFixed(1) + '%'
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function calculateEngagementRate(
  likes: number,
  shares: number,
  comments: number,
  impressions: number
): number {
  if (impressions === 0) return 0
  return (likes + shares + comments) / impressions
}

export function getSentimentColor(sentiment: string): string {
  switch (sentiment.toLowerCase()) {
    case 'positive':
      return 'text-green-600 bg-green-50 dark:bg-green-900/20'
    case 'negative':
      return 'text-red-600 bg-red-50 dark:bg-red-900/20'
    case 'neutral':
      return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20'
    default:
      return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20'
  }
}

export function getPlatformColor(platform: string): string {
  switch (platform.toLowerCase()) {
    case 'youtube':
      return 'text-red-600 bg-red-50 dark:bg-red-900/20'
    case 'facebook':
      return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
    case 'twitter':
      return 'text-sky-600 bg-sky-50 dark:bg-sky-900/20'
    case 'instagram':
      return 'text-pink-600 bg-pink-50 dark:bg-pink-900/20'
    case 'reddit':
      return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20'
    default:
      return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20'
  }
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}