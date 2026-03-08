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

const Navbar = ({ onAdmissionClick }: { onAdmissionClick: () => void }) => {
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
    { name: 'HOME', href: '#' },
    { name: 'ABOUT US', href: '#about' },
    { name: 'ACADEMICS', href: '#academics' },
    { name: 'ADMISSION', href: '#admission', isAdmission: true },
    { name: 'LOCATION', href: 'https://share.google/3pYuB8P7mAg0tzSkk', external: true },
    { name: 'CONTACT', href: '#contact' },
  ];

  const handleParentLogin = () => {
    // Redirect to Lead School Login as requested
    window.open('https://dev-identity.leadschool.in/accounts/ui/login?login_challenge=c4775aeaf0214bd3848ee458180d1469', '_blank');
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-sm py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">V</div>
              <div className="leading-tight">
                <span className="block text-xl font-bold text-slate-800 tracking-tighter">VIMAL</span>
                <span className="block text-xs font-semibold text-slate-500 tracking-widest">INTERNATIONAL SCHOOL</span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  onClick={(e) => {
                    if (link.isAdmission) {
                      e.preventDefault();
                      onAdmissionClick();
                    }
                  }}
                  className="text-slate-600 hover:text-red-600 px-3 py-2 rounded-md text-sm font-bold transition-colors cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
              <button 
                onClick={handleParentLogin}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-red-700 transition-colors"
              >
                PARENTS LOGIN
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-red-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  onClick={(e) => {
                    if (link.isAdmission) {
                      e.preventDefault();
                      onAdmissionClick();
                    }
                    setIsOpen(false);
                  }}
                  className="text-slate-600 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                >
                  {link.name}
                </a>
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
  );
};

const Hero = ({ onAdmissionClick }: { onAdmissionClick: () => void }) => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://content.jdmagicbox.com/v2/comp/nanded/l9/9999p2462.2462.240612053940.v5l9/catalogue/vimal-international-school-nanded-schools-4H946Abzxm.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-slate-900/40"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
        >
          Vimal International School: Shaping Global Citizens
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-white/90 mb-8 font-light"
        >
          Welcome to Vimal International School, where we provide a world-class education that empowers students to reach their full potential.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button 
            onClick={onAdmissionClick}
            className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-all transform hover:scale-105"
          >
            ADMISSION OPEN
          </button>
        </motion.div>
      </div>
    </div>
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

