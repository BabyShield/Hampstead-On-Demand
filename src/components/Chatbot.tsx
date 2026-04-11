"use client"

import { useState, useRef, useEffect, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: ServiceSuggestion[]
}

interface ServiceSuggestion {
  id: string
  title: string
  price: number
  category: string
}

// Service data for the chatbot to reference
const serviceData = [
  { id: 'e1302833-87ae-4f2f-abc4-34dbff66f882', category: 'Plumbing & Heating', title: 'Boiler Service (Annual)', price: 120, keywords: ['boiler', 'heating', 'gas', 'service', 'annual', 'cp12', 'safety'] },
  { id: '5feeadb9-61c2-4969-a642-576ca81e8575', category: 'Plumbing & Heating', title: 'Tap Repair / Replace', price: 130, keywords: ['tap', 'faucet', 'drip', 'leak', 'replace', 'repair'] },
  { id: 'f151ccfc-0b3c-422e-aafe-0ed073615b6b', category: 'Plumbing & Heating', title: 'Toilet Unblock', price: 160, keywords: ['toilet', 'blocked', 'clogged', 'unblock', 'bathroom'] },
  { id: '0fab8cc9-ec3b-4756-b2a1-e65af3d7bcb8', category: 'Plumbing & Heating', title: 'Radiator Bleed (All)', price: 110, keywords: ['radiator', 'bleed', 'heating', 'cold', 'warm'] },
  { id: '87acdde3-9571-4e3a-9a7a-f7c43aab615a', category: 'Plumbing & Heating', title: 'Leak Investigation', price: 120, keywords: ['leak', 'water', 'drip', 'pipe', 'investigation'] },
  { id: 'd24850fe-8739-4524-8ea0-e50926c92225', category: 'Plumbing & Heating', title: 'Gas Safety Cert (CP12)', price: 110, keywords: ['gas', 'safety', 'certificate', 'landlord', 'cp12', 'legal'] },
  { id: '43f7fdb0-baca-4fbc-971c-d90d8eb9ed21', category: 'Electrical', title: 'Replace Socket / Switch', price: 110, keywords: ['socket', 'switch', 'plug', 'electrical', 'outlet'] },
  { id: 'c43c4f81-9677-4d24-ab1c-12417fb2e9a8', category: 'Electrical', title: 'Hang Chandelier', price: 180, keywords: ['chandelier', 'light', 'hanging', 'ceiling', 'fixture'] },
  { id: '222f035d-b76a-4bc4-bfd2-09460b8d0955', category: 'Electrical', title: 'EICR (1-2 Bed Flat)', price: 200, keywords: ['eicr', 'electrical', 'safety', 'certificate', 'landlord', 'inspection'] },
  { id: '7b98a1c5-8c4e-48ec-a734-1e79e00904c6', category: 'Electrical', title: 'Fault Finding', price: 120, keywords: ['fault', 'electrical', 'tripping', 'fuse', 'power'] },
  { id: '492186ba-41be-41e3-9c2e-984a801c0c15', category: 'Handyman', title: 'General Handyman (1 Hour)', price: 95, keywords: ['handyman', 'general', 'repair', 'fix', 'odd jobs', 'help'] },
  { id: '87cb3cd3-29a0-4164-ac21-1a0970447fec', category: 'Handyman', title: 'TV Wall Mounting', price: 140, keywords: ['tv', 'television', 'wall', 'mount', 'bracket', 'hanging'] },
  { id: '2726a07b-ada1-48a8-839a-d47a63c60f1f', category: 'Handyman', title: 'Hang Mirror / Art', price: 85, keywords: ['mirror', 'art', 'picture', 'frame', 'hang', 'wall'] },
  { id: '18269f73-8e7c-4bfa-89e6-874669d4a302', category: 'Handyman', title: 'Flatpack Assembly (Large)', price: 180, keywords: ['flatpack', 'ikea', 'assembly', 'furniture', 'wardrobe', 'bed'] },
  { id: '68343816-6071-420e-8c56-060424931175', category: 'Carpentry', title: 'Hang Internal Door', price: 160, keywords: ['door', 'hang', 'internal', 'fitting', 'carpentry'] },
  { id: '8bd7bb5b-4a2b-4759-82fe-b4c9e76fb3a8', category: 'Carpentry', title: 'Sash Window Cord Repair', price: 180, keywords: ['sash', 'window', 'cord', 'rope', 'repair', 'stuck'] },
  { id: 'd0594bca-795f-42a1-849f-d34d09e650b9', category: 'Carpentry', title: 'Fit Door Lock/Latch', price: 110, keywords: ['lock', 'latch', 'door', 'handle', 'security'] },
  { id: 'dbabefa3-ba9c-4718-8ff6-4cf05c4a5b12', category: 'Carpentry', title: 'Build Shelves (Alcove)', price: 250, keywords: ['shelves', 'shelf', 'alcove', 'storage', 'floating'] },
  { id: '24ffb886-2268-49b6-bc36-3409bd459968', category: 'Carpentry', title: 'Boxing In Pipework', price: 140, keywords: ['boxing', 'pipes', 'pipework', 'hide', 'cover'] },
  { id: '48079dd1-e231-44a4-8ccf-dd8c51774185', category: 'Painting & Decorating', title: 'Painter for a Day (8 Hrs)', price: 550, keywords: ['painter', 'painting', 'decorator', 'day', 'room'] },
  { id: '15c5cb9d-0706-47bf-84cd-f55db7f60a3e', category: 'Painting & Decorating', title: 'Touch-Up Repairs', price: 150, keywords: ['touch up', 'patch', 'repair', 'paint', 'crack', 'fill'] },
  { id: '9a28b34c-b5eb-4ed3-a442-93dbb4e937b2', category: 'Painting & Decorating', title: 'Paint Front Door', price: 220, keywords: ['front door', 'exterior', 'paint', 'gloss'] },
  { id: '9c40454c-8ee9-4087-8bd9-54bafdc17967', category: 'Painting & Decorating', title: 'Wallpaper Feature Wall', price: 280, keywords: ['wallpaper', 'feature wall', 'hanging', 'paper'] },
  { id: 'dfc1c7f2-64fc-4a93-95b4-fa34d82027a3', category: 'Roofing & Gutters', title: 'Gutter Clean (Terrace)', price: 160, keywords: ['gutter', 'clean', 'blocked', 'leaves', 'roof'] },
  { id: '12101fed-8076-41f7-90b1-4eac500379e5', category: 'Roofing & Gutters', title: 'Roof Inspection (Drone)', price: 200, keywords: ['roof', 'inspection', 'drone', 'leak', 'tiles'] },
  { id: 'b983cb34-2e4f-4ffd-97e7-23b8973d596e', category: 'Roofing & Gutters', title: 'Replace Roof Tile', price: 150, keywords: ['roof', 'tile', 'replace', 'broken', 'missing'] },
  { id: '1c218bfc-ea0f-4f6b-8951-7c29fdf3cc6e', category: 'Drainage', title: 'High Pressure Jetting', price: 180, keywords: ['drain', 'jetting', 'blocked', 'pressure', 'clear'] },
  { id: 'dbe4c6f7-3ca8-4b7a-ad14-e8f725fee6ff', category: 'Drainage', title: 'CCTV Drain Survey', price: 250, keywords: ['drain', 'cctv', 'survey', 'camera', 'inspection', 'rats'] },
  { id: 'bf04c567-a58a-47af-aaf1-f2d6a4cd9a60', category: 'Locksmith & Security', title: 'Gain Entry (Standard)', price: 140, keywords: ['lockout', 'locked out', 'entry', 'keys', 'emergency'] },
  { id: 'a995b48b-6094-49de-aa27-f5a04514ea23', category: 'Locksmith & Security', title: 'Change Rim Cylinder (Yale)', price: 110, keywords: ['lock', 'change', 'yale', 'cylinder', 'keys'] },
  { id: '3a467cdf-98ee-46fd-a867-fdc4a98f5820', category: 'Locksmith & Security', title: 'Board Up Window', price: 180, keywords: ['board up', 'window', 'broken', 'emergency', 'security'] },
  { id: 'e19a0749-dc44-4219-a769-ead87d10e3eb', category: 'Glazing', title: 'Replace Single Pane', price: 160, keywords: ['glass', 'window', 'pane', 'broken', 'replace'] },
  { id: 'da4853ff-cdae-4e7a-840d-cd47d98c1fef', category: 'Glazing', title: 'Reseal Windows (Silicone)', price: 120, keywords: ['seal', 'silicone', 'window', 'draught', 'leak'] },
  { id: '218933c9-2214-4ec1-a07c-53e7e7c3f83e', category: 'Air Conditioning', title: 'AC Service (Single Unit)', price: 150, keywords: ['ac', 'air conditioning', 'service', 'filter', 'cool'] },
  { id: '5f9fb31c-1b06-4083-a158-c32eb9c5f8f9', category: 'Air Conditioning', title: 'AC Regas', price: 180, keywords: ['ac', 'regas', 'refrigerant', 'cooling', 'gas'] },
  { id: 'f4021238-4cc2-40c4-8ca7-1129d4479e2e', category: 'Major Renovations', title: 'The Pre-Sale Refresh Package', price: 2500, keywords: ['renovation', 'refresh', 'sale', 'selling', 'house'] },
  { id: '7a8d8b4c-ac31-4848-af52-3d8ce1bec26f', category: 'Seasonal & Lifestyle', title: 'Patio Jet Wash (Spring Prep)', price: 250, keywords: ['patio', 'jet wash', 'pressure', 'clean', 'garden'] },
  { id: 'f828a784-878c-4e73-bd74-738c06f138e4', category: 'Seasonal & Lifestyle', title: 'Holiday Home Check', price: 45, keywords: ['holiday', 'home check', 'away', 'vacation', 'plants'] },
  { id: 'f8ccefc9-0c92-4b42-91e4-574e8728259c', category: 'Seasonal & Lifestyle', title: 'Christmas Tree Disposal', price: 40, keywords: ['christmas', 'tree', 'disposal', 'removal', 'recycle'] },
  { id: 'a93eb997-cd65-4d9c-aa49-2c7b39632e8e', category: 'Landlord Services', title: 'Rental Turnaround Package', price: 1200, keywords: ['landlord', 'rental', 'turnaround', 'tenant', 'property'] },
  { id: '11111111-1111-1111-1111-111111111111', category: 'Housekeeping', title: 'The Hampstead Deep Clean (Flat)', price: 250, keywords: ['deep clean', 'cleaning', 'flat', 'spring clean', 'thorough'] },
  { id: '22222222-2222-2222-2222-222222222222', category: 'Housekeeping', title: 'The Hampstead Deep Clean (House)', price: 450, keywords: ['deep clean', 'cleaning', 'house', 'spring clean', 'thorough'] },
  { id: '33333333-3333-3333-3333-333333333333', category: 'Housekeeping', title: 'Post-Renovation Sparkle Clean', price: 350, keywords: ['renovation', 'clean', 'dust', 'building', 'sparkle'] },
  { id: '44444444-4444-4444-4444-444444444444', category: 'Housekeeping', title: 'Carpet & Upholstery Cleaning', price: 85, keywords: ['carpet', 'upholstery', 'sofa', 'steam', 'stain'] },
  { id: '55555555-5555-5555-5555-555555555555', category: 'Housekeeping', title: 'Oven Detailing (Double Oven)', price: 90, keywords: ['oven', 'cleaning', 'kitchen', 'grease', 'detail'] },
  { id: '66666666-6666-6666-6666-666666666666', category: 'Housekeeping', title: 'Housekeeping Session (3 Hours)', price: 95, keywords: ['housekeeping', 'cleaning', 'regular', 'weekly', 'cleaner'] },
  { id: '77777777-7777-7777-7777-777777777777', category: 'Housekeeping', title: 'Housekeeping Session (5 Hours)', price: 150, keywords: ['housekeeping', 'cleaning', 'regular', 'weekly', 'cleaner', 'large'] },
  { id: '88888888-8888-8888-8888-888888888888', category: 'Gardens & Outdoors', title: 'Lawn Mowing & Edging', price: 60, keywords: ['lawn', 'mowing', 'grass', 'garden', 'cut', 'edge'] },
  { id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', category: 'Gardens & Outdoors', title: 'Hedge Trimming (Small)', price: 120, keywords: ['hedge', 'trim', 'cut', 'garden', 'bush'] },
  { id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', category: 'Gardens & Outdoors', title: 'Jet Wash Patio (Standard)', price: 250, keywords: ['patio', 'jet wash', 'pressure', 'clean', 'garden', 'path'] },
  { id: 'cccccccc-cccc-cccc-cccc-cccccccccccc', category: 'Gardens & Outdoors', title: 'Seasonal Window Box Refresh', price: 150, keywords: ['window box', 'plants', 'flowers', 'seasonal', 'garden'] },
  { id: 'dddddddd-dddd-dddd-dddd-dddddddddddd', category: 'Gardens & Outdoors', title: 'Green Waste Removal', price: 80, keywords: ['green waste', 'garden waste', 'removal', 'disposal', 'rubbish'] },
]

// Find matching services based on user query
function findMatchingServices(query: string): ServiceSuggestion[] {
  const queryLower = query.toLowerCase()
  const words = queryLower.split(/\s+/)
  
  const scored = serviceData.map(service => {
    let score = 0
    
    // Check title match
    if (service.title.toLowerCase().includes(queryLower)) score += 10
    
    // Check category match
    if (service.category.toLowerCase().includes(queryLower)) score += 5
    
    // Check keyword matches
    for (const keyword of service.keywords) {
      for (const word of words) {
        if (word.length > 2 && keyword.includes(word)) score += 3
        if (keyword === word) score += 5
      }
    }
    
    return { ...service, score }
  })
  
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ id, title, price, category }) => ({ id, title, price, category }))
}

