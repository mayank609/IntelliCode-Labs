import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
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

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 220)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Preloader isLoading={isLoading} />
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
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
