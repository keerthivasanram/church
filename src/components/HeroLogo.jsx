import { Link } from 'react-router-dom'
import logo from '../assets/images/site/logo.png'
import { site } from '../data/siteContent'
import './HeroLogo.css'

function HeroLogo() {
  return (
    <Link to="/" className="hero-top-logo" aria-label={site.name}>
      <img src={logo} alt={site.name} />
    </Link>
  )
}

export default HeroLogo
