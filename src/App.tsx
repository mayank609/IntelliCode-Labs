import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import Preloader from './components/Preloader'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ProductsPage from './pages/ProductsPage'
import IndustriesPage from './pages/IndustriesPage'
import ContactPage from './pages/ContactPage'

function AppContent() {
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 220)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Preloader isLoading={isLoading} />
      <ScrollToTop />
      <Layout>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/industries" element={<IndustriesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </Layout>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
