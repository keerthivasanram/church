import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import CathedralHero from '../components/CathedralHero'
import founderImg from '../assets/images/site/prophet-messenger.jpeg'
import qrImage from '../assets/images/site/qr-code.jpg'
import outreachImg from '../assets/images/site/outreach.jpg'
import internationalImg from '../assets/images/site/international.jpg'
import malaysiaImg from '../assets/images/site/malaysia-outreach.jpg'
import brochureFlyerImg from '../assets/images/posters/WhatsApp Image 2026-07-23 at 16.51.15.jpeg'
import conferencePosterImg from '../assets/images/posters/prophetic-misphacha-conference.jpg'
import { site, aboutUs, ministries, stats, testimonials } from '../data/siteContent'
import { galleryImages } from '../data/gallery'
import Reveal from '../components/motion/Reveal'
import Ambient from '../components/motion/Ambient'
import Ornament from '../components/motion/Ornament'
import Cinema from '../components/motion/Cinema'
import FlyImage from '../components/motion/FlyImage'
import Drift from '../components/motion/Drift'
import Magnetic from '../components/motion/Magnetic'
import ChapterRail from '../components/ChapterRail'
import Colonnade from '../components/Colonnade'
import GalleryTraverse from '../components/GalleryTraverse'
import SectionHeading from '../components/SectionHeading'
import Counter from '../components/Counter'
import Arrow from '../components/Arrow'
import './Home.css'

