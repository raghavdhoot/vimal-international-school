/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from 'react-router-dom';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Users, 
  Award, 
  GraduationCap, 
  BookOpen, 
  Building2, 
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Download,
  Search,
  Trash2,
  Eye,
  Calendar,
  User,
  Mail as MailIcon,
  Phone as PhoneIcon,
  School
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = ({ onAdmissionClick, onContactClick, scrollToSection }: { onAdmissionClick: () => void, onContactClick: () => void, scrollToSection: (id: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#home', id: 'home' },
    { name: 'ABOUT US', href: '#about', id: 'about' },
    { name: 'ACADEMICS', href: '#academics', id: 'academics' },
    { name: 'ADMISSION', href: '#admission', isAdmission: true },
    { name: 'DOCUMENTS', href: '#documents', id: 'documents' },
    { name: 'GALLERY', href: '#gallery', id: 'gallery' },
    { name: 'CONTACT US', href: '#contact', isContact: true },
  ];

  const handleParentLogin = () => {
    window.open('https://dev-identity.leadschool.in/accounts/ui/login?login_challenge=c4775aeaf0214bd3848ee458180d1469', '_blank');
  };

  return (
    <div className="fixed w-full z-50">
      <nav className={`transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-3'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <div className="flex items-center gap-3">
                <img 
                  src="https://ais-pre-bzoilgdxkje4osu7kkd5nu-491844608919.asia-southeast1.run.app/logo.png" 
                  alt="Vimal International School Logo" 
                  className="w-14 h-14 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = "w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl";
                      fallback.innerText = "V";
                      parent.prepend(fallback);
                    }
                  }}
                />
                <div className="leading-tight">
                  <span className="block text-xl font-bold text-slate-800 tracking-tighter">VIMAL</span>
                  <span className="block text-[10px] font-semibold text-slate-500 tracking-widest uppercase">INTERNATIONAL SCHOOL & JR. COLLEGE</span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-6">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    type="button"
                    onClick={() => {
                      if (link.isAdmission) {
                        onAdmissionClick();
                      } else if (link.isContact) {
                        onContactClick();
                      } else if (link.id) {
                        scrollToSection(link.id);
                      }
                    }}
                    className="text-slate-600 hover:text-red-600 px-2 py-2 rounded-md text-xs font-bold transition-colors cursor-pointer tracking-wide uppercase"
                  >
                    {link.name}
                  </button>
                ))}
                <button 
                  onClick={handleParentLogin}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-xs font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                >
                  PARENTS LOGIN
                </button>
              </div>
            </div>

            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-red-600 focus:outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      if (link.isAdmission) {
                        onAdmissionClick();
                      } else if (link.isContact) {
                        onContactClick();
                      } else if (link.id) {
                        scrollToSection(link.id);
                      }
                    }}
                    className="text-slate-600 hover:text-red-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium cursor-pointer uppercase"
                  >
                    {link.name}
                  </button>
                ))}
                <button 
                  onClick={handleParentLogin}
                  className="w-full text-left bg-red-600 text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  PARENTS LOGIN
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

const Hero = ({ onAdmissionClick, onContactClick }: { onAdmissionClick: () => void, onContactClick: () => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: "https://content.jdmagicbox.com/v2/comp/nanded/l9/9999p2462.2462.240612053940.v5l9/catalogue/vimal-international-school-nanded-schools-4H946Abzxm.jpg",
      title: "Admissions Open 2026-27",
      subtitle: "Pre-Primary to Grade XII",
      cta: "ADMISSION OPEN"
    },
    {
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
      title: "Building Global Leaders",
      subtitle: "With Yogic Values & Modern Education",
      cta: "ADMISSION OPEN"
    },
    {
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop",
      title: "Excellence in Academics",
      subtitle: "Nurturing Talent & Creativity",
      cta: "ADMISSION OPEN"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url("${slides[currentSlide].image}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-slate-900/50"></div>
        </motion.div>
      </AnimatePresence>
      
      <div className="relative z-10 text-center px-4 max-w-5xl">
        <motion.div
          key={`content-${currentSlide}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-6 tracking-widest uppercase">
            {slides[currentSlide].subtitle}
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none uppercase">
            {slides[currentSlide].title.split(' ').map((word, i) => (
              <span key={i} className={i % 2 !== 0 ? 'text-red-500' : ''}>{word} </span>
            ))}
          </h1>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-10">
            <button 
              type="button"
              onClick={onAdmissionClick}
              className="bg-red-600 text-white px-10 py-4 rounded-full font-black text-lg hover:bg-red-700 transition-all transform hover:scale-105 shadow-2xl shadow-red-600/40 uppercase tracking-tighter"
            >
              {slides[currentSlide].cta}
            </button>
            <button 
              type="button"
              onClick={onContactClick}
              className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-full font-black text-lg hover:bg-white/20 transition-all transform hover:scale-105 uppercase tracking-tighter"
            >
              CONTACT US
            </button>
          </div>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-3 h-3 rounded-full transition-all ${currentSlide === i ? 'bg-red-600 w-10' : 'bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

const DocumentsSection = ({ onApplyClick }: { onApplyClick: (type: string) => void }) => {
  const documents = [
    { title: "Transfer Certificate (TC)", icon: BookOpen },
    { title: "Bonafide Certificate", icon: Award },
    { title: "Character Certificate", icon: Users },
    { title: "Fee Structure", icon: Building2 },
    { title: "Academic Transcript", icon: GraduationCap },
    { title: "Birth Certificate Copy", icon: School }
  ];

  return (
    <section className="py-24 bg-slate-50" id="documents">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold text-red-600 tracking-widest uppercase mb-4">Student Services</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase mb-6 leading-none">
              Apply for <span className="text-red-600">Documents</span>
            </h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              Need official school documents? Our streamlined online application process makes it easy for parents and students to request necessary paperwork.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc, i) => (
              <button 
                key={i} 
                type="button"
                onClick={() => onApplyClick(doc.title)}
                className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-red-600 hover:shadow-lg transition-all cursor-pointer group w-full text-left"
              >
                <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center group-hover:bg-red-100 group-hover:text-red-600 transition-colors">
                  <doc.icon size={24} />
                </div>
                <span className="font-bold text-slate-700">{doc.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, color }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white p-8 rounded-2xl shadow-lg border-b-4 transition-all"
    style={{ borderBottomColor: color }}
  >
    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: `${color}20`, color }}>
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-4">{title}</h3>
    <p className="text-slate-600 leading-relaxed">
      {description}
    </p>
    <a href="#" className="inline-flex items-center mt-6 font-bold text-sm" style={{ color }}>
      LEARN MORE <ChevronRight size={16} className="ml-1" />
    </a>
  </motion.div>
);

const Features = () => {
  const features = [
    {
      icon: GraduationCap,
      title: "Global Pedagogy",
      description: "Utilizing the LEAD School academic system to provide an integrated, tech-enabled learning experience that goes beyond textbooks.",
      color: "#dc2626" // red-600
    },
    {
      icon: BookOpen,
      title: "Skill-Based Education",
      description: "Focusing on the five pillars of modern success: Conceptual Understanding, Critical Thinking, Effective Communication, Collaboration, and Global Exposure.",
      color: "#2563eb" // blue-600
    },
    {
      icon: Building2,
      title: "State-of-the-Art Environment",
      description: "Our campus is a hub of innovation, featuring modern classrooms, a rich academic book bank, and extensive sports facilities.",
      color: "#059669" // emerald-600
    }
  ];

  return (
    <section className="py-24 bg-slate-50" id="academics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const WelcomeSection = () => {
  return (
    <section className="py-24" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <div className="relative">
              <img 
                src="https://content.jdmagicbox.com/v2/comp/nanded/l9/9999p2462.2462.240612053940.v5l9/catalogue/vimal-international-school-nanded-schools-4H946Abzxm.jpg" 
                alt="Vimal International School Building" 
                className="rounded-3xl shadow-2xl relative z-10 w-full h-auto object-cover aspect-video"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-red-600 rounded-3xl -z-0 hidden md:block"></div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-sm font-bold text-red-600 tracking-widest uppercase mb-4">Our Legacy & Evolution</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 leading-tight">
              An International Standard of Learning
            </h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Established in 2014, Vimal International School (VIS) was born out of a commitment to redefine educational standards in Bhokar and the surrounding Nanded region. What began as a vision to provide quality English-medium education has evolved into a premier "International" styled institution, blending traditional values with 21st-century learning methodologies.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              As a leading co-educational institution, we pride ourselves on a personalized approach. Offering education from Nursery to Grade 12, we ensure that every child’s unique talents are nurtured. To provide a focused environment, our classes from Nursery to Grade 7 are hosted in a dedicated separate building, while our secondary and higher secondary sections focus on advanced academic excellence.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="bg-red-100 p-2 rounded-lg text-red-600">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Global Pedagogy</h4>
                  <p className="text-xs text-slate-500">LEAD School academic system</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Holistic Excellence</h4>
                  <p className="text-xs text-slate-500">Character Building Focus</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Milestones = () => {
  const milestones = [
    { year: "2014", title: "Foundation", desc: "Foundation laid with a mission for educational reform in Bhokar." },
    { year: "Growth", title: "Expansion", desc: "Rapid expansion of facilities including advanced science labs and digital learning tools." },
    { year: "Innovation", title: "Modernization", desc: "Adoption of international-standard curriculum and multimodal teaching aids." },
    { year: "Today", title: "Excellence", desc: "Recognized as a top-tier educational destination for global edge." },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-red-600 tracking-widest uppercase mb-4">Milestones of Excellence</h2>
          <h3 className="text-3xl font-bold text-slate-800">Our Journey Through Time</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {milestones.map((m, i) => (
            <div key={i} className="relative p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="text-red-600 font-black text-2xl mb-2">{m.year}</div>
              <h4 className="font-bold text-slate-800 mb-2">{m.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onAdmissionClick, scrollToSection }: { onAdmissionClick: () => void, scrollToSection: (id: string) => void }) => {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <img 
                src="https://ais-pre-bzoilgdxkje4osu7kkd5nu-491844608919.asia-southeast1.run.app/logo.png" 
                alt="Vimal International School Logo" 
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    const fallback = document.createElement('div');
                    fallback.className = "w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg";
                    fallback.innerText = "V";
                    parent.prepend(fallback);
                  }
                }}
              />
              <div className="leading-tight">
                <span className="block text-lg font-bold tracking-tighter">VIMAL</span>
                <span className="block text-[10px] font-semibold text-slate-500 tracking-widest uppercase">International School</span>
              </div>
            </div>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Vimal International School is committed to providing a nurturing environment where every child can flourish and achieve their dreams.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 cursor-default"><Facebook size={18} /></div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 cursor-default"><Twitter size={18} /></div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 cursor-default"><Instagram size={18} /></div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 cursor-default"><Linkedin size={18} /></div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-8 relative inline-block">
              QUICK LINKS
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-red-600"></span>
            </h3>
            <ul className="space-y-4 text-slate-400">
              <li><button type="button" onClick={() => scrollToSection('home')} className="hover:text-red-500 transition-colors cursor-pointer">Home</button></li>
              <li><button type="button" onClick={() => scrollToSection('about')} className="hover:text-red-500 transition-colors cursor-pointer">About Us</button></li>
              <li><button type="button" onClick={() => scrollToSection('academics')} className="hover:text-red-500 transition-colors cursor-pointer">Academics</button></li>
              <li><button type="button" onClick={() => scrollToSection('documents')} className="hover:text-red-500 transition-colors cursor-pointer">Documents</button></li>
              <li><button type="button" onClick={() => scrollToSection('gallery')} className="hover:text-red-500 transition-colors cursor-pointer">Gallery</button></li>
              <li>
                <button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onAdmissionClick();
                  }}
                  className="hover:text-red-500 transition-colors cursor-pointer"
                >
                  Admission
                </button>
              </li>
              <li><a href="https://share.google/3pYuB8P7mAg0tzSkk" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">Location</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-8 relative inline-block">
              CONTACT INFO
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-red-600"></span>
            </h3>
            <ul className="space-y-6 text-slate-400">
              <li className="flex gap-4">
                <MapPin className="text-red-600 shrink-0" size={20} />
                <div className="flex flex-col gap-2">
                  <a 
                    href="https://share.google/3pYuB8P7mAg0tzSkk" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-red-500 transition-colors"
                  >
                    Trimurti Campus, Borgaon, Bhokar, Nanded, Maharashtra
                  </a>
                  <a 
                    href="https://share.google/3pYuB8P7mAg0tzSkk" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1"
                  >
                    VIEW ON MAP <ChevronRight size={12} />
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="text-red-600 shrink-0" size={20} />
                <span>+91 9960899650</span>
              </li>
              <li className="flex gap-4">
                <Mail className="text-red-600 shrink-0" size={20} />
                <span>vimalinternationalschool7@gmail.com</span>
              </li>
              <li className="flex gap-4">
                <Clock className="text-red-600 shrink-0" size={20} />
                <span>Mon - Sat: 9:00 AM - 4:30 PM</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-8 relative inline-block">
              NEWSLETTER
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-red-600"></span>
            </h3>
            <p className="text-slate-400 mb-6">Subscribe to our newsletter for the latest updates.</p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 transition-colors"
              />
              <button className="bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>© Copyright 2026 Vimal International School. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/admin" className="hover:text-white transition-colors">School Admin</Link>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const AdmissionModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    dob: '',
    gender: '',
    grade: '',
    fatherName: '',
    motherName: '',
    contactNumber: '',
    email: '',
    previousSchool: '',
    lastGrade: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Reset form after 3 seconds and close
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            studentName: '',
            dob: '',
            gender: '',
            grade: '',
            fatherName: '',
            motherName: '',
            contactNumber: '',
            email: '',
            previousSchool: '',
            lastGrade: ''
          });
          onClose();
        }, 3000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`Something went wrong: ${errorData.error || errorData.message || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to connect to the server. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm overflow-y-auto"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl relative my-8"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-slate-400 hover:text-red-600 transition-colors z-[110]"
            >
              <X size={24} />
            </button>
            
            <div className="p-8 md:p-12 max-h-[90vh] overflow-y-auto">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">Inquiry Submitted Successfully!</h3>
                  <p className="text-slate-600">Thank you for your interest in Vimal International School. Our admissions team will contact you shortly.</p>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row gap-12">
                  <div className="md:w-1/3">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-100 text-red-600 mb-6">
                      <BookOpen size={32} />
                    </div>
                    <h2 className="text-sm font-bold text-red-600 tracking-widest uppercase mb-4">Admissions 2026-27</h2>
                    <h3 className="text-2xl font-bold text-slate-800 mb-6">Join Our Global Community</h3>
                    <p className="text-slate-600 text-sm mb-8 leading-relaxed">
                      Take the first step towards a bright future. Fill out the inquiry form, and our admissions team will get in touch with you shortly.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                        Interactive Learning
                      </div>
                      <div className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                        Global Standards
                      </div>
                      <div className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                        Holistic Focus
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      {/* Student Details */}
                      <div>
                        <h4 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px]">01</span>
                          Student Details
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input 
                            required
                            name="studentName"
                            value={formData.studentName}
                            onChange={handleChange}
                            type="text" 
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-red-600 transition-colors text-sm" 
                            placeholder="Full Name" 
                          />
                          <input 
                            required
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            type="date" 
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-red-600 transition-colors text-sm" 
                          />
                          <select 
                            required
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-red-600 transition-colors text-sm"
                          >
                            <option value="">Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                          <select 
                            required
                            name="grade"
                            value={formData.grade}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-red-600 transition-colors text-sm"
                          >
                            <option value="">Grade Applying For</option>
                            <option value="Nursery">Nursery</option>
                            <option value="LKG">LKG</option>
                            <option value="UKG">UKG</option>
                            {[...Array(12)].map((_, i) => (
                              <option key={i} value={`Grade ${i + 1}`}>Grade {i + 1}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Parent Information */}
                      <div>
                        <h4 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px]">02</span>
                          Parent Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input 
                            required
                            name="fatherName"
                            value={formData.fatherName}
                            onChange={handleChange}
                            type="text" 
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-red-600 transition-colors text-sm" 
                            placeholder="Father's Name" 
                          />
                          <input 
                            required
                            name="motherName"
                            value={formData.motherName}
                            onChange={handleChange}
                            type="text" 
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-red-600 transition-colors text-sm" 
                            placeholder="Mother's Name" 
                          />
                          <input 
                            required
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            type="tel" 
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-red-600 transition-colors text-sm" 
                            placeholder="Contact Number" 
                          />
                          <input 
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email" 
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-red-600 transition-colors text-sm" 
                            placeholder="Email Address" 
                          />
                        </div>
                      </div>

                      {/* Academic Records */}
                      <div>
                        <h4 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px]">03</span>
                          Academic Records
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input 
                            name="previousSchool"
                            value={formData.previousSchool}
                            onChange={handleChange}
                            type="text" 
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-red-600 transition-colors text-sm" 
                            placeholder="Previous School" 
                          />
                          <input 
                            name="lastGrade"
                            value={formData.lastGrade}
                            onChange={handleChange}
                            type="text" 
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-red-600 transition-colors text-sm" 
                            placeholder="Last Grade Completed" 
                          />
                        </div>
                      </div>

                      <button 
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full bg-red-600 text-white font-bold py-3.5 rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            SUBMITTING...
                          </>
                        ) : 'SUBMIT INQUIRY'}
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CertificateModal = ({ isOpen, onClose, initialType = '' }: { isOpen: boolean, onClose: () => void, initialType?: string }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    grNumber: '',
    documentType: initialType,
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({ ...prev, documentType: initialType }));
    }
  }, [isOpen, initialType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_name: formData.studentName,
          gr_number: formData.grNumber,
          document_type: formData.documentType,
          reason: formData.reason
        })
      });
      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
          setFormData({ studentName: '', grNumber: '', documentType: '', reason: '' });
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting certificate request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-red-100 hover:text-red-600 transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="p-8 md:p-12">
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Request Submitted!</h3>
                  <p className="text-slate-500">Your certificate request has been received. We will process it shortly.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Document Request</h3>
                  <p className="text-slate-500 text-sm mb-8">Apply for official school documents online.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Student Name</label>
                        <input 
                          required
                          value={formData.studentName}
                          onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                          type="text" 
                          className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-600 transition-all text-sm" 
                          placeholder="Full Name" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">GR Number</label>
                        <input 
                          required
                          value={formData.grNumber}
                          onChange={(e) => setFormData({...formData, grNumber: e.target.value})}
                          type="text" 
                          className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-600 transition-all text-sm" 
                          placeholder="GR Number" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Document Type</label>
                      <select 
                        required
                        value={formData.documentType}
                        onChange={(e) => setFormData({...formData, documentType: e.target.value})}
                        className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-600 transition-all text-sm"
                      >
                        <option value="">Select Document</option>
                        <option value="Transfer Certificate (TC)">Transfer Certificate (TC)</option>
                        <option value="Bonafide Certificate">Bonafide Certificate</option>
                        <option value="Character Certificate">Character Certificate</option>
                        <option value="Fee Structure">Fee Structure</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Reason</label>
                      <textarea 
                        value={formData.reason}
                        onChange={(e) => setFormData({...formData, reason: e.target.value})}
                        className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-600 transition-all h-24 text-sm" 
                        placeholder="Reason for request"
                      ></textarea>
                    </div>
                    <button 
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-red-600 transition-all shadow-xl shadow-slate-900/20 uppercase tracking-widest text-sm"
                    >
                      {isSubmitting ? 'SUBMITTING...' : 'SUBMIT REQUEST'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AdminDashboard = () => {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'inquiries' | 'certificates' | 'gallery'>('inquiries');
  const [newImage, setNewImage] = useState({ url: '', caption: '', category: 'General' });
  const [isAddingImage, setIsAddingImage] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [inqRes, certRes, galRes] = await Promise.all([
        fetch('/api/inquiries'),
        fetch('/api/certificates'),
        fetch('/api/gallery')
      ]);
      const [inqData, certData, galData] = await Promise.all([
        inqRes.json(),
        certRes.json(),
        galRes.json()
      ]);
      setInquiries(inqData);
      setCertificates(certData);
      setGallery(galData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'vimaladmin2026') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleDeleteInquiry = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const response = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setInquiries(prev => prev.filter(i => i.id !== id));
      }
    } catch (error) {
      console.error('Error deleting inquiry:', error);
    }
  };

  const handleDeleteCertificate = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this certificate request?')) return;
    try {
      const response = await fetch(`/api/certificate/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setCertificates(prev => prev.filter(c => c.id !== id));
      }
    } catch (error) {
      console.error('Error deleting certificate request:', error);
    }
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingImage(true);
    try {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newImage)
      });
      if (response.ok) {
        const added = await response.json();
        setGallery(prev => [added, ...prev]);
        setNewImage({ url: '', caption: '', category: 'General' });
      }
    } catch (error) {
      console.error('Error adding image:', error);
    } finally {
      setIsAddingImage(false);
    }
  };

  const handleDeleteImage = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    try {
      const response = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setGallery(prev => prev.filter(img => img.id !== id));
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => 
    inquiry.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.father_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCertificates = certificates.filter(cert => 
    cert.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.gr_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.document_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGallery = gallery.filter(img => 
    (img.caption || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (img.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <School size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">School Admin Login</h2>
            <p className="text-slate-500 text-sm mt-2">Access the school management dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Admin Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-red-600 transition-colors"
                placeholder="Enter password"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-red-600 text-white font-bold py-3.5 rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
            >
              LOGIN TO DASHBOARD
            </button>
            <button 
              type="button"
              onClick={() => navigate('/')}
              className="w-full text-slate-500 font-bold py-2 hover:text-red-600 transition-colors text-sm"
            >
              BACK TO WEBSITE
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">V</div>
            <div className="leading-tight">
              <span className="block text-lg font-bold text-slate-800 tracking-tighter">VIMAL ADMIN</span>
              <span className="block text-[10px] font-semibold text-slate-500 tracking-widest uppercase">Management Dashboard</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="text-slate-500 hover:text-red-600 font-bold text-sm transition-colors"
            >
              LOGOUT
            </button>
            <button 
              onClick={() => navigate('/')}
              className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors"
            >
              VIEW WEBSITE
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('inquiries')}
            className={`px-6 py-3 rounded-2xl font-bold transition-all ${activeTab === 'inquiries' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
          >
            Admission Inquiries ({inquiries.length})
          </button>
          <button 
            onClick={() => setActiveTab('certificates')}
            className={`px-6 py-3 rounded-2xl font-bold transition-all ${activeTab === 'certificates' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
          >
            Certificate Requests ({certificates.length})
          </button>
          <button 
            onClick={() => setActiveTab('gallery')}
            className={`px-6 py-3 rounded-2xl font-bold transition-all ${activeTab === 'gallery' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
          >
            Gallery Management ({gallery.length})
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                <Users size={24} />
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">TOTAL</span>
            </div>
            <div className="text-3xl font-bold text-slate-800">
              {activeTab === 'inquiries' ? inquiries.length : activeTab === 'certificates' ? certificates.length : gallery.length}
            </div>
            <div className="text-sm text-slate-500 mt-1">
              Total {activeTab === 'inquiries' ? 'Inquiries' : activeTab === 'certificates' ? 'Requests' : 'Images'}
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                <Calendar size={24} />
              </div>
              <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">RECENT</span>
            </div>
            <div className="text-3xl font-bold text-slate-800">
              {(activeTab === 'inquiries' ? inquiries : activeTab === 'certificates' ? certificates : gallery).filter(i => {
                const date = new Date(i.created_at);
                const today = new Date();
                return date.toDateString() === today.toDateString();
              }).length}
            </div>
            <div className="text-sm text-slate-500 mt-1">Received Today</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                <GraduationCap size={24} />
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">STATUS</span>
            </div>
            <div className="text-3xl font-bold text-slate-800">Active</div>
            <div className="text-sm text-slate-500 mt-1">System Online</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-xl font-bold text-slate-800">
              {activeTab === 'inquiries' ? 'Admission Inquiries' : activeTab === 'certificates' ? 'Certificate Requests' : 'Gallery Management'}
            </h3>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-red-600 transition-colors text-sm"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            {activeTab === 'inquiries' ? (
              <table className="w-full text-left">
                {/* ... existing inquiries table ... */}
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Student Name</th>
                    <th className="px-6 py-4">Grade</th>
                    <th className="px-6 py-4">Parent Info</th>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500">Loading...</td></tr>
                  ) : filteredInquiries.length === 0 ? (
                    <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500">No records found.</td></tr>
                  ) : (
                    filteredInquiries.map((inquiry) => (
                      <tr key={inquiry.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-800">{inquiry.student_name}</div>
                          <div className="text-xs text-slate-500">DOB: {inquiry.dob}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-[10px] font-bold uppercase">{inquiry.grade}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-700 font-medium">F: {inquiry.father_name}</div>
                          <div className="text-sm text-slate-700 font-medium">M: {inquiry.mother_name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-600">{inquiry.contact_number}</div>
                          <div className="text-sm text-slate-600">{inquiry.email}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">{new Date(inquiry.created_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => handleDeleteInquiry(inquiry.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={18} /></button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : activeTab === 'certificates' ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Student Name</th>
                    <th className="px-6 py-4">GR Number</th>
                    <th className="px-6 py-4">Document Type</th>
                    <th className="px-6 py-4">Reason</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500">Loading...</td></tr>
                  ) : filteredCertificates.length === 0 ? (
                    <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500">No records found.</td></tr>
                  ) : (
                    filteredCertificates.map((cert) => (
                      <tr key={cert.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-800">{cert.student_name}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{cert.gr_number}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-[10px] font-bold uppercase">{cert.document_type}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">{cert.reason}</td>
                        <td className="px-6 py-4 text-sm text-slate-500">{new Date(cert.created_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => handleDeleteCertificate(cert.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={18} /></button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              <div className="p-8">
                <form onSubmit={handleAddImage} className="mb-12 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <div className="flex justify-between items-start mb-6">
                    <h4 className="text-lg font-bold text-slate-800">Add New Gallery Image</h4>
                    <div className="text-[10px] text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 max-w-xs">
                      <span className="font-bold text-red-600 block mb-1">TIP:</span>
                      Use public image URLs from Google Photos, Imgur, or your school's social media posts.
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Image URL</label>
                      <input 
                        required
                        type="url" 
                        value={newImage.url}
                        onChange={(e) => setNewImage({...newImage, url: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-red-600 transition-colors text-sm" 
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Caption</label>
                      <input 
                        type="text" 
                        value={newImage.caption}
                        onChange={(e) => setNewImage({...newImage, caption: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-red-600 transition-colors text-sm" 
                        placeholder="Image description"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Category</label>
                      <select 
                        value={newImage.category}
                        onChange={(e) => setNewImage({...newImage, category: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-red-600 transition-colors text-sm"
                      >
                        <option value="General">General</option>
                        <option value="Academics">Academics</option>
                        <option value="Sports">Sports</option>
                        <option value="Events">Events</option>
                        <option value="Facilities">Facilities</option>
                      </select>
                    </div>
                  </div>
                  <button 
                    disabled={isAddingImage}
                    type="submit"
                    className="bg-red-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 uppercase tracking-widest text-xs"
                  >
                    {isAddingImage ? 'ADDING...' : 'ADD TO GALLERY'}
                  </button>
                </form>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {loading ? (
                    <div className="col-span-full text-center py-12 text-slate-500">Loading gallery...</div>
                  ) : filteredGallery.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-slate-500">No images in gallery.</div>
                  ) : (
                    filteredGallery.map((img) => (
                      <div key={img.id} className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all">
                        <div className="aspect-video overflow-hidden">
                          <img src={img.url} alt={img.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase">{img.category}</span>
                            <button onClick={() => handleDeleteImage(img.id)} className="text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                          </div>
                          <p className="text-sm text-slate-800 font-medium truncate">{img.caption || 'No caption'}</p>
                          <p className="text-[10px] text-slate-400 mt-1">{new Date(img.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const GalleryPage = () => {
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('/api/gallery');
        const data = await res.json();
        setGallery(data);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">V</div>
            <div className="leading-tight">
              <span className="block text-lg font-bold text-slate-800 tracking-tighter">VIMAL GALLERY</span>
              <span className="block text-[10px] font-semibold text-slate-500 tracking-widest uppercase">School Life & Events</span>
            </div>
          </div>
          <button 
            type="button"
            onClick={() => navigate('/')}
            className="bg-slate-100 text-slate-700 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors flex items-center gap-2"
          >
            <ChevronRight className="rotate-180" size={18} />
            BACK TO HOME
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-red-600 tracking-widest uppercase mb-4">Visual Journey</h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">Our School Gallery</h3>
          <div className="w-20 h-1.5 bg-red-600 mx-auto mt-6"></div>
        </div>

        {loading ? (
          <div className="text-center py-24">
            <div className="animate-spin w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-slate-500 font-bold">Loading our memories...</p>
          </div>
        ) : gallery.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <Eye size={48} className="text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-bold">No images found in the gallery yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {gallery.map((img) => (
              <motion.div 
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={img.url} 
                    alt={img.caption} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <span className="text-red-500 font-bold text-[10px] uppercase tracking-widest mb-1">{img.category}</span>
                    <p className="text-white font-bold text-sm leading-tight">{img.caption}</p>
                    <p className="text-white/60 text-[10px] mt-2">{new Date(img.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
      
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">© 2026 Vimal International School. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const MainSite = ({ onAdmissionClick, onContactClick, onApplyClick, scrollToSection }: { onAdmissionClick: () => void, onContactClick: () => void, onApplyClick: (type: string) => void, scrollToSection: (id: string) => void }) => {
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('/api/gallery');
        const data = await res.json();
        setGallery(data);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const handleViewGallery = () => {
    navigate('/gallery');
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-red-100 selection:text-red-600">
      <Navbar onAdmissionClick={onAdmissionClick} onContactClick={onContactClick} scrollToSection={scrollToSection} />
      <main>
        <Hero onAdmissionClick={onAdmissionClick} onContactClick={onContactClick} />
        <Features />
        <WelcomeSection />
        <Milestones />
        <DocumentsSection onApplyClick={onApplyClick} />
        
        {/* School Brochure Section */}
        <section className="py-24 bg-slate-50" id="gallery">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold text-red-600 tracking-widest uppercase mb-4">School Resources</h2>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">School Brochure & Gallery</h3>
              <div className="w-20 h-1.5 bg-red-600 mx-auto mt-6"></div>
            </div>

            {gallery.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {gallery.slice(0, 6).map((img) => (
                  <motion.div 
                    key={img.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group relative bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={img.url} 
                        alt={img.caption} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                        <span className="text-red-500 font-bold text-[10px] uppercase tracking-widest mb-1">{img.category}</span>
                        <p className="text-white font-bold text-sm">{img.caption}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : null}

            <div className="max-w-2xl mx-auto">
              <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-slate-100 flex flex-col items-center text-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-2 bg-red-600"></div>
                <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Building2 size={48} />
                </div>
                <h4 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">SCHOOL BROCHURE</h4>
                <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                  Explore our school's highlights, world-class facilities, and academic excellence through our photo gallery.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <button 
                    onClick={handleViewGallery}
                    className="max-w-md w-full bg-red-600 text-white font-black py-5 rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 uppercase tracking-widest text-sm flex items-center justify-center gap-2"
                  >
                    <Eye size={20} />
                    VIEW FULL GALLERY
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer onAdmissionClick={onAdmissionClick} scrollToSection={scrollToSection} />
    </div>
  );
};

export default function App() {
  const [showAdmission, setShowAdmission] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState('');

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const headerOffset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleApplyClick = (type: string) => {
    setSelectedDocType(type);
    setShowCertificate(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <MainSite 
            onAdmissionClick={() => setShowAdmission(true)} 
            onContactClick={() => scrollToSection('contact')}
            onApplyClick={handleApplyClick}
            scrollToSection={scrollToSection}
          />
        } />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <AdmissionModal isOpen={showAdmission} onClose={() => setShowAdmission(false)} />
      <CertificateModal 
        isOpen={showCertificate} 
        onClose={() => setShowCertificate(false)} 
        initialType={selectedDocType}
      />
    </Router>
  );
}
