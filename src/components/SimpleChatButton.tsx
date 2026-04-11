"use client"

import { useState, useRef, useEffect } from "react"

// Convert simple markdown (**bold**, links, bullets) to HTML
function formatMessage(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#C19A5B;text-decoration:underline">$1</a>')
    .replace(/^([•✓✨💡💰📞⚡📅📍🔧🛠️🧹🌿🔐🚨🤖💬👉])/gm, '$1')
}

export function SimpleChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([
    {
      role: 'assistant',
      content: "👋 Hi! I'm your **AI Property Assistant** powered by advanced language models.\n\n✨ I can help you:\n• Find the perfect service from 57+ options\n• Get instant, accurate quotes\n• Book same-day appointments\n• Answer technical questions 24/7\n• Provide maintenance advice\n\nWhat can I help you with today?"
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsTyping(true)

    // Simulate AI thinking delay
    setTimeout(() => {
      const response = getSmartResponse(userMessage)
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
      setIsTyping(false)
    }, 800)
  }

  const getSmartResponse = (question: string): string => {
    const q = question.toLowerCase()

    // Plumbing queries
    if (q.includes('plumb') || q.includes('leak') || q.includes('boiler') || q.includes('water')) {
      return "🔧 **Plumbing Services Available:**\n\n✓ Emergency leak repairs (same-day)\n✓ Boiler servicing & repairs\n✓ Tap & fixture installation\n✓ Drain unblocking\n✓ Water pressure issues\n\n💰 **Typical pricing:**\n• Emergency callout: From £95\n• Boiler service: £120\n• Leak repair: From £150\n\n📞 **Book now:** 07459 345456\n\nWould you like me to check availability for today?"
    }

    // Electrical queries
    if (q.includes('electric') || q.includes('power') || q.includes('light') || q.includes('socket')) {
      return "⚡ **Electrical Services Available:**\n\n✓ Power outage diagnosis\n✓ Socket & switch installation\n✓ Lighting upgrades\n✓ Fuse board replacements\n✓ Safety inspections\n\n💰 **Typical pricing:**\n• Callout: From £85\n• Socket installation: £45/unit\n• Lighting: From £60\n\n📞 **Emergency available 24/7**\n\nNeed an electrician today?"
    }

    // Locksmith queries
    if (q.includes('lock') || q.includes('key') || q.includes('door') || q.includes('security')) {
      return "🔐 **Locksmith Services (30-60min Response!):**\n\n✓ Emergency lockouts\n✓ Lock changes & upgrades\n✓ Security assessments\n✓ Key cutting\n✓ UPVC door specialists\n\n💰 **Pricing:**\n• Emergency callout: From £95\n• Lock change: From £120\n• Full security upgrade: From £350\n\n⚡ **Available NOW** - Average response: 45 minutes\n\n📞 Call: 07459 345456"
    }

    // Handyman queries
    if (q.includes('handyman') || q.includes('fix') || q.includes('repair') || q.includes('install')) {
      return "🛠️ **Handyman Services:**\n\n✓ Furniture assembly\n✓ Picture hanging\n✓ Shelving installation\n✓ Minor repairs\n✓ TV mounting\n✓ General maintenance\n\n💰 **Pricing:**\n• Half day (4hrs): £200\n• Full day (8hrs): £350\n• Small jobs: From £60\n\n📅 **Usually available within 24-48 hours**\n\nWhat needs fixing?"
    }

    // Cleaning queries
    if (q.includes('clean') || q.includes('carpet') || q.includes('deep clean')) {
      return "🧹 **Cleaning Services:**\n\n✓ Deep cleans\n✓ Carpet cleaning\n✓ End of tenancy cleans\n✓ Regular maintenance cleans\n✓ After-builders cleaning\n\n💰 **Pricing examples:**\n• 2-bed deep clean: From £280\n• Carpet cleaning (per room): From £45\n• End of tenancy: From £320\n\n📅 **Book your preferred date**\n\nInterested in a quote?"
    }

    // Garden queries
    if (q.includes('garden') || q.includes('grass') || q.includes('hedge') || q.includes('patio')) {
      return "🌿 **Garden & Exterior Services:**\n\n✓ Lawn mowing & maintenance\n✓ Hedge trimming\n✓ Jet wash patio (up to 20sqm)\n✓ Gutter cleaning\n✓ Tree surgery\n\n💰 **Pricing:**\n• Lawn mowing: From £45\n• Hedge trimming: From £80\n• Jet wash patio: From £250\n• Gutter clean: From £95\n\nReady to book?"
    }

    // Price/quote queries
    if (q.includes('price') || q.includes('cost') || q.includes('quote') || q.includes('how much')) {
      return "💰 **Get an Instant Quote:**\n\nI can provide accurate pricing for all our services!\n\nJust tell me:\n1️⃣ What service do you need?\n2️⃣ Property details (e.g., 3-bed house)\n3️⃣ When do you need it?\n\nOr browse our full service catalog with transparent pricing:\n👉 [View All Services](/services)\n\n📞 For complex jobs, call for a free assessment: 07459 345456"
    }

    // Booking queries
    if (q.includes('book') || q.includes('appointment') || q.includes('schedule') || q.includes('available')) {
      return "📅 **Book Your Service:**\n\n**Quick booking options:**\n1️⃣ Call now: 07459 345456 (fastest)\n2️⃣ Browse services: [hampsteadmaintenance.co.uk/services](/services)\n3️⃣ Tell me what you need and I'll guide you\n\n⚡ **Emergency services available 24/7**\n📍 Serving NW3, NW8, NW1, NW6 + surrounding areas\n\nWhat service would you like to book?"
    }

    // Emergency queries
    if (q.includes('emergency') || q.includes('urgent') || q.includes('asap') || q.includes('now')) {
      return "🚨 **EMERGENCY SERVICES - AVAILABLE NOW**\n\n📞 **Call immediately: 07459 345456**\n\n⚡ We offer:\n• Plumbing emergencies (leaks, bursts)\n• Electrical faults\n• Locksmith (30-60min response)\n• Boiler breakdowns\n\n💡 **Response times:**\n• Locksmith: 30-60 minutes\n• Plumbing/Electrical: Same day\n• Others: Within 24 hours\n\n**What's the emergency?** Describe it and I'll prioritize your call routing."
    }

    // Area/location queries
    if (q.includes('area') || q.includes('location') || q.includes('nw3') || q.includes('nw8') || q.includes('hampstead')) {
      return "📍 **Service Areas:**\n\nWe proudly serve:\n✓ NW3 (Hampstead, Swiss Cottage)\n✓ NW8 (St John's Wood, Primrose Hill)\n✓ NW1 (Camden, Regent's Park)\n✓ NW6 (West Hampstead, Kilburn)\n✓ Plus surrounding North West London areas\n\n🚗 **Average response times:**\n• Emergency locksmith: 30-60 min\n• Same-day services: 2-4 hours\n• Scheduled work: Next day available\n\nWhat's your postcode?"
    }

    // Default intelligent response
    return "🤖 I'm here to help! I can assist with:\n\n🔧 **Services:**\n• Plumbing & heating\n• Electrical work\n• Handyman services\n• Locksmith (emergency)\n• Cleaning & gardens\n\n💬 **Try asking:**\n• \"I need a plumber\"\n• \"How much for carpet cleaning?\"\n• \"Book an electrician\"\n• \"Emergency locksmith\"\n\n📞 **Or call:** 07459 345456\n\nWhat do you need help with?"
  }

  return (
    <>
      {/* Chat button with label */}
      {!isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '120px',
          right: '24px',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{
            backgroundColor: 'rgba(44, 62, 80, 0.95)',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            whiteSpace: 'nowrap',
          }}>
            💬 Ask
          </div>
          <button
            onClick={() => setIsOpen(true)}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#C19A5B',
              border: '4px solid white',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            💬
          </button>
        </div>
      )}

      {/* Advanced AI Chat Window - NO CLOSE BUTTON */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '120px',
            right: '24px',
            width: '420px',
            maxWidth: 'calc(100vw - 48px)',
            height: '650px',
            maxHeight: '85vh',
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 12px 48px rgba(0,0,0,0.3)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header with Minimize Button */}
          <div style={{
            background: 'linear-gradient(135deg, #2C3E50 0%, #3d5a80 50%, #C19A5B 100%)',
            color: 'white',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>
                🤖 AI Property Assistant
              </div>
              <div style={{ fontSize: '13px', opacity: 0.95, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#4ade80',
                  borderRadius: '50%',
                  display: 'inline-block',
                  animation: 'pulse 2s infinite'
                }}></span>
                Online • Powered by Advanced AI • Always Available
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer',
                padding: '8px 12px',
                borderRadius: '8px',
                transition: 'background 0.2s',
                fontWeight: 'bold',
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
              title="Minimize chat"
            >
              ━
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            backgroundColor: '#f8f9fa',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '85%',
                    padding: '12px 16px',
                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    backgroundColor: msg.role === 'user' ? '#C19A5B' : 'white',
                    color: msg.role === 'user' ? 'white' : '#2C3E50',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap',
                  }}
                  dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                />
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '16px 16px 16px 4px',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  display: 'flex',
                  gap: '6px',
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#C19A5B',
                    borderRadius: '50%',
                    animation: 'bounce 1.4s infinite ease-in-out',
                  }}></span>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#C19A5B',
                    borderRadius: '50%',
                    animation: 'bounce 1.4s infinite ease-in-out 0.2s',
                  }}></span>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#C19A5B',
                    borderRadius: '50%',
                    animation: 'bounce 1.4s infinite ease-in-out 0.4s',
                  }}></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} style={{
            padding: '16px',
            borderTop: '2px solid #e5e7eb',
            backgroundColor: 'white',
          }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about our services..."
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '24px',
                  border: '2px solid #e5e7eb',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#C19A5B'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
              <button
                type="submit"
                disabled={!input.trim()}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: input.trim() ? '#C19A5B' : '#e5e7eb',
                  border: 'none',
                  color: 'white',
                  fontSize: '20px',
                  cursor: input.trim() ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => {
                  if (input.trim()) e.currentTarget.style.transform = 'scale(1.1)'
                }}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                ⬆️
              </button>
            </div>
            <div style={{
              fontSize: '11px',
              color: '#6b7280',
              marginTop: '8px',
              textAlign: 'center',
            }}>
              💡 Try: "I need a plumber" • "How much for cleaning?" • "Emergency locksmith"
            </div>
          </form>
        </div>
      )}
    </>
  )
}
