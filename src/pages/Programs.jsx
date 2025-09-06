import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  Clock, 
  Award, 
  DollarSign, 
  Search,
  Filter,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Globe,
  Microscope,
  Palette,
  Heart,
  Scale,
  Calculator,
  Code,
  Building
} from 'lucide-react';

const Programs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Programs', icon: BookOpen },
    { id: 'technology', name: 'Technology', icon: Code },
    { id: 'business', name: 'Business', icon: Building },
    { id: 'health', name: 'Health Sciences', icon: Heart },
    { id: 'engineering', name: 'Engineering', icon: Calculator },
    { id: 'arts', name: 'Arts & Humanities', icon: Palette },
    { id: 'law', name: 'Law', icon: Scale },
    { id: 'science', name: 'Sciences', icon: Microscope }
  ];

  const programs = [
    {
      id: 'cs',
      title: 'Computer Science',
      category: 'technology',
      description: 'Learn cutting-edge programming, software development, and computer systems design.',
      duration: '4 years',
      degree: 'Bachelor of Science',
      tuition: '$45,000/year',
      students: '1,200',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop',
      features: ['Software Development', 'AI & Machine Learning', 'Cybersecurity', 'Data Science'],
      requirements: ['High School Diploma', 'SAT/ACT Scores', 'Math Prerequisites'],
      careerPaths: ['Software Engineer', 'Data Scientist', 'Cybersecurity Analyst', 'Product Manager']
    },
    {
      id: 'business',
      title: 'Business Administration',
      category: 'business',
      description: 'Develop leadership skills and business acumen for success in the corporate world.',
      duration: '4 years',
      degree: 'Bachelor of Business Administration',
      tuition: '$42,000/year',
      students: '950',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop',
      features: ['Management', 'Marketing', 'Finance', 'Entrepreneurship'],
      requirements: ['High School Diploma', 'SAT/ACT Scores', 'English Proficiency'],
      careerPaths: ['Business Analyst', 'Marketing Manager', 'Financial Advisor', 'Entrepreneur']
    },
    {
      id: 'engineering',
      title: 'Mechanical Engineering',
      category: 'engineering',
      description: 'Design and build innovative solutions for real-world engineering challenges.',
      duration: '4 years',
      degree: 'Bachelor of Engineering',
      tuition: '$48,000/year',
      students: '800',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&h=300&fit=crop',
      features: ['Design & Manufacturing', 'Thermodynamics', 'Materials Science', 'Robotics'],
      requirements: ['High School Diploma', 'SAT/ACT Scores', 'Advanced Math & Physics'],
      careerPaths: ['Mechanical Engineer', 'Design Engineer', 'Project Manager', 'Research Scientist']
    },
    {
      id: 'medicine',
      title: 'Pre-Medicine',
      category: 'health',
      description: 'Prepare for medical school with comprehensive pre-medical education.',
      duration: '4 years',
      degree: 'Bachelor of Science',
      tuition: '$52,000/year',
      students: '600',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
      features: ['Biology & Chemistry', 'Anatomy & Physiology', 'Research Methods', 'Clinical Experience'],
      requirements: ['High School Diploma', 'SAT/ACT Scores', 'Biology & Chemistry Prerequisites'],
      careerPaths: ['Doctor', 'Medical Researcher', 'Healthcare Administrator', 'Public Health Specialist']
    },
    {
      id: 'psychology',
      title: 'Psychology',
      category: 'science',
      description: 'Explore human behavior and mental processes through scientific study.',
      duration: '4 years',
      degree: 'Bachelor of Arts',
      tuition: '$38,000/year',
      students: '750',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=300&fit=crop',
      features: ['Cognitive Psychology', 'Clinical Psychology', 'Research Methods', 'Statistics'],
      requirements: ['High School Diploma', 'SAT/ACT Scores', 'Psychology Prerequisites'],
      careerPaths: ['Clinical Psychologist', 'Counselor', 'Research Assistant', 'Human Resources']
    },
    {
      id: 'arts',
      title: 'Fine Arts',
      category: 'arts',
      description: 'Develop your creative skills and artistic vision in a supportive environment.',
      duration: '4 years',
      degree: 'Bachelor of Fine Arts',
      tuition: '$35,000/year',
      students: '400',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=300&fit=crop',
      features: ['Painting & Drawing', 'Sculpture', 'Digital Art', 'Art History'],
      requirements: ['High School Diploma', 'Portfolio Review', 'Art Prerequisites'],
      careerPaths: ['Artist', 'Art Teacher', 'Gallery Curator', 'Graphic Designer']
    },
    {
      id: 'law',
      title: 'Pre-Law',
      category: 'law',
      description: 'Build a strong foundation for law school with critical thinking and analysis.',
      duration: '4 years',
      degree: 'Bachelor of Arts',
      tuition: '$40,000/year',
      students: '300',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&h=300&fit=crop',
      features: ['Constitutional Law', 'Legal Writing', 'Political Science', 'Ethics'],
      requirements: ['High School Diploma', 'SAT/ACT Scores', 'English Proficiency'],
      careerPaths: ['Lawyer', 'Legal Assistant', 'Paralegal', 'Policy Analyst']
    },
    {
      id: 'nursing',
      title: 'Nursing',
      category: 'health',
      description: 'Prepare for a rewarding career in healthcare with hands-on clinical experience.',
      duration: '4 years',
      degree: 'Bachelor of Science in Nursing',
      tuition: '$46,000/year',
      students: '650',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=500&h=300&fit=crop',
      features: ['Clinical Practice', 'Patient Care', 'Medical Technology', 'Healthcare Ethics'],
      requirements: ['High School Diploma', 'SAT/ACT Scores', 'Biology & Chemistry Prerequisites'],
      careerPaths: ['Registered Nurse', 'Nurse Practitioner', 'Nurse Educator', 'Healthcare Manager']
    }
  ];

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || program.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              Academic Programs
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Discover our comprehensive range of undergraduate and graduate programs 
              designed to prepare you for success in your chosen field.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search programs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-10 w-full"
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input min-w-[200px]"
                >
                  {categories.map(category => {
                    const Icon = category.icon;
                    return (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map(category => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-12">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPrograms.map((program) => (
              <motion.div
                key={program.id}
                variants={itemVariants}
                className="card overflow-hidden group hover:scale-105"
              >
                {/* Program Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-gray-900">
                    ⭐ {program.rating}
                  </div>
                </div>

                {/* Program Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{program.title}</h3>
                    <span className="text-sm text-gray-500">{program.degree}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{program.description}</p>
                  
                  {/* Program Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{program.students} students</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span>{program.tuition}</span>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Areas:</h4>
                    <div className="flex flex-wrap gap-1">
                      {program.features.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                      {program.features.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{program.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="btn btn-primary w-full group">
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredPrograms.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No programs found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

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
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Apply now and join thousands of students who have transformed their lives 
              through quality education at our university.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="btn bg-white text-blue-600 hover:bg-gray-100 btn-lg group">
                <span>Apply Now</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn border-2 border-white text-white hover:bg-white hover:text-blue-600 btn-lg">
                Download Brochure
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Programs;
