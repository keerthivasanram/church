import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Invite from './pages/Invite'
import Studio from './pages/Studio'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/invite" element={<Invite />} />
        {/* Not linked from the main nav — a case-study route for the agency,
            reachable only via the quiet credit line in the footer. */}
        <Route path="/studio" element={<Studio />} />
      </Route>
    </Routes>
  )
}

export default App
