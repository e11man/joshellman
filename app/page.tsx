'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Mail, Github, Linkedin, ExternalLink, Code, Smartphone, Globe } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Project } from '@/lib/models'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero')
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'work', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fetchProjects = async () => {
      console.log('Fetching projects...')
      try {
        console.log('Making API request to /api/projects?featured=true')
        const response = await fetch('/api/projects?featured=true')
        console.log('API response status:', response.status)
        if (response.ok) {
          const data = await response.json()
          console.log('Projects data received:', data)
          setProjects(data.projects)
        } else {
          console.error('API response not OK:', response.status, response.statusText)
          const errorText = await response.text()
          console.error('Error response:', errorText)
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary-100">
        <div className="container-max section-padding">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-bold text-xl text-primary-900"
            >
              Josh Ellman
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex space-x-8"
            >
              {['About', 'Work', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    activeSection === item.toLowerCase()
                      ? 'text-primary-900'
                      : 'text-primary-600 hover:text-primary-900'
                  }`}
                >
                  {item}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center section-padding bg-gradient-to-br from-white via-primary-50/30 to-white">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="text-left"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Available for new projects
              </motion.div>
              
              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-900 mb-6 leading-tight"
              >
                I create
                <span className="block text-primary-600">exceptional</span>
                <span className="block">web experiences</span>
              </motion.h1>
              
              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-primary-600 mb-8 leading-relaxed max-w-lg"
              >
                Full-stack developer specializing in modern web technologies. 
                I build fast, scalable, and beautiful applications that users love.
              </motion.p>
              
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 mb-8"
              >
                <button
                  onClick={() => scrollToSection('work')}
                  className="btn-primary group"
                >
                  View My Work
                  <ArrowDown className="w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="btn-secondary"
                >
                  Get In Touch
                </button>
              </motion.div>
              
              <motion.div
                variants={fadeInUp}
                className="flex items-center space-x-6 text-sm text-primary-500"
              >
                <div className="flex items-center">
                  <span className="font-medium text-primary-900">5+</span>
                  <span className="ml-1">Years Experience</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-primary-900">50+</span>
                  <span className="ml-1">Projects Completed</span>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Right Content - Visual Element */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Main Card */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-white rounded-2xl shadow-xl p-8 border border-primary-100"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-primary-200 rounded w-3/4"></div>
                    <div className="h-4 bg-primary-100 rounded w-1/2"></div>
                    <div className="h-4 bg-primary-200 rounded w-5/6"></div>
                    <div className="h-8 bg-primary-600 rounded w-1/3 mt-6"></div>
                  </div>
                </motion.div>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg"
                >
                  <Code className="w-8 h-8 text-white" />
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center shadow-lg"
                >
                  <span className="text-white font-bold">✓</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <button
              onClick={() => scrollToSection('about')}
              className="animate-bounce p-2 rounded-full hover:bg-primary-50 transition-colors duration-200"
            >
              <ArrowDown className="w-6 h-6 text-primary-600" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-primary-50 section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-8">
              About Me
            </h2>
            
            <p className="text-lg text-primary-700 mb-12 leading-relaxed">
              I'm a passionate web developer with over 5 years of experience creating digital solutions 
              that make a difference. I specialize in React, Next.js, and modern web technologies, 
              always focusing on performance, accessibility, and user experience.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <Code className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary-900 mb-2">Frontend Development</h3>
                <p className="text-primary-600">React, Next.js, TypeScript, Tailwind CSS</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <Smartphone className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary-900 mb-2">Mobile Development</h3>
                <p className="text-primary-600">React Native, Progressive Web Apps</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <Globe className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary-900 mb-2">Full Stack</h3>
                <p className="text-primary-600">Node.js, PostgreSQL, AWS, Vercel</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
              Featured Work
            </h2>
            <p className="text-lg text-primary-600 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and passion for creating 
              exceptional web experiences.
            </p>
          </motion.div>
          
          {loading ? (
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card overflow-hidden animate-pulse">
                  <div className="w-full h-48 bg-primary-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-primary-200 rounded mb-2"></div>
                    <div className="h-4 bg-primary-100 rounded mb-4"></div>
                    <div className="flex gap-2 mb-4">
                      <div className="h-6 w-16 bg-primary-100 rounded-full"></div>
                      <div className="h-6 w-20 bg-primary-100 rounded-full"></div>
                    </div>
                    <div className="h-4 w-24 bg-primary-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id?.toString() || project.title}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card overflow-hidden group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-primary-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-primary-600 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <a
                      href={project.link}
                      className="inline-flex items-center text-primary-600 hover:text-primary-900 font-medium transition-colors duration-200"
                    >
                      View Project
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-primary-900 text-white section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Let's Work Together
            </h2>
            
            <p className="text-xl text-primary-200 mb-12 leading-relaxed">
              I'm always interested in new opportunities and exciting projects. 
              Whether you need a website, web application, or just want to chat about technology, 
              I'd love to hear from you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <a
                href="mailto:josh@example.com"
                className="inline-flex items-center px-8 py-4 bg-white text-primary-900 rounded-lg font-medium hover:bg-primary-50 transition-all duration-200 transform hover:scale-105"
              >
                <Mail className="w-5 h-5 mr-2" />
                Send Email
              </a>
              
              <div className="flex space-x-4">
                <a
                  href="https://github.com"
                  className="p-3 bg-primary-800 rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://linkedin.com"
                  className="p-3 bg-primary-800 rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            <p className="text-primary-300">
              Based in [Your Location] • Available for remote work worldwide
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-primary-950 text-primary-400 section-padding">
        <div className="container-max">
          <div className="text-center">
            <p>&copy; 2024 Josh Ellman. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}