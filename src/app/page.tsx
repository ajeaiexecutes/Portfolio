"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, Variants, useMotionValueEvent } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { ArrowUpRight, Mail, Phone, ExternalLink, Code2, X, Star, ChevronLeft, Menu, MessageCircle } from 'lucide-react';

const Github = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const Linkedin = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const projects = [
  {
    id: 'noillin',
    name: 'Noillin',
    image: '/noillin.png',
    tagline: 'Influencer–Business Marketplace',
    description: 'A full-stack influencer marketplace platform enabling service booking with real-time slot management, payment processing, and multi-role authentication.',
    link: 'https://noillin.in/',
    github: '#',
    status: 'Live',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Redis', 'Socket.io', 'Meilisearch', 'Stripe', 'TypeScript'],
    highlights: [
      'Designed complete booking flow with Redis-based slot locking to prevent double-bookings',
      'Built slot generation engine with real-time UI updates via Socket.io',
      'Implemented Meilisearch for influencer discovery with multi-facet filtering',
      'Multi-role JWT authentication system with refresh tokens and OTP verification',
      'Service-based modular backend architecture with centralized error handling'
    ],
    sections: [
      {
        title: 'The Challenge',
        content: 'Building a marketplace where influencers offer services and users book slots presented unique constraints: managing availability in real-time, preventing concurrent bookings on the same slot, handling complex payment workflows, and scaling the search experience across thousands of influencers.'
      },
      {
        title: 'Architecture Overview',
        content: 'Frontend: Next.js 13+ with App Router, server components for data-heavy pages, client components for interactive booking flows. Backend: Node.js with Express, organized into independent service modules. Communication between services through events and direct API calls.'
      }
    ]
  },
  {
    id: 'be-yours',
    name: 'Be-Yours',
    image: '/beyours.png',
    tagline: 'E-Commerce Platform',
    description: 'Full-stack e-commerce application with product listings, cart management, order placement, and secure JWT authentication.',
    link: 'https://be-yours.vercel.app/',
    github: '#',
    status: 'Live',
    tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Azure', 'Vercel'],
    highlights: [
      'End-to-end e-commerce flow: product discovery → cart → checkout → order confirmation',
      'Secure JWT-based authentication with role-based access control',
      'RESTful API design with proper error handling and validation',
      'Responsive React UI with client-side routing and state management'
    ],
    sections: [
      {
        title: 'The Challenge',
        content: 'Building a fully functional e-commerce platform required seamless integration between product discovery, cart management, payment processing, and order tracking—all while maintaining a smooth user experience and secure authentication.'
      }
    ]
  },
  {
    id: 'abito',
    name: 'Abito',
    tagline: 'Habit Tracker',
    description: 'Full-stack habit logging application built with Next.js and MongoDB Atlas. A practice project showcasing modern full-stack patterns.',
    link: '#',
    github: '#',
    status: 'Complete',
    tech: ['Next.js', 'MongoDB Atlas', 'Tailwind CSS', 'TypeScript', 'Vercel'],
    highlights: [
      'CRUD API with MongoDB Atlas backend',
      'Next.js App Router with server components for data fetching',
      'Mobile-first responsive design with Tailwind CSS',
      'TypeScript for type-safe frontend and backend code'
    ],
    sections: [
      {
        title: 'Purpose',
        content: 'Built as a practice project to master Next.js 13+ App Router patterns, TypeScript, and modern full-stack development. The goal was to create a complete, deployable application from scratch.'
      }
    ]
  }
];

