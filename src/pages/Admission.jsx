import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  GraduationCap, 
  FileText, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Upload,
  Calendar,
  MapPin,
  Phone,
  Mail,
  BookOpen,
  Award,
  DollarSign
} from 'lucide-react';

const Admission = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Academic Information
    program: '',
    degreeLevel: '',
    previousEducation: '',
    gpa: '',
    testScores: '',
    englishProficiency: '',
    
    // Documents
    transcript: null,
    recommendationLetters: null,
    personalStatement: null,
    passport: null,
    
    // Additional Information
    workExperience: '',
    extracurricularActivities: '',
    scholarships: '',
    emergencyContact: '',
    emergencyPhone: '',
    
    // Terms and Conditions
    agreeToTerms: false,
    agreeToPrivacy: false
  });

  const [errors, setErrors] = useState({});

  const steps = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Academic Info', icon: GraduationCap },
    { id: 3, title: 'Documents', icon: FileText },
    { id: 4, title: 'Review', icon: CheckCircle }
  ];

  const programs = [
    'Computer Science',
    'Business Administration',
    'Engineering',
    'Medicine',
    'Arts & Humanities',
    'Psychology',
    'Economics',
    'Law',
    'Education',
    'Nursing'
  ];

  const degreeLevels = [
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'PhD',
    'Certificate Program',
    'Diploma Program'
  ];

  const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'India',
    'China',
    'Japan',
    'Brazil',
    'Mexico',
    'Other'
  ];

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.nationality) newErrors.nationality = 'Nationality is required';
        break;
      case 2:
        if (!formData.program) newErrors.program = 'Program selection is required';
        if (!formData.degreeLevel) newErrors.degreeLevel = 'Degree level is required';
        if (!formData.previousEducation) newErrors.previousEducation = 'Previous education is required';
        if (!formData.gpa) newErrors.gpa = 'GPA is required';
        break;
      case 3:
        if (!formData.transcript) newErrors.transcript = 'Transcript is required';
        if (!formData.personalStatement) newErrors.personalStatement = 'Personal statement is required';
        break;
      case 4:
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        if (!formData.agreeToPrivacy) newErrors.agreeToPrivacy = 'You must agree to the privacy policy';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (field, file) => {
    setFormData(prev => ({ ...prev, [field]: file }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(4)) {
      // Here you would typically send the data to your backend
      alert('Application submitted successfully! We will review your application and get back to you soon.');
      console.log('Form Data:', formData);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label">First Name *</label>
                <input
                  type="text"
                  className={`input ${errors.firstName ? 'input-error' : ''}`}
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <p className="text-error">{errors.firstName}</p>}
              </div>
              
              <div>
                <label className="label">Last Name *</label>
                <input
                  type="text"
                  className={`input ${errors.lastName ? 'input-error' : ''}`}
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <p className="text-error">{errors.lastName}</p>}
              </div>
              
              <div>
                <label className="label">Email Address *</label>
                <input
                  type="email"
                  className={`input ${errors.email ? 'input-error' : ''}`}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-error">{errors.email}</p>}
              </div>
              
              <div>
                <label className="label">Phone Number *</label>
                <input
                  type="tel"
                  className={`input ${errors.phone ? 'input-error' : ''}`}
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="text-error">{errors.phone}</p>}
              </div>
              
              <div>
                <label className="label">Date of Birth *</label>
                <input
                  type="date"
                  className={`input ${errors.dateOfBirth ? 'input-error' : ''}`}
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
                {errors.dateOfBirth && <p className="text-error">{errors.dateOfBirth}</p>}
              </div>
              
              <div>
                <label className="label">Gender *</label>
                <select
                  className={`input ${errors.gender ? 'input-error' : ''}`}
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                {errors.gender && <p className="text-error">{errors.gender}</p>}
              </div>
              
              <div>
                <label className="label">Nationality *</label>
                <select
                  className={`input ${errors.nationality ? 'input-error' : ''}`}
                  value={formData.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                >
                  <option value="">Select nationality</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                {errors.nationality && <p className="text-error">{errors.nationality}</p>}
              </div>
            </div>
            
            <div>
              <label className="label">Address</label>
              <textarea
                className="input min-h-[100px] resize-none"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter your full address"
              />
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Academic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label">Program of Interest *</label>
                <select
                  className={`input ${errors.program ? 'input-error' : ''}`}
                  value={formData.program}
                  onChange={(e) => handleInputChange('program', e.target.value)}
                >
                  <option value="">Select a program</option>
                  {programs.map(program => (
                    <option key={program} value={program}>{program}</option>
                  ))}
                </select>
                {errors.program && <p className="text-error">{errors.program}</p>}
              </div>
              
              <div>
                <label className="label">Degree Level *</label>
                <select
                  className={`input ${errors.degreeLevel ? 'input-error' : ''}`}
                  value={formData.degreeLevel}
                  onChange={(e) => handleInputChange('degreeLevel', e.target.value)}
                >
                  <option value="">Select degree level</option>
                  {degreeLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                {errors.degreeLevel && <p className="text-error">{errors.degreeLevel}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label className="label">Previous Education *</label>
                <textarea
                  className={`input min-h-[100px] resize-none ${errors.previousEducation ? 'input-error' : ''}`}
                  value={formData.previousEducation}
                  onChange={(e) => handleInputChange('previousEducation', e.target.value)}
                  placeholder="Describe your previous educational background"
                />
                {errors.previousEducation && <p className="text-error">{errors.previousEducation}</p>}
              </div>
              
              <div>
                <label className="label">GPA (Grade Point Average) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  className={`input ${errors.gpa ? 'input-error' : ''}`}
                  value={formData.gpa}
                  onChange={(e) => handleInputChange('gpa', e.target.value)}
                  placeholder="e.g., 3.5"
                />
                {errors.gpa && <p className="text-error">{errors.gpa}</p>}
              </div>
              
              <div>
                <label className="label">Test Scores (SAT, GRE, etc.)</label>
                <input
                  type="text"
                  className="input"
                  value={formData.testScores}
                  onChange={(e) => handleInputChange('testScores', e.target.value)}
                  placeholder="e.g., SAT: 1400, GRE: 320"
                />
              </div>
              
              <div>
                <label className="label">English Proficiency</label>
                <select
                  className="input"
                  value={formData.englishProficiency}
                  onChange={(e) => handleInputChange('englishProficiency', e.target.value)}
                >
                  <option value="">Select proficiency level</option>
                  <option value="native">Native Speaker</option>
                  <option value="advanced">Advanced</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="basic">Basic</option>
                </select>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Required Documents</h3>
            
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Official Transcript *</h4>
                <p className="text-gray-600 mb-4">Upload your official academic transcript</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="transcript"
                  onChange={(e) => handleFileUpload('transcript', e.target.files[0])}
                />
                <label
                  htmlFor="transcript"
                  className="btn btn-outline cursor-pointer"
                >
                  Choose File
                </label>
                {formData.transcript && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ {formData.transcript.name}
                  </p>
                )}
                {errors.transcript && <p className="text-error">{errors.transcript}</p>}
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Personal Statement *</h4>
                <p className="text-gray-600 mb-4">Write about your goals and why you want to join our university</p>
                <textarea
                  className={`input min-h-[150px] resize-none ${errors.personalStatement ? 'input-error' : ''}`}
                  value={formData.personalStatement}
                  onChange={(e) => handleInputChange('personalStatement', e.target.value)}
                  placeholder="Tell us about yourself, your academic goals, and why you're interested in our university..."
                />
                {errors.personalStatement && <p className="text-error">{errors.personalStatement}</p>}
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Recommendation Letters</h4>
                <p className="text-gray-600 mb-4">Upload recommendation letters (optional but recommended)</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  multiple
                  className="hidden"
                  id="recommendations"
                  onChange={(e) => handleFileUpload('recommendationLetters', e.target.files)}
                />
                <label
                  htmlFor="recommendations"
                  className="btn btn-outline cursor-pointer"
                >
                  Choose Files
                </label>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Passport/ID Copy</h4>
                <p className="text-gray-600 mb-4">Upload a copy of your passport or government-issued ID</p>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  id="passport"
                  onChange={(e) => handleFileUpload('passport', e.target.files[0])}
                />
                <label
                  htmlFor="passport"
                  className="btn btn-outline cursor-pointer"
                >
                  Choose File
                </label>
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Review & Submit</h3>
            
            <div className="space-y-6">
              <div className="card p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><strong>Name:</strong> {formData.firstName} {formData.lastName}</div>
                  <div><strong>Email:</strong> {formData.email}</div>
                  <div><strong>Phone:</strong> {formData.phone}</div>
                  <div><strong>Date of Birth:</strong> {formData.dateOfBirth}</div>
                  <div><strong>Gender:</strong> {formData.gender}</div>
                  <div><strong>Nationality:</strong> {formData.nationality}</div>
                </div>
              </div>
              
              <div className="card p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-green-600" />
                  Academic Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><strong>Program:</strong> {formData.program}</div>
                  <div><strong>Degree Level:</strong> {formData.degreeLevel}</div>
                  <div><strong>GPA:</strong> {formData.gpa}</div>
                  <div><strong>Test Scores:</strong> {formData.testScores || 'Not provided'}</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={formData.agreeToTerms}
                    onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                    className="mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a> *
                  </label>
                </div>
                {errors.agreeToTerms && <p className="text-error">{errors.agreeToTerms}</p>}
                
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="privacy"
                    checked={formData.agreeToPrivacy}
                    onChange={(e) => handleInputChange('agreeToPrivacy', e.target.checked)}
                    className="mt-1"
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    I agree to the <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> *
                  </label>
                </div>
                {errors.agreeToPrivacy && <p className="text-error">{errors.agreeToPrivacy}</p>}
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">University Admission Application</h1>
            <p className="text-xl text-gray-600">
              Complete your application in just a few simple steps
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                          isCompleted
                            ? 'bg-green-500 border-green-500 text-white'
                            : isActive
                            ? 'bg-blue-500 border-blue-500 text-white'
                            : 'bg-white border-gray-300 text-gray-400'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          <Icon className="h-6 w-6" />
                        )}
                      </div>
                      <span className={`text-sm font-medium mt-2 ${
                        isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-4 ${
                        currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <div className="card p-8">
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`btn btn-secondary flex items-center space-x-2 ${
                  currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>

              {currentStep < steps.length ? (
                <button
                  onClick={nextStep}
                  className="btn btn-primary flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="btn btn-primary flex items-center space-x-2"
                >
                  <span>Submit Application</span>
                  <CheckCircle className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admission;
