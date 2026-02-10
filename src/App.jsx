import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

// SafeIcon component - using injected version
const SafeIcon = ({ name, size = 24, className = '' }) => {
  // This will be injected by the system, placeholder for structure
  return <span className={className} style={{ width: size, height: size }}></span>
}

// Product Data - HELIOT EMIL style
const products = [
  {
    id: 'HE-001',
    name: 'ASYMMETRIC ZIP JACKET',
    price: '€1,250',
    image: 'https://images.unsplash.com/photo-1551028712-42ad591ab6ce?w=800&q=80',
    category: 'OUTERWEAR',
    coordinates: '59.9139°N 10.7522°E'
  },
  {
    id: 'HE-002',
    name: 'LIQUID METAL TRENCH',
    price: '€980',
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80',
    category: 'COATS',
    coordinates: '55.6761°N 12.5683°E'
  },
  {
    id: 'HE-003',
    name: 'MODULAR UTILITY VEST',
    price: '€450',
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80',
    category: 'VESTS',
    coordinates: '59.3293°N 18.0686°E'
  },
  {
    id: 'HE-004',
    name: 'STRUCTURED BLAZER',
    price: '€780',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c0?w=800&q=80',
    category: 'TAILORING',
    coordinates: '57.7089°N 11.9746°E'
  },
  {
    id: 'HE-005',
    name: 'TECHNICAL CARGO PANTS',
    price: '€420',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80',
    category: 'TROUSERS',
    coordinates: '55.9533°N 3.1883°W'
  },
  {
    id: 'HE-006',
    name: 'DECONSTRUCTED SHIRT',
    price: '€320',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
    category: 'SHIRTS',
    coordinates: '51.5074°N 0.1278°W'
  }
]

// Custom Cursor Component
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e) => {
      if (e.target.closest('a') || e.target.closest('button') || e.target.closest('[data-cursor="pointer"]')) {
        setHovering(true)
      } else {
        setHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <div
      className={`custom-cursor ${hovering ? 'hovering' : ''}`}
      style={{
        left: position.x - 10,
        top: position.y - 10
      }}
    />
  )
}

// Film Grain Overlay
const FilmGrain = () => <div className="film-grain" />

// Preloader
const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="preloader"
    >
      <div className="text-center">
        <div className="text-white text-xs tracking-[0.3em] mb-4 font-light">HELIOT EMIL</div>
        <div className="preloader-text">
          {Math.min(Math.floor(progress), 100).toString().padStart(3, '0')}%
        </div>
      </div>
    </motion.div>
  )
}