// Generate chatbot response
function generateResponse(userMessage: string): { content: string; suggestions: ServiceSuggestion[] } {
  const messageLower = userMessage.toLowerCase()
  const suggestions = findMatchingServices(userMessage)
  
  // Greeting responses
  if (/^(hi|hello|hey|good morning|good afternoon|good evening)/i.test(messageLower)) {
    return {
      content: "Hello! 👋 Welcome to Hampstead On-Demand. I'm here to help you find the right service for your home. What do you need help with today?",
      suggestions: []
    }
  }
  
  // Price inquiry
  if (/(how much|price|cost|quote|expensive|cheap)/i.test(messageLower)) {
    if (suggestions.length > 0) {
      return {
        content: `Great question! Here are some services that might match what you're looking for:`,
        suggestions
      }
    }
    return {
      content: "All our services have fixed, transparent pricing - no hidden fees! What type of work do you need done? For example: plumbing, electrical, cleaning, or gardening?",
      suggestions: []
    }
  }
  
  // Booking inquiry
  if (/(book|booking|schedule|appointment|available|when)/i.test(messageLower)) {
    if (suggestions.length > 0) {
      return {
        content: "I can help you book that! Here are the services that match your needs. Click 'Book Now' to choose your preferred date and time slot:",
        suggestions
      }
    }
    return {
      content: "I'd be happy to help you book a service! We offer morning and afternoon slots. What service do you need?",
      suggestions: []
    }
  }
  
  // Emergency/urgent
  if (/(emergency|urgent|asap|now|immediately|broken|burst|flood)/i.test(messageLower)) {
    const emergencyServices = findMatchingServices(userMessage)
    return {
      content: "🚨 For emergencies, please call us directly at **020 3874 2670** or **07459 345456** for immediate assistance. In the meantime, here are relevant services:",
      suggestions: emergencyServices.length > 0 ? emergencyServices : [
        { id: 'bf04c567-a58a-47af-aaf1-f2d6a4cd9a60', title: 'Gain Entry (Standard)', price: 140, category: 'Locksmith & Security' },
        { id: '3a467cdf-98ee-46fd-a867-fdc4a98f5820', title: 'Board Up Window', price: 180, category: 'Locksmith & Security' },
      ]
    }
  }
  
  // Landlord specific
  if (/(landlord|tenant|rental|let|letting|property manager)/i.test(messageLower)) {
    return {
      content: "We have specialized services for landlords including safety certificates and turnaround packages:",
      suggestions: [
        { id: 'd24850fe-8739-4524-8ea0-e50926c92225', title: 'Gas Safety Cert (CP12)', price: 110, category: 'Plumbing & Heating' },
        { id: '222f035d-b76a-4bc4-bfd2-09460b8d0955', title: 'EICR (1-2 Bed Flat)', price: 200, category: 'Electrical' },
        { id: 'a93eb997-cd65-4d9c-aa49-2c7b39632e8e', title: 'Rental Turnaround Package', price: 1200, category: 'Landlord Services' },
      ]
    }
  }
  
  // Cleaning inquiry
  if (/(clean|cleaning|cleaner|housekeeping|tidy|dust)/i.test(messageLower)) {
    return {
      content: "We offer professional cleaning services from regular housekeeping to deep cleans:",
      suggestions: suggestions.length > 0 ? suggestions : [
        { id: '66666666-6666-6666-6666-666666666666', title: 'Housekeeping Session (3 Hours)', price: 95, category: 'Housekeeping' },
        { id: '11111111-1111-1111-1111-111111111111', title: 'The Hampstead Deep Clean (Flat)', price: 250, category: 'Housekeeping' },
        { id: '44444444-4444-4444-4444-444444444444', title: 'Carpet & Upholstery Cleaning', price: 85, category: 'Housekeeping' },
      ]
    }
  }
  
  // Garden inquiry
  if (/(garden|lawn|hedge|patio|outdoor|plant|grass|mow)/i.test(messageLower)) {
    return {
      content: "We can help with your outdoor spaces! Here are our garden services:",
      suggestions: suggestions.length > 0 ? suggestions : [
        { id: '88888888-8888-8888-8888-888888888888', title: 'Lawn Mowing & Edging', price: 60, category: 'Gardens & Outdoors' },
        { id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', title: 'Hedge Trimming (Small)', price: 120, category: 'Gardens & Outdoors' },
        { id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', title: 'Jet Wash Patio (Standard)', price: 250, category: 'Gardens & Outdoors' },
      ]
    }
  }
  
  // Categories inquiry
  if (/(what services|what do you offer|categories|list|all services)/i.test(messageLower)) {
    return {
      content: "We offer 57 services across 15 categories:\n\n• Plumbing & Heating\n• Electrical\n• Handyman\n• Carpentry\n• Painting & Decorating\n• Roofing & Gutters\n• Drainage\n• Locksmith & Security\n• Glazing\n• Air Conditioning\n• Major Renovations\n• Seasonal & Lifestyle\n• Landlord Services\n• Housekeeping\n• Gardens & Outdoors\n\nWhat area interests you?",
      suggestions: []
    }
  }
  
  // Thanks
  if (/(thank|thanks|cheers|ta|appreciate)/i.test(messageLower)) {
    return {
      content: "You're welcome! 😊 Is there anything else I can help you with?",
      suggestions: []
    }
  }
  
  // Goodbye
  if (/(bye|goodbye|see you|later|that's all)/i.test(messageLower)) {
    return {
      content: "Thanks for chatting! Have a great day. Remember, we're here whenever you need us! 🏠",
      suggestions: []
    }
  }
  
  // Default response with suggestions if found
  if (suggestions.length > 0) {
    return {
      content: "Based on what you've described, these services might help:",
      suggestions
    }
  }
  
  // Fallback
  return {
    content: "I'd love to help! Could you tell me more about what you need? For example:\n\n• \"I need a plumber\"\n• \"My boiler needs servicing\"\n• \"I want my house cleaned\"\n• \"Help with my garden\"\n\nOr browse all our services below!",
    suggestions: []
  }
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! 👋 I'm your Hampstead On-Demand assistant. How can I help you today? You can ask me about services, prices, or help finding the right tradesperson.",
      timestamp: new Date(),
      suggestions: []
    }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const response = generateResponse(userMessage.content)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 500 + Math.random() * 500)
  }

  const handleQuickAction = (action: string) => {
    setInput(action)
    setTimeout(() => {
      const form = document.getElementById('chat-form') as HTMLFormElement
      form?.requestSubmit()
    }, 100)
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 md:bottom-6 right-6 z-50 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Open chat assistant"
          >
            <MessageCircle size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 md:bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-md"
          >
            <Card className="flex flex-col h-[500px] max-h-[70vh] shadow-2xl border-2">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Hampstead Assistant</h3>
                    <p className="text-xs opacity-80">Always here to help</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-primary-foreground/20 rounded-full transition-colors"
                  aria-label="Close chat"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground'
                      }`}>
                        {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                      </div>
                      <div className={`rounded-2xl px-4 py-2 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-md'
                          : 'bg-background border rounded-bl-md'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        
                        {/* Service Suggestions */}
                        {message.suggestions && message.suggestions.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {message.suggestions.map((service) => (
                              <Link
                                key={service.id}
                                href={`/book/${service.id}`}
                                className="block p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                <div className="flex justify-between items-start gap-2">
                                  <div>
                                    <p className="font-medium text-sm">{service.title}</p>
                                    <p className="text-xs text-muted-foreground">{service.category}</p>
                                  </div>
                                  <span className="font-bold text-primary text-sm">£{service.price}</span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex gap-2 max-w-[85%]">
                      <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center flex-shrink-0">
                        <Bot size={16} />
                      </div>
                      <div className="rounded-2xl rounded-bl-md bg-background border px-4 py-3">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length <= 2 && (
                <div className="px-4 py-2 border-t bg-background flex gap-2 overflow-x-auto">
                  <button
                    onClick={() => handleQuickAction("What services do you offer?")}
                    className="px-3 py-1.5 text-xs bg-muted rounded-full whitespace-nowrap hover:bg-muted/80 transition-colors"
                  >
                    View Services
                  </button>
                  <button
                    onClick={() => handleQuickAction("I need a plumber")}
                    className="px-3 py-1.5 text-xs bg-muted rounded-full whitespace-nowrap hover:bg-muted/80 transition-colors"
                  >
                    Plumbing
                  </button>
                  <button
                    onClick={() => handleQuickAction("I need cleaning")}
                    className="px-3 py-1.5 text-xs bg-muted rounded-full whitespace-nowrap hover:bg-muted/80 transition-colors"
                  >
                    Cleaning
                  </button>
                  <button
                    onClick={() => handleQuickAction("I'm a landlord")}
                    className="px-3 py-1.5 text-xs bg-muted rounded-full whitespace-nowrap hover:bg-muted/80 transition-colors"
                  >
                    Landlord
                  </button>
                </div>
              )}

              {/* Input */}
              <form id="chat-form" onSubmit={handleSubmit} className="p-4 border-t bg-background rounded-b-lg">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1"
                    aria-label="Chat message"
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={!input.trim() || isTyping}
                    aria-label="Send message"
                  >
                    {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
