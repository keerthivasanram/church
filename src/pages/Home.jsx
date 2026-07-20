import { Link } from 'react-router-dom'
import CathedralHero from '../components/CathedralHero'
import founderImg from '../assets/images/site/about-founder.jpg'
import outreachImg from '../assets/images/site/outreach.jpg'
import internationalImg from '../assets/images/site/international.jpg'
import malaysiaImg from '../assets/images/site/malaysia-outreach.jpg'
import { site, aboutUs, ministries, stats, focusAreas, testimonials } from '../data/siteContent'
import { galleryImages } from '../data/gallery'
import Reveal from '../components/motion/Reveal'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import Tilt3D from '../components/motion/Tilt3D'
import Parallax from '../components/motion/Parallax'
import Ambient from '../components/motion/Ambient'
import Ornament from '../components/motion/Ornament'
import Threshold from '../components/motion/Threshold'
import SectionHeading from '../components/SectionHeading'
import Counter from '../components/Counter'
import Arrow from '../components/Arrow'
import './Home.css'

function Home() {
  const previewImages = galleryImages.slice(0, 6)

  return (
    <>
      <title>{site.name} | Encounter Christ</title>
      <meta name="description" content="A prophetic ministry taking the presence of God to the nations — teaching, healing and revival with Prophet Daniel Bennet." />
      <meta property="og:title" content={`${site.name} | Encounter Christ`} />
      <meta property="og:description" content="A prophetic ministry taking the presence of God to the nations — teaching, healing and revival." />
      <meta property="og:type" content="website" />

      <div className="home">
        {/* ═══════════════ HERO — THE NAVE ═══════════════ */}
        <CathedralHero />

        {/* ═══════════════ OUR MISSION ═══════════════ */}
        <section className="section hmission">
          <div className="container container--narrow">
            <Reveal className="hmission__head">
              <span className="eyebrow eyebrow--center"><em className="chapter">I</em> The Calling</span>
              <h2>
                To prepare a people for the coming of the Lord, and to carry His
                <span className="accent"> glory to the nations.</span>
              </h2>
              <Ornament small />
            </Reveal>
            <Stagger className="hmission__pillars">
              {focusAreas.map((f) => (
                <StaggerItem className="hmission__pillar" key={f}>
                  <span className="hmission__mark">✦</span>
                  {f}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <Threshold from="ivory" to="soft" />

        {/* ═══════════════ THE PROPHET ═══════════════ */}
        <section className="section section-soft hprophet">
          <div className="container hprophet__grid">
            <Parallax className="hprophet__figure" speed={54}>
              <Reveal variant="veil" className="hprophet__frame arch">
                <img src={founderImg} alt="Prophet Daniel Bennet" />
              </Reveal>
              <span className="hprophet__plate">Prophet Daniel Bennet</span>
            </Parallax>
            <Reveal variant="right" className="hprophet__text">
              <span className="eyebrow"><em className="chapter">II</em> The Messenger</span>
              <h2>A vessel raised for the end-time harvest</h2>
              <p>{aboutUs.founderStory[0]}</p>
              <p>{aboutUs.founderStory[1]}</p>
              <Link to="/about" className="btn btn-ghost">His Story <Arrow /></Link>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════ SCRIPTURE — THE APSE (illuminated manuscript) ═══════════════ */}
        <section className="hscripture">
          <Ambient rays dust tone="dark" />
          <div className="container">
            <Reveal variant="blur" className="hscripture__inner">
              <span className="eyebrow hscripture__chapter"><em className="chapter">III</em> The Word</span>
              <Ornament center={false} small />
              <blockquote className="hscripture__verse">
                For the earth shall be filled with the knowledge of the
                <span className="accent"> glory of the Lord,</span> as the waters cover the sea.
              </blockquote>
              <span className="hscripture__colophon" aria-label="Habakkuk chapter 2 verse 14">
                Habakkuk&nbsp;·&nbsp;Cap.&nbsp;II&nbsp;·&nbsp;xiv
              </span>
            </Reveal>
          </div>
        </section>

        <Threshold tone="dark" from="dark" to="ivory" />

        {/* ═══════════════ GLOBAL MINISTRY ═══════════════ */}
        <section className="section hglobal">
          <div className="container hglobal__grid">
            <Reveal variant="left" className="hglobal__text">
              <span className="eyebrow"><em className="chapter">IV</em> The Mission</span>
              <h2>Carrying the prophetic voice across the nations</h2>
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
            </Reveal>
            <div className="hglobal__gallery">
              <Parallax className="hglobal__col" speed={46}>
                <Reveal variant="veil" className="hglobal__img arch">
                  <img src={internationalImg} alt="International crusade" />
                </Reveal>
              </Parallax>
              <Parallax className="hglobal__col hglobal__col--low" speed={-46}>
                <Reveal variant="veil" className="hglobal__img arch">
                  <img src={outreachImg} alt="Outreach ministry" />
                </Reveal>
                <Reveal variant="veil" delay={0.1} className="hglobal__img arch">
                  <img src={malaysiaImg} alt="Malaysia mission" />
                </Reveal>
              </Parallax>
            </div>
          </div>
        </section>

        <Threshold from="ivory" to="soft" />

        {/* ═══════════════ THE MINISTRIES — THE HALLS ═══════════════ */}
        <section className="section section-soft hmin">
          <div className="container">
            <SectionHeading eyebrow={<><em className="chapter">V</em> The Work</>} title="Halls of Ministry">
              Serving the body of Christ through prayer, teaching, outreach and discipleship.
            </SectionHeading>
            <Stagger className="grid hmin__grid">
              {ministries.map((m) => (
                <StaggerItem key={m.name}>
                  <Tilt3D className="hmin__card" max={4}>
                    <div className="hmin__media arch">
                      <img src={new URL(`../assets/images/ministries/${m.image}`, import.meta.url).href} alt={m.name} />
                    </div>
                    <div className="hmin__body">
                      <span className="hmin__icon">
                        <img src={new URL(`../assets/images/ministries/icons/${m.icon}`, import.meta.url).href} alt="" />
                      </span>
                      <h4>{m.name}</h4>
                      <p>{m.body || 'Reaching hearts and building faith through this ministry.'}</p>
                    </div>
                  </Tilt3D>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <Threshold from="soft" to="ivory" />

        {/* ═══════════════ TESTIMONIES ═══════════════ */}
        <section className="section htest">
          <div className="container">
            <SectionHeading eyebrow={<><em className="chapter">VI</em> The Witness</>} title="Lives Transformed by His Presence" />
            <Stagger className="grid htest__grid">
              {testimonials.slice(0, 3).map((t) => (
                <StaggerItem key={t.name} hover>
                  <figure className="htest__plaque">
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
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <Threshold from="ivory" to="soft" />

        {/* ═══════════════ GALLERY ═══════════════ */}
        <section className="section section-soft hgal">
          <div className="container">
            <SectionHeading eyebrow={<><em className="chapter">VII</em> Remembrance</>} title="From the Meetings" />
            <Stagger className="hgal__grid">
              {previewImages.map((img) => (
                <StaggerItem key={img.id}>
                  <Link to="/gallery" className="hgal__item arch">
                    <img src={img.thumb} alt={`Gallery photo ${img.id}`} />
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal variant="scale" className="hgal__cta">
              <Link to="/gallery" className="btn btn-ghost">View Full Gallery <Arrow /></Link>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════ PRAYER / INVITE — THE THRESHOLD ═══════════════ */}
        <section className="hprayer">
          <div className="hprayer__bg" aria-hidden="true" />
          <Ambient rays dust fog tone="dark" />
          <div className="container">
            <Reveal variant="blur" className="hprayer__inner">
              <span className="eyebrow eyebrow--center"><em className="chapter">VIII</em> The Invitation</span>
              <h2>Invite Prophet Daniel Bennet<br />to your church or event</h2>
              <Ornament center />
              <p>{aboutUs.founderStory[2]}</p>
              <Link to="/invite" className="btn btn-outline">Send an Invitation <Arrow /></Link>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home
