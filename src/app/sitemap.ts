import { MetadataRoute } from 'next'
import { blogPosts } from '@/content/blog/blog-posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hampsteadmaintenance.co.uk'

  // Service categories for SEO
  const services = [
    'plumbing',
    'electrical',
    'handyman',
    'locksmith',
    'cleaning',
    'gardens',
    'boiler-repair',
    'emergency-plumber',
    'emergency-electrician',
    'carpet-cleaning',
    'deep-cleaning',
    'end-of-tenancy-cleaning',
    'lawn-mowing',
    'hedge-trimming',
    'gutter-cleaning',
    'lock-change',
    'emergency-lockout',
  ]

  // Location areas for local SEO
  const areas = [
    'hampstead-nw3',
    'st-johns-wood-nw8',
    'camden-nw1',
    'west-hampstead-nw6',
    'primrose-hill',
    'belsize-park',
    'swiss-cottage',
    'kilburn-nw6',
  ]

  // Emergency services pages
  const emergencyPages = [
    'emergency-plumber-hampstead',
    'emergency-locksmith-nw3',
    'emergency-electrician-london',
    '24-hour-boiler-repair',
  ]

  // Blog posts - use actual published posts instead of generating fake URLs
  const blogEntries = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.modifiedDate || post.publishedDate),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // New pages
    {
      url: `${baseUrl}/quote`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/landlord`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    // Service pages
    ...services.map((service) => ({
      url: `${baseUrl}/services/${service}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    // Location area pages
    ...areas.map((area) => ({
      url: `${baseUrl}/areas/${area}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    // Emergency pages (high priority)
    ...emergencyPages.map((page) => ({
      url: `${baseUrl}/emergency/${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    // Blog posts
    ...blogEntries,
  ]
}
