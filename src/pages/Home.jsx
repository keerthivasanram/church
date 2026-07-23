import { Link } from 'react-router-dom'
import CathedralHero from '../components/CathedralHero'
import founderImg from '../assets/images/site/about-founder.jpg'
import outreachImg from '../assets/images/site/outreach.jpg'
import internationalImg from '../assets/images/site/international.jpg'
import malaysiaImg from '../assets/images/site/malaysia-outreach.jpg'
import brochureFlyerImg from '../assets/images/posters/WhatsApp Image 2026-07-23 at 16.51.15.jpeg'
import { site, aboutUs, ministries, stats, testimonials } from '../data/siteContent'
import { galleryImages } from '../data/gallery'
import Reveal from '../components/motion/Reveal'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
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
  const previewImages = galleryImages.slice(0, 6)

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
            <div className="manuscript-bg__initial" data-depth="0.1">D</div>
            <div className="manuscript-bg__text manuscript-bg__text--top" data-depth="0.2">ET VERBUM CARO<br/>FACTUM EST</div>
            <div className="manuscript-bg__text manuscript-bg__text--bottom" data-depth="0.15">IN PRINCIPIO<br/>ERAT VERBUM<br/>ET VERBUM ERAT<br/>APUD DEUM</div>
            <div className="manuscript-bg__initial manuscript-bg__initial--bottom" data-depth="0.1">ERBUM</div>
            
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
              <h2>A vessel raised for the end-time harvest</h2>
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
                <FlyImage className="hglobal__img" src={brochureFlyerImg} alt="Ministry brochure crusade" from="right" speed={30} depth={0.85} />
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
            <Stagger className="grid htest__grid">
              {testimonials.slice(0, 3).map((t, i) => (
                <StaggerItem key={t.name} hover>
                  <Drift speed={i === 1 ? 34 : 12} fade={false}>
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
                  </Drift>
                </StaggerItem>
              ))}
            </Stagger>
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

        {/* ═══════════════ PRAYER / INVITE — THE THRESHOLD ═══════════════ */}
        <section className="hprayer" data-chapter="VII" data-chapter-label="The Invitation">
          <div className="hprayer__bg" aria-hidden="true" />
          <Ambient rays dust fog tone="dark" />
          <div className="container">
            <Reveal variant="blur" className="hprayer__inner">
              <span className="eyebrow eyebrow--center"><em className="chapter">VII</em> The Invitation</span>
              <h2>Invite Prophet Daniel Bennet<br />to your church or event</h2>
              <Ornament center />
              <p>{aboutUs.founderStory[2]}</p>
              <Magnetic><Link to="/invite" className="btn btn-outline">Send an Invitation <Arrow /></Link></Magnetic>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home
