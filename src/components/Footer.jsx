import { Link } from 'react-router-dom'
import { site } from '../data/siteContent'
import Reveal from './motion/Reveal'
import Ornament from './motion/Ornament'
import './Footer.css'

function Footer() {
  return (
    <footer className="site-footer">
      {/* candle glow rising from the floor of the last hall */}
      <div className="site-footer__candle" aria-hidden="true" />
      <div className="site-footer__motes" aria-hidden="true">
        <span /><span /><span /><span /><span /><span />
      </div>

      <div className="container">
        {/* ── closing scene ── */}
        <Reveal variant="blur" className="site-footer__closing">
          <span className="site-footer__seal" aria-hidden="true">
            <svg viewBox="0 0 64 64" width="54" height="54">
              <defs>
                <linearGradient id="ft-gold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="var(--accent-light)" />
                  <stop offset="1" stopColor="var(--accent-deep)" />
                </linearGradient>
              </defs>
              <circle cx="32" cy="32" r="30" fill="none" stroke="url(#ft-gold)" strokeWidth="1" opacity="0.7" />
              <circle cx="32" cy="32" r="25" fill="none" stroke="url(#ft-gold)" strokeWidth="0.5" opacity="0.4" />
              <path d="M32 15v34M22 26h20" stroke="url(#ft-gold)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </span>
          <blockquote className="site-footer__verse">
            “The Lord bless thee, and keep thee: the Lord make his face shine upon thee.”
          </blockquote>
          <span className="site-footer__ref">Numbers&nbsp;·&nbsp;Cap.&nbsp;VI&nbsp;·&nbsp;xxiv</span>
          <Ornament center />
        </Reveal>

        {/* ── details ── */}
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <span className="site-footer__name">{site.name}</span>
            <p>{site.tagline}</p>
            <div className="site-footer__social">
              <a href={site.social.facebook} target="_blank" rel="noreferrer">Facebook</a>
              <a href={site.social.instagram} target="_blank" rel="noreferrer">Instagram</a>
              <a href={site.social.youtube} target="_blank" rel="noreferrer">YouTube</a>
            </div>
          </div>

          <div>
            <h4>Explore</h4>
            <nav className="site-footer__links">
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/gallery">Gallery</Link>
              <Link to="/invite">Invite the Prophet</Link>
              <Link to="/contact">Contact</Link>
            </nav>
          </div>

          <div>
            <h4>Contact</h4>
            <div className="site-footer__links">
              <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <span>{site.address}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container site-footer__bottom-row">
          <span>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <Link to="/studio" className="site-footer__credit">Design &amp; Build Notes</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
