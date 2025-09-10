import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Users, 
  Award, 
  Globe, 
  Heart, 
  Lightbulb,
  Target,
  Eye,
  BookOpen,
  Building,
  Calendar,
  TrendingUp,
  Shield,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const About = () => {
  const stats = [
    { number: '50+', label: 'Years of Excellence', icon: Calendar },
    { number: '15,000+', label: 'Students Enrolled', icon: Users },
    { number: '500+', label: 'Expert Faculty', icon: GraduationCap },
    { number: '95%', label: 'Graduate Success Rate', icon: TrendingUp },
    { number: '50+', label: 'Programs Offered', icon: BookOpen },
    { number: '25+', label: 'Countries Represented', icon: Globe }
  ];

  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We foster creativity and innovation in all aspects of education, encouraging students to think critically and develop groundbreaking solutions.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Heart,
      title: 'Excellence',
      description: 'We are committed to maintaining the highest standards of academic excellence and providing world-class education to all our students.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Globe,
      title: 'Diversity',
      description: 'We celebrate diversity and create an inclusive environment where students from all backgrounds can thrive and succeed.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We uphold the highest ethical standards and promote honesty, transparency, and accountability in all our endeavors.',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const milestones = [
    {
      year: '1970',
      title: 'University Founded',
      description: 'EduAdmit University was established with a vision to provide quality education to students worldwide.'
    },
    {
      year: '1985',
      title: 'First International Program',
      description: 'Launched our first international exchange program, marking the beginning of our global presence.'
    },
    {
      year: '2000',
      title: 'Digital Transformation',
      description: 'Introduced online learning platforms and digital resources to enhance the educational experience.'
    },
    {
      year: '2010',
      title: 'Research Excellence',
      description: 'Achieved recognition as a leading research institution with breakthrough discoveries in multiple fields.'
    },
    {
      year: '2020',
      title: 'Virtual Learning',
      description: 'Successfully transitioned to hybrid learning models, ensuring education continuity during challenging times.'
    },
    {
      year: '2024',
      title: 'Future Ready',
      description: 'Launched cutting-edge programs in AI, sustainability, and emerging technologies.'
    }
  ];

  const leadership = [
    {
      name: 'Dr. Sarah Johnson',
      position: 'President',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      bio: 'Dr. Johnson has over 20 years of experience in higher education and is passionate about student success.',
      education: 'PhD in Educational Leadership, Harvard University'
    },
    {
      name: 'Prof. Michael Chen',
      position: 'Vice President of Academic Affairs',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: 'Prof. Chen leads our academic programs and ensures the highest quality of education delivery.',
      education: 'PhD in Computer Science, MIT'
    },
    {
      name: 'Dr. Emily Rodriguez',
      position: 'Dean of Student Affairs',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      bio: 'Dr. Rodriguez is dedicated to creating an inclusive and supportive environment for all students.',
      education: 'PhD in Psychology, Stanford University'
    }
  ];

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About EduAdmit University
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Empowering students to achieve their academic dreams through quality education, 
              innovative learning experiences, and a commitment to excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg mr-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To provide accessible, high-quality education that prepares students for success in their 
                chosen fields while fostering critical thinking, creativity, and global citizenship.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Deliver world-class academic programs</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Foster innovation and research excellence</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Create inclusive learning environments</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Prepare students for global challenges</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg mr-4">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To be a leading global university that transforms lives through education, 
                research, and innovation, creating a better future for all.
              </p>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Goals</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600">
                    <Star className="h-4 w-4 text-yellow-500 mr-3" />
                    <span>Become a top 100 global university by 2030</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Star className="h-4 w-4 text-yellow-500 mr-3" />
                    <span>Increase research impact and innovation</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Star className="h-4 w-4 text-yellow-500 mr-3" />
                    <span>Expand global partnerships and programs</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Star className="h-4 w-4 text-yellow-500 mr-3" />
                    <span>Enhance student success and employability</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="section-title">University at a Glance</h2>
            <p className="section-subtitle">
              Our numbers tell the story of excellence, growth, and impact in higher education.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center"
                >
                  <div className="inline-flex p-4 bg-white rounded-2xl shadow-lg mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">
              These fundamental principles guide everything we do and shape our university culture.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="card p-6 text-center group hover:scale-105"
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${value.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="section-title">Our Journey</h2>
            <p className="section-subtitle">
              A timeline of key milestones that have shaped our university's growth and success.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
              
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-blue-500 rounded-full z-10"></div>
                  
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="card p-6">
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section
      <section className="py-20 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="section-title">Leadership Team</h2>
            <p className="section-subtitle">
              Meet the visionary leaders who guide our university toward excellence and innovation.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {leadership.map((leader, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="card p-6 text-center group hover:scale-105"
              >
                <div className="relative mb-6">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-110 transition-transform"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {leader.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {leader.position}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {leader.bio}
                </p>
                <p className="text-xs text-gray-500">
                  {leader.education}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Community
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Be part of a university that values excellence, innovation, and student success. 
              Start your journey with us today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="btn bg-white text-blue-600 hover:bg-gray-100 btn-lg group">
                <span>Apply Now</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn border-2 border-white text-white hover:bg-white hover:text-blue-600 btn-lg">
                Schedule a Visit
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