const Footer = ({ onAdmissionClick }: { onAdmissionClick: () => void }) => {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">V</div>
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
              <li><a href="#" className="hover:text-red-500 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-red-500 transition-colors">About Us</a></li>
              <li><a href="#academics" className="hover:text-red-500 transition-colors">Academics</a></li>
              <li>
                <button 
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
                    Kinvat Road, Bhokar, Nanded, Maharashtra
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
                <span>info@vimal.edu.in</span>
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
        alert('Something went wrong. Please try again.');
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

const AdminDashboard = () => {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/inquiries');
      const data = await response.json();
      setInquiries(data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchInquiries();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password for demo purposes
    if (password === 'vimaladmin2026') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    
    try {
      const response = await fetch(`/api/inquiries/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setInquiries(prev => prev.filter(i => i.id !== id));
      } else {
        alert('Failed to delete inquiry');
      }
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      alert('An error occurred while deleting');
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => 
    inquiry.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.father_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.email.toLowerCase().includes(searchTerm.toLowerCase())
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
            <p className="text-slate-500 text-sm mt-2">Access the admission inquiry dashboard</p>
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
      {/* Admin Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">V</div>
            <div className="leading-tight">
              <span className="block text-lg font-bold text-slate-800 tracking-tighter">VIMAL ADMIN</span>
              <span className="block text-[10px] font-semibold text-slate-500 tracking-widest uppercase">Inquiry Dashboard</span>
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
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                <Users size={24} />
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">TOTAL</span>
            </div>
            <div className="text-3xl font-bold text-slate-800">{inquiries.length}</div>
            <div className="text-sm text-slate-500 mt-1">Total Inquiries Received</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                <Calendar size={24} />
              </div>
              <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">RECENT</span>
            </div>
            <div className="text-3xl font-bold text-slate-800">
              {inquiries.filter(i => {
                const date = new Date(i.created_at);
                const today = new Date();
                return date.toDateString() === today.toDateString();
              }).length}
            </div>
            <div className="text-sm text-slate-500 mt-1">Inquiries Received Today</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                <GraduationCap size={24} />
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">GRADES</span>
            </div>
            <div className="text-3xl font-bold text-slate-800">
              {new Set(inquiries.map(i => i.grade)).size}
            </div>
            <div className="text-sm text-slate-500 mt-1">Unique Grades Interested</div>
          </div>
        </div>

        {/* Search and Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-xl font-bold text-slate-800">Admission Inquiries</h3>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search inquiries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-red-600 transition-colors text-sm"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
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
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">Loading inquiries...</td>
                  </tr>
                ) : filteredInquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">No inquiries found.</td>
                  </tr>
                ) : (
                  filteredInquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800">{inquiry.student_name}</div>
                        <div className="text-xs text-slate-500">DOB: {inquiry.dob}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-[10px] font-bold uppercase">
                          {inquiry.grade}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-700 font-medium">F: {inquiry.father_name}</div>
                        <div className="text-sm text-slate-700 font-medium">M: {inquiry.mother_name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <PhoneIcon size={14} className="text-slate-400" />
                          {inquiry.contact_number}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <MailIcon size={14} className="text-slate-400" />
                          {inquiry.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors" title="View Details">
                            <Eye size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(inquiry.id)}
                            className="p-2 text-slate-400 hover:text-red-600 transition-colors" 
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
            <div className="text-sm text-slate-500">
              Showing {filteredInquiries.length} of {inquiries.length} inquiries
            </div>
            <button 
              onClick={() => {
                const csv = [
                  ['ID', 'Student Name', 'DOB', 'Gender', 'Grade', 'Father Name', 'Mother Name', 'Contact', 'Email', 'Previous School', 'Last Grade', 'Date'],
                  ...inquiries.map(i => [i.id, i.student_name, i.dob, i.gender, i.grade, i.father_name, i.mother_name, i.contact_number, i.email, i.previous_school, i.last_grade, i.created_at])
                ].map(e => e.join(",")).join("\n");
                
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.setAttribute('hidden', '');
                a.setAttribute('href', url);
                a.setAttribute('download', 'inquiries.csv');
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }}
              className="flex items-center gap-2 text-red-600 font-bold text-sm hover:underline"
            >
              <Download size={16} /> EXPORT TO CSV
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

const MainSite = ({ onAdmissionClick }: { onAdmissionClick: () => void }) => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-red-100 selection:text-red-600">
      <Navbar onAdmissionClick={onAdmissionClick} />
      <main>
        <Hero onAdmissionClick={onAdmissionClick} />
        <Features />
        <WelcomeSection />
        <Milestones />
        
        {/* Brochure Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6">
                <div className="bg-red-100 p-4 rounded-xl text-red-600">
                  <BookOpen size={32} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-800 mb-1">Yearly Magazine</h4>
                  <p className="text-slate-500 text-sm mb-4">Have a look at our yearly magazine!</p>
                  <button className="text-red-600 font-bold text-sm hover:underline">COMING SOON</button>
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6">
                <div className="bg-blue-100 p-4 rounded-xl text-blue-600">
                  <Building2 size={32} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-800 mb-1">School Brochure</h4>
                  <p className="text-slate-500 text-sm mb-4">Have a look at our school brochure!</p>
                  <button className="text-blue-600 font-bold text-sm hover:underline">COMING SOON</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer onAdmissionClick={onAdmissionClick} />
    </div>
  );
};

export default function App() {
  const [showAdmission, setShowAdmission] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainSite onAdmissionClick={() => setShowAdmission(true)} />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <AdmissionModal isOpen={showAdmission} onClose={() => setShowAdmission(false)} />
    </Router>
  );
}
