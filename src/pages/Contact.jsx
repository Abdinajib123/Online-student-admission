import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  User,
  MessageSquare,
  Building,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  Calendar,
  ChevronDown
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeDepartment, setActiveDepartment] = useState(0);

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 University Avenue', 'Education City, EC 12345', 'United States'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 123-4568'],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@eduadmit.edu', 'admissions@eduadmit.edu'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Friday: 8:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 4:00 PM', 'Sunday: Closed'],
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const departments = [
    {
      name: 'Admissions Office',
      email: 'admissions@eduadmit.edu',
      phone: '+1 (555) 123-4567',
      description: 'General admission inquiries, application status, and enrollment questions.'
    },
    {
      name: 'Financial Aid',
      email: 'financialaid@eduadmit.edu',
      phone: '+1 (555) 123-4568',
      description: 'Scholarships, grants, loans, and financial assistance programs.'
    },
    {
      name: 'Academic Affairs',
      email: 'academics@eduadmit.edu',
      phone: '+1 (555) 123-4569',
      description: 'Program information, course schedules, and academic policies.'
    },
    {
      name: 'Student Services',
      email: 'studentservices@eduadmit.edu',
      phone: '+1 (555) 123-4570',
      description: 'Housing, dining, campus life, and student support services.'
    }
  ];

  const inquiryTypes = [
    'General Information',
    'Admissions Inquiry',
    'Financial Aid',
    'Academic Programs',
    'Student Services',
    'Campus Visit',
    'International Students',
    'Alumni Relations',
    'Other'
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-600' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-700' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!formData.inquiryType) newErrors.inquiryType = 'Please select an inquiry type';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: ''
      });
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-indigo-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-cyan-500/10 rounded-full blur-xl"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24">
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MessageSquare className="h-4 w-4" />
              <span>Get in Touch</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Contact Our Team
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Have questions about our programs, admissions, or campus life? Our team is ready to assist you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative py-12">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${info.color} mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {info.title}
                    </h3>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white/20">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h2>
                    <p className="text-gray-600">We'll respond within 24 hours</p>
                  </div>
                  
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <CheckCircle className="h-14 w-14 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                      <p className="text-gray-600 mb-6">
                        Thank you for contacting us. We'll get back to you within 24 hours.
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                              type="text"
                              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
                                errors.name 
                                  ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                                  : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
                              }`}
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              placeholder="Enter your full name"
                            />
                            {formData.name && !errors.name && (
                              <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                            )}
                          </div>
                          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>
                        
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                              type="email"
                              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
                                errors.email 
                                  ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                                  : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
                              }`}
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              placeholder="Enter your email"
                            />
                            {formData.email && !errors.email && (
                              <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                            )}
                          </div>
                          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                              type="tel"
                              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-100"
                              value={formData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              placeholder="Enter your phone number"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Inquiry Type <span className="text-red-500">*</span>
                          </label>
                          <select
                            className={`w-full px-4 py-2.5 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
                              errors.inquiryType 
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                                : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
                            }`}
                            value={formData.inquiryType}
                            onChange={(e) => handleInputChange('inquiryType', e.target.value)}
                          >
                            <option value="">Select inquiry type</option>
                            {inquiryTypes.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                          {errors.inquiryType && <p className="text-red-500 text-sm mt-1">{errors.inquiryType}</p>}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className={`w-full px-4 py-2.5 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
                            errors.subject 
                              ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                              : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
                          }`}
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          placeholder="Enter message subject"
                        />
                        {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <textarea
                            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 min-h-[120px] resize-none ${
                              errors.message 
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                                : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
                            }`}
                            value={formData.message}
                            onChange={(e) => handleInputChange('message', e.target.value)}
                            placeholder="Enter your message here..."
                          />
                        </div>
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full group flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Departments */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-white/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Building className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-gray-900">Contact Departments</h3>
                  </div>
                  
                  {/* Department Selector */}
                  <div className="mb-4">
                    <div className="flex overflow-x-auto scrollbar-hide space-x-1 pb-2">
                      {departments.map((dept, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveDepartment(index)}
                          className={`px-3 py-1.5 text-sm rounded-lg whitespace-nowrap transition-colors ${
                            activeDepartment === index
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {dept.name.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Active Department Info */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <h4 className="font-bold text-gray-900 mb-2">{departments[activeDepartment].name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{departments[activeDepartment].description}</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <a href={`mailto:${departments[activeDepartment].email}`} className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                          {departments[activeDepartment].email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-green-600" />
                        <a href={`tel:${departments[activeDepartment].phone}`} className="text-sm text-green-600 hover:text-green-800 transition-colors">
                          {departments[activeDepartment].phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-white/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="h-5 w-5 text-purple-600" />
                    <h3 className="text-lg font-bold text-gray-900">Follow Us</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={index}
                          href={social.href}
                          className={`group flex items-center justify-center p-3 bg-gray-50 rounded-lg text-gray-600 transition-all duration-300 hover:scale-105 ${social.color}`}
                          aria-label={social.name}
                        >
                          <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-white/20">
                  <div className="flex items-center gap-2 mb-4">
                    <ArrowRight className="h-5 w-5 text-green-600" />
                    <h3 className="text-lg font-bold text-gray-900">Quick Links</h3>
                  </div>
                  <div className="space-y-2">
                    <a href="/admission" className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors group">
                      <span className="text-sm font-medium">Apply for Admission</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a href="/programs" className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors group">
                      <span className="text-sm font-medium">View Programs</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a href="/about" className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors group">
                      <span className="text-sm font-medium">About University</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;