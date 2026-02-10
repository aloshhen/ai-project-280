import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

// Sound utility using Web Audio API
const useSound = () => {
  const [soundEnabled, setSoundEnabled] = useState(false)
  const audioContext = useRef(null)

  useEffect(() => {
    if (soundEnabled && !audioContext.current) {
      audioContext.current = new (window.AudioContext || window.webkitAudioContext)()
    }
  }, [soundEnabled])

  const playClick = useCallback(() => {
    if (!soundEnabled || !audioContext.current) return

    const oscillator = audioContext.current.createOscillator()
    const gainNode = audioContext.current.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.current.destination)

    oscillator.frequency.setValueAtTime(800, audioContext.current.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.current.currentTime + 0.1)

    gainNode.gain.setValueAtTime(0.1, audioContext.current.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.1)

    oscillator.start(audioContext.current.currentTime)
    oscillator.stop(audioContext.current.currentTime + 0.1)
  }, [soundEnabled])

  return { soundEnabled, setSoundEnabled, playClick }
}

// Preloader Component
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
        return prev + Math.random() * 15 + 5
      })
    }, 100)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-[#050505] z-[9999] flex items-center justify-center"
    >
      <div className="text-center">
        <div className="font-mono text-6xl md:text-8xl font-light text-[#EBEBEB] mb-4">
          {Math.min(Math.floor(progress), 100).toString().padStart(3, '0')}%
        </div>
        <div className="font-mono text-xs text-gray-500 tracking-[0.3em]">
          SYSTEM_INITIALIZING
        </div>
        <div className="mt-8 w-48 h-px bg-gray-800 mx-auto overflow-hidden">
          <motion.div
            className="h-full bg-[#EBEBEB]"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    </motion.div>
  )
}

