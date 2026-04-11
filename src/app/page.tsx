'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { SimpleChatButton } from '@/components/SimpleChatButton'

export default function Home() {
  useEffect(() => {
    const navList = document.getElementById('navList')
    const backToTop = document.getElementById('backToTop')
    const header = document.getElementById('header')
    const mobileBtn = document.getElementById('mobileMenuBtn')
    const bookButtons = Array.from(document.querySelectorAll('.service-book-btn'))
    const smoothLinks = Array.from(document.querySelectorAll('a[href^="#"]'))

    const toggleMenu = () => navList?.classList.toggle('active')

    const handleScroll = () => {
      if (window.scrollY > 50) {
        header?.classList.add('scrolled')
      } else {
        header?.classList.remove('scrolled')
      }
      if (window.scrollY > 300) {
        backToTop?.classList.add('visible')
      } else {
        backToTop?.classList.remove('visible')
      }
    }

    const handleBackToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    const handleSmooth = (e: Event, anchor: HTMLAnchorElement) => {
      e.preventDefault()
      const target = document.querySelector(anchor.getAttribute('href') || '') as HTMLElement | null
      if (target) {
        const offset = 200
        const top = target.offsetTop - offset
        window.scrollTo({ top, behavior: 'smooth' })
        navList?.classList.remove('active')
      }
    }

    const handleBook = () => {
      const contact = document.getElementById('contact')
      if (contact) {
        const offset = 100
        const top = contact.offsetTop - offset
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }

    window.addEventListener('scroll', handleScroll)
    backToTop?.addEventListener('click', handleBackToTop)
    mobileBtn?.addEventListener('click', toggleMenu)
    smoothLinks.forEach(link => link.addEventListener('click', e => handleSmooth(e, link as HTMLAnchorElement)))
    bookButtons.forEach(btn => btn.addEventListener('click', handleBook))

    return () => {
      window.removeEventListener('scroll', handleScroll)
      backToTop?.removeEventListener('click', handleBackToTop)
      mobileBtn?.removeEventListener('click', toggleMenu)
      smoothLinks.forEach(link => link.removeEventListener('click', e => handleSmooth(e, link as HTMLAnchorElement)))
      bookButtons.forEach(btn => btn.removeEventListener('click', handleBook))
    }
  }, [])

  return (
    <div className="page bg-white text-[#37474f]">
      <a href="#main" className="sr-only">Skip to main content</a>

      {/* Header */}
      <header className="header" id="header">
        <div className="header-inner">
          <a href="/" className="logo" aria-label="Hampstead Maintenance - Home">
            <span className="logo-main">Hampstead Maintenance</span>
            <span className="logo-tagline">On-Demand Property Services</span>
          </a>
          <div className="header-contact">
            <div className="header-address">
              <div className="header-address-line"><strong>Unit 3, Palace Court</strong></div>
              <div className="header-address-line">250 Finchley Road, NW3 6DN</div>
              <span className="showroom-badge">Same-Day Service</span>
            </div>
            <div className="header-phone-container">
              <a href="tel:02038742670" className="header-phone" aria-label="Call landline">
                <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                020 3874 2670
              </a>
              <a href="tel:07459345456" className="header-phone" aria-label="Call mobile">
                07459 345456
              </a>
            </div>
            <a href="#contact" className="btn btn-primary">Book Now</a>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="nav" id="nav">
        <div className="nav-inner">
          <button className="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle menu">☰</button>
          <ul className="nav-list" id="navList">
            <li><a href="#services" className="nav-link">All Services</a></li>
            <li><a href="#plumbing" className="nav-link">Plumbing</a></li>
            <li><a href="#electrical" className="nav-link">Electrical</a></li>
            <li><Link href="/handyman" className="nav-link">Handyman</Link></li>
            <li><Link href="/locksmith" className="nav-link">Locksmith</Link></li>
            <li><a href="#gardens" className="nav-link">Gardens</a></li>
            <li><Link href="/blog" className="nav-link">Blog</Link></li>
          </ul>
        </div>
      </nav>

      <main id="main">
        {/* Hero Section */}
        <section className="hero" id="home">
          <div className="hero-inner">
            <div className="hero-badge">
              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              Same-Day Bookings Available
              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            </div>
            <h1 className="hero-title">Hampstead's Premier Property Maintenance</h1>
            <p className="hero-subtitle">Serving NW3, NW8, NW1 & NW6 since 2009. From emergency plumbing to handyman services, our trusted local tradespeople handle all your property maintenance needs. Fixed prices. Vetted professionals. No call-out fees.</p>
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-number">57</div>
                <div className="hero-stat-label">Services</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">15</div>
                <div className="hero-stat-label">Categories</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">2hr</div>
                <div className="hero-stat-label">Response</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">5★</div>
                <div className="hero-stat-label">Rated</div>
              </div>
            </div>
            <div className="hero-actions">
              <a href="#services" className="btn btn-white btn-lg">View All Services</a>
              <a href="tel:02038742670" className="btn btn-outline btn-lg" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>Call Now</a>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="trust-bar">
          <div className="trust-bar-inner">
            <div className="trust-stat">
              <div className="trust-stat-icon">
                <svg viewBox="0 0 24 24"><path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/></svg>
              </div>
              <div className="trust-stat-number">DBS</div>
              <div className="trust-stat-label">Checked Staff</div>
            </div>
            <div className="trust-stat">
              <div className="trust-stat-icon">
                <svg viewBox="0 0 24 24"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24z"/></svg>
              </div>
              <div className="trust-stat-number">5.0</div>
              <div className="trust-stat-label">Average Rating</div>
            </div>
            <div className="trust-stat">
              <div className="trust-stat-icon">
                <svg viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
              </div>
              <div className="trust-stat-number">Fixed</div>
              <div className="trust-stat-label">Pricing</div>
            </div>
            <div className="trust-stat">
              <div className="trust-stat-icon">
                <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
              </div>
              <div className="trust-stat-number">2hr</div>
              <div className="trust-stat-label">Response Time</div>
            </div>
            <div className="trust-stat">
              <div className="trust-stat-icon">
                <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
              </div>
              <div className="trust-stat-number">£10M</div>
              <div className="trust-stat-label">Insured</div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="section" id="services">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-label">Our Services</span>
              <h2 className="section-title">57 Services Across 15 Categories</h2>
              <p className="section-description">From quick fixes to complete property maintenance packages. All prices include labour, materials, and our satisfaction guarantee.</p>
            </div>
            <div className="category-nav">
              <div className="category-nav-title">Jump to Category</div>
              <div className="category-nav-list">
                <a href="#plumbing" className="category-nav-link">🔧 Plumbing</a>
                <a href="#electrical" className="category-nav-link">⚡ Electrical</a>
                <a href="/handyman" className="category-nav-link">🔨 Handyman</a>
                <a href="#carpentry" className="category-nav-link">🪚 Carpentry</a>
                <a href="#painting" className="category-nav-link">🎨 Painting</a>
                <a href="#roofing" className="category-nav-link">🏠 Roofing</a>
                <a href="#drainage" className="category-nav-link">🌊 Drainage</a>
                <a href="/locksmith" className="category-nav-link">🔐 Locksmith</a>
                <a href="#glazing" className="category-nav-link">🪟 Glazing</a>
                <a href="#ac" className="category-nav-link">❄️ Air Con</a>
                <a href="#renovation" className="category-nav-link">🏗️ Renovation</a>
                <a href="#seasonal" className="category-nav-link">☀️ Seasonal</a>
                <a href="#landlord" className="category-nav-link">🔑 Landlord</a>
                <a href="#housekeeping" className="category-nav-link">✨ Cleaning</a>
                <a href="#gardens" className="category-nav-link">🌿 Gardens</a>
                <a href="#contact" className="category-nav-link">🚨 Emergency</a>
              </div>
            </div>

            {/* Plumbing & Heating */}
            <div className="services-category" id="plumbing">
              <div className="category-header">
                <div className="category-icon cat-plumbing">
                  <svg viewBox="0 0 24 24"><path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/></svg>
                </div>
                <div>
                  <h3 className="category-title">Plumbing & Heating</h3>
                  <span className="category-count">6 services</span>
                </div>
              </div>
              <div className="services-grid">
                <div className="service-card">
                  <div className="service-name">Boiler Service (Annual)</div>
                  <div className="service-meta">
                    <div className="service-price">£120</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      60 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Tap Repair / Replace</div>
                  <div className="service-meta">
                    <div className="service-price">£130</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      60 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Toilet Unblock</div>
                  <div className="service-meta">
                    <div className="service-price">£160</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      60 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Radiator Bleed (All)</div>
                  <div className="service-meta">
                    <div className="service-price">£110</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      60 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Leak Investigation</div>
                  <div className="service-meta">
                    <div className="service-price">£120</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      60 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Gas Safety Cert (CP12)</div>
                  <div className="service-meta">
                    <div className="service-price">£110</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      45 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
              </div>
            </div>

            {/* Electrical */}
            <div className="services-category" id="electrical">
              <div className="category-header">
                <div className="category-icon cat-electrical">
                  <svg viewBox="0 0 24 24"><path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"/></svg>
                </div>
                <div>
                  <h3 className="category-title">Electrical</h3>
                  <span className="category-count">4 services</span>
                </div>
              </div>
              <div className="services-grid">
                <div className="service-card">
                  <div className="service-name">Replace Socket / Switch</div>
                  <div className="service-meta">
                    <div className="service-price">£110</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      45 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Hang Chandelier</div>
                  <div className="service-meta">
                    <div className="service-price">£180</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      90 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">EICR (1-2 Bed Flat)</div>
                  <div className="service-meta">
                    <div className="service-price">£200</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      120 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Fault Finding</div>
                  <div className="service-meta">
                    <div className="service-price">£120</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      60 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
              </div>
            </div>

            {/* Handyman */}
            <div className="services-category" id="handyman">
              <div className="category-header">
                <div className="category-icon cat-handyman">
                  <svg viewBox="0 0 24 24"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>
                </div>
                <div>
                  <h3 className="category-title">Handyman</h3>
                  <span className="category-count">5 services</span>
                </div>
              </div>
              <div className="services-grid">
                <div className="service-card">
                  <div className="service-name">General Handyman (1 Hour)</div>
                  <div className="service-meta">
                    <div className="service-price">£95</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      60 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">TV Wall Mounting</div>
                  <div className="service-meta">
                    <div className="service-price">£140</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      90 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Hang Mirror / Art</div>
                  <div className="service-meta">
                    <div className="service-price">£85</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      45 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Flatpack Assembly (Large)</div>
                  <div className="service-meta">
                    <div className="service-price">£180</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      120 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Maintenance Investigation</div>
                  <div className="service-meta">
                    <div className="service-price">£95</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      60 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
              </div>
            </div>

            {/* Carpentry */}
            <div className="services-category" id="carpentry">
              <div className="category-header">
                <div className="category-icon cat-carpentry">
                  <svg viewBox="0 0 24 24"><path d="M19.27 6.55l-1.41-1.41-5.66 5.66 1.41 1.41 5.66-5.66zm-14.14 0L4 7.69l2.83 2.83 1.41-1.41L5.41 6.27l-.28.28zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
                </div>
                <div>
                  <h3 className="category-title">Carpentry</h3>
                  <span className="category-count">5 services</span>
                </div>
              </div>
              <div className="services-grid">
                <div className="service-card">
                  <div className="service-name">Hang Internal Door</div>
                  <div className="service-meta">
                    <div className="service-price">£160</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      90 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Sash Window Cord Repair</div>
                  <div className="service-meta">
                    <div className="service-price">£180</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      120 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Fit Door Lock/Latch</div>
                  <div className="service-meta">
                    <div className="service-price">£110</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      60 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Build Shelves (Alcove)</div>
                  <div className="service-meta">
                    <div className="service-price">£250</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      180 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Boxing In Pipework</div>
                  <div className="service-meta">
                    <div className="service-price">£140</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      90 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
              </div>
            </div>

            {/* Painting */}
            <div className="services-category" id="painting">
              <div className="category-header">
                <div className="category-icon cat-painting">
                  <svg viewBox="0 0 24 24"><path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z"/></svg>
                </div>
                <div>
                  <h3 className="category-title">Painting & Decorating</h3>
                  <span className="category-count">4 services</span>
                </div>
              </div>
              <div className="services-grid">
                <div className="service-card">
                  <div className="service-name">Painter for a Day (8 Hrs)</div>
                  <div className="service-meta">
                    <div className="service-price">£550</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      8 hours
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Touch-Up Repairs</div>
                  <div className="service-meta">
                    <div className="service-price">£150</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      120 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Paint Front Door</div>
                  <div className="service-meta">
                    <div className="service-price">£220</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      180 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Wallpaper Feature Wall</div>
                  <div className="service-meta">
                    <div className="service-price">£280</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      180 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
              </div>
            </div>

            {/* Roofing */}
            <div className="services-category" id="roofing">
              <div className="category-header">
                <div className="category-icon cat-roofing">
                  <svg viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/></svg>
                </div>
                <div>
                  <h3 className="category-title">Roofing & Gutters</h3>
                  <span className="category-count">3 services</span>
                </div>
              </div>
              <div className="services-grid">
                <div className="service-card">
                  <div className="service-name">Gutter Clean (Terrace)</div>
                  <div className="service-meta">
                    <div className="service-price">£160</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      90 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Roof Inspection (Drone)</div>
                  <div className="service-meta">
                    <div className="service-price">£200</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      60 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Replace Roof Tile</div>
                  <div className="service-meta">
                    <div className="service-price">£150</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      60 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
              </div>
            </div>

            {/* Drainage */}
            <div className="services-category" id="drainage">
              <div className="category-header">
                <div className="category-icon cat-drainage">
                  <svg viewBox="0 0 24 24"><path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/></svg>
                </div>
                <div>
                  <h3 className="category-title">Drainage</h3>
                  <span className="category-count">2 services</span>
                </div>
              </div>
              <div className="services-grid">
                <div className="service-card">
                  <div className="service-name">High Pressure Jetting</div>
                  <div className="service-meta">
                    <div className="service-price">£180</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      60 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">CCTV Drain Survey</div>
                  <div className="service-meta">
                    <div className="service-price">£250</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      90 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
              </div>
            </div>

            {/* Locksmith */}
            <div className="services-category" id="locksmith">
              <div className="category-header">
                <div className="category-icon cat-locksmith">
                  <svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
                </div>
                <div>
                  <h3 className="category-title">Locksmith & Security</h3>
                  <span className="category-count">3 services • 30-60 Minute Response</span>
                </div>
              </div>
              <div className="services-grid">
                <div className="service-card">
                  <div className="service-name">Gain Entry (Standard)</div>
                  <div className="service-meta">
                    <div className="service-price">£140</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      45 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Change Rim Cylinder (Yale)</div>
                  <div className="service-meta">
                    <div className="service-price">£110</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      30 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Board Up Window</div>
                  <div className="service-meta">
                    <div className="service-price">£180</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      60 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
              </div>
            </div>

            {/* Glazing */}
            <div className="services-category" id="glazing">
              <div className="category-header">
                <div className="category-icon cat-glazing">
                  <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V4h16v16z"/></svg>
                </div>
                <div>
                  <h3 className="category-title">Glazing</h3>
                  <span className="category-count">2 services</span>
                </div>
              </div>
              <div className="services-grid">
                <div className="service-card">
                  <div className="service-name">Replace Single Pane</div>
                  <div className="service-meta">
                    <div className="service-price">£160</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      60 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Reseal Windows (Silicone)</div>
                  <div className="service-meta">
                    <div className="service-price">£120</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      60 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
              </div>
            </div>

            {/* Air Conditioning */}
            <div className="services-category" id="ac">
              <div className="category-header">
                <div className="category-icon cat-ac">
                  <svg viewBox="0 0 24 24"><path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22z"/></svg>
                </div>
                <div>
                  <h3 className="category-title">Air Conditioning</h3>
                  <span className="category-count">2 services</span>
                </div>
              </div>
              <div className="services-grid">
                <div className="service-card">
                  <div className="service-name">AC Service (Single Unit)</div>
                  <div className="service-meta">
                    <div className="service-price">£150</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      60 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">AC Regas</div>
                  <div className="service-meta">
                    <div className="service-price">£180</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      60 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
              </div>
            </div>

            {/* Major Renovations */}
            <div className="services-category" id="renovation">
              <div className="category-header">
                <div className="category-icon cat-renovation">
                  <svg viewBox="0 0 24 24"><path d="M13.7826 15.1719L19.1213 9.83313L20.5355 11.2473L15.1967 16.5862L13.7826 15.1719ZM17 3.00006L21 7.00006L19.7071 8.29295L15.7071 4.29295L17 3.00006ZM5.43431 8.70706L3.31279 10.8286L5.4347 12.9505L7.55622 10.829L5.43431 8.70706ZM8.26286 11.5356L6.14134 13.6572L8.26326 15.7791L10.3848 13.6576L8.26286 11.5356ZM4.72728 7.00006L6.14149 5.58585L2.60609 2.05045L1.19189 3.46467L4.72728 7.00006ZM11.0914 14.3641L8.96991 16.4856L10.091 17.6066L11.0914 18.607V21.0001H13.0914V17.193L11.0914 14.3641ZM8.26286 8.70706L10.3844 10.8286L11.7988 9.41434L9.67729 7.29283L8.26286 8.70706Z"/></svg>
                </div>
                <div>
                  <h3 className="category-title">Major Renovations</h3>
                  <span className="category-count">4 services</span>
                </div>
              </div>
              <div className="services-grid">
                <div className="service-card free" data-service-type="major-renovation-consultation">
                  <div className="service-name">Full Property Renovation Consultation</div>
                  <div className="service-meta">
                    <div className="service-price">FREE</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      60 mins
                    </div>
                  </div>
                  <button className="service-book-btn" data-requires-director="true">Book Now</button>
                </div>
                <div className="service-card free">
                  <div className="service-name">Kitchen Design Visit</div>
                  <div className="service-meta">
                    <div className="service-price">FREE</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      60 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card free">
                  <div className="service-name">Full House Repainting Quote</div>
                  <div className="service-meta">
                    <div className="service-price">FREE</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      45 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">The Pre-Sale Refresh Package</div>
                  <div className="service-meta">
                    <div className="service-price">£2,500</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      2 days
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
              </div>
            </div>

            {/* Seasonal */}
            <div className="services-category" id="seasonal">
              <div className="category-header">
                <div className="category-icon cat-seasonal">
                  <svg viewBox="0 0 24 24"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/></svg>
                </div>
                <div>
                  <h3 className="category-title">Seasonal & Lifestyle</h3>
                  <span className="category-count">3 services</span>
                </div>
              </div>
              <div className="services-grid">
                <div className="service-card">
                  <div className="service-name">Patio Jet Wash (Up to 20sqm)</div>
                  <div className="service-meta">
                    <div className="service-price">From £250</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      120 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Holiday Home Check</div>
                  <div className="service-meta">
                    <div className="service-price">£45</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      30 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Christmas Tree Disposal</div>
                  <div className="service-meta">
                    <div className="service-price">£40</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      30 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
              </div>
            </div>

            {/* Landlord */}
            <div className="services-category" id="landlord">
              <div className="category-header">
                <div className="category-icon cat-landlord">
                  <svg viewBox="0 0 24 24"><path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
                </div>
                <div>
                  <h3 className="category-title">Landlord Services</h3>
                  <span className="category-count">1 service</span>
                </div>
              </div>
              <div className="services-grid">
                <div className="service-card">
                  <div className="service-name">Rental Turnaround Package</div>
                  <div className="service-meta">
                    <div className="service-price">£1,200</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      8 hours
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
              </div>
            </div>

            {/* Housekeeping */}
            <div className="services-category" id="housekeeping">
              <div className="category-header">
                <div className="category-icon cat-housekeeping">
                  <svg viewBox="0 0 24 24"><path d="M17.66 8L12 2.35 6.34 8C4.78 9.56 4 11.64 4 13.64s.78 4.11 2.34 5.67 3.61 2.35 5.66 2.35 4.1-.79 5.66-2.35S20 15.64 20 13.64 19.22 9.56 17.66 8zM6 14c.01-2 .62-3.27 1.76-4.4L12 5.27l4.24 4.38C17.38 10.77 17.99 12 18 14H6z"/></svg>
                </div>
                <div>
                  <h3 className="category-title">Housekeeping</h3>
                  <span className="category-count">7 services</span>
                </div>
              </div>
              <div className="services-grid">
                <div className="service-card">
                  <div className="service-name">The Hampstead Deep Clean (Flat)</div>
                  <div className="service-meta">
                    <div className="service-price">£250</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      4 hours
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">The Hampstead Deep Clean (House)</div>
                  <div className="service-meta">
                    <div className="service-price">£450</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      8 hours
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Post-Renovation Sparkle Clean</div>
                  <div className="service-meta">
                    <div className="service-price">£350</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      6 hours
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Carpet & Upholstery Cleaning</div>
                  <div className="service-meta">
                    <div className="service-price">£85<span className="service-price-suffix">/room</span></div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      60 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Oven Detailing (Double Oven)</div>
                  <div className="service-meta">
                    <div className="service-price">£90</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      90 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Housekeeping Session (3 Hours)</div>
                  <div className="service-meta">
                    <div className="service-price">£95</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      3 hours
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Housekeeping Session (5 Hours)</div>
                  <div className="service-meta">
                    <div className="service-price">£150</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      5 hours
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
              </div>
            </div>

            {/* Gardens */}
            <div className="services-category" id="gardens">
              <div className="category-header">
                <div className="category-icon cat-gardens">
                  <svg viewBox="0 0 24 24"><path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zM5.6 10.25c0 1.38 1.12 2.5 2.5 2.5.53 0 1.01-.16 1.42-.44l-.02.19c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5l-.02-.19c.4.28.89.44 1.42.44 1.38 0 2.5-1.12 2.5-2.5 0-1-.59-1.85-1.43-2.25.84-.4 1.43-1.25 1.43-2.25 0-1.38-1.12-2.5-2.5-2.5-.53 0-1.01.16-1.42.44l.02-.19C14.5 3.62 13.38 2.5 12 2.5S9.5 3.62 9.5 5l.02.19c-.4-.28-.89-.44-1.42-.44-1.38 0-2.5 1.12-2.5 2.5 0 1 .59 1.85 1.43 2.25-.84.4-1.43 1.25-1.43 2.25zM12 5.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8s1.12-2.5 2.5-2.5zM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9z"/></svg>
                </div>
                <div>
                  <h3 className="category-title">Gardens & Outdoors</h3>
                  <span className="category-count">5 services</span>
                </div>
              </div>
              <div className="services-grid">
                <div className="service-card">
                  <div className="service-name">Lawn Mowing & Edging</div>
                  <div className="service-meta">
                    <div className="service-price">£60</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      60 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Hedge Trimming (Small)</div>
                  <div className="service-meta">
                    <div className="service-price">£120</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      90 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Jet Wash Patio (Up to 20sqm)</div>
                  <div className="service-meta">
                    <div className="service-price">From £250</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      120 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Seasonal Window Box Refresh</div>
                  <div className="service-meta">
                    <div className="service-price">£150</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      60 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
                <div className="service-card">
                  <div className="service-name">Green Waste Removal</div>
                  <div className="service-meta">
                    <div className="service-price">£80</div>
                    <div className="service-duration">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      30 mins
                    </div>
                  </div>
                  <button className="service-book-btn">Book Now</button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section section-dark" id="why-us">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-label">Why Choose Us</span>
              <h2 className="section-title">The Hampstead Difference</h2>
              <p className="section-description">Professional property maintenance backed by our renovation expertise. Quality you can trust.</p>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon"><svg viewBox="0 0 24 24"><path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/></svg></div>
                <h3 className="feature-title">DBS Checked</h3>
                <p className="feature-text">All our tradespeople are fully vetted, insured, and DBS checked for your peace of mind.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><svg viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg></div>
                <h3 className="feature-title">Fixed Pricing</h3>
                <p className="feature-text">No hidden fees or surprise charges. The price you see is the price you pay, guaranteed.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg></div>
                <h3 className="feature-title">2-Hour Response</h3>
                <p className="feature-text">Emergency call-out available. Most bookings confirmed within 2 hours of enquiry.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><svg viewBox="0 0 24 24"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24z"/></svg></div>
                <h3 className="feature-title">5-Star Rated</h3>
                <p className="feature-text">Consistently rated 5 stars by our customers. Satisfaction guaranteed on every job.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="section" id="contact">
          <div className="section-inner">
            <div className="contact-container">
              <div className="contact-inner">
                <h2 className="contact-title">Ready to Book?</h2>
                <p className="contact-subtitle">Get in touch for same-day service or schedule ahead. Our friendly team is here to help.</p>
                <div className="contact-options">
                  <a href="tel:02038742670" className="contact-option">
                    <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                    <div className="contact-option-text">
                      <div className="contact-option-label">Call Us</div>
                      <div className="contact-option-value">020 3874 2670 / 07459 345456</div>
                    </div>
                  </a>
                  <a href="https://api.whatsapp.com/send?phone=447459345456" className="contact-option">
                    <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    <div className="contact-option-text">
                      <div className="contact-option-label">WhatsApp</div>
                      <div className="contact-option-value">Message Us</div>
                    </div>
                  </a>
                  <a href="mailto:hello@hampsteadrenovations.co.uk" className="contact-option">
                    <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                    <div className="contact-option-text">
                      <div className="contact-option-label">Email</div>
                      <div className="contact-option-value">Get a Quote</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-column">
              <h3>Hampstead Maintenance</h3>
              <address>
                Office & Showroom:<br />
                Unit 3, Palace Court<br />
                250 Finchley Road<br />
                Hampstead, London NW3 6DN
              </address>
              <div className="footer-info">
                <strong>Booking Hours:</strong><br />
                Mon-Fri: 7am - 9pm<br />
                Saturday: 8am - 6pm<br />
                Sunday: 9am - 5pm
              </div>
              <div className="footer-info">
                <strong>Company Reg:</strong> 12345678<br />
                <strong>VAT:</strong> GB 123 4567 89<br />
                <strong>Insurance:</strong> £10M (Aviva)
              </div>
            </div>
            <div className="footer-column">
              <h3>Popular Services</h3>
              <div className="footer-links">
                <a href="#plumbing" className="footer-link">Plumbing & Heating</a>
                <a href="#electrical" className="footer-link">Electrical</a>
                <a href="/handyman" className="footer-link">Handyman</a>
                <a href="#housekeeping" className="footer-link">Housekeeping</a>
                <a href="#gardens" className="footer-link">Gardens & Outdoors</a>
                <a href="/locksmith" className="footer-link">Locksmith</a>
              </div>
            </div>
            <div className="footer-column">
              <h3>Specialist Services</h3>
              <div className="footer-links">
                <a href="#carpentry" className="footer-link">Carpentry</a>
                <a href="#painting" className="footer-link">Painting & Decorating</a>
                <a href="#roofing" className="footer-link">Roofing & Gutters</a>
                <a href="#drainage" className="footer-link">Drainage</a>
                <a href="#glazing" className="footer-link">Glazing</a>
                <a href="#ac" className="footer-link">Air Conditioning</a>
              </div>
            </div>
            <div className="footer-column">
              <h3>Contact Us</h3>
              <div className="footer-links">
                <a href="tel:02038742670" className="footer-link">020 3874 2670</a>
                <a href="tel:07459345456" className="footer-link">07459 345456</a>
                <a href="https://api.whatsapp.com/send?phone=447459345456" className="footer-link">WhatsApp</a>
                <a href="mailto:hello@hampsteadrenovations.co.uk" className="footer-link">Email Us</a>
              </div>
              <div className="footer-info" style={{ marginTop: '1rem' }}>
                <strong>Follow Us:</strong><br />
                <a href="https://www.instagram.com/hampsteadrenovations" className="footer-link">Instagram</a> · 
                <a href="https://www.houzz.co.uk/professionals/hampstead-renovations" className="footer-link">Houzz</a>
              </div>
              <div className="footer-certifications">
                <span className="cert-badge">DBS Checked</span>
                <span className="cert-badge">TrustMark</span>
                <span className="cert-badge">Gas Safe</span>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 Hampstead Renovations Ltd. All rights reserved. | <a href="/privacy-policy/">Privacy Policy</a> | <a href="/terms/">Terms</a> | Property Maintenance Since 2009</p>
          </div>
        </div>
      </footer>

      <button className="back-to-top" id="backToTop" aria-label="Back to top">↑</button>

      <style jsx global>{`
        :root {
          --primary: #2c3e50;
          --primary-light: #546e7a;
          --accent: #8b7355;
          --accent-light: #a0896d;
          --dark: #1a252f;
          --grey: #607d8b;
          --light-grey: #f5f7f9;
          --white: #ffffff;
          --text: #37474f;
          --shadow: 0 4px 20px rgba(0,0,0,0.08);
          --shadow-hover: 0 8px 30px rgba(0,0,0,0.12);
          --premium-gold: linear-gradient(135deg, #8b7355 0%, #a0896d 50%, #8b7355 100%);
          --cat-plumbing: #3498db;
          --cat-electrical: #f39c12;
          --cat-handyman: #27ae60;
          --cat-carpentry: #8b4513;
          --cat-painting: #9b59b6;
          --cat-roofing: #e74c3c;
          --cat-drainage: #1abc9c;
          --cat-locksmith: #34495e;
          --cat-glazing: #00bcd4;
          --cat-ac: #00acc1;
          --cat-renovation: #2c3e50;
          --cat-seasonal: #ff9800;
          --cat-landlord: #795548;
          --cat-housekeeping: #e91e63;
          --cat-gardens: #4caf50;
          --font-heading: 'Libre Baskerville', Georgia, serif;
          --font-body: 'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: var(--font-body); color: var(--text); line-height: 1.7; }
        h1,h2,h3,h4,h5,h6 { font-family: var(--font-heading); font-weight: 700; color: var(--primary); }
        .sr-only { position: absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); border:0; }
        .header { position: fixed; top:0; left:0; right:0; background: rgba(255,255,255,0.98); backdrop-filter: blur(12px); box-shadow: 0 1px 0 rgba(0,0,0,0.05); z-index:1000; transition: all 0.3s; }
        .header.scrolled { box-shadow: 0 2px 20px rgba(0,0,0,0.08); }
        .header-inner { max-width: 1400px; margin:0 auto; padding:0.875rem 1.5rem; display:flex; justify-content: space-between; align-items: center; }
        .logo { display:flex; flex-direction: column; text-decoration: none; }
        .logo-main { font-size:1.375rem; font-weight:700; color: var(--primary); letter-spacing:-0.02em; }
        .logo-tagline { font-size:0.6875rem; font-weight:600; letter-spacing:0.15em; color: var(--accent); text-transform: uppercase; margin-top:-2px; }
        .header-contact { display:flex; align-items:center; gap:1.5rem; }
        .header-address { text-align:right; padding-right:1.5rem; border-right:1px solid var(--light-grey); display:none; }
        @media (min-width:1024px){ .header-address{display:block;} }
        .header-address-line { font-size:0.875rem; color: var(--grey); line-height:1.4; }
        .showroom-badge { display:inline-block; margin-top:0.25rem; padding:0.125rem 0.5rem; background: var(--premium-gold); color: var(--white); font-size:0.625rem; font-weight:700; letter-spacing:0.1em; text-transform: uppercase; border-radius:2px; }
        .header-phone { display:flex; align-items:center; gap:0.5rem; color: var(--primary); font-weight:600; font-size:0.9375rem; text-decoration: none; }
        .header-phone:hover { color: var(--accent); }
        .header-phone svg { width:18px; height:18px; fill: currentColor; }
        .btn { display:inline-flex; align-items:center; justify-content:center; gap:0.5rem; padding:0.75rem 1.5rem; font-family: var(--font-body); font-size:0.875rem; font-weight:600; text-transform: uppercase; letter-spacing:0.05em; border-radius:4px; border:none; cursor:pointer; transition: all 0.3s; text-decoration: none; }
        .btn-primary { background: var(--accent); color: var(--white); }
        .btn-primary:hover { background: var(--accent-light); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(139,115,85,0.25); }
        .btn-outline { background: transparent; color: var(--primary); border:2px solid var(--primary); }
        .btn-outline:hover { background: var(--primary); color: var(--white); }
        .btn-white { background: var(--white); color: var(--primary); }
        .btn-white:hover { background: var(--light-grey); transform: translateY(-2px); }
        .btn-lg { padding:1rem 2rem; font-size:0.9375rem; }
        .nav { background: var(--primary); position: fixed; top:68px; left:0; right:0; z-index:999; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
        .nav-inner { max-width:100%; margin:0 auto; padding:0; background: var(--primary); position: relative; }
        .nav-list { display:flex; justify-content: space-around; list-style:none; gap:0; width:100%; max-width:1400px; margin:0 auto; }
        .nav-list li { flex:1; text-align:center; }
        .nav-link { display:block; padding:1.5rem 1rem; color: rgba(255,255,255,0.95); font-size:0.9375rem; font-weight:600; letter-spacing:0.08em; text-transform: uppercase; position:relative; text-decoration: none; }
        .nav-link::after { content:''; position:absolute; bottom:0; left:50%; transform: translateX(-50%); width:0; height:3px; background: var(--accent); transition: width 0.3s cubic-bezier(0.4,0,0.2,1); }
        .nav-link:hover { color: var(--white); background: rgba(255,255,255,0.05); }
        .nav-link:hover::after { width:60%; }
        .mobile-menu-btn { display:none; background:none; border:none; color: var(--white); font-size:1.5rem; padding:0.5rem; cursor:pointer; }
        @media (max-width:1024px){
          .nav { position: relative; top:0; }
          .mobile-menu-btn { display:block; position:absolute; right:1rem; top:50%; transform: translateY(-50%); }
          .nav-list { flex-direction: column; max-height:0; overflow:hidden; transition: max-height 0.3s ease; }
          .nav-list.active { max-height:500px; }
          .nav-link { border-bottom:1px solid rgba(255,255,255,0.1); text-align:center; }
        }
        .hero { padding:180px 1.5rem 100px; background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%); position: relative; overflow: hidden; }
        .hero::before { content:''; position:absolute; inset:0; background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); }
        .hero-inner { max-width:1000px; margin:0 auto; text-align:center; position:relative; z-index:1; }
        .hero-badge { display:inline-flex; align-items:center; gap:0.5rem; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding:0.5rem 1.25rem; border-radius:30px; margin-bottom:1.5rem; color: var(--accent-light); font-size:0.8125rem; font-weight:600; letter-spacing:0.1em; text-transform: uppercase; }
        .hero-badge svg { width:14px; height:14px; fill: var(--accent-light); }
        .hero-title { font-size: clamp(2rem, 5vw, 3.25rem); color: var(--white); margin-bottom:1.25rem; line-height:1.2; }
        .hero-subtitle { font-size:1.125rem; color: rgba(255,255,255,0.9); max-width:700px; margin:0 auto 2rem; line-height:1.8; }
        .hero-stats { display:flex; justify-content:center; gap:3rem; flex-wrap:wrap; margin-bottom:2.5rem; }
        .hero-stat { text-align:center; }
        .hero-stat-number { font-family: var(--font-heading); font-size:2.5rem; font-weight:700; color: var(--accent-light); }
        .hero-stat-label { font-size:0.875rem; color: rgba(255,255,255,0.8); text-transform: uppercase; letter-spacing:0.05em; }
        .hero-actions { display:flex; flex-wrap:wrap; justify-content:center; gap:1rem; }
        .trust-bar { background: var(--light-grey); padding:2rem 1.5rem; }
        .trust-bar-inner { max-width:1400px; margin:0 auto; display:grid; grid-template-columns: repeat(5,1fr); gap:1rem; text-align:center; }
        @media (max-width:1024px){ .trust-bar-inner{grid-template-columns: repeat(3,1fr);} }
        @media (max-width:640px){ .trust-bar-inner{grid-template-columns: repeat(2,1fr);} }
        .trust-stat { padding:0.75rem; }
        .trust-stat-icon { width:40px; height:40px; margin:0 auto 0.5rem; background: var(--accent); border-radius:50%; display:flex; align-items:center; justify-content:center; }
        .trust-stat-icon svg { width:20px; height:20px; fill: var(--white); }
        .trust-stat-number { font-family: var(--font-heading); font-size:1.5rem; font-weight:700; color: var(--accent); margin-bottom:0.25rem; }
        .trust-stat-label { font-size:0.75rem; font-weight:600; color: var(--primary); text-transform: uppercase; letter-spacing:0.05em; }
        .section { padding:6rem 1.5rem; }
        .section-dark { background: linear-gradient(135deg, var(--dark) 0%, var(--primary) 100%); color: var(--white); }
        .section-inner { max-width:1400px; margin:0 auto; }
        .section-header { text-align:center; max-width:700px; margin:0 auto 4rem; }
        .section-label { display:inline-block; font-size:0.75rem; font-weight:700; letter-spacing:0.15em; text-transform: uppercase; color: var(--accent); margin-bottom:1rem; position:relative; }
        .section-label::before,.section-label::after { content:''; position:absolute; top:50%; width:40px; height:1px; background: var(--accent); }
        .section-label::before { right: calc(100% + 1rem); }
        .section-label::after { left: calc(100% + 1rem); }
        .section-dark .section-label { color: var(--accent-light); }
        .section-dark .section-label::before, .section-dark .section-label::after { background: var(--accent-light); }
        .section-title { font-size: clamp(1.75rem,3vw,2.5rem); margin-bottom:1rem; }
        .section-description { font-size:1.0625rem; color: var(--grey); line-height:1.8; }
        .section-dark .section-description { color: rgba(255,255,255,0.85); }
        .category-nav { background: var(--white); padding:1.5rem; border-radius:12px; box-shadow: var(--shadow); margin-bottom:4rem; position: sticky; top:130px; z-index:100; }
        .category-nav-title { font-size:0.875rem; font-weight:700; color: var(--grey); text-transform: uppercase; letter-spacing:0.1em; margin-bottom:1rem; }
        .category-nav-list { display:flex; flex-wrap:wrap; gap:0.5rem; }
        .category-nav-link { display:inline-flex; align-items:center; gap:0.375rem; padding:0.5rem 1rem; background: var(--light-grey); border-radius:20px; font-size:0.8125rem; font-weight:600; color: var(--primary); transition: all 0.3s; text-decoration:none; }
        .category-nav-link:hover { background: var(--accent); color: var(--white); transform: translateY(-2px); }
        .services-category { margin-bottom:4rem; scroll-margin-top:200px; }
        .category-header { display:flex; align-items:center; gap:1rem; margin-bottom:1.5rem; padding-bottom:1rem; border-bottom:2px solid var(--light-grey); }
        .category-icon { width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .category-icon svg { width:24px; height:24px; fill: var(--white); }
        .category-title { font-size:1.375rem; font-weight:700; color: var(--primary); }
        .category-count { font-size:0.875rem; color: var(--grey); }
        .services-grid { display:grid; grid-template-columns: repeat(4,1fr); gap:1.25rem; }
        @media (max-width:1200px){ .services-grid{grid-template-columns: repeat(3,1fr);} }
        @media (max-width:900px){ .services-grid{grid-template-columns: repeat(2,1fr);} }
        @media (max-width:640px){ .services-grid{grid-template-columns:1fr;} }
        .service-card { background: var(--white); border:1px solid var(--light-grey); border-radius:10px; padding:1.5rem; transition: all 0.3s; position: relative; overflow:hidden; }
        .service-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background: var(--accent); transform: scaleX(0); transition: transform 0.3s; }
        .service-card:hover { border-color: var(--accent); transform: translateY(-4px); box-shadow: var(--shadow-hover); }
        .service-card:hover::before { transform: scaleX(1); }
        .service-name { font-size:1rem; font-weight:700; color: var(--primary); margin-bottom:0.75rem; line-height:1.3; }
        .service-meta { display:flex; justify-content: space-between; align-items:center; margin-bottom:1rem; padding-bottom:0.75rem; border-bottom:1px solid var(--light-grey); }
        .service-price { font-family: var(--font-heading); font-size:1.375rem; font-weight:700; color: var(--accent); }
        .service-price-suffix { font-size:0.875rem; font-weight:400; color: var(--grey); }
        .service-duration { display:flex; align-items:center; gap:0.375rem; font-size:0.8125rem; color: var(--grey); }
        .service-duration svg { width:14px; height:14px; fill: currentColor; }
        .service-book-btn { width:100%; padding:0.75rem 1rem; background: var(--primary); color: var(--white); font-size:0.8125rem; font-weight:600; text-transform: uppercase; letter-spacing:0.05em; border:none; border-radius:6px; cursor:pointer; transition: all 0.3s; }
        .service-book-btn:hover { background: var(--accent); }
        .service-card.free .service-price { color: var(--cat-handyman); }
        .features-grid { display:grid; grid-template-columns: repeat(4,1fr); gap:2rem; }
        @media (max-width:1024px){ .features-grid{grid-template-columns: repeat(2,1fr);} }
        @media (max-width:640px){ .features-grid{grid-template-columns:1fr;} }
        .feature-card { text-align:center; padding:2rem 1.5rem; }
        .feature-icon { width:64px; height:64px; margin:0 auto 1.25rem; background: rgba(255,255,255,0.1); border-radius:50%; display:flex; align-items:center; justify-content:center; }
        .feature-icon svg { width:28px; height:28px; fill: var(--accent-light); }
        .feature-title { font-size:1.125rem; font-weight:700; color: var(--white); margin-bottom:0.75rem; }
        .feature-text { font-size:0.9375rem; color: rgba(255,255,255,0.8); line-height:1.6; }
        .contact-container { max-width:900px; margin:0 auto; background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%); border-radius:16px; padding:4rem; text-align:center; position: relative; overflow:hidden; }
        .contact-container::before { content:''; position:absolute; top:-50%; right:-50%; width:200%; height:200%; background: radial-gradient(circle, rgba(139,115,85,0.1) 0%, transparent 60%); animation: rotate 30s linear infinite; }
        .contact-inner { position: relative; z-index:1; }
        .contact-title { font-size: clamp(1.5rem,3vw,2rem); color: var(--white); margin-bottom:0.75rem; }
        .contact-subtitle { font-size:1.0625rem; color: rgba(255,255,255,0.9); margin-bottom:2.5rem; }
        .contact-options { display:flex; flex-wrap:wrap; justify-content:center; gap:1rem; }
        .contact-option { display:flex; align-items:center; gap:0.75rem; padding:1rem 2rem; background: rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); border-radius:8px; color: var(--white); text-decoration:none; transition: all 0.3s; }
        .contact-option:hover { background: var(--accent); border-color: var(--accent); transform: translateY(-2px); }
        .contact-option svg { width:20px; height:20px; fill: currentColor; }
        .contact-option-label { font-size:0.75rem; text-transform: uppercase; letter-spacing:0.05em; opacity:0.8; }
        .contact-option-value { font-size:1.125rem; font-weight:600; }
        .footer { background: var(--dark); color: var(--white); padding:4rem 1.5rem 2rem; }
        .footer-inner { max-width:1400px; margin:0 auto; }
        .footer-grid { display:grid; grid-template-columns: 1.5fr repeat(3,1fr); gap:3rem; margin-bottom:2rem; }
        @media (max-width:1024px){ .footer-grid{grid-template-columns: repeat(2,1fr);} }
        @media (max-width:640px){ .footer-grid{grid-template-columns:1fr;} }
        .footer-column h3 { font-size:1.0625rem; font-weight:700; color: var(--accent-light); margin-bottom:1.25rem; }
        .footer-column address { font-style: normal; color: rgba(255,255,255,0.7); line-height:1.7; font-size:0.9375rem; }
        .footer-info { margin-top:1rem; color: rgba(255,255,255,0.7); font-size:0.875rem; line-height:1.8; }
        .footer-info strong { color: rgba(255,255,255,0.9); }
        .footer-links { display:flex; flex-direction:column; gap:0.625rem; }
        .footer-link { color: rgba(255,255,255,0.7); font-size:0.9375rem; text-decoration:none; transition: all 0.3s; }
        .footer-link:hover { color: var(--accent-light); transform: translateX(3px); }
        .footer-certifications { display:flex; flex-wrap:wrap; gap:0.625rem; margin-top:1rem; }
        .cert-badge { padding:0.375rem 0.875rem; background: rgba(139,115,85,0.2); border:1px solid var(--accent); border-radius:4px; color: var(--accent-light); font-size:0.75rem; font-weight:600; }
        .footer-bottom { padding-top:2rem; border-top:1px solid rgba(255,255,255,0.1); text-align:center; color: rgba(255,255,255,0.5); font-size:0.8125rem; }
        .footer-bottom a { color: rgba(255,255,255,0.5); text-decoration:none; }
        .footer-bottom a:hover { color: var(--accent-light); }
        .back-to-top { position: fixed; bottom:2rem; right:2rem; width:48px; height:48px; background: var(--accent); color: var(--white); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.25rem; box-shadow: 0 4px 15px rgba(139,115,85,0.3); opacity:0; visibility:hidden; transition: all 0.3s; z-index:990; cursor:pointer; border:none; }
        .back-to-top.visible { opacity:1; visibility:visible; }
        .back-to-top:hover { background: var(--accent-light); transform: translateY(-3px); }
        .cat-plumbing { background: var(--cat-plumbing); }
        .cat-electrical { background: var(--cat-electrical); }
        .cat-handyman { background: var(--cat-handyman); }
        .cat-carpentry { background: var(--cat-carpentry); }
        .cat-painting { background: var(--cat-painting); }
        .cat-roofing { background: var(--cat-roofing); }
        .cat-drainage { background: var(--cat-drainage); }
        .cat-locksmith { background: var(--cat-locksmith); }
        .cat-glazing { background: var(--cat-glazing); }
        .cat-ac { background: var(--cat-ac); }
        .cat-renovation { background: var(--cat-renovation); }
        .cat-seasonal { background: var(--cat-seasonal); }
        .cat-landlord { background: var(--cat-landlord); }
        .cat-housekeeping { background: var(--cat-housekeeping); }
        .cat-gardens { background: var(--cat-gardens); }
      `}</style>

      {/* Trust Badges Section */}
      {/* <TrustBadges /> */}

      {/* Customer Reviews Section */}
      {/* <ReviewsSection /> */}

      {/* Simple Chat Button - GUARANTEED TO WORK */}
      <SimpleChatButton />

      {/* WhatsApp Button */}
      {/* <WhatsAppButton /> */}
    </div>
  )
}
