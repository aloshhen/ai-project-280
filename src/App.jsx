import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag, Search, ArrowRight, ChevronDown } from 'lucide-react'

// SafeIcon component for dynamic icons
const SafeIcon = ({ name, size = 24, className = '' }) => {
  const icons = {
    menu: Menu,
    x: X,
    'shopping-bag': ShoppingBag,
    search: Search,
    'arrow-right': ArrowRight,
    'chevron-down': ChevronDown
  }

  const IconComponent = icons[name] || (() => null)
  return <IconComponent size={size} className={className} />
}

// Product Data
const products = [
  {
    id: 'HE-001',
    name: 'LIQUID METAL JACKET',
    price: '€1,250',
    image: 'https://images.unsplash.com/photo-1551028712-42ad591ab6ce?w=800&q=80',
    category: 'OUTERWEAR',
    isNew: true
  },
  {
    id: 'HE-002',
    name: 'TECHNICAL TRENCH COAT',
    price: '€980',
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80',
    category: 'OUTERWEAR',
    isNew: false
  },
  {
    id: 'HE-003',
    name: 'MODULAR UTILITY VEST',
    price: '€450',
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80',
    category: 'VEST',
    isNew: true
  },
  {
    id: 'HE-004',
    name: 'STRUCTURED BLAZER',
    price: '€780',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c0?w=800&q=80',
    category: 'TAILORING',
    isNew: false
  },
  {
    id: 'HE-005',
    name: 'ASYMMETRIC SHIRT',
    price: '€320',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
    category: 'SHIRTS',
    isNew: true
  },
  {
    id: 'HE-006',
    name: 'CARGO TROUSERS',
    price: '€420',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80',
    category: 'TROUSERS',
    isNew: false
  }
]

