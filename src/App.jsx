import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { PortfolioPage } from './pages/PortfolioPage'
import { WorkPortfolioPage } from './pages/WorkPortfolioPage'
import { PortfolioCollectionPage } from './pages/PortfolioCollectionPage'
import { PortfolioAlbumPage } from './pages/PortfolioAlbumPage'
import { ServicesPage } from './pages/ServicesPage'
import { ServiceDetailPage } from './pages/ServiceDetailPage'
import { AboutPage } from './pages/AboutPage'
import { BookingPage } from './pages/BookingPage'
import { ReferralPage } from './pages/ReferralPage'

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return null
}

export default function App() {
  const location = useLocation()

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="portfolio" element={<WorkPortfolioPage />} />
            <Route path="brands" element={<PortfolioPage />} />
            <Route path="brands/:slug" element={<PortfolioCollectionPage />} />
            <Route path="portfolio/albums/:albumSlug" element={<PortfolioAlbumPage />} />
            <Route path="portfolio/:slug" element={<PortfolioCollectionPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/:slug" element={<ServiceDetailPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="booking" element={<BookingPage />} />
            <Route path="contact" element={<BookingPage />} />
            <Route path="refer" element={<ReferralPage />} />
            <Route path="referrals" element={<Navigate to="/refer" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  )
}