const skills = [
  { category: 'Languages', items: ['TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3'] },
  { category: 'Frontend', items: ['React.js', 'Next.js', 'Tailwind CSS', 'Zustand', 'Framer Motion'] },
  { category: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth'] },
  { category: 'Databases & Cache', items: ['MongoDB', 'Mongoose', 'Redis'] },
  { category: 'Tools & DevOps', items: ['Socket.io', 'Meilisearch', 'AWS S3', 'Git'] }
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Parallax setup for Hero
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });



  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const activeProject = projects.find(p => p.id === selectedProject);

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <AnimatePresence mode="wait">
        {!selectedProject ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-screen bg-mesh"
            onAnimationStart={() => window.scrollTo(0, 0)}
          >
            {/* Floating Navigation */}
            <div className="fixed top-6 left-0 right-0 z-40 px-6 pointer-events-none">
              <div className="max-w-4xl mx-auto pointer-events-auto relative">
                <nav className={`rounded-full px-6 flex justify-between items-center transition-all duration-500 relative z-50 backdrop-blur-2xl border ${
                  isScrolled 
                    ? 'py-3 bg-white/95 border-[#E2E8F0] shadow-[0_8px_30px_rgb(0,0,0,0.08)]' 
                    : 'py-5 bg-white/40 border-white/60 shadow-sm'
                }`}>
                  <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo(0,0); setIsMobileMenuOpen(false); }} className="text-xl font-extrabold font-display tracking-tight text-[#0F172A] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2B59FF]"></span>
                    AJAY M B.
                  </a>
                  <div className="hidden md:flex items-center gap-8">
                    {['About', 'Projects', 'Contact'].map((item) => (
                      <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="text-sm font-bold text-[#64748B] hover:text-[#0F172A] transition-colors uppercase tracking-wide"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                  <a
                    href="mailto:ajaymb.webdeveloper@gmail.com"
                    className="hidden md:flex px-6 py-2.5 bg-[#2B59FF] text-white rounded-full text-sm font-bold uppercase tracking-wide hover:scale-105 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 items-center gap-2"
                  >
                    Let's Talk <ArrowUpRight size={16} strokeWidth={2.5} />
                  </a>
                  <button 
                    className="md:hidden p-2 text-[#0F172A] bg-[#FAFAFA] rounded-full shadow-sm border border-[#E2E8F0]"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                  </button>
                </nav>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                  {isMobileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-[calc(100%+1rem)] left-0 right-0 p-6 bg-white/95 backdrop-blur-2xl rounded-3xl flex flex-col gap-6 shadow-2xl border border-[#E2E8F0] md:hidden"
                    >
                      <div className="flex flex-col gap-4">
                        {['About', 'Projects', 'Contact'].map((item) => (
                          <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-lg font-bold text-[#0F172A] uppercase tracking-wide flex items-center justify-between border-b border-[#E2E8F0]/50 pb-4"
                          >
                            {item} <ArrowUpRight size={16} className="text-[#64748B]" />
                          </a>
                        ))}
                      </div>
                      <a
                        href="mailto:ajaymb.webdeveloper@gmail.com"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex justify-center px-6 py-4 bg-[#2B59FF] text-white rounded-full text-sm font-bold uppercase tracking-widest items-center gap-2 shadow-lg shadow-blue-500/30"
                      >
                        Let's Talk <ArrowUpRight size={16} strokeWidth={2.5} />
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <main>
              {/* Hero Section */}
              <section className="min-h-screen relative overflow-hidden flex flex-col justify-center items-center pt-32 pb-24">
                <motion.div style={{ y: y1, opacity }} className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-[20%] left-[15%] w-72 h-72 bg-blue-400/20 rounded-full blur-[80px]" />
                  <div className="absolute top-[40%] right-[15%] w-96 h-96 bg-purple-400/20 rounded-full blur-[100px]" />
                </motion.div>
                
                <motion.div 
                  className="px-6 relative z-10 w-full max-w-5xl mx-auto text-center mb-8 md:mb-12"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={fadeInUp} className="mb-10 flex justify-center">
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white shadow-sm border border-[#E2E8F0]">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2B59FF]"></span>
                      </span>
                      <span className="text-xs font-bold text-[#475569] uppercase tracking-widest">Available for new opportunities</span>
                    </div>
                  </motion.div>
                  
                  <motion.h1 variants={fadeInUp} className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] xl:text-[8rem] font-extrabold font-display tracking-tight leading-[0.95] text-[#0F172A] mb-10 drop-shadow-sm uppercase">
                    AJAY M B <br />
                    <span className="text-gradient">MERN STACK</span><br />
                    DEVELOPER
                  </motion.h1>
                  
                  <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-[#64748B] max-w-2xl mx-auto font-medium leading-relaxed mb-12">
                    A Full-Stack Developer specializing in high-performance web applications with seamless AI integrations.
                  </motion.p>
                  
                  <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <a
                      href="#projects"
                      className="px-8 py-4 bg-[#0F172A] text-white rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-slate-900/20 flex items-center gap-3"
                    >
                      View Selected Work <ArrowUpRight size={18} />
                    </a>
                    <div className="flex items-center gap-4">
                      <a href="https://github.com/ajaymb" target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-full shadow-sm hover:scale-110 hover:shadow-md transition-all text-[#64748B] hover:text-[#0F172A]">
                        <Github size={22} />
                      </a>
                      <a href="https://linkedin.com/in/ajaymb" target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-full shadow-sm hover:scale-110 hover:shadow-md transition-all text-[#64748B] hover:text-[#0F172A]">
                        <Linkedin size={22} />
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  style={{ y: y2 }}
                  className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-[#94A3B8]"
                >
                  <span className="text-xs font-bold uppercase tracking-widest">Scroll</span>
                  <div className="w-px h-12 bg-gradient-to-b from-[#94A3B8] to-transparent" />
                </motion.div>
              </section>

              {/* About Section */}
              <section id="about" className="py-20 sm:py-32 md:py-48 px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                  <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-150px" }}
                    variants={staggerContainer}
                    className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center"
                  >
                    <div>
                      <motion.div variants={fadeInUp} className="mb-8 relative w-32 h-32 flex items-center justify-center">
                        <div className="absolute inset-0 circular-badge text-[#2B59FF]">
                          <svg viewBox="0 0 100 100" width="128" height="128">
                              <defs>
                                <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                              </defs>
                              <text fontSize="12" fontWeight="bold" letterSpacing="2" fill="currentColor">
                                <textPath href="#circle">
                                  • FULL STACK DEV • CREATIVE THINKER 
                                </textPath>
                              </text>
                          </svg>
                        </div>
                        <div className="w-14 h-14 bg-[#2B59FF] text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
                          <Star size={20} fill="currentColor" />
                        </div>
                      </motion.div>

                      <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold font-display tracking-tight mb-8 text-[#0F172A]">
                        Code that works beautifully at scale.
                      </motion.h2>

                      <motion.div variants={fadeInUp} className="space-y-6 text-[#64748B] text-lg font-medium leading-relaxed">
                        <p>
                          With over a year of production experience, I own features end-to-end—from complex database architectures to highly polished, responsive interfaces.
                        </p>
                        <p>
                          Currently building <strong className="text-[#0F172A]">Noillin</strong>, a production-grade influencer marketplace. Handling both the Next.js frontend and a multi-service Node.js backend solo taught me how to write maintainable code, anticipate edge cases, and ship features that actually work.
                        </p>
                        <p>
                          Beyond traditional web development, I am exploring <strong className="text-[#0F172A]">AI integrations</strong> using the Claude API, creating intelligent interfaces that bridge modern ML capabilities with solid web fundamentals.
                        </p>
                      </motion.div>
                    </div>

                    <motion.div variants={fadeInUp} className="bg-white card-shadow p-8 md:p-12 rounded-[2.5rem]">
                      <h3 className="text-xl font-extrabold font-display mb-10 text-[#0F172A] flex items-center gap-3">
                        <Code2 size={24} className="text-[#2B59FF]" />
                        Technical Arsenal
                      </h3>
                      <div className="space-y-10">
                        {skills.map((skill, idx) => (
                          <div key={idx}>
                            <h4 className="text-xs font-bold text-[#64748B] uppercase tracking-widest mb-4">
                              {skill.category}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {skill.items.map((item, i) => (
                                <span key={i} className="bg-[#F1F5F9] text-[#0F172A] px-4 py-2 rounded-full text-sm font-bold shadow-sm hover:bg-[#E2E8F0] transition-colors cursor-default">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </section>

              {/* Projects Section */}
              <section id="projects" className="py-20 sm:py-32 md:py-40 px-6 bg-white relative">
                <div className="max-w-6xl mx-auto">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="mb-20 md:mb-32 text-center"
                  >
                    <span className="text-[#2B59FF] font-bold tracking-widest uppercase text-sm mb-4 block">Selected Work</span>
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold font-display tracking-tight text-[#0F172A]">
                      Recent Projects
                    </h2>
                  </motion.div>

                  <div className="space-y-20 md:space-y-40">
                    {projects.map((project, idx) => (
                      <motion.div
                        key={project.id}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-150px" }}
                        variants={fadeInUp}
                        className={`group grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center ${idx % 2 === 1 ? 'lg:grid-cols-[1fr_1.2fr] lg:dir-rtl' : ''}`}
                      >
                        {/* Visual Area */}
                        <div 
                          className={`group w-full aspect-[4/3] rounded-[3rem] bg-[#F8FAFC] card-shadow p-8 relative overflow-hidden cursor-pointer flex items-center justify-center ${idx % 2 === 1 ? 'lg:order-2' : ''}`} 
                          onClick={() => setSelectedProject(project.id)}
                        >
                          {project.image ? (
                            <>
                              <img src={project.image} alt={project.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
                              <div className="relative z-10 flex flex-col items-center justify-center transform group-hover:scale-110 transition-transform duration-500 ease-[0.16,1,0.3,1] opacity-0 group-hover:opacity-100">
                                <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center text-[#2B59FF] hover:bg-[#2B59FF] hover:text-white transition-colors duration-300">
                                  <ArrowUpRight size={28} />
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="absolute inset-0 bg-gradient-to-br from-[#2B59FF]/5 to-purple-500/5 group-hover:scale-105 transition-transform duration-700 ease-out" />
                              <div className="relative z-10 flex flex-col items-center justify-center transform group-hover:scale-110 transition-transform duration-500 ease-[0.16,1,0.3,1]">
                                <h4 className="text-4xl md:text-5xl font-extrabold font-display text-[#0F172A] mb-6 drop-shadow-sm text-center px-4">{project.name}</h4>
                                <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center text-[#2B59FF] group-hover:bg-[#2B59FF] group-hover:text-white transition-colors duration-300">
                                  <ArrowUpRight size={28} />
                                </div>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Content */}
                        <div className={`flex flex-col justify-center ${idx % 2 === 1 ? 'lg:order-1 lg:text-right' : ''}`}>
                          <div className="mb-8">
                            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest mb-6 ${
                              project.status === 'Live' ? 'bg-[#ECFDF5] text-[#059669]' :
                              project.status === 'In Progress' ? 'bg-[#FFFBEB] text-[#D97706]' :
                              'bg-[#F1F5F9] text-[#475569]'
                            }`}>
                              {project.status}
                            </span>
                            <h3 className="text-4xl font-extrabold font-display mb-4 text-[#0F172A]">{project.name}</h3>
                            <p className="text-[#2B59FF] text-xl font-bold mb-6">{project.tagline}</p>
                            <p className="text-[#64748B] text-lg font-medium leading-relaxed">
                              {project.description}
                            </p>
                          </div>

                          <div className={`flex flex-wrap gap-2 mb-10 ${idx % 2 === 1 ? 'lg:justify-end' : ''}`}>
                            {project.tech.slice(0, 5).map((t, i) => (
                              <span key={i} className="text-sm font-bold text-[#0F172A]">
                                {t}{i < Math.min(project.tech.length, 5) - 1 ? <span className="text-[#CBD5E1] mx-2">/</span> : ''}
                              </span>
                            ))}
                          </div>

                          <button
                            onClick={() => setSelectedProject(project.id)}
                            className={`inline-flex items-center gap-3 text-white font-bold uppercase tracking-widest bg-[#0F172A] hover:bg-[#2B59FF] transition-all rounded-full py-4 px-8 w-fit shadow-xl hover:shadow-[#2B59FF]/30 group/btn ${idx % 2 === 1 ? 'lg:ml-auto' : ''}`}
                          >
                            Read Case Study 
                            <div className="bg-white/20 p-1.5 rounded-full group-hover/btn:rotate-45 transition-transform duration-300">
                              <ArrowUpRight size={18} />
                            </div>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section id="contact" className="py-20 sm:py-32 md:py-48 px-6 bg-[#FAFAFA] text-center relative overflow-hidden">
                <motion.div 
                  className="relative z-10 max-w-4xl mx-auto"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={staggerContainer}
                >
                  <motion.div variants={fadeInUp} className="mb-8">
                    <span className="px-6 py-2.5 rounded-full border border-[#E2E8F0] bg-white text-xs font-bold text-[#64748B] uppercase tracking-widest shadow-sm">
                      Got a project?
                    </span>
                  </motion.div>
                  <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold font-display text-[#0F172A] mb-12 tracking-tight">
                    LET'S ROCK <span className="font-light text-[#2B59FF] italic font-serif">&amp;</span> ROLL
                  </motion.h2>
                  <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center">
                    <a
                      href="mailto:ajaymb.webdeveloper@gmail.com"
                      className="w-full sm:w-auto px-8 py-4 bg-[#2B59FF] text-white rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#2B59FF]/30"
                    >
                      Email <Mail size={18} strokeWidth={2.5} />
                    </a>
                    <a
                      href="tel:+919656240315"
                      className="w-full sm:w-auto px-8 py-4 bg-white border border-[#E2E8F0] text-[#0F172A] rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
                    >
                      Call Me <Phone size={18} strokeWidth={2.5} />
                    </a>
                    <a
                      href="https://wa.me/919656240315"
                      target="_blank" rel="noopener noreferrer"
                      className="w-full sm:w-auto px-8 py-4 bg-[#25D366] text-white rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#25D366]/30"
                    >
                      WhatsApp <MessageCircle size={18} strokeWidth={2.5} />
                    </a>
                  </motion.div>
                </motion.div>
              </section>
            </main>

            {/* Footer */}
            <footer className="py-12 px-6 bg-white border-t border-[#E2E8F0] relative z-10">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-[#64748B] font-bold text-sm tracking-wide uppercase">
                  © {new Date().getFullYear()} AJAY M B. ALL RIGHTS RESERVED.
                </p>
                <div className="flex items-center gap-8">
                  <a href="https://github.com/ajaymb" target="_blank" rel="noopener noreferrer" className="text-[#0F172A] font-bold uppercase tracking-widest text-sm hover:text-[#2B59FF] transition-colors">
                    GitHub
                  </a>
                  <a href="https://linkedin.com/in/ajaymb" target="_blank" rel="noopener noreferrer" className="text-[#0F172A] font-bold uppercase tracking-widest text-sm hover:text-[#2B59FF] transition-colors">
                    LinkedIn
                  </a>
                </div>
              </div>
            </footer>
          </motion.div>
        ) : activeProject ? (
          <motion.div
            key="project-details"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-screen bg-[#FAFAFA] relative z-50"
            onAnimationStart={() => window.scrollTo(0, 0)}
          >
            {/* Sticky Header inside Overlay */}
            <div className="sticky top-0 z-20 bg-[#FAFAFA]/80 backdrop-blur-xl border-b border-[#E2E8F0] px-6 py-4 md:py-6 flex justify-between items-center">
              <span className="text-xl font-extrabold font-display tracking-tight text-[#0F172A] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2B59FF]"></span>
                AJAY M B.
              </span>
              <button
                onClick={() => setSelectedProject(null)}
                className="flex items-center gap-1 md:gap-2 px-4 md:px-6 py-2 md:py-2.5 bg-white border border-[#E2E8F0] rounded-full text-[#0F172A] hover:bg-[#F1F5F9] hover:scale-105 transition-all font-bold text-[10px] md:text-xs uppercase tracking-widest shadow-sm"
              >
                <ChevronLeft size={16} strokeWidth={2.5} /> <span className="hidden sm:inline">Back to Work</span><span className="sm:hidden">Back</span>
              </button>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12 sm:py-16 md:py-24 relative z-10">
              {activeProject.image && (
                <div className="w-full aspect-video md:aspect-[21/9] rounded-[2rem] overflow-hidden mb-12 shadow-2xl relative">
                  <img src={activeProject.image} alt={activeProject.name} className="absolute inset-0 w-full h-full object-cover" />
                </div>
              )}
              <div className="mb-20 text-center md:text-left">
                <span className="inline-block px-4 py-2 rounded-full bg-[#2B59FF]/10 text-[#2B59FF] font-bold tracking-widest uppercase text-xs mb-8">
                  {activeProject.tagline}
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold font-display text-[#0F172A] mb-8 tracking-tight">{activeProject.name}</h2>
                <p className="text-xl md:text-2xl text-[#64748B] font-medium leading-relaxed mb-12 max-w-3xl mx-auto md:mx-0">
                  {activeProject.description}
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-16 justify-center md:justify-start">
                  {activeProject.link !== '#' && (
                    <a
                      href={activeProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 bg-[#2B59FF] text-white rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#2B59FF]/30"
                    >
                      Visit Live Site <ExternalLink size={20} strokeWidth={2.5} />
                    </a>
                  )}
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-white border border-[#E2E8F0] text-[#0F172A] rounded-full font-bold uppercase tracking-widest hover:bg-[#F8FAFC] hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-sm"
                  >
                    <Github size={20} /> Source Code
                  </a>
                </div>

                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  {activeProject.tech.map((t, i) => (
                    <span key={i} className="px-5 py-2.5 bg-white border border-[#E2E8F0] shadow-sm rounded-full text-sm font-bold text-[#0F172A]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-20 pt-20 border-t border-[#E2E8F0]">
                {activeProject.highlights && (
                  <div>
                    <h3 className="text-3xl font-extrabold font-display text-[#0F172A] mb-10">Key Highlights</h3>
                    <ul className="grid sm:grid-cols-2 gap-6">
                      {activeProject.highlights.map((highlight, i) => (
                        <li key={i} className="flex flex-col gap-4 text-[#64748B] text-lg font-medium leading-relaxed bg-white card-shadow p-8 rounded-3xl border border-[#E2E8F0]">
                          <span className="text-[#2B59FF] w-12 h-12 flex items-center justify-center bg-[#F8FAFC] rounded-full shadow-sm border border-[#E2E8F0]">
                            <ArrowUpRight size={24} strokeWidth={2.5} />
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeProject.sections && activeProject.sections.map((section, idx) => (
                  <div key={idx}>
                    <h3 className="text-3xl font-extrabold font-display text-[#0F172A] mb-8">{section.title}</h3>
                    {section.content && (
                      <p className="text-[#64748B] text-xl font-medium leading-relaxed bg-[#F8FAFC] p-8 rounded-3xl border border-[#E2E8F0]">
                        {section.content}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Project Details Footer */}
            <footer className="py-12 px-6 bg-[#F1F5F9] border-t border-[#E2E8F0]">
              <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-8 py-4 bg-[#0F172A] text-white rounded-full font-bold uppercase tracking-widest hover:bg-[#2B59FF] transition-all flex items-center justify-center gap-3 shadow-xl"
                >
                  <ChevronLeft size={20} strokeWidth={2.5} /> Return to Portfolio
                </button>
              </div>
            </footer>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ReactLenis>
  );
}