// Navigation Component
const Navigation = ({ menuOpen, setMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-sm' : 'bg-transparent'}`}>
        <div className="flex items-center justify-between px-6 py-4 md:px-8">
          {/* Left Nav */}
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-widest font-medium">
            <a href="#shop" className="link-underline hover:opacity-60 transition-opacity">SHOP</a>
            <a href="#collections" className="link-underline hover:opacity-60 transition-opacity">COLLECTIONS</a>
            <a href="#about" className="link-underline hover:opacity-60 transition-opacity">ABOUT</a>
          </nav>

          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="absolute left-1/2 -translate-x-1/2 text-lg md:text-xl font-semibold tracking-[0.2em]">
            HELIOT EMIL
          </button>

          {/* Right Nav */}
          <div className="flex items-center gap-6">
            <button className="hidden md:block text-xs tracking-widest font-medium hover:opacity-60 transition-opacity">
              SEARCH
            </button>
            <button className="hidden md:block text-xs tracking-widest font-medium hover:opacity-60 transition-opacity">
              ACCOUNT
            </button>
            <button className="relative text-xs tracking-widest font-medium hover:opacity-60 transition-opacity">
              BAG (0)
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2"
            >
              <SafeIcon name={menuOpen ? 'x' : 'menu'} size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-20 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-2xl font-light tracking-wide">
              <a href="#shop" onClick={() => setMenuOpen(false)} className="border-b border-gray-100 pb-4">SHOP</a>
              <a href="#collections" onClick={() => setMenuOpen(false)} className="border-b border-gray-100 pb-4">COLLECTIONS</a>
              <a href="#about" onClick={() => setMenuOpen(false)} className="border-b border-gray-100 pb-4">ABOUT</a>
              <a href="#account" onClick={() => setMenuOpen(false)} className="border-b border-gray-100 pb-4">ACCOUNT</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Hero Section
const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=80"
          alt="Collection"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xs tracking-[0.3em] mb-4 font-medium"
        >
          SPRING/SUMMER 2025
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6"
        >
          LIQUID UTILITY
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-sm md:text-base text-white/80 max-w-md mb-8 font-light"
        >
          Industrial elegance meets fluid forms. Explore the new collection.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-3 px-8 py-3 border border-white/30 hover:bg-white hover:text-black transition-all duration-300 text-xs tracking-widest"
        >
          EXPLORE COLLECTION
          <SafeIcon name="arrow-right" size={14} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <SafeIcon name="chevron-down" size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}

// Product Card
const ProductCard = ({ product, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
    >
      <div className="product-image-container relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 text-[10px] tracking-widest bg-black text-white px-2 py-1">
            NEW
          </span>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

        {/* Quick Add */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 bg-white text-black py-3 text-xs tracking-widest font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white"
        >
          QUICK VIEW
        </motion.button>
      </div>

      <div className="space-y-1">
        <p className="text-[10px] tracking-widest text-gray-500">{product.category}</p>
        <h3 className="text-sm font-medium tracking-wide group-hover:opacity-60 transition-opacity">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600">{product.price}</p>
      </div>
    </motion.div>
  )
}

// Collection Grid Section
const CollectionGrid = () => {
  return (
    <section id="shop" className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <p className="text-xs tracking-widest text-gray-500 mb-2">SPRING/SUMMER 2025</p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">NEW ARRIVALS</h2>
        </div>
        <a href="#all" className="text-xs tracking-widest border-b border-black pb-1 hover:opacity-60 transition-opacity">
          VIEW ALL
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  )
}

// Editorial Section
const EditorialSection = () => {
  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <p className="text-xs tracking-widest text-gray-500 mb-4">THE PHILOSOPHY</p>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-6 leading-tight">
              INDUSTRIAL ELEGANCE
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8 font-light">
              Founded in 2017 by brothers Julius and Victor Juul, HELIOT EMIL merges industrial
              aesthetics with high-fashion sensibilities. Each piece is a study in form and function,
              utilizing technical fabrics and architectural silhouettes to create a uniform for the future.
            </p>
            <button className="group flex items-center gap-3 text-xs tracking-widest border-b border-black pb-2 hover:opacity-60 transition-opacity">
              READ OUR STORY
              <SafeIcon name="arrow-right" size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1552374196-1ab2a1c59342?w=800&q=80"
                alt="Editorial"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Lookbook Section
const LookbookSection = () => {
  return (
    <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-xs tracking-widest text-gray-500 mb-2">CAMPAIGN</p>
        <h2 className="text-3xl md:text-4xl font-light tracking-tight">SS25 LOOKBOOK</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="aspect-[3/4] overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80"
            alt="Look 1"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="aspect-[3/4] overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d4b?w=600&q=80"
            alt="Look 2"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="aspect-[3/4] overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80"
            alt="Look 3"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </motion.div>
      </div>
    </section>
  )
}

// Newsletter Section
const Newsletter = () => {
  return (
    <section className="py-20 md:py-32 border-t border-gray-200">
      <div className="max-w-md mx-auto text-center px-6">
        <h2 className="text-2xl font-light tracking-tight mb-4">JOIN THE NEWSLETTER</h2>
        <p className="text-sm text-gray-500 mb-8 font-light">
          Be the first to know about new collections and exclusive offers.
        </p>
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 text-sm tracking-wide focus:outline-none focus:border-black transition-colors"
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-3 text-xs tracking-widest font-medium hover:bg-gray-800 transition-colors"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  )
}

// Footer
const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 md:py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold tracking-[0.2em] mb-4">HELIOT EMIL</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Industrial elegance meets fluid forms. Copenhagen-based contemporary fashion house.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-widest mb-4 text-gray-400">SHOP</h4>
            <ul className="space-y-2 text-sm font-light">
              <li><a href="#" className="hover:text-gray-400 transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-gray-400 transition-colors">Outerwear</a></li>
              <li><a href="#" className="hover:text-gray-400 transition-colors">Tailoring</a></li>
              <li><a href="#" className="hover:text-gray-400 transition-colors">Accessories</a></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-xs tracking-widest mb-4 text-gray-400">INFORMATION</h4>
            <ul className="space-y-2 text-sm font-light">
              <li><a href="#" className="hover:text-gray-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-gray-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-gray-400 transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-gray-400 transition-colors">Returns</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs tracking-widest mb-4 text-gray-400">FOLLOW</h4>
            <ul className="space-y-2 text-sm font-light">
              <li><a href="#" className="hover:text-gray-400 transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-gray-400 transition-colors">TikTok</a></li>
              <li><a href="#" className="hover:text-gray-400 transition-colors">YouTube</a></li>
              <li><a href="#" className="hover:text-gray-400 transition-colors">Spotify</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-gray-500 tracking-widest">
            © 2025 HELIOT EMIL. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 text-[10px] text-gray-500 tracking-widest">
            <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main App
function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <h1 className="text-2xl font-semibold tracking-[0.3em] mb-2">HELIOT EMIL</h1>
              <p className="text-xs text-gray-400 tracking-widest">LOADING</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main>
        <Hero />
        <CollectionGrid />
        <EditorialSection />
        <LookbookSection />
        <Newsletter />
      </main>

      <Footer />
    </div>
  )
}

export default App