// Navigation
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-white' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 md:px-8">
          {/* Left - Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`text-[11px] tracking-[0.2em] font-medium z-50 relative mix-blend-difference ${
              menuOpen ? 'text-white' : scrolled ? 'text-black' : 'text-white'
            }`}
          >
            {menuOpen ? 'CLOSE' : 'MENU'}
          </button>

          {/* Center - Logo */}
          <a
            href="#"
            className={`absolute left-1/2 -translate-x-1/2 text-[13px] md:text-[14px] font-semibold tracking-[0.25em] z-50 mix-blend-difference ${
              menuOpen ? 'text-white' : scrolled ? 'text-black' : 'text-white'
            }`}
          >
            HELIOT EMIL
          </a>

          {/* Right - Icons */}
          <div className="flex items-center gap-6 z-50">
            <button className={`text-[11px] tracking-[0.2em] font-medium hidden md:block mix-blend-difference ${
              menuOpen ? 'text-white' : scrolled ? 'text-black' : 'text-white'
            }`}>
              SEARCH
            </button>
            <button className={`text-[11px] tracking-[0.2em] font-medium hidden md:block mix-blend-difference ${
              menuOpen ? 'text-white' : scrolled ? 'text-black' : 'text-white'
            }`}>
              ACCOUNT
            </button>
            <button className={`text-[11px] tracking-[0.2em] font-medium mix-blend-difference ${
              menuOpen ? 'text-white' : scrolled ? 'text-black' : 'text-white'
            }`}>
              BAG (0)
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-black"
          >
            <div className="h-full flex flex-col justify-center px-8 md:px-16">
              <nav className="space-y-4">
                {['NEW ARRIVALS', 'OUTERWEAR', 'TAILORING', 'ACCESSORIES', 'COLLECTIONS', 'ABOUT'].map((item, i) => (
                  <motion.a
                    key={item}
                    href="#"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                    className="block text-white text-3xl md:text-5xl font-light tracking-wide hover:opacity-50 transition-opacity"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
              </nav>

              <div className="absolute bottom-8 left-8 right-8 flex justify-between text-[10px] tracking-[0.2em] text-white/50">
                <span>FW25 COLLECTION</span>
                <span>COPENHAGEN</span>
                <span>55.6761°N 12.5683°E</span>
              </div>
            </div>
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
      {/* Video/Image Background */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=80"
          alt="HELIOT EMIL Collection"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Technical Markers */}
      <div className="absolute top-24 left-6 text-[10px] tracking-[0.2em] text-white/70 font-mono hidden md:block">
        <div>COORD: 55.6761°N</div>
        <div>12.5683°E</div>
        <div className="mt-2">FW25</div>
      </div>

      <div className="absolute top-24 right-6 text-[10px] tracking-[0.2em] text-white/70 font-mono hidden md:block">
        <div>{new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}</div>
        <div>CET+1</div>
      </div>

      {/* Center Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-white text-[10px] md:text-[11px] tracking-[0.4em] font-medium mb-4">
            FALL/WINTER 2025
          </h1>
          <p className="text-white/80 text-sm md:text-base font-light tracking-wide max-w-md mx-auto px-6">
            Industrial elegance meets fluid forms
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"
        />
      </motion.div>
    </section>
  )
}

// Product Card
const ProductCard = ({ product, index, large = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true }}
      className={`group cursor-pointer ${large ? 'md:col-span-2 md:row-span-2' : ''}`}
      data-cursor="pointer"
    >
      <div className={`product-image-container relative overflow-hidden mb-4 ${large ? 'aspect-[4/5]' : 'aspect-[3/4]'}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

        {/* Quick View */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-white text-black text-[10px] tracking-[0.2em] px-6 py-3 font-medium">
            QUICK VIEW
          </span>
        </div>

        {/* Technical ID */}
        <div className="absolute top-3 left-3 text-[9px] tracking-[0.15em] text-black/60 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
          {product.id}
        </div>
      </div>

      <div className="space-y-1 px-1">
        <div className="flex justify-between items-start">
          <h3 className="text-[11px] tracking-[0.15em] font-medium text-black group-hover:opacity-60 transition-opacity">
            {product.name}
          </h3>
          <span className="text-[11px] tracking-[0.1em] text-gray-500 font-mono">
            {product.price}
          </span>
        </div>
        <p className="text-[9px] tracking-[0.2em] text-gray-400 uppercase">
          {product.category}
        </p>
      </div>
    </motion.div>
  )
}

// Collection Grid - Asymmetric HELIOT EMIL style
const CollectionGrid = () => {
  return (
    <section id="shop" className="py-20 md:py-32 px-4 md:px-8 max-w-[1800px] mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-[10px] tracking-[0.3em] text-gray-400 mb-2 font-mono">FW25</p>
          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-black">
            NEW ARRIVALS
          </h2>
        </motion.div>
        <motion.a
          href="#"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-[10px] tracking-[0.2em] text-black border-b border-black pb-1 hover:opacity-60 transition-opacity"
          data-cursor="pointer"
        >
          VIEW ALL
        </motion.a>
      </div>

      {/* Asymmetric Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {/* Row 1 */}
        <div className="col-span-1 md:col-span-1 md:mt-0">
          <ProductCard product={products[0]} index={0} />
        </div>
        <div className="col-span-1 md:col-span-1 md:mt-24">
          <ProductCard product={products[1]} index={1} />
        </div>
        <div className="col-span-1 md:col-span-1 md:mt-12">
          <ProductCard product={products[2]} index={2} />
        </div>
        <div className="col-span-1 md:col-span-1 md:mt-36">
          <ProductCard product={products[3]} index={3} />
        </div>

        {/* Row 2 */}
        <div className="col-span-1 md:col-span-1 md:mt-8">
          <ProductCard product={products[4]} index={4} />
        </div>
        <div className="col-span-1 md:col-span-1 md:mt-32">
          <ProductCard product={products[5]} index={5} />
        </div>
        <div className="col-span-2 md:col-span-2 md:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative aspect-[16/9] bg-gray-100 overflow-hidden group cursor-pointer"
            data-cursor="pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80"
              alt="Campaign"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white text-black text-[10px] tracking-[0.2em] px-8 py-4 font-medium">
                VIEW CAMPAIGN
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Editorial Section
const EditorialSection = () => {
  return (
    <section className="py-20 md:py-0 bg-white">
      <div className="grid md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="aspect-[4/5] md:aspect-auto md:h-screen overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1552374196-1ab2a1c59342?w=1000&q=80"
            alt="Editorial"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          />
        </motion.div>

        <div className="flex items-center justify-center p-8 md:p-16 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-md"
          >
            <p className="text-[10px] tracking-[0.3em] text-gray-400 mb-6 font-mono">ABOUT</p>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6 leading-tight text-black">
              INDUSTRIAL<br/>ELEGANCE
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-8 font-light">
              Founded in Copenhagen by brothers Julius and Victor Juul, HELIOT EMIL merges industrial aesthetics with high-fashion sensibilities. Each piece is a study in form and function.
            </p>
            <a
              href="#"
              className="inline-block text-[10px] tracking-[0.2em] text-black border-b border-black pb-1 hover:opacity-60 transition-opacity"
              data-cursor="pointer"
            >
              READ MORE
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Newsletter
const Newsletter = () => {
  return (
    <section className="py-24 md:py-32 border-t border-gray-100">
      <div className="max-w-md mx-auto text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-lg font-light tracking-tight mb-3 text-black">SUBSCRIBE</h2>
          <p className="text-[11px] text-gray-500 mb-8 tracking-wide font-light">
            Be the first to know about new collections and exclusive releases.
          </p>
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-0 py-3 border-0 border-b border-gray-300 text-sm tracking-wide focus:outline-none focus:border-black transition-colors bg-transparent text-center placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="text-[10px] tracking-[0.2em] text-black hover:opacity-60 transition-opacity mt-2"
              data-cursor="pointer"
            >
              SUBMIT
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 md:py-20 px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-[12px] font-semibold tracking-[0.25em] mb-4">HELIOT EMIL</h3>
            <p className="text-[10px] text-gray-500 leading-relaxed tracking-wide">
              Copenhagen-based contemporary fashion house. Industrial elegance since 2017.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[9px] tracking-[0.2em] mb-4 text-gray-500">SHOP</h4>
            <ul className="space-y-2">
              {['New Arrivals', 'Outerwear', 'Tailoring', 'Accessories', 'Sale'].map(item => (
                <li key={item}>
                  <a href="#" className="text-[10px] tracking-[0.1em] text-gray-300 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-[9px] tracking-[0.2em] mb-4 text-gray-500">INFORMATION</h4>
            <ul className="space-y-2">
              {['About', 'Contact', 'Shipping', 'Returns', 'Size Guide'].map(item => (
                <li key={item}>
                  <a href="#" className="text-[10px] tracking-[0.1em] text-gray-300 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[9px] tracking-[0.2em] mb-4 text-gray-500">FOLLOW</h4>
            <ul className="space-y-2">
              {['Instagram', 'TikTok', 'YouTube', 'Spotify'].map(item => (
                <li key={item}>
                  <a href="#" className="text-[10px] tracking-[0.1em] text-gray-300 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] text-gray-600 tracking-[0.15em]">
            © 2025 HELIOT EMIL. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 text-[9px] text-gray-600 tracking-[0.15em]">
            <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</a>
          </div>
        </div>

        {/* Technical coordinates */}
        <div className="mt-8 text-[9px] text-gray-700 font-mono tracking-wider flex justify-between">
          <span>55.6761°N 12.5683°E</span>
          <span>COPENHAGEN</span>
        </div>
      </div>
    </footer>
  )
}

// Main App
function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <CustomCursor />
      <FilmGrain />
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main>
        <Hero />
        <CollectionGrid />
        <EditorialSection />
        <Newsletter />
      </main>

      <Footer />
    </div>
  )
}

export default App