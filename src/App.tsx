import { motion } from 'motion/react';
import { Menu, X, ArrowRight, CheckCircle2, ChevronRight, Star, Instagram, Facebook, Mail, MapPin, Phone, MessageCircle, Sparkles, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// --- Shared Components ---

const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const variants = {
    primary: 'bg-[#004B40] text-white hover:bg-[#003830] shadow-lg shadow-[#004B40]/20',
    outline: 'border-2 border-[#004B40] text-[#004B40] hover:bg-[#004B40] hover:text-white',
    ghost: 'text-[#4A5A54] hover:text-[#004B40] hover:underline underline-offset-4',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-8 py-4 rounded-full text-[13px] font-black uppercase tracking-widest transition-all duration-300 ${variants[variant as keyof typeof variants]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const SectionHeader = ({ title, subtitle, centered = false }: { title: string; subtitle?: string; centered?: boolean }) => (
  <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 justify-center mb-4"
    >
        <span className="h-[1px] w-8 bg-[#004B40]/30 hidden md:block" />
        <span className="text-[11px] font-black text-[#004B40] uppercase tracking-[0.4em] block whitespace-nowrap">
          {subtitle}
        </span>
        <span className="h-[1px] w-8 bg-[#004B40]/30 hidden md:block" />
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-5xl md:text-6xl lg:text-8xl serif text-[#004B40] leading-[1.05] tracking-tight font-light"
    >
      {title}
    </motion.h2>
  </div>
);

// --- Navigation ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-2xl border-b border-[#E5E1D8] py-3 shadow-2xl shadow-[#004B40]/5' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-4 group transition-transform duration-500 hover:scale-105">
          <div className="w-14 h-14 rounded-full border-2 border-[#004B40] flex items-center justify-center p-1 group-hover:bg-[#004B40] transition-all duration-700">
            <div className="text-[#004B40] group-hover:text-white text-[9px] font-black text-center leading-tight transition-colors duration-700">
              DMA<br/>Skin<br/>CLINIC
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-tight text-[#004B40] leading-tight uppercase">DMA Skin Clinic</h1>
            <span className="text-[10px] font-bold text-[#6B7C74] uppercase tracking-[0.3em]">By Dr. M. Afeef</span>
          </div>
        </Link>

        <div className="hidden lg:flex gap-12 text-[12px] font-black tracking-[0.3em] text-[#4A5A54] uppercase">
          {menuItems.map((item) => (
            <Link 
                key={item.name} 
                to={item.path} 
                className={`hover:text-[#004B40] transition-all relative group py-2 ${location.pathname === item.path ? 'text-[#004B40]' : ''}`}
            >
              {item.name}
              <motion.span 
                layoutId="navUnderline"
                className={`absolute -bottom-1 left-0 h-[3px] bg-[#004B40] transition-all duration-500 ${location.pathname === item.path ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`} 
              />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <Button onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))} className="hidden sm:block shadow-xl">Book Assessment</Button>
          <button className="lg:hidden text-[#004B40] hover:scale-110 transition-transform active:rotate-90 duration-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={isMenuOpen ? { height: '100vh', opacity: 1 } : { height: 0, opacity: 0 }}
        className="lg:hidden overflow-hidden bg-white/98 backdrop-blur-3xl fixed inset-x-0 top-0 z-[-1]"
      >
        <div className="pt-32 p-12 flex flex-col gap-8 h-full">
            {menuItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ x: -20, opacity: 0 }}
                animate={isMenuOpen ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link 
                  to={item.path} 
                  className="text-left text-5xl font-serif text-[#004B40] hover:italic transition-all inline-block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <div className="mt-auto pb-12 pt-8 border-t border-[#E5E1D8]">
              <Button className="w-full py-5 text-base tracking-[0.4em] mb-8" onClick={() => { setIsMenuOpen(false); window.dispatchEvent(new CustomEvent('open-booking')); }}>Schedule Consultation</Button>
              <p className="text-center text-[#6B7C74] text-xs font-bold tracking-widest">0300-7754388</p>
            </div>
        </div>
      </motion.div>
    </nav>
  );
};

// --- Constant Data ---

const SERVICE_DETAILS: Record<string, { desc: string, img: string }> = {
  'Skin Diseases & Medical Treatment': {
    desc: 'Expert clinical diagnosis and treatment for all dermatological conditions including acne, eczema, psoriasis, and fungal infections.',
    img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800'
  },
  'Laser': {
    desc: 'Advanced laser technology for hair removal, skin rejuvenation, and vascular lesion treatment with medical precision.',
    img: 'laser.png'
  },
  'Dermal Fillers': {
    desc: 'Hyaluronic acid injections to restore facial volume, contour lips, and smooth deep lines for a refreshed clinical look.',
    img: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800'
  },
  'PRP, PRF': {
    desc: 'Platelet-Rich Plasma and Fibrin therapies for natural skin rejuvenation and accelerated tissue healing.',
    img: 'https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?auto=format&fit=crop&q=80&w=800'
  },
  'Hair Loss Treatment': {
    desc: 'Specialized clinical protocols including PRP and Mesotherapy to restore hair density and scalp health.',
    img:'hair.png'
  },
  'Thread Lift': {
    desc: 'Non-surgical facelifts using medical-grade PDO threads to lift sagging skin and stimulate collagen.',
    img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800'
  },
  'Botox': {
    desc: 'Precision neuro-toxin treatments to relax wrinkles and maintain a natural, youthful clinical aesthetic.',
    img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800'
  },
  'Carbon Facial Laser': {
    desc: 'The clinical "Hollywood Peel" for deep exfoliation, pore reduction, and instant skin brightening.',
    img: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&q=80&w=800'
  },
  'Skin Whitening Treatments': {
    desc: 'Safe, evidence-based protocols to address hyperpigmentation and uneven skin tone for clinical clarity.',
    img: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=800'
  },
  'Mole & Wart Removal Laser': {
    desc: 'High-precision CO2 laser removal of benign skin growths with minimal scarring and rapid clinical healing.',
    img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800'
  },
  'Chemical Peels': {
    desc: 'Medical-grade acid peels tailored to your skin type to reveal smoother, healthier clinical skin.',
    img: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=800'
  },
  'Semi Permanent Makeup': {
    desc: 'Clinical micropigmentation for artistically enhanced features using medical-grade safety standards.',
    img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800'
  },
  'Tattoo Removal Laser': {
    desc: 'Multi-wavelength laser systems engineered to safely break down tattoo ink particles across all colors.',
    img: 'https://images.unsplash.com/photo-1514416205405-075ab2f15964?auto=format&fit=crop&q=80&w=800'
  },
  'Exosomes': {
    desc: 'Cutting-edge regenerative therapy using extracellular vesicles for advanced skin repair and anti-aging.',
    img: 'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80&w=800'
  },
  'Advance Medicated Hydrafacial': {
    desc: 'A clinical-grade, multi-step facial treatment that cleanses, exfoliates, and hydrates using vortex technology.',
    img: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800'
  },
  'RF Skin Tightening': {
    desc: 'Radiofrequency energy delivered to deep skin layers to stimulate collagen and tighten lax tissue.',
    img: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800'
  },
  'Fat Reduction Treatments': {
    desc: 'Non-invasive clinical body contouring to target and eliminate stubborn localized fat deposits.',
    img: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=800'
  },
  'P-Shot for Erectile Dysfunction': {
    desc: 'Regenerative injection therapy for male sexual wellness, improving performance through natural healing.',
    img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800'
  }
};

// --- Page & Section Components ---

const LocationGrid = () => (
    <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid lg:grid-cols-2 gap-12"
    >
        <div className="bg-white rounded-[64px] p-12 lg:p-20 shadow-[0_50px_100px_-20px_rgba(0,75,64,0.15)] border border-[#E5E1D8] flex flex-col justify-center relative group overflow-hidden">
            <div className="absolute inset-0 bg-[#E8F1EE]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
                <div className="w-20 h-20 bg-[#E8F1EE] rounded-2xl flex items-center justify-center text-[#004B40] mb-12 shadow-inner">
                    <MapPin size={40} />
                </div>
                <h3 className="text-5xl serif text-[#004B40] mb-8">Find Us in Bahria</h3>
                <p className="text-2xl text-[#4A5A54] leading-relaxed mb-12 font-light">
                    MH Plaza BASEMENT 90-B, Sector C Commercial, Tulip Block Near Bahria Country Club, Bahria Town, Lahore.
                </p>
                <div className="flex flex-col gap-6 text-sm font-black text-[#6B7C74] uppercase tracking-[0.3em]">
                    <p className="flex items-center gap-4"><Clock size={20} className="text-[#004B40]" /> Evening Clinic: 05:00 PM - 09:00 PM</p>
                    <p className="flex items-center gap-4"><CheckCircle2 size={20} className="text-[#004B40]" /> Open Monday - Saturday</p>
                </div>
                <motion.a 
                    whileHover={{ x: 10 }}
                    href="https://www.google.com/maps/search/DMA+Skin+Clinic+Tulip+Block+Bahria+Town+Lahore" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-16 inline-flex items-center gap-4 text-[#004B40] font-black uppercase tracking-[0.4em] text-sm border-b-2 border-[#004B40] pb-2 w-fit"
                >
                    Launch Google Maps <ExternalLink size={18} />
                </motion.a>
            </div>
        </div>
        <div className="rounded-[64px] overflow-hidden shadow-2xl min-h-[600px] relative font-sans border-8 border-white group">
            <iframe 
                title="Clinic Location"
                className="absolute inset-0 w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3408.384218324484!2d74.19253457630718!3d31.32087575647575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3918ff55219277d3%3A0xc3f6be76e0a17f69!2sDMA%20Skin%20Clinic!5e0!3m2!1sen!2s!4v1714850000000!5m2!1sen!2s"
                loading="lazy" 
            />
            <div className="absolute inset-0 pointer-events-none border-[32px] border-white/10" />
        </div>
    </motion.div>
);

const BentoPhilosophy = () => (
  <section className="py-40 bg-white relative overflow-hidden">
    {/* Texture Background */}
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
      <img src="https://www.transparenttextures.com/patterns/pinstriped-suit.png" className="w-full h-full" alt="DMA Skin Clinic Texture Background" />
    </div>
    
    <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
      <SectionHeader title="Dermatological Precision" subtitle="Our Philosophy" centered />
      
      <div className="grid lg:grid-cols-4 lg:grid-rows-2 gap-8 min-h-[700px]">
        <Link to="/about" className="lg:col-span-2 lg:row-span-2 group">
          <motion.div 
            whileHover={{ y: -10, rotate: -1 }}
            className="h-full bg-[#F9F8F6] rounded-[64px] p-16 flex flex-col justify-end relative overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000" 
              className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-40 group-hover:scale-110 transition-all duration-1000"
              alt="Dr. Muhammad Afeef - Clinical Dermatology Excellence in Lahore"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10">
              <div className="w-20 h-20 bg-[#004B40] rounded-3xl flex items-center justify-center text-white mb-10 shadow-2xl group-hover:rotate-12 transition-transform">
                <ShieldCheck size={40} />
              </div>
              <h3 className="text-5xl serif text-[#004B40] mb-6 leading-tight">Board Certified <br/>Excellence</h3>
              <p className="text-xl text-[#6B7C74] leading-relaxed max-w-md font-light">Led by Dr. Muhammad Afeef, we combine global clinical standards with personalized care in the heart of Lahore.</p>
            </div>
          </motion.div>
        </Link>

        <Link to="/services" className="group">
          <motion.div 
            whileHover={{ y: -10, scale: 1.02 }}
            className="h-full bg-[#E8F1EE] rounded-[56px] p-12 flex flex-col gap-6 shadow-xl border border-[#004B40]/5"
          >
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#004B40] shadow-md group-hover:bg-[#004B40] group-hover:text-white transition-colors duration-500">
              <Sparkles size={32} />
            </div>
            <h3 className="text-3xl font-black text-[#004B40] tracking-tight">Pioneering Tech</h3>
            <p className="text-[#004B40]/70 font-medium leading-relaxed">FDA-approved laser systems and exosome regenerative protocols.</p>
          </motion.div>
        </Link>

        <motion.div 
          whileHover={{ scale: 0.98 }}
          className="bg-white border border-[#E5E1D8] rounded-[56px] p-12 flex flex-col gap-4 text-center items-center justify-center shadow-2xl lg:rotate-2"
        >
          <div className="text-7xl font-serif text-[#004B40] mb-2 font-light italic">98%</div>
          <p className="text-xs font-black text-[#6B7C74] uppercase tracking-[0.5em]">Patient Gratitude</p>
        </motion.div>

        <Link to="/contact" className="lg:col-span-2 group">
          <motion.div 
            whileHover={{ y: -10, rotate: 1 }}
            className="h-full bg-[#004B40] rounded-[64px] p-16 text-white flex flex-col md:flex-row items-center gap-12 overflow-hidden shadow-2xl"
          >
            <div className="w-40 h-40 bg-white/10 rounded-[48px] backdrop-blur-xl flex-shrink-0 items-center justify-center hidden md:flex border border-white/20 group-hover:rotate-12 transition-transform duration-700 group-hover:bg-white group-hover:text-[#004B40]">
              <Clock size={64} />
            </div>
            <div>
              <h3 className="text-4xl serif mb-6">Patient Sovereignty</h3>
              <p className="text-xl text-white/70 leading-relaxed font-light">Your time is sacred. Our evening clinic (05-09 PM) is designed for the modern lifestyle.</p>
            </div>
          </motion.div>
        </Link>
      </div>
    </div>
  </section>
);

// --- Pages ---

const Home = () => {
  useEffect(() => {
    document.title = "DMA Skin Clinic | Home | Aesthetic Mastery by Dr. Muhammad Afeef";
  }, []);
  return (
    <div className="pt-20">
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Professional Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-80 brightness-[0.8]"
            alt="DMA Skin Clinic - Modern Dermatological Care Santuary"
          />
          <div className="absolute inset-0 bg-white/40" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full relative z-10">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <span className="inline-flex items-center gap-3 px-6 py-2.5 bg-[#004B40]/10 rounded-full text-[12px] font-black tracking-[0.4em] uppercase text-[#004B40] mb-10 border border-[#004B40]/10 backdrop-blur-sm">
                <Sparkles size={16} className="animate-pulse" /> 
                Aesthetic Mastery & Skin Science
              </span>
              <h2 className="text-7xl md:text-9xl lg:text-[140px] serif text-[#004B40] leading-[0.85] mb-12 tracking-tighter font-light">
                Regenerative<br />
                <span className="italic font-light text-[#6B7C74]/60">Aesthetics.</span>
              </h2>
              
              <div className="mb-16 flex flex-col md:flex-row items-center gap-10 bg-white/90 backdrop-blur-3xl rounded-[56px] border border-white p-3 pr-12 max-w-3xl shadow-[0_50px_100px_-20px_rgba(0,43,36,0.2)] group hover:scale-[1.02] transition-transform duration-500">
                <div className="w-44 h-44 rounded-[44px] overflow-hidden shadow-2xl flex-shrink-0 border-6 border-white bg-[#004B40] relative">
                   <div className="absolute inset-0 bg-[#004B40] flex items-center justify-center text-white/10 text-xs font-black tracking-widest uppercase">DMA CLINIC</div>
                   <img 
                    src="/dr_afeef.png"
                    alt="Dr. Muhammad Afeef" 
                    className="w-full h-full object-cover relative z-10"
                   />
                </div>
                <div className="py-6 text-center md:text-left">
                  <h3 className="text-4xl serif text-[#004B40] mb-3 group-hover:italic transition-all">Dr. M. Afeef</h3>
                  <div className="space-y-1">
                    <p className="text-[11px] text-[#4A5A54] font-black uppercase tracking-[0.3em] leading-loose">
                      Dermatologist & Laser Specialist
                    </p>
                    <p className="text-[10px] text-[#6B7C74] font-bold uppercase tracking-[0.2em] opacity-70">
                      Fellow - American Aesthetic Association
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-8">
                <Button onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))} className="px-16 py-6 text-base tracking-[0.4em] shadow-2xl">Open Booking</Button>
                <Link to="/services">
                  <Button variant="outline" className="px-16 py-6 text-base tracking-[0.4em] bg-white/20 backdrop-blur-xl border-white hover:border-[#004B40]">View Protocol</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <BentoPhilosophy />
      
      {/* Featured Services Section */}
      <section className="py-40 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
             <img 
               src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2000" 
               className="w-full h-full object-cover opacity-40 brightness-[0.7]"
               alt="DMA Skin Clinic Services Background - Premium Aesthetic Treatments"
               loading="lazy"
               referrerPolicy="no-referrer"
             />
             <div className="absolute inset-0 bg-white/60" />
          </div>
          
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-end mb-24">
                  <SectionHeader title="Pillar Treatments" subtitle="Clinical Mastery" />
                  <Link to="/services" className="mb-16 group">
                     <Button variant="outline" className="px-10">
                        Full Service List <ArrowRight className="inline-block ml-3 group-hover:translate-x-3 transition-transform duration-500" size={20} />
                     </Button>
                  </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {[
                      { title: 'Laser Resurfacing', img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514', tag: 'High Precision' },
                      { title: 'Dermal Sculpting', img: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400', tag: 'Artistry' },
                      { title: 'Medical Skin Map', img: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1', tag: 'Diagnostic' }
                  ].map((s, i) => (
                      <Link to="/services" key={i} className="group">
                          <motion.div
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.2 }}
                              whileHover={{ y: -15 }}
                              className="h-full shadow-[0_80px_100px_-40px_rgba(0,0,0,0.1)] rounded-[64px] bg-white overflow-hidden border border-[#E5E1D8] hover:border-[#004B40] transition-all duration-700"
                          >
                              <div className="h-96 overflow-hidden relative">
                                  <img src={s.img + '?auto=format&fit=crop&q=80&w=800'} alt={s.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                                  <div className="absolute top-8 left-8 px-5 py-2 bg-black/60 backdrop-blur-xl rounded-full text-[10px] text-white font-black uppercase tracking-[0.4em] shadow-2xl">
                                      {s.tag}
                                  </div>
                              </div>
                              <div className="p-16 text-center">
                                  <h4 className="text-4xl serif text-[#004B40] mb-6 group-hover:italic transition-all">{s.title}</h4>
                                  <p className="text-[#6B7C74] text-lg leading-relaxed mb-10 font-light">Advanced clinical results protocols utilizing premium medical-grade technology.</p>
                                  <span className="text-[12px] uppercase font-black tracking-[0.4em] text-[#004B40] group-hover:border-b-2 border-[#004B40] transition-all pb-1">Explore Protocol</span>
                              </div>
                          </motion.div>
                      </Link>
                  ))}
              </div>
          </div>
      </section>

      <Testimonials />
      <CTA />
    </div>
  );
};

const ServicesPage = () => {
    useEffect(() => {
        document.title = "Medical Services & Protocols | DMA Skin Clinic | Laser, PRP, Fillers";
    }, []);
    const [selectedService, setSelectedService] = useState<string | null>(null);

    return (
        <div className="pt-40 pb-32 min-h-screen relative overflow-hidden">
            {/* Immersive Background */}
            <div className="absolute inset-0 z-0 px-12">
                <img 
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2000" 
                    className="w-full h-full object-cover opacity-50 brightness-[0.7] scale-105" 
                    alt="DMA Aesthetics - Advanced Dermatology Background" 
                    loading="lazy"
                    referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-white/60" />
            </div>
            
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
                <SectionHeader title="Medical Protocols" subtitle="Full Service List" centered />
                
                {/* Dr. Afeef Specialist Invitation */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-24 bg-white/80 backdrop-blur-3xl rounded-[64px] border border-white p-8 lg:p-12 flex flex-col md:flex-row items-center gap-10 shadow-2xl"
                >
                    <div className="w-48 h-48 rounded-[48px] overflow-hidden border-8 border-white shadow-2xl flex-shrink-0 bg-[#004B40] relative">
                        <img 
                            src="/dr_afeef.png"
                            alt="Dr. M. Afeef" 
                            className="w-full h-full object-cover relative z-10" 
                            referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-[#004B40] flex items-center justify-center text-white/10 text-[10px] font-black tracking-widest uppercase">Clinical Director</div>
                    </div>
                    <div className="text-center md:text-left text-[#004B40]">
                        <h3 className="text-4xl serif text-[#004B40] mb-4">Consultation with Dr. Afeef</h3>
                        <p className="text-xl text-[#4A5A54] leading-relaxed max-w-2xl font-light italic mb-8">
                            "Every skin is a unique landscape. I personally oversee each medical protocol to ensure we achieve the highest standard of clinical aesthetics."
                        </p>
                        <Button onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))} className="px-10">Book Specialist Assessment</Button>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {Object.keys(SERVICE_DETAILS).map((title, i) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: (i % 4) * 0.1 }}
                            onClick={() => setSelectedService(title)}
                            whileHover={{ y: -8, shadow: '0 40px 80px -20px rgba(0,75,64,0.2)' }}
                            className="p-10 rounded-[56px] bg-white border border-[#E5E1D8] hover:border-[#004B40] transition-all duration-700 group shadow-2xl flex flex-col items-center text-center gap-8 cursor-pointer"
                        >
                            <div className="w-32 h-32 overflow-hidden rounded-[32px] shadow-xl bg-[#F9F8F6] border-4 border-white group-hover:rotate-6 transition-transform duration-500">
                                <img 
                                  src={SERVICE_DETAILS[title].img} 
                                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                                  alt={title} 
                                  loading="lazy"
                                  referrerPolicy="no-referrer"
                                />
                            </div>
                            <div className="space-y-4">
                              <h3 className="text-xl font-black text-[#004B40] tracking-tight group-hover:italic transition-all">{title}</h3>
                              <div className="h-[2px] w-8 bg-[#004B40]/10 mx-auto group-hover:w-16 transition-all duration-700" />
                              <button className="text-[11px] text-[#6B7C74] uppercase tracking-[0.4em] font-black group-hover:text-[#004B40] transition-colors">View Protocol</button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Service Detail Modal */}
            {selectedService && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#004B40]/80 backdrop-blur-xl" onClick={() => setSelectedService(null)}>
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 100 }}
                        className="bg-white rounded-[72px] p-12 lg:p-20 max-w-5xl w-full relative shadow-[0_100px_200px_-50px_rgba(0,0,0,0.5)] overflow-hidden border border-white/20"
                        onClick={e => e.stopPropagation()}
                    >
                        <motion.button 
                            whileHover={{ rotate: 90, scale: 1.1 }}
                            className="absolute top-10 right-10 text-[#004B40] z-10" 
                            onClick={() => setSelectedService(null)}
                        >
                            <X size={32} />
                        </motion.button>

                        {/* Modal Shine */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#004B40]/20 to-transparent" />
                        
                        <div className="flex flex-col lg:flex-row gap-16">
                            <div className="lg:w-1/2 aspect-square rounded-[56px] overflow-hidden shadow-2xl border-8 border-[#F9F8F6]">
                                <img 
                                    src={SERVICE_DETAILS[selectedService].img} 
                                    className="w-full h-full object-cover"
                                    alt={selectedService}
                                />
                            </div>
                            <div className="lg:w-1/2 flex flex-col justify-center">
                                <div className="mb-10">
                                    <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#6B7C74] block mb-4">Clinical Procedure</span>
                                    <h2 className="text-6xl md:text-7xl serif text-[#004B40] leading-none mb-8">{selectedService}</h2>
                                    <div className="h-1 w-24 bg-[#004B40]" />
                                </div>
                                <p className="text-2xl text-[#4A5A54] leading-relaxed mb-12 font-light italic">
                                    {SERVICE_DETAILS[selectedService].desc}
                                </p>
                                <div className="flex flex-col gap-8">
                                    <Button onClick={() => { setSelectedService(null); window.dispatchEvent(new CustomEvent('open-booking')); }} className="px-12 py-6 text-base tracking-[0.4em] shadow-2xl shadow-[#004B40]/40 italic">
                                        Confirm Consultation
                                    </Button>
                                    <div className="flex flex-col gap-6 text-center italic">
                                        <button 
                                            className="text-[12px] font-black text-[#004B40] uppercase tracking-[0.5em] hover:tracking-[0.8em] transition-all duration-700 underline underline-offset-8" 
                                            onClick={() => setSelectedService(null)}
                                        >
                                            Return to Protocols
                                        </button>
                                        <button 
                                            className="text-[10px] font-black text-[#6B7C74] uppercase tracking-[0.5em] opacity-50" 
                                            onClick={() => setSelectedService(null)}
                                        >
                                            Dismiss
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

const AboutPage = () => {
    useEffect(() => {
        document.title = "About Us | Dr. Muhammad Afeef | DMA Skin Clinic Heritage";
    }, []);
    return (
    <div className="pt-40 pb-32 min-h-screen relative overflow-hidden">
        {/* Abstract Sanctuary Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000" 
                className="w-full h-full object-cover opacity-60 brightness-[0.7] scale-110" 
                alt="About DMA Skin Clinic - Legacy of Science and Artistry" 
                loading="lazy"
                referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-white/40" />
        </div>
        
        <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-[#E8F1EE] rounded-full blur-[250px] -translate-y-1/2 translate-x-1/2 z-0" />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid lg:grid-cols-2 gap-32 items-center">
                <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                    <SectionHeader title="Legacy of Skin Science" subtitle="About The Clinic" />
                    <div className="text-2xl text-[#4A5A54] leading-relaxed mb-16 space-y-10 font-light italic">
                        <p className="not-italic font-medium text-[#004B40]/80">"Our mission is to bridge the gap between biological medical health and premium aesthetic restoration."</p>
                        <p>DMA Skin Clinic, established in 2010, is a premier clinical sanctuary led by <span className="font-bold text-[#004B40]">Dr. Muhammad Afeef</span>, a respected fellow of the American Aesthetic Association.</p>
                        <p>With deep clinical foundations from prestigious medical institutions, we approach aesthetic medicine as a subset of total skin wellness.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-12 border-t border-[#E5E1D8] pt-16">
                        <div className="group">
                            <h4 className="text-7xl serif text-[#004B40] mb-3 font-light italic group-hover:scale-110 transition-transform origin-left">15+</h4>
                            <p className="text-[11px] font-black text-[#6B7C74] uppercase tracking-[0.5em]">Years of Mastery</p>
                        </div>
                        <div className="group">
                            <h4 className="text-7xl serif text-[#004B40] mb-3 font-light italic group-hover:scale-110 transition-transform origin-left">10k+</h4>
                            <p className="text-[11px] font-black text-[#6B7C74] uppercase tracking-[0.5em]">Successful Cases</p>
                        </div>
                    </div>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative"
                >
                    <div className="aspect-[4/5] rounded-[100px] overflow-hidden shadow-[0_80px_150px_-30px_rgba(0,43,36,0.25)] relative z-10 p-4 bg-white border border-[#E5E1D8]">
                        <img 
                          src="/afeef.jpeg"
                          className="w-full h-full object-cover rounded-[85px] scale-105 hover:scale-100 transition-all duration-1000 relative z-10" 
                          alt="Dr. M. Afeef Portrait" 
                        />
                        <div className="absolute inset-0 bg-[#004B40] rounded-[85px] flex items-center justify-center text-white/10 text-xl font-black tracking-[0.2em] uppercase">Leading Specialist</div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#004B40]/20 to-transparent pointer-events-none z-20 overflow-hidden rounded-[85px]" />
                    </div>
                    <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-[#004B40] rounded-full -z-10 rotate-12 flex items-center justify-center p-24 shadow-2xl opacity-[0.03]">
                        <span className="text-[300px] font-serif text-white opacity-20 select-none">DR</span>
                    </div>
                </motion.div>
            </div>
        </div>
    </div>
);
};

const ContactPage = () => {
    useEffect(() => {
        document.title = "Contact DMA Skin Clinic | Book Your Consultation in Bahria Town, Lahore";
    }, []);
    return (
    <div className="pt-40 pb-32 min-h-screen relative overflow-hidden">
        {/* Immersive Clinical Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <img 
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2000" 
                className="w-full h-full object-cover opacity-60 brightness-[0.7] contrast-[0.9]" 
                alt="Contact DMA Skin Clinic - Specialized Dermatological Care" 
                loading="lazy"
                referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-white/30" />
        </div>
        
        {/* Soft Clinical Orbs */}
        <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-[#004B40]/5 rounded-full blur-[100px] z-0" />
        <div className="absolute bottom-1/4 -right-40 w-[800px] h-[800px] bg-[#E8F1EE] rounded-full blur-[150px] z-0" />
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
            <SectionHeader title="Direct Clinical Lines" subtitle="Contact Us" centered />
            <LocationGrid />
            <div className="mt-32 grid lg:grid-cols-3 gap-12 font-sans italic">
                {[
                    { icon: <Phone size={40} />, title: "Central Line", val: "0300-7754388", link: "tel:+923007754388", color: "#004B40" },
                    { icon: <MessageCircle size={40} />, title: "Clinical WhatsApp", val: "Chat with Admin", link: "https://wa.me/923007754388", color: "#25D366" },
                    { icon: <Mail size={40} />, title: "Protocol Inquiry", val: "dmaskinclinic@gmail.com", link: "mailto:dmaskinclinic@gmail.com", color: "#EA4335" }
                ].map((item, i) => (
                    <motion.a 
                        key={i} 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -15, scale: 1.05 }}
                        className="p-16 rounded-[72px] bg-white border border-[#E5E1D8] flex flex-col items-center text-center gap-8 shadow-2xl group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-[#004B40]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="text-[#004B40] w-24 h-24 bg-[#F9F8F6] rounded-3xl flex items-center justify-center group-hover:bg-[#004B40] group-hover:text-white transition-all duration-700 group-hover:rotate-12 shadow-xl shrink-0">
                            {item.icon}
                        </div>
                        <div>
                            <h3 className="text-4xl serif text-[#004B40] mb-3 group-hover:tracking-wider transition-all">{item.title}</h3>
                            <p className="text-[12px] font-black text-[#6B7C74] uppercase tracking-[0.4em]">{item.val}</p>
                        </div>
                    </motion.a>
                ))}
            </div>
        </div>
    </div>
);
};

const InfoModal = () => {
    const [info, setInfo] = useState<{ title: string, content: string } | null>(null);

    useEffect(() => {
        const handleEthics = () => setInfo({ 
            title: "Medical Ethics", 
            content: "At DMA Skin Clinic, we adhere to the highest international standards of dermatological ethics. Our protocols prioritize patient safety above all, ensuring every treatment is ethically sourced, clinically validated, and administered with complete transparency. We refuse any procedure that might compromise the long-term biological health of the skin for short-term aesthetic gain." 
        });
        const handleSanctuary = () => setInfo({ 
            title: "Sanctuary Protocol", 
            content: "The Sanctuary Protocol is our signature commitment to patient privacy and holistic wellness. From the moment you enter our Bahria Town clinic, you are in a protected environment. This includes absolute confidentiality of medical records, a serene clinical atmosphere designed to reduce treatment anxiety, and a personalized recovery path that respects your body's natural healing rhythms." 
        });

        window.addEventListener('open-ethics', handleEthics);
        window.addEventListener('open-sanctuary', handleSanctuary);
        return () => {
            window.removeEventListener('open-ethics', handleEthics);
            window.removeEventListener('open-sanctuary', handleSanctuary);
        };
    }, []);

    if (!info) return null;

    return (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6 bg-[#004B40]/95 backdrop-blur-2xl" onClick={() => setInfo(null)}>
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-white rounded-[64px] p-12 lg:p-20 max-w-2xl w-full text-center relative shadow-2xl border border-white/20"
                onClick={e => e.stopPropagation()}
            >
                <motion.button 
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    className="absolute top-10 right-10 text-[#004B40]" 
                    onClick={() => setInfo(null)}
                >
                    <X size={32} />
                </motion.button>

                <div className="w-20 h-20 bg-[#E8F1EE] rounded-full flex items-center justify-center text-[#004B40] mx-auto mb-10">
                    <ShieldCheck size={40} />
                </div>
                <h2 className="text-5xl serif text-[#004B40] mb-8 leading-none">{info.title}</h2>
                <p className="text-xl text-[#4A5A54] leading-relaxed mb-12 font-light italic">{info.content}</p>
                <div className="flex flex-col gap-6 text-center italic">
                    <button 
                        className="text-[12px] font-black text-[#004B40] uppercase tracking-[0.5em] hover:tracking-[0.8em] transition-all duration-700 underline underline-offset-8" 
                        onClick={() => setInfo(null)}
                    >
                        Return to Previous
                    </button>
                    <button 
                        className="text-[10px] font-black text-[#6B7C74] uppercase tracking-[0.5em] opacity-50" 
                        onClick={() => setInfo(null)}
                    >
                        Dismiss
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const BookingModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handler = () => setIsOpen(true);
        window.addEventListener('open-booking', handler);
        return () => window.removeEventListener('open-booking', handler);
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#004B40]/90 backdrop-blur-3xl animate-in fade-in duration-500" onClick={() => setIsOpen(false)}>
            <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-white rounded-[80px] p-12 lg:p-24 max-w-2xl w-full text-center relative border border-white/20 shadow-[0_100px_200px_-50px_rgba(0,0,0,0.8)]"
                onClick={e => e.stopPropagation()}
            >
                <motion.button 
                    whileHover={{ rotate: 180, scale: 1.2 }}
                    className="absolute top-12 right-12 text-[#004B40]" 
                    onClick={() => setIsOpen(false)}
                >
                    <X size={36} />
                </motion.button>
                
                <div className="w-28 h-28 bg-[#E8F1EE] rounded-[48px] flex items-center justify-center text-[#004B40] mx-auto mb-12 shadow-2xl">
                    <ShieldCheck size={56} />
                </div>
                <h2 className="text-6xl md:text-7xl serif text-[#004B40] mb-8 leading-none">Clinical Session.</h2>
                <p className="text-2xl text-[#4A5A54] mb-16 font-light italic leading-relaxed">All patients undergo a personalized skin mapping prior to treatment. Connect with our medical coordinator via WhatsApp.</p>
                
                <div className="grid gap-8 mb-16 group font-sans">
                    <motion.a 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        href="https://wa.me/923007754388" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-10 bg-[#004B40] text-white rounded-[56px] shadow-[0_40px_80px_-20px_rgba(0,75,64,0.5)] border border-white/10"
                    >
                        <div className="flex items-center gap-8">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                                <MessageCircle size={36} />
                            </div>
                            <div className="text-left">
                                <p className="text-[11px] font-black uppercase tracking-[0.4em] opacity-50 mb-2">WhatsApp Primary Line</p>
                                <p className="text-3xl font-black tracking-tight">0300-7754388</p>
                            </div>
                        </div>
                        <ArrowRight size={32} className="opacity-40" />
                    </motion.a>
                </div>

                <div className="flex flex-col gap-6">
                    <button 
                        className="text-[12px] font-black text-[#004B40] uppercase tracking-[0.5em] hover:tracking-[0.8em] transition-all duration-700 underline underline-offset-8" 
                        onClick={() => setIsOpen(false)}
                    >
                        Return to Previous
                    </button>
                    <button 
                    className="text-[10px] font-black text-[#6B7C74] uppercase tracking-[0.5em] opacity-50" 
                    onClick={() => setIsOpen(false)}
                    >
                    Dismiss
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Testimonials = () => (
    <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1519494140681-891f93002689?auto=format&fit=crop&q=80&w=2000" 
             className="w-full h-full object-cover opacity-30 brightness-[0.6]"
             alt="Testimonials Background"
             loading="lazy"
             referrerPolicy="no-referrer"
           />
           <div className="absolute inset-0 bg-white/60" />
        </div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid lg:grid-cols-2 gap-32 items-center">
                <div>
                   <SectionHeader title="Voices of Trust" subtitle="Patient Journey" />
                   <div className="flex flex-col gap-12">
                       {[
                           { name: "Hassan Khan", quote: "The difference in my skin texture after just two sessions of laser at DMA was mind-blowing. Professionalism is unmatched in Lahore." },
                           { name: "Maria Sheikh", quote: "Dr. Afeef is the only one I trust with fillers. He has an artistic eye that looks for natural results rather than the overdone look." }
                       ].map((t, i) => (
                           <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                whileHover={{ x: 10 }}
                                className="p-16 rounded-[72px] bg-[#F9F8F6] border border-[#E5E1D8] group relative flex flex-col items-center text-center"
                           >
                               <div className="flex gap-2 text-[#004B40] mb-8 font-sans grayscale group-hover:grayscale-0 transition-all">
                                   {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                               </div>
                               <p className="text-3xl serif text-[#004B40] mb-10 leading-relaxed italic">"{t.quote}"</p>
                               <p className="text-[11px] font-black text-[#6B7C74] uppercase tracking-[0.5em] border-t border-[#E5E1D8] pt-6">{t.name}</p>
                           </motion.div>
                       ))}
                   </div>
                </div>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="relative"
                >
                    <div className="aspect-square rounded-[120px] overflow-hidden shadow-2xl p-8 bg-white border border-[#E5E1D8] group">
                        <img 
                            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1000" 
                            alt="Satisfied Patient at DMA Skin Clinic Lahore" 
                            className="w-full h-full object-cover rounded-[80px] grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                        />
                    </div>
                    {/* Decorative Circle */}
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#004B40] rounded-full blur-[80px] opacity-10" />
                </motion.div>
            </div>
        </div>
    </section>
);

const CTA = () => (
    <section className="py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2000" 
                className="w-full h-full object-cover opacity-50 brightness-[0.6]"
                alt="CTA Background"
                loading="lazy"
                referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-white/50" />
        </div>
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-[1440px] mx-auto bg-[#004B40] rounded-[100px] p-24 lg:p-40 text-center text-white relative overflow-hidden shadow-[0_60px_150px_-30px_rgba(0,0,0,0.4)]"
        >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=2000')] opacity-5 bg-cover mix-blend-overlay scale-110" />
            
            <div className="relative z-10">
                <h2 className="text-6xl md:text-9xl serif mb-16 leading-[0.85] font-light tracking-tighter">Preserve your <br /> <span className="italic opacity-70">Natural Radiance.</span></h2>
                <p className="text-2xl font-light text-white/60 mb-20 max-w-3xl mx-auto italic tracking-wide">Science, Artistry, and Compassion at Lahore's Premium Aesthetic Sanctuary.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-10 font-sans">
                    <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))}
                        className="bg-white text-[#004B40] px-20 py-7 rounded-full font-black uppercase tracking-[0.5em] text-xs hover:bg-[#FCFAF6] transition-all transform hover:scale-105 shadow-2xl"
                    >
                        Assess My Skin
                    </button>
                    <Link to="/contact" className="text-white border-b-2 border-white/30 px-6 py-3 font-black uppercase tracking-[0.5em] text-[11px] hover:border-white transition-all italic">
                        Locate Clinic
                    </Link>
                </div>
            </div>
        </motion.div>
    </section>
);

const Footer = () => (
    <footer className="bg-white border-t border-[#E5E1D8] pt-40 pb-24 italic">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-[#004B40]/5" />
            
            <div className="flex flex-col items-center text-center mb-40">
                <div className="flex flex-col items-center gap-8 mb-12 group">
                    <div className="w-24 h-24 rounded-full border-4 border-[#004B40] flex items-center justify-center p-3 group-hover:bg-[#004B40] transition-all duration-700 shadow-2xl">
                        <div className="text-[#004B40] group-hover:text-white text-[14px] font-black text-center leading-tight transition-all duration-700">DMA<br/>Skin<br/>CLINIC</div>
                    </div>
                    <h2 className="text-5xl font-black tracking-tighter text-[#004B40] uppercase group-hover:italic transition-all">DMA SKIN CLINIC</h2>
                </div>
                <p className="text-3xl text-[#4A5A54] max-w-2xl mb-16 leading-relaxed font-light italic">Premier Medical Dermatology center dedicated to regenerative aesthetics and scientific skin health protocols.</p>
                <div className="flex gap-12">
                    {[
                      { icon: <Instagram size={32} />, href: "https://www.instagram.com/dmaskinclinicbydrafeef/" },
                      { icon: <Facebook size={32} />, href: "https://www.facebook.com/dmaskinclinicbydrafeef/" },
                      { icon: <MessageCircle size={32} />, href: "https://wa.me/923007754388" }
                    ].map((social, i) => (
                      <motion.a 
                        key={i}
                        whileHover={{ y: -12, scale: 1.1 }}
                        href={social.href} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#004B40] hover:text-[#6B7C74] transition-all"
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                </div>
            </div>

            <div className="pt-20 border-t border-[#E5E1D8] flex flex-col md:flex-row justify-between items-center gap-12">
                <span className="text-[11px] font-black text-[#6B7C74] uppercase tracking-[0.3em]">© 2026 DMA Aesthetics. Surgical Precision.</span>
                <div className="flex gap-16 text-[11px] font-black tracking-[0.4em] uppercase text-[#6B7C74]">
                    <span onClick={() => window.dispatchEvent(new CustomEvent('open-ethics'))} className="hover:text-[#004B40] cursor-pointer transition-colors border-b border-transparent hover:border-[#004B40]">Medical Ethics</span>
                    <span onClick={() => window.dispatchEvent(new CustomEvent('open-sanctuary'))} className="hover:text-[#004B40] cursor-pointer transition-colors border-b border-transparent hover:border-[#004B40]">Sanctuary Protocol</span>
                </div>
            </div>
        </div>
    </footer>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen selection:bg-[#004B40] selection:text-white bg-[#FCFAF6] font-sans">
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
        <BookingModal />
        <InfoModal />
      </div>
    </Router>
  );
}