function Home() {
  const [posterOpen, setPosterOpen] = useState(false)
  const previewImages = galleryImages.slice(0, 6)

  // doubled so the track can loop seamlessly from -50% back to 0
  const witnessReel = [...testimonials, ...testimonials]

  return (
    <>
      <title>{site.name} | Encounter Christ</title>
      <meta name="description" content="A prophetic ministry taking the presence of God to the nations — teaching, healing and revival with Prophet Daniel Bennet." />
      <meta property="og:title" content={`${site.name} | Encounter Christ`} />
      <meta property="og:description" content="A prophetic ministry taking the presence of God to the nations — teaching, healing and revival." />
      <meta property="og:type" content="website" />

      <div className="home">
        {/* the air of the basilica — held over the entire journey */}
        <Cinema />
        {/* where you are in the pilgrimage */}
        <ChapterRail />

        {/* ═══════════════ HERO — THE NAVE ═══════════════ */}
        <CathedralHero />

        {/* ═══════════════ THE PROPHET ═══════════════ */}
        <section className="section hprophet manuscript-section" data-chapter="I" data-chapter-label="The Messenger">
          <div className="manuscript-bg" aria-hidden="true">
            {/* Background text removed as requested */}
            
            <div className="manuscript-bg__ornament manuscript-bg__ornament--tl"></div>
            <div className="manuscript-bg__ornament manuscript-bg__ornament--tr"></div>
            <div className="manuscript-bg__ornament manuscript-bg__ornament--bl"></div>
            <div className="manuscript-bg__ornament manuscript-bg__ornament--br"></div>
            <Ambient rays dust tone="gold" />
          </div>
          <div className="container hprophet__grid">
            <div className="hprophet__figure">
              <FlyImage
                className="hprophet__frame arch"
                src={founderImg}
                alt="Prophet Daniel Bennet"
                from="left"
                speed={78}
              >
                <span className="hprophet__plate">Prophet Daniel Bennet</span>
              </FlyImage>
            </div>
            <Drift className="hprophet__text" speed={54} lateral={16}>
              <span className="eyebrow"><em className="chapter">I</em> The Messenger</span>
              <h2>A VESSEL RAISED FOR THE END-TIME HARVEST</h2>
              <p>{aboutUs.founderStory[0]}</p>
              <p>{aboutUs.founderStory[1]}</p>
              <Magnetic><Link to="/about" className="btn btn-ghost">His Story <Arrow /></Link></Magnetic>
            </Drift>
          </div>
        </section>

        {/* ═══════════════ SCRIPTURE — THE APSE (illuminated manuscript) ═══════════════ */}
        <section className="hscripture" data-chapter="II" data-chapter-label="The Word">
          <Ambient rays dust tone="dark" />
          <div className="container">
            <Drift className="hscripture__inner" speed={64} fade={false}>
              <span className="eyebrow hscripture__chapter"><em className="chapter">II</em> The Word</span>
              <Ornament center={false} small />
              <blockquote className="hscripture__verse">
                For the earth shall be filled with the knowledge of the
                <span className="accent accent--living"> glory of the Lord,</span> as the waters cover the sea.
              </blockquote>
              <span className="hscripture__colophon" aria-label="Habakkuk chapter 2 verse 14">
                Habakkuk&nbsp;·&nbsp;Cap.&nbsp;II&nbsp;·&nbsp;xiv
              </span>
            </Drift>
          </div>
        </section>

        {/* ═══════════════ GLOBAL MINISTRY ═══════════════ */}
        <section className="section hglobal" data-chapter="III" data-chapter-label="The Mission">
          <div className="container hglobal__grid">
            <Drift className="hglobal__text" speed={48} lateral={-18}>
              <span className="eyebrow"><em className="chapter">III</em> The Mission</span>
              <h2>CARRYING THE PROPHETIC VOICE ACROSS THE NATIONS</h2>
              <p className="lede">
                From local outreach to international crusades, the Gospel and the
                prophetic are carried across borders — raising leaders and revival
                wherever God sends.
              </p>
              <div className="hglobal__stats">
                {stats.map((s) => (
                  <div className="hglobal__stat" key={s.label}>
                    <span className="hglobal__num"><Counter value={s.value} suffix={s.suffix} /></span>
                    <span className="hglobal__label">{s.label}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '36px' }}>
                <Magnetic>
                  <Link to="/brochure" className="btn btn-primary">
                    View Ministry Brochure <Arrow />
                  </Link>
                </Magnetic>
              </div>
            </Drift>
            <div className="hglobal__gallery">
              <div className="hglobal__col">
                <FlyImage className="hglobal__img" src={internationalImg} alt="International crusade" from="right" speed={62} />
                <FlyImage className="hglobal__img" src={conferencePosterImg} alt="Prophetic Misphacha Conference" from="right" speed={30} depth={0.85} />
              </div>
              <div className="hglobal__col hglobal__col--low">
                <FlyImage className="hglobal__img" src={outreachImg} alt="Outreach ministry" from="right" speed={-32} depth={0.8} />
                <FlyImage className="hglobal__img" src={malaysiaImg} alt="Malaysia mission" from="right" speed={-68} depth={0.9} />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ THE MINISTRIES — THE HALLS ═══════════════ */}
        <section className="section section-soft hmin section-scripture-bg" data-chapter="IV" data-chapter-label="The Work">
          <Ambient rays dust tone="dark" />
          <div className="container" style={{ position: 'relative', zIndex: 10 }}>
            <SectionHeading eyebrow={<><em className="chapter">IV</em> The Work</>} title="Halls of Ministry">
              Serving the body of Christ through prayer, teaching, outreach and discipleship.
            </SectionHeading>
          </div>
          {/* full-bleed: the hall has to run past the edges of the page */}
          <Colonnade items={ministries} />
        </section>

        {/* ═══════════════ TESTIMONIES ═══════════════ */}
        <section className="section htest" data-chapter="V" data-chapter-label="The Witness">
          <div className="container">
            <SectionHeading eyebrow={<><em className="chapter">V</em> The Witness</>} title="Lives Transformed by His Presence" />
            <Reveal className="htest__marquee">
              <div
                className="htest__marquee-track"
                style={{ '--marquee-duration': `${testimonials.length * 7}s` }}
              >
                {witnessReel.map((t, i) => (
                  <figure className="htest__plaque" key={`${t.name}-${i}`}>
                    <span className="htest__seal" aria-hidden="true">
                      <svg viewBox="0 0 40 40" width="34" height="34">
                        <circle cx="20" cy="20" r="18.5" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
                        <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
                        <path d="M20 9v22M13 16h14" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                      </svg>
                    </span>
                    <blockquote>{t.quote}</blockquote>
                    <figcaption>
                      <span className="htest__name">{t.name}</span>
                      <span className="htest__place">{t.role}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════ GALLERY ═══════════════ */}
        <section className="section section-soft hgal section-scripture-bg" data-chapter="VI" data-chapter-label="Remembrance">
          <Ambient rays dust tone="dark" />
          <div className="container" style={{ position: 'relative', zIndex: 10 }}>
            <SectionHeading eyebrow={<><em className="chapter">VI</em> Remembrance</>} title="From the Meetings" />
          </div>
          <GalleryTraverse images={previewImages} />
        </section>

        {/* ═══════════════ UPCOMING CONFERENCE ═══════════════ */}
        <section className="section section-soft hconference section-scripture-bg" data-chapter="VII" data-chapter-label="Upcoming Event">
          <Ambient rays dust tone="gold" />
          <div className="container" style={{ position: 'relative', zIndex: 10 }}>
            <SectionHeading
              eyebrow={<><em className="chapter">VII</em> Upcoming Event</>}
              title="Prophetic Misphacha Conference 2026"
            >
              Rebuilding Christ-Centered Healthy Families &amp; Restoring Marriages
            </SectionHeading>

            <div className="hconference__grid">
              {/* Poster Preview Card */}
              <div className="hconference__poster-wrapper">
                <div className="hconference__poster-card" onClick={() => setPosterOpen(true)}>
                  <img
                    src={conferencePosterImg}
                    alt="Prophetic Misphacha Conference Poster - Prophet Daniel Bennet"
                    className="hconference__poster-img"
                  />
                  <div className="hconference__poster-overlay">
                    <span className="hconference__zoom-btn">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="7" />
                        <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" strokeLinecap="round" />
                      </svg>
                      Click to Expand Poster
                    </span>
                  </div>
                  <span className="hconference__badge">22 Aug 2026</span>
                </div>
              </div>

              {/* Conference Details */}
              <div className="hconference__info">
                <div className="hconference__scripture">
                  <span className="hconference__quote">“As for Me and My House, We Will Serve the Lord”</span>
                  <span className="hconference__verse">— Joshua 24:15</span>
                </div>

                <div className="hconference__meta-grid">
                  <div className="hconference__meta-item">
                    <div className="hconference__meta-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--gold)" strokeWidth="1.8">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <div>
                      <div className="hconference__meta-label">Date &amp; Time</div>
                      <div className="hconference__meta-val">22 August 2026 (Saturday)</div>
                      <div className="hconference__meta-sub">9:30 AM – 1:00 PM</div>
                    </div>
                  </div>

                  <div className="hconference__meta-item">
                    <div className="hconference__meta-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--gold)" strokeWidth="1.8">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div>
                      <div className="hconference__meta-label">Closing Date</div>
                      <div className="hconference__meta-val">15 August 2026</div>
                      <div className="hconference__meta-sub">Registration Closes Soon</div>
                    </div>
                  </div>

                  <div className="hconference__meta-item">
                    <div className="hconference__meta-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--gold)" strokeWidth="1.8">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <div className="hconference__meta-label">Venue</div>
                      <div className="hconference__meta-val">STEVE’S GYM</div>
                      <div className="hconference__meta-sub">No. 10, Krishna Reddy, Henpur Bagalur Road, HBR 3rd Block, Bengaluru - 500043</div>
                    </div>
                  </div>

                  <div className="hconference__meta-item">
                    <div className="hconference__meta-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--gold)" strokeWidth="1.8">
                        <path d="M20 12V8H4v4M20 12v6H4v-6M20 12H4M16 6V4H8v2" />
                      </svg>
                    </div>
                    <div>
                      <div className="hconference__meta-label">Registration</div>
                      <div className="hconference__meta-val">₹200/- per person</div>
                      <div className="hconference__meta-sub">Limited Seats (30 Seats Only)</div>
                    </div>
                  </div>
                </div>

                <div className="hconference__highlights">
                  <h3>Conference Focus &amp; Sessions</h3>
                  <ul>
                    <li><strong>Rebuilding Christ-Centered Healthy Families</strong> — Newly married couples are welcome</li>
                    <li><strong>Forgiveness &amp; Healing</strong> in marriage</li>
                    <li><strong>Dealing with Modern Challenges</strong> — Technology, peer pressure, and cultural influences</li>
                    <li><strong>Restoring Love, Faith, &amp; Unity</strong> in marriage</li>
                  </ul>
                </div>

                <div className="hconference__actions">
                  <Magnetic>
                    <a href="tel:+919342523393" className="btn btn-primary">
                      Call &amp; Register: +91 93425 23393 <Arrow />
                    </a>
                  </Magnetic>
                  <button onClick={() => setPosterOpen(true)} className="btn btn-outline">
                    View Full Poster
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lightbox for Conference Poster */}
        <AnimatePresence>
          {posterOpen && (
            <motion.div
              className="lightbox"
              onClick={() => setPosterOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <button className="lightbox__close" aria-label="Close" onClick={() => setPosterOpen(false)}>&times;</button>
              <motion.img
                src={conferencePosterImg}
                alt="Prophetic Misphacha Conference Poster"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                style={{ maxHeight: '88vh', borderRadius: '12px', border: '1px solid rgba(var(--accent-rgb), 0.5)' }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══════════════ PRAYER / INVITE — THE THRESHOLD ═══════════════ */}
        <section className="hprayer" data-chapter="VIII" data-chapter-label="The Invitation">
          <div className="hprayer__bg" aria-hidden="true" />
          <Ambient rays dust fog tone="dark" />
          <div className="container">
            <Reveal variant="blur" className="hprayer__inner">
              <span className="eyebrow eyebrow--center"><em className="chapter">VIII</em> The Invitation</span>
              <h2>INVITE PROPHET DANIEL BENNET<br />TO YOUR CHURCH OR CONFERENCE TO SPEAK</h2>
              <Ornament center />
              <p>{aboutUs.founderStory[2]}</p>
              <Magnetic><Link to="/invite" className="btn btn-outline">Send an Invitation <Arrow /></Link></Magnetic>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════ GIVING / PAYMENT ═══════════════ */}
        <section className="section section-soft hgiving section-scripture-bg" data-chapter="IX" data-chapter-label="Giving">
          <Ambient rays dust tone="gold" />
          <div className="container" style={{ position: 'relative', zIndex: 10 }}>
            
            {/* Custom Styled Heading */}
            <div className="section-head" style={{ marginBottom: '72px', position: 'relative' }}>
              <span className="eyebrow eyebrow--center"><em className="chapter">IX</em> Support the Ministry</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px, 7vw, 92px)', fontWeight: '400', letterSpacing: '0.03em', color: 'var(--white)', marginTop: '20px', textShadow: '0 10px 40px rgba(0,0,0,0.6)' }}>
                PARTNER <span style={{ fontStyle: 'italic', color: 'var(--gold)', textTransform: 'lowercase', letterSpacing: '0.05em' }}>with us</span>
              </h2>
              <Ornament center />
              <p style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(24px, 3vw, 32px)', 
                color: 'rgba(255, 255, 255, 0.9)', 
                maxWidth: '720px', 
                margin: '36px auto 0', 
                lineHeight: '1.3',
                letterSpacing: '0.02em',
                textShadow: '0 4px 20px rgba(0,0,0,0.4)' 
              }}>
                Your seed helps us take the <span style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>prophetic voice</span> across the nations.
              </p>
            </div>

            <div className="hgiving__grid">
              {/* Left Side: Account Details */}
              <div className="card card--stone hgiving__card">
                <span className="eyebrow" style={{ marginBottom: '12px' }}>Direct Transfer</span>
                <h3 style={{ color: 'var(--white)', marginBottom: '8px', fontSize: '28px' }}>Bank Account</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '40px', maxWidth: '340px' }}>
                  For international or domestic wire transfers directly to the ministry.
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Row: Bank */}
                  <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '16px', alignItems: 'baseline', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px' }}>
                    <span style={{ color: 'var(--muted)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Bank</span>
                    <span style={{ color: 'var(--gold-light)', fontSize: '20px', fontFamily: 'var(--font-display)', fontStyle: 'italic', letterSpacing: '0.02em' }}>State Bank of India</span>
                  </div>
                  
                  {/* Row: Account Name */}
                  <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '16px', alignItems: 'baseline', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px' }}>
                    <span style={{ color: 'var(--muted)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Acc Name</span>
                    <span style={{ color: 'var(--white)', fontSize: '15px', fontWeight: '600', letterSpacing: '0.15em', textTransform: 'uppercase' }}>DANIEL BENNET</span>
                  </div>

                  {/* Row: Account No */}
                  <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '16px', alignItems: 'baseline', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px' }}>
                    <span style={{ color: 'var(--muted)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Acc No.</span>
                    <span style={{ color: 'var(--gold)', fontSize: '20px', fontWeight: '500', letterSpacing: '0.1em' }}>20190093101</span>
                  </div>

                  {/* Grid: Codes & Branch */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', paddingTop: '12px' }}>
                    <div>
                      <span style={{ display: 'block', color: 'var(--muted)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '6px' }}>IFSC Code</span>
                      <span style={{ color: 'var(--white)', fontSize: '14px', letterSpacing: '0.08em', fontWeight: '500' }}>SBIN0005200</span>
                    </div>
                    <div>
                      <span style={{ display: 'block', color: 'var(--muted)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '6px' }}>Branch Code</span>
                      <span style={{ color: 'var(--white)', fontSize: '14px', letterSpacing: '0.08em', fontWeight: '500' }}>005200</span>
                    </div>
                    <div>
                      <span style={{ display: 'block', color: 'var(--muted)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '6px' }}>MICR Code</span>
                      <span style={{ color: 'var(--white)', fontSize: '14px', letterSpacing: '0.08em', fontWeight: '500' }}>600002119</span>
                    </div>
                    <div>
                      <span style={{ display: 'block', color: 'var(--muted)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '6px' }}>Branch</span>
                      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', lineHeight: '1.5', display: 'block' }}>Porur, Chennai<br/>Tamil Nadu, India</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: QR Code */}
              <div className="card card--stone hgiving__card hgiving__qr-box" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span className="eyebrow" style={{ marginBottom: '12px' }}>Digital Giving</span>
                <h3 style={{ color: 'var(--white)', marginBottom: '8px', fontSize: '28px' }}>Scan to Give</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '40px', maxWidth: '280px' }}>
                  Use any UPI or mobile payment app to scan and give instantly.
                </p>
                <div className="hgiving__qr-image-wrapper">
                  <img src={qrImage} alt="Scan to Give" className="hgiving__qr-image" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home
