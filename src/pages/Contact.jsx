import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { AnimatePresence, motion } from 'framer-motion'
import { site } from '../data/siteContent'
import Ambient from '../components/motion/Ambient'
import Ornament from '../components/motion/Ornament'
import Reveal from '../components/motion/Reveal'
import Arrow from '../components/Arrow'
import './Forms.css'

const initial = { name: '', email: '', subject: '', message: '', status: '' }

function Contact() {
  const [form, setForm] = useState(initial)
  const [sent, setSent] = useState(false)

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setForm({ ...form, status: 'submitting' })
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setForm({ name: '', email: '', subject: '', message: '', status: 'success' })
    setSent(true)
  }

  return (
    <>
      <Helmet>
        <title>Contact Us | {site.name}</title>
        <meta name="description" content={`Get in touch with ${site.name}. We would love to hear from you.`} />
        <meta property="og:title" content={`Contact Us | ${site.name}`} />
        <meta property="og:description" content={`Get in touch with ${site.name}. We would love to hear from you.`} />
      </Helmet>

      <div className="fpage">
        {/* Fixed banner */}
        <section className="fbanner">
          <div className="fbanner__bg" aria-hidden="true" />
          <div className="fbanner__scrim" aria-hidden="true" />
          <Ambient rays dust tone="dark" />
          <div className="container fbanner__inner">
            <span className="eyebrow eyebrow--center">Contact</span>
            <h1>Get in Touch</h1>
            <Ornament center />
          </div>
        </section>

        {/* Overlapping panel */}
        <section className="fpanel">
          <div className="container">
            <Reveal className="fpanel__intro">
              <p className="lede">
                We would love to hear from you — for prayer, ministry enquiries, or a word of encouragement.
              </p>
              <p className="fpanel__note">Reach us directly or send a message below.</p>
            </Reveal>

            <div className="contact-grid">
              <Reveal variant="left" className="contact-info">
                <div className="contact-info__row">
                  <span className="contact-info__label">Phone</span>
                  <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
                </div>
                <div className="contact-info__row">
                  <span className="contact-info__label">Email</span>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </div>
                <div className="contact-info__row">
                  <span className="contact-info__label">Location</span>
                  <span>{site.address}</span>
                </div>
                <div className="contact-info__row">
                  <span className="contact-info__label">Follow</span>
                  <span className="contact-info__social">
                    <a href={site.social.facebook} target="_blank" rel="noreferrer">Facebook</a>
                    <a href={site.social.instagram} target="_blank" rel="noreferrer">Instagram</a>
                    <a href={site.social.youtube} target="_blank" rel="noreferrer">YouTube</a>
                  </span>
                </div>
              </Reveal>

              <Reveal variant="right" className="contact-form-wrap">
                <form className="fform" onSubmit={handleSubmit}>
                  <div className="fform__row">
                    <label>
                      Your Name
                      <input type="text" required value={form.name} onChange={update('name')} placeholder="Your name" />
                    </label>
                    <label>
                      Your Email
                      <input type="email" required value={form.email} onChange={update('email')} placeholder="you@example.com" />
                    </label>
                  </div>
                  <label>
                    Subject
                    <input type="text" required value={form.subject} onChange={update('subject')} placeholder="Subject" />
                  </label>
                  <label>
                    Message
                    <textarea rows="6" value={form.message} onChange={update('message')} placeholder="Your message" />
                  </label>
                  <div className="fform__actions">
                    <button type="submit" className="btn btn-primary" disabled={form.status === 'submitting'}>
                      {form.status === 'submitting' ? 'Sending…' : 'Send Message'} <Arrow />
                    </button>
                  </div>
                  <AnimatePresence>
                    {sent && (
                      <motion.p
                        className="fform__success"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        Thank you — your message has been received.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </form>
              </Reveal>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Contact
