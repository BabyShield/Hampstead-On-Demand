import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts } from '@/content/blog/blog-posts'
import { getBlogPostSchema } from '@/lib/structured-data'
import type { Metadata } from 'next'

// Allow dynamic params for blog slugs, but use static rendering + ISR
// (no external calls - reads from static array, so no need for force-dynamic)
export const dynamicParams = true

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedDate,
      modifiedTime: post.modifiedDate,
      authors: [post.author],
      tags: post.tags,
    },
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  const schema = getBlogPostSchema({
    title: post.title,
    description: post.description,
    slug: post.slug,
    publishedDate: post.publishedDate,
    modifiedDate: post.modifiedDate,
    author: post.author,
  })

  // Format content with basic markdown-like rendering
  const formattedContent = post.content
    .split('\n')
    .map((line, idx) => {
      // Headings
      if (line.startsWith('# ')) {
        return <h1 key={idx} style={{ fontSize: '36px', fontWeight: 'bold', marginTop: '48px', marginBottom: '24px', color: '#2C3E50' }}>{line.substring(2)}</h1>
      }
      if (line.startsWith('## ')) {
        return <h2 key={idx} style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '40px', marginBottom: '20px', color: '#2C3E50' }}>{line.substring(3)}</h2>
      }
      if (line.startsWith('### ')) {
        return <h3 key={idx} style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '32px', marginBottom: '16px', color: '#2C3E50' }}>{line.substring(4)}</h3>
      }

      // Empty lines
      if (line.trim() === '') {
        return <div key={idx} style={{ height: '16px' }} />
      }

      // Bold text
      const boldFormatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

      // Regular paragraph
      return (
        <p
          key={idx}
          style={{
            fontSize: '16px',
            lineHeight: '1.8',
            color: '#444',
            marginBottom: '16px',
          }}
          dangerouslySetInnerHTML={{ __html: boldFormatted }}
        />
      )
    })

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
        {/* Header */}
        <header style={{
          backgroundColor: '#2C3E50',
          color: 'white',
          padding: '40px 24px 32px',
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <Link
              href="/blog"
              style={{
                color: '#C19A5B',
                textDecoration: 'none',
                fontSize: '14px',
                marginBottom: '24px',
                display: 'inline-block',
              }}
            >
              ← Back to Blog
            </Link>

            <div style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '16px',
              flexWrap: 'wrap',
            }}>
              <span style={{
                backgroundColor: '#C19A5B',
                color: 'white',
                padding: '6px 16px',
                borderRadius: '16px',
                fontSize: '13px',
                fontWeight: '600',
              }}>
                {post.category}
              </span>
              <span style={{ opacity: 0.8, fontSize: '13px' }}>
                {post.readTime} min read
              </span>
            </div>

            <h1 style={{
              fontSize: '42px',
              fontWeight: 'bold',
              marginBottom: '24px',
              lineHeight: '1.2',
            }}>
              {post.title}
            </h1>

            <div style={{
              display: 'flex',
              gap: '24px',
              fontSize: '14px',
              opacity: 0.9,
            }}>
              <span>{post.author}</span>
              <span>•</span>
              <span>{new Date(post.publishedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '60px 24px',
        }}>
          <div style={{
            backgroundColor: '#f8f9fa',
            border: '2px solid #C19A5B',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '48px',
          }}>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: '#2C3E50',
              margin: 0,
              fontWeight: '500',
            }}>
              {post.description}
            </p>
          </div>

          <div style={{ fontSize: '16px', lineHeight: '1.8', color: '#333' }}>
            {formattedContent}
          </div>

          {/* Tags */}
          <div style={{
            marginTop: '60px',
            paddingTop: '32px',
            borderTop: '2px solid #eee',
          }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#666',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Tags
            </h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    backgroundColor: '#f0f0f0',
                    color: '#666',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '13px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* CTA Section */}
        <section style={{
          backgroundColor: '#2C3E50',
          color: 'white',
          padding: '60px 24px',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>
              Need {post.category} Services in Hampstead?
            </h2>
            <p style={{ fontSize: '18px', marginBottom: '32px', opacity: 0.9 }}>
              We're available 24/7 for emergency services. Get in touch now!
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="tel:02038742670"
                style={{
                  backgroundColor: '#C19A5B',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}
              >
                📞 Call: 020 3874 2670
              </a>
              <Link
                href="/services"
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  border: '2px solid white',
                }}
              >
                View All Services
              </Link>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '60px 24px',
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '32px',
            color: '#2C3E50',
          }}>
            Related Articles
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {blogPosts
              .filter((p) => p.category === post.category && p.id !== post.id)
              .slice(0, 3)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <article
                    style={{
                    backgroundColor: '#f8f9fa',
                    borderRadius: '12px',
                    padding: '24px',
                    height: '100%',
                    cursor: 'pointer',
                  }}
                  >
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      marginBottom: '12px',
                      color: '#2C3E50',
                    }}>
                      {relatedPost.title}
                    </h3>
                    <p style={{
                      color: '#666',
                      fontSize: '14px',
                      lineHeight: '1.5',
                    }}>
                      {relatedPost.description.substring(0, 100)}...
                    </p>
                    <span style={{
                      color: '#C19A5B',
                      fontWeight: '600',
                      fontSize: '14px',
                      marginTop: '16px',
                      display: 'inline-block',
                    }}>
                      Read More →
                    </span>
                  </article>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </>
  )
}
