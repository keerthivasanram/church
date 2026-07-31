import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { AnimatePresence, motion } from 'framer-motion'
import { site, invite } from '../data/siteContent'
import Ambient from '../components/motion/Ambient'
import Ornament from '../components/motion/Ornament'
import Reveal from '../components/motion/Reveal'
import Arrow from '../components/Arrow'
import HeroLogo from '../components/HeroLogo'
import './Invite.css'

const initial = {
  name: '',
  church: '',
  venue: '',
  email: '',
  phone: '',
  startDate: '',
  endDate: '',
  country: '',
  details: '',
  status: '',
}

function Invite() {
  const [form, setForm] = useState(initial)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setForm((f) => ({ ...f, status: 'submitting' }))
    setSent(false)
    setError(false)

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${invite.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `Invitation Request from ${form.name}`,
          name: form.name,
          church: form.church,
          venue: form.venue,
          email: form.email,
          phone: form.phone,
          startDate: form.startDate,
          endDate: form.endDate,
          country: form.country,
          details: form.details,
          _captcha: 'false',
        }),
      })

      if (response.ok) {
        setForm({ ...initial, status: 'success' })
        setSent(true)
      } else {
        setError(true)
        setForm((f) => ({ ...f, status: 'error' }))
      }
    } catch (err) {
      console.error(err)
      setError(true)
      setForm((f) => ({ ...f, status: 'error' }))
    }
  }

  return (
    <>
      <Helmet>
        <title>Invite Us | {site.name}</title>
        <meta name="description" content="Invite Prophet Daniel Bennet to your next event or church service." />
        <meta property="og:title" content={`Invite Us | ${site.name}`} />
        <meta property="og:description" content="Invite Prophet Daniel Bennet to your next event or church service." />
      </Helmet>

      <div className="invite">
        {/* Fixed banner — stays pinned while the form scrolls up over it */}
        <section className="invite-banner">
          <HeroLogo />
          <div className="invite-banner__bg" aria-hidden="true" />
          <div className="invite-banner__scrim" aria-hidden="true" />
          <Ambient rays dust tone="dark" />
          <div className="container invite-banner__inner">
            <span className="eyebrow eyebrow--center">Invitation</span>
            <h1>{invite.title}</h1>
            <Ornament center />
          </div>
        </section>

        {/* Panel — overlaps the banner and carries the request form */}
        <section className="invite-panel">
          <div className="container">
            <Reveal className="invite-panel__intro">
              <p className="lede">{invite.intro}</p>
              <p className="invite-panel__note">Please submit your request below.</p>
            </Reveal>

            <form className="invite-form" onSubmit={handleSubmit}>
              <div className="invite-form__grid">
                <label>
                  First &amp; Last Name
                  <input type="text" required value={form.name} onChange={update('name')} placeholder="Your name" />
                </label>
                <label>
                  Name of Church
                  <input type="text" required value={form.church} onChange={update('church')} placeholder="Church name" />
                </label>
                <label>
                  Venue Address
                  <input type="text" required value={form.venue} onChange={update('venue')} placeholder="Venue address" />
                </label>

                <label>
                  Email
                  <input type="email" required value={form.email} onChange={update('email')} placeholder="you@example.com" />
                </label>
                <label>
                  Phone
                  <input type="tel" required value={form.phone} onChange={update('phone')} placeholder="Your phone number" />
                </label>
                <label>
                  Start Date
                  <input type="date" required value={form.startDate} onChange={update('startDate')} />
                </label>

                <label>
                  End Date
                  <input type="date" value={form.endDate} onChange={update('endDate')} />
                </label>
                <label>
                  Country
                  <input type="text" value={form.country} onChange={update('country')} placeholder="Country" />
                </label>

                <label className="invite-form__full">
                  Any Further Info
                  <textarea rows="5" value={form.details} onChange={update('details')} placeholder="Any further details you'd like us to know" />
                </label>
              </div>

              <div className="invite-form__actions">
                <button type="submit" className="btn btn-primary" disabled={form.status === 'submitting'}>
                  {form.status === 'submitting' ? 'Sending Request…' : 'Send Message'} <Arrow />
                </button>
              </div>

              <AnimatePresence>
                {sent && (
                  <motion.p
                    className="invite-form__success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Thank you — your invitation request has been sent directly to our email!
                  </motion.p>
                )}
                {error && (
                  <motion.p
                    className="invite-form__error"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ color: '#a93226', textAlign: 'right', marginTop: '6px', fontWeight: 600, fontSize: '14px' }}
                  >
                    Something went wrong. Please try again or contact us directly at {invite.email}.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>
        </section>
      </div>
    </>
  )
}

export default Invite