// Custom Crosshair Cursor
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('[data-cursor-hover]')) {
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
    <>
      <motion.div
        className="fixed pointer-events-none z-[10000] cursor-invert"
        animate={{
          x: position.x - (hovering ? 24 : 12),
          y: position.y - (hovering ? 24 : 12),
          width: hovering ? 48 : 24,
          height: hovering ? 48 : 24,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <motion.path
            d="M12 2V22M2 12H22"
            stroke="white"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.circle
            cx="12"
            cy="12"
            r="3"
            stroke="white"
            strokeWidth="1"
            initial={{ scale: 0 }}
            animate={{ scale: hovering ? 1 : 0 }}
          />
        </svg>
      </motion.div>
    </>
  )
}

// Liquid Metal Background
const LiquidMetalBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 liquid-bg opacity-30" />
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(100,100,100,0.3) 0%, transparent 50%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 400 + 200,
            height: Math.random() * 400 + 200,
            background: 'radial-gradient(circle, rgba(150,150,150,0.2) 0%, transparent 70%)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Product Data
const products = [
  {
    id: 'M-001',
    name: 'TACTICAL OVERSHIRT',
    price: '€450',
    material: 'Waxed Cotton / Titanium Fiber',
    specs: ['Water-resistant', 'Modular pockets', 'Reflective seams'],
    image: 'https://images.unsplash.com/photo-1551028712-42ad591ab6ce?w=600&q=80',
    size: 'large',
  },
  {
    id: 'M-002',
    name: 'DECONSTRUCTED TRENCH',
    price: '€890',
    material: 'Raw Denim / Steel Thread',
    specs: ['Asymmetric cut', 'Raw edges', 'Industrial hardware'],
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80',
    size: 'medium',
  },
  {
    id: 'M-003',
    name: 'MODULAR VEST',
    price: '€320',
    material: 'Technical Nylon / Rubber',
    specs: ['Detachable panels', 'Hidden pockets', 'Compression fit'],
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&q=80',
    size: 'small',
  },
  {
    id: 'M-004',
    name: 'BRUTALIST COAT',
    price: '€1,200',
    material: 'Heavy Wool / Carbon Fiber',
    specs: ['Architectural shoulders', 'Exposed seams', 'Magnetic closures'],
    image: 'https://images.unsplash.com/photo-1544923246-77307dd628b9?w=600&q=80',
    size: 'large',
  },
  {
    id: 'M-005',
    name: 'UTILITY PANTS',
    price: '€380',
    material: 'Canvas / Kevlar Blend',
    specs: ['Articulated knees', 'Cargo system', 'Reinforced stress points'],
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c0?w=600&q=80',
    size: 'medium',
  },
]

// Product Card
const ProductCard = ({ product, index, onClick, playClick }) => {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 md:col-span-1 row-span-2',
    large: 'col-span-1 md:col-span-2 row-span-2',
  }

  return (
    <motion.div
      className={`${sizeClasses[product.size]} relative group`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => {
        playClick()
        onClick(product)
      }}
      data-cursor-hover
    >
      <div className="relative h-full min-h-[300px] md:min-h-[400px] overflow-hidden border border-gray-800 bg-[#0a0a0a]">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover grayscale contrast-125"
          animate={{
            scale: isHovered ? 1.05 : 1,
            filter: isHovered ? 'grayscale(0%) contrast(1.1)' : 'grayscale(100%) contrast(1.25)',
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Technical overlay */}
        <div className="absolute top-2 left-2 font-mono text-[10px] text-gray-500">
          {product.id}
        </div>
        <div className="absolute top-2 right-2 font-mono text-[10px] text-gray-500">
          {product.material.split('/')[0]}
        </div>

        {/* Hover content */}
        <motion.div
          className="absolute inset-0 bg-black/80 flex flex-col justify-end p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="font-sans text-xl font-bold text-[#EBEBEB] mb-2 tracking-tight">
            {product.name}
          </h3>
          <p className="font-mono text-xs text-gray-400 mb-4">{product.material}</p>
          <div className="space-y-1 mb-4">
            {product.specs.map((spec, i) => (
              <div key={i} className="font-mono text-[10px] text-gray-500 flex items-center gap-2">
                <span className="w-1 h-1 bg-gray-500 rounded-full" />
                {spec}
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <span className="font-mono text-lg text-[#EBEBEB]">{product.price}</span>
            <button className="px-4 py-2 border border-[#EBEBEB] text-[#EBEBEB] font-mono text-xs hover:bg-[#EBEBEB] hover:text-[#050505] transition-colors">
              ADD TO CART
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Product Detail Modal
const ProductModal = ({ product, onClose, playClick }) => {
  if (!product) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9997] bg-[#050505]/95 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => {
        playClick()
        onClose()
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        className="bg-[#0a0a0a] border border-gray-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2">
          <div className="relative h-96 md:h-auto">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover grayscale"
            />
            <div className="absolute top-4 left-4 font-mono text-xs text-gray-400">
              COORD: 45.5231°N, 122.6765°W
            </div>
          </div>
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="font-sans text-3xl font-bold text-[#EBEBEB] mb-2 tracking-tight">
                  {product.name}
                </h2>
                <p className="font-mono text-sm text-gray-500">{product.id}</p>
              </div>
              <button
                onClick={() => {
                  playClick()
                  onClose()
                }}
                className="text-gray-500 hover:text-[#EBEBEB] transition-colors"
              >
                <SafeIcon name="x" size={24} />
              </button>
            </div>

            <div className="mb-8">
              <h3 className="font-mono text-xs text-gray-500 mb-2 uppercase tracking-widest">Material Composition</h3>
              <p className="font-sans text-[#EBEBEB]">{product.material}</p>
            </div>

            <div className="mb-8">
              <h3 className="font-mono text-xs text-gray-500 mb-2 uppercase tracking-widest">Technical Specifications</h3>
              <table className="w-full font-mono text-xs">
                <tbody>
                  {product.specs.map((spec, i) => (
                    <tr key={i} className="border-b border-gray-800">
                      <td className="py-2 text-gray-500">SPEC_{(i + 1).toString().padStart(2, '0')}</td>
                      <td className="py-2 text-[#EBEBEB] text-right">{spec}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mb-8">
              <h3 className="font-mono text-xs text-gray-500 mb-2 uppercase tracking-widest">Dimensions</h3>
              <div className="grid grid-cols-3 gap-4 font-mono text-xs text-[#EBEBEB]">
                <div className="border border-gray-800 p-3 text-center">
                  <div className="text-gray-500 mb-1">CHEST</div>
                  <div>58cm</div>
                </div>
                <div className="border border-gray-800 p-3 text-center">
                  <div className="text-gray-500 mb-1">LENGTH</div>
                  <div>72cm</div>
                </div>
                <div className="border border-gray-800 p-3 text-center">
                  <div className="text-gray-500 mb-1">SLEEVE</div>
                  <div>65cm</div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-gray-800">
              <span className="font-mono text-2xl text-[#EBEBEB]">{product.price}</span>
              <button
                className="relative overflow-hidden px-8 py-4 bg-[#EBEBEB] text-[#050505] font-mono text-sm font-bold group"
                onClick={() => playClick()}
              >
                <span className="relative z-10 group-hover:text-[#EBEBEB] transition-colors">ACQUIRE</span>
                <motion.div
                  className="absolute inset-0 bg-gray-800"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Marquee Text
const Marquee = ({ text, reverse = false }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap py-4 border-y border-gray-800">
      <motion.div
        className="flex gap-8"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="font-sans text-4xl md:text-6xl font-bold text-gray-800 uppercase tracking-tight">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// Technical Markers Overlay
const TechnicalMarkers = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <div className="fixed top-4 left-4 font-mono text-[10px] text-gray-500 z-50 hidden md:block">
        <div>LOC: 40.7128°N, 74.0060°W</div>
        <div>ALT: 00010m</div>
        <div>HUM: 045%</div>
      </div>
      <div className="fixed top-4 right-4 font-mono text-[10px] text-gray-500 z-50 text-right hidden md:block">
        <div>{time.toISOString().split('T')[0]}</div>
        <div>{time.toLocaleTimeString('en-US', { hour12: false })}</div>
        <div>SYS: ONLINE</div>
      </div>
      <div className="fixed bottom-4 left-4 font-mono text-[10px] text-gray-500 z-50 hidden md:block">
        <div>MEM: 64TB</div>
        <div>CPU: 0.04%</div>
      </div>
      <div className="fixed bottom-4 right-4 font-mono text-[10px] text-gray-500 z-50 text-right hidden md:block">
        <div>FW26</div>
        <div>COLLECTION</div>
      </div>
    </>
  )
}

// Main App
function App() {
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { soundEnabled, setSoundEnabled, playClick } = useSound()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  // Smooth scroll handler
  const scrollToSection = (id) => {
    playClick()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#EBEBEB] font-sans selection:bg-[#EBEBEB] selection:text-[#050505]">
      <CustomCursor />
      <div className="grain" />
      <TechnicalMarkers />

      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-[9996] p-4 md:p-6 flex justify-between items-center mix-blend-difference">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-sans text-xl font-bold tracking-tighter"
        >
          MNLT
        </motion.div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => {
              playClick()
              setSoundEnabled(!soundEnabled)
            }}
            className="font-mono text-[10px] tracking-widest text-gray-400 hover:text-[#EBEBEB] transition-colors"
          >
            SOUND: {soundEnabled ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={() => {
              playClick()
              setMenuOpen(!menuOpen)
            }}
            className="w-8 h-8 flex items-center justify-center relative"
            data-cursor-hover
          >
            <motion.div
              animate={{ rotate: menuOpen ? 45 : 0 }}
              className="absolute w-4 h-px bg-[#EBEBEB]"
            />
            <motion.div
              animate={{ rotate: menuOpen ? -45 : 0 }}
              className="absolute w-4 h-px bg-[#EBEBEB]"
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9995] bg-[#050505] flex flex-col justify-center items-center gap-8"
          >
            {['ARCHIVE', 'COLLECTION', 'LABORATORY', 'CONTACT'].map((item, i) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="font-sans text-4xl md:text-6xl font-bold tracking-tight hover:text-gray-500 transition-colors"
                data-cursor-hover
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <LiquidMetalBackground />

        <motion.div
          style={{ y }}
          className="relative z-10 text-center px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-xs tracking-[0.5em] text-gray-500 mb-6"
          >
            SYSTEM_OVERRIDE // FW26
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-sans text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6 leading-none"
          >
            MONOLITH
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-mono text-sm md:text-base text-gray-400 max-w-md mx-auto mb-12"
          >
            Исследование формы через функцию. Архитектурный крой. Тактильная холодность.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            onClick={() => scrollToSection('collection')}
            className="group relative px-8 py-4 border border-[#EBEBEB] font-mono text-sm tracking-widest overflow-hidden"
            data-cursor-hover
          >
            <span className="relative z-10 group-hover:text-[#050505] transition-colors">[ EXPLORE ARCHIVE ]</span>
            <motion.div
              className="absolute inset-0 bg-[#EBEBEB]"
              initial={{ y: '100%' }}
              whileHover={{ y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] text-gray-500 animate-pulse"
        >
          SCROLL TO INITIATE
        </motion.div>
      </section>

      {/* Marquee */}
      <Marquee text="FW26 COLLECTION — ARCHITECTURAL FORMS — INDUSTRIAL ELEGANCE — " />

      {/* Collection Section */}
      <section id="collection" className="py-20 md:py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-sans text-4xl md:text-6xl font-bold tracking-tight mb-4">ARCHIVE</h2>
            <p className="font-mono text-sm text-gray-500">SELECTED WORKS // 2024-2026</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px] md:auto-rows-[400px]">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onClick={setSelectedProduct}
                playClick={playClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Laboratory Section */}
      <section id="laboratory" className="py-20 md:py-32 px-4 md:px-8 border-t border-gray-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-sans text-4xl md:text-6xl font-bold tracking-tight mb-6">LABORATORY</h2>
            <p className="font-mono text-sm text-gray-400 mb-6 leading-relaxed">
              Каждый предмет создается как инженерный объект. Мы используем промышленные материалы
              и методы производства, применяемые в аэрокосмической отрасли.
            </p>
            <div className="space-y-4 font-mono text-xs text-gray-500">
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span>PROCESS</span>
                <span>ADDITIVE_MANUFACTURING</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span>MATERIALS</span>
                <span>CARBON_FIBER / TITANIUM</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span>ORIGIN</span>
                <span>BERLIN_DE</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-96 border border-gray-800 overflow-hidden"
          >
            <div className="absolute inset-0 liquid-bg opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="font-mono text-xs text-gray-500 text-center">
                <div className="mb-2">RENDER_001</div>
                <div className="w-32 h-32 border border-gray-700 rounded-full animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 px-4 md:px-8 border-t border-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-sans text-4xl md:text-6xl font-bold tracking-tight mb-6">ESTABLISH CONNECTION</h2>
            <p className="font-mono text-sm text-gray-400 mb-12 max-w-md mx-auto">
              Для запросов о доступе к эксклюзивным материалам и коллекциям
            </p>

            <form className="max-w-md mx-auto space-y-4" onSubmit={(e) => { e.preventDefault(); playClick(); }}>
              <input
                type="email"
                placeholder="ENTER_EMAIL_ADDRESS"
                className="w-full bg-transparent border border-gray-800 p-4 font-mono text-sm text-[#EBEBEB] placeholder-gray-600 focus:border-[#EBEBEB] outline-none transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-[#EBEBEB] text-[#050505] py-4 font-mono text-sm font-bold hover:bg-gray-300 transition-colors"
                data-cursor-hover
              >
                TRANSMIT
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-8 border-t border-gray-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-sans text-xl font-bold tracking-tighter">MNLT</div>
          <div className="font-mono text-[10px] text-gray-600 text-center md:text-right">
            <div>© 2026 MONOLITH INDUSTRIES</div>
            <div>ALL RIGHTS RESERVED // SYSTEM_VER_2.0.4</div>
          </div>
        </div>
      </footer>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            playClick={playClick}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App