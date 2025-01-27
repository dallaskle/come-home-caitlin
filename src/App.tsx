import { useState } from 'react'
import './App.css'
import { supabase } from './lib/supabase'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('loading')

    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          }
        ])

      if (error) throw error

      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 3000)

    } catch (error) {
      console.error('Error:', error)
      setSubmitStatus('error')
      
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 3000)
    }
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="container hero-content">
          <h1 className="hero-title">
            Come Home 
            <span className="hero-name">Caitlin</span>
          </h1>
          <p className="text-2xl mb-8 text-white/90 font-light tracking-wide">
            The Future of WNBA Basketball in Des Moines
          </p>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="manifesto">
        <div className="manifesto-container">
          <div className="manifesto-line"></div>
          <h2 className="section-title">Our Vision</h2>
          <div className="text-content">
            <p className="text-white/90 leading-relaxed">
              We are a grassroots community movement, born from the passionate hearts of Iowa basketball fans. 
              Our mission is clear: to bring a WNBA team to Des Moines and create the perfect homecoming for 
              our hometown hero, Caitlin Clark.
            </p>
            <p className="text-white/90 leading-relaxed">
              Iowa has shown the world what women's basketball can be. We've packed arenas, broken viewing 
              records, and demonstrated that the appetite for women's professional basketball is stronger 
              than ever. Des Moines isn't just ready for a WNBA team - we're hungry for it.
            </p>
            <p className="text-white/90 leading-relaxed">
              This isn't just about basketball. This is about community, pride, and creating opportunities 
              for the next generation to dream big right here at home.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="form-section">
        <div className="form-background"></div>
        <div className="container">
          <div className="form-container">
            <h2 className="section-title">Join The Movement</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="form-input"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className={`submit-button ${submitStatus === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={submitStatus === 'loading'}
              >
                {submitStatus === 'loading' ? 'Sending...' : 'Submit'}
              </button>

              {submitStatus === 'success' && (
                <div className="text-green-500 text-center">
                  Message sent successfully!
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="text-red-500 text-center">
                  Error sending message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
