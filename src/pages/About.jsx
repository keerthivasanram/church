import founderImg from '../assets/images/site/about-founder.jpg'
import pastorsImg from '../assets/images/site/equipping-pastors.jpg'
import familyImg from '../WhatsApp Image 2026-07-23 at 16.45.36.jpeg'
import { Helmet } from 'react-helmet-async'
import { aboutUs, site, stats } from '../data/siteContent'
import Reveal from '../components/motion/Reveal'
import Ornament from '../components/motion/Ornament'
import Ambient from '../components/motion/Ambient'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import SectionHeading from '../components/SectionHeading'
import Counter from '../components/Counter'
import './About.css'

function About() {
  return (
    <>
      <Helmet>
        <title>About Us | {site.name}</title>
        <meta name="description" content="Learn about Prophet Daniel Bennet and the mission of End Time Prophetic Ministries." />
        <meta property="og:title" content={`About Us | ${site.name}`} />
        <meta property="og:description" content="Learn about Prophet Daniel Bennet and the mission of End Time Prophetic Ministries." />
      </Helmet>

      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow eyebrow--center">About Us</span>
            <h1>Get to Know {site.name}</h1>
            <Ornament center />
            <div className="page-hero__bg-text" aria-hidden="true">About Us</div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container about-split">
          <div className="about-split__figure-wrapper">
            <Reveal variant="veil" className="about-split__figure">
              <img src={founderImg} alt="Prophet Daniel Bennet" />
            </Reveal>
          </div>
          <Reveal delay={0.1} className="about-split__body">
            <span className="eyebrow">Founder</span>
            <h2>{aboutUs.founderTitle}</h2>
            {aboutUs.founderStory.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section-soft section-scripture-bg">
        <Ambient rays dust tone="dark" />
        <div className="container about-split about-split--reverse" style={{ position: 'relative', zIndex: 10 }}>
          <div className="about-split__figure-wrapper">
            <Reveal variant="veil" className="about-split__figure">
              <img src={familyImg} alt="Prophet Daniel Bennet and family" />
            </Reveal>
          </div>
          <Reveal delay={0.1} className="about-split__body">
            <span className="eyebrow">Our Family</span>
            <h2>{aboutUs.family.title}</h2>
            {aboutUs.family.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container about-split">
          <div className="about-split__figure-wrapper">
            <Reveal variant="veil" className="about-split__figure">
              <img src={pastorsImg} alt="Equipping emerging pastors" />
            </Reveal>
          </div>
          <Reveal delay={0.1} className="about-split__body">
            <span className="eyebrow">Raising Leaders</span>
            <h2>{aboutUs.equipping.title}</h2>
            <p>{aboutUs.equipping.body}</p>
          </Reveal>
        </div>
      </section>

      <section className="section section-soft section-scripture-bg">
        <Ambient rays dust tone="dark" />
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <Stagger className="about-stats glass">
            {stats.map((s) => (
              <StaggerItem className="stat" key={s.label}>
                <div className="stat__num accent">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="stat__label">{s.label}</div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section about-vision-paper">
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <SectionHeading eyebrow="Guided by Faith, Empowered by Purpose" title="Our Vision & Mission" />
          <Stagger className="grid pillars-grid">
            {aboutUs.pillars.map((p, i) => (
              <StaggerItem className="pillar-card" key={p.title}>
                <span className="pillar-card__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  )
}

export default About
