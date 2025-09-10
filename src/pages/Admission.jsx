import { useEffect, useState } from 'react';
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
  DollarSign,
  Building
} from 'lucide-react';

const Admission = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullname: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    motherName: '',
    address: '',
    placeOfBirth: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Educational Background
    schoolName: '',
    graduationYear: '',
    grade: '',
    certificate: null,
    
    // Academic Information (store backend IDs)
    faculty: '',
    department: '',
    mode: '',
    entryDate: '',
    
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
    agreeToPrivacy: false,

    // Payment
    paymentMethod: '',
    evcPhoneNumber: ''
  });

  const [errors, setErrors] = useState({});

  // Dynamic data from backend
  const [faculties, setFaculties] = useState([]); // [{_id, fuc_name}]
  const [departments, setDepartments] = useState([]); // [{_id, dept_name, faculty}]
  const [loadingLookups, setLoadingLookups] = useState(false);
  const [lookupError, setLookupError] = useState('');

  useEffect(() => {
    const loadLookups = async () => {
      try {
        setLoadingLookups(true);
        setLookupError('');
        const [fRes, dRes] = await Promise.all([
          fetch('/api/getFaculties'),
          fetch('/api/getDepartments'),
        ]);
        if (!fRes.ok) throw new Error(`Failed to load faculties (${fRes.status})`);
        if (!dRes.ok) throw new Error(`Failed to load departments (${dRes.status})`);
        const fJson = await fRes.json();
        const dJson = await dRes.json();
        setFaculties((fJson?.data ?? []).map(f => ({ _id: f._id, name: f.fuc_name })));
        setDepartments((dJson?.data ?? []).map(d => ({ _id: d._id, name: d.dept_name, facultyId: typeof d.faculty === 'object' ? d.faculty?._id : d.faculty })));
      } catch (e) {
        setLookupError(e.message || 'Failed to load lookups');
      } finally {
        setLoadingLookups(false);
      }
    };
    loadLookups();
  }, []);

  const steps = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Contact Info', icon: Phone },
    { id: 3, title: 'Educational Background', icon: BookOpen },
    { id: 4, title: 'Academic Info', icon: GraduationCap },
    { id: 5, title: 'Payment', icon: DollarSign },
    { id: 6, title: 'Review', icon: CheckCircle }
  ];

  const validateStep = (step) => {
    const newErrors = {};
    switch (step) {
      case 1:
        if (!formData.fullname) newErrors.fullname = 'fullname is required';
        if (!formData.motherName) newErrors.motherName = 'Mother\'s name is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.placeOfBirth) newErrors.placeOfBirth = 'Place of birth is required';
        break;
      case 2:
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.emergencyPhone) newErrors.emergencyPhone = 'Emergency phone is required';
        break;
      case 3:
        if (!formData.schoolName) newErrors.schoolName = 'School name is required';
        if (!formData.graduationYear) newErrors.graduationYear = 'Graduation year is required';
        if (!formData.grade) newErrors.grade = 'Grade is required';
        if (!formData.certificate) newErrors.certificate = 'Certificate upload is required';
        break;
      case 4:
        if (!formData.faculty) newErrors.faculty = 'Faculty selection is required';
        if (!formData.department) newErrors.department = 'Department selection is required';
        if (!formData.mode) newErrors.mode = 'Mode is required';
        if (!formData.entryDate) newErrors.entryDate = 'Entry date is required';
        break;
      case 5:
        if (!formData.paymentMethod) newErrors.paymentMethod = 'Select a payment method';
        if (formData.paymentMethod === 'evc' && !formData.evcPhoneNumber) newErrors.evcPhoneNumber = 'EVC phone is required';
        break;
      case 6:
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <User className="h-4 w-4" />
                <span>Step 1 of 6</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Personal Information</h3>
              <p className="text-gray-600">Tell us about yourself to get started</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  fullname <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                      errors.fullname 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
                    }`}
                    value={formData.fullname}
                    onChange={(e) => handleInputChange('fullname', e.target.value)}
                    placeholder="Enter your fullname"
                  />
                  {formData.fullname && !errors.fullname && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                  )}
                </div>
                {errors.fullname && <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>}
              </div>
              
              
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Mother's Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                      errors.motherName 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
                    }`}
                    placeholder="Enter mother's full name"
                    value={formData.motherName}
                    onChange={(e) => handleInputChange('motherName', e.target.value)}
                  />
                  {formData.motherName && !errors.motherName && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                  )}
                </div>
                {errors.motherName && <p className="text-red-500 text-sm mt-1">{errors.motherName}</p>}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <textarea
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 min-h-[100px] resize-none ${
                    errors.address 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                      : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
                  }`}
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter your full address"
                />
              </div>
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Place of Birth <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                    errors.placeOfBirth 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                      : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
                  }`}
                  value={formData.placeOfBirth}
                  onChange={(e) => handleInputChange('placeOfBirth', e.target.value)}
                  placeholder="Enter your place of birth"
                />
                {formData.placeOfBirth && !errors.placeOfBirth && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
              </div>
              {errors.placeOfBirth && <p className="text-red-500 text-sm mt-1">{errors.placeOfBirth}</p>}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Phone className="h-4 w-4" />
                <span>Step 2 of 6</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Contact Information</h3>
              <p className="text-gray-600">How can we reach you?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                      errors.email 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
                    }`}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                  />
                  {formData.email && !errors.email && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                  )}
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                      errors.phone 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
                    }`}
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                  />
                  {formData.phone && !errors.phone && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                  )}
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Emergency Phone <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                      errors.emergencyPhone 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
                    }`}
                    value={formData.emergencyPhone}
                    onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                    placeholder="Enter emergency phone number"
                  />
                  {formData.emergencyPhone && !errors.emergencyPhone && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                  )}
                </div>
                {errors.emergencyPhone && <p className="text-red-500 text-sm mt-1">{errors.emergencyPhone}</p>}
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
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <BookOpen className="h-4 w-4" />
                <span>Step 3 of 6</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Educational Background</h3>
              <p className="text-gray-600">Tell us about your previous education</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  School Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                      errors.schoolName 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
                    }`}
                    placeholder="Enter your school name"
                    value={formData.schoolName}
                    onChange={(e) => handleInputChange('schoolName', e.target.value)}
                  />
                  {formData.schoolName && !errors.schoolName && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                  )}
                </div>
                {errors.schoolName && <p className="text-red-500 text-sm mt-1">{errors.schoolName}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Graduation Year <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    min="1950"
                    max="2030"
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                      errors.graduationYear 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
                    }`}
                    placeholder="e.g., 2023"
                    value={formData.graduationYear}
                    onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                  />
                  {formData.graduationYear && !errors.graduationYear && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                  )}
                </div>
                {errors.graduationYear && <p className="text-red-500 text-sm mt-1">{errors.graduationYear}</p>}
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Grade/GPA <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                      errors.grade 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
                    }`}
                    placeholder="e.g., 3.8/4.0 or A+ or 95%"
                    value={formData.grade}
                    onChange={(e) => handleInputChange('grade', e.target.value)}
                  />
                  {formData.grade && !errors.grade && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                  )}
                </div>
                {errors.grade && <p className="text-red-500 text-sm mt-1">{errors.grade}</p>}
              </div>
              
              {/* Certificate Upload */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Educational Certificate <span className="text-red-500">*</span>
                </label>
                <div className={`bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg ${
                  errors.certificate 
                    ? 'border-red-300 hover:border-red-400' 
                    : 'border-green-200 hover:border-green-400'
                }`}>
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    Upload Your Certificate
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Upload your high school diploma, degree certificate, or transcript (PDF, DOC, DOCX, JPG, PNG)
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload('certificate', e.target.files[0])}
                    className="hidden"
                    id="certificate-upload"
                  />
                  <label
                    htmlFor="certificate-upload"
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium cursor-pointer transition-colors duration-200"
                  >
                    <Upload className="h-5 w-5" />
                    Choose File
                  </label>
                  {formData.certificate && (
                    <div className="mt-4 p-3 bg-green-100 rounded-lg">
                      <div className="flex items-center gap-2 text-green-800">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">File uploaded: {formData.certificate.name}</span>
                      </div>
                    </div>
                  )}
                </div>
                {errors.certificate && <p className="text-red-500 text-sm mt-1">{errors.certificate}</p>}
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
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <GraduationCap className="h-4 w-4" />
                <span>Step 4 of 6</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Academic Information</h3>
              <p className="text-gray-600">Choose your faculty and department</p>
            </div>

            {lookupError && (
              <div className="text-red-600 text-sm">{lookupError}</div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Faculty <span className="text-red-500">*</span>
                </label>
                <select
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                    errors.faculty ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
                  }`}
                  value={formData.faculty}
                  onChange={(e) => handleInputChange('faculty', e.target.value)}
                  disabled={loadingLookups}
                >
                  <option value="">Select faculty</option>
                  {faculties.map((f) => (
                    <option key={f._id} value={f._id}>{f.name}</option>
                  ))}
                </select>
                {errors.faculty && <p className="text-red-500 text-sm mt-1">{errors.faculty}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                    errors.department ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
                  }`}
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  disabled={!formData.faculty || loadingLookups}
                >
                  <option value="">Select department</option>
                  {departments.filter(d => d.facultyId === formData.faculty).map((d) => (
                    <option key={d._id} value={d._id}>{d.name}</option>
                  ))}
                </select>
                {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Mode <span className="text-red-500">*</span>
                </label>
                <select
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                    errors.mode ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
                  }`}
                  value={formData.mode}
                  onChange={(e) => handleInputChange('mode', e.target.value)}
                >
                  <option value="">Select mode</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                </select>
                {errors.mode && <p className="text-red-500 text-sm mt-1">{errors.mode}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Entry Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                    errors.entryDate ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
                  }`}
                  value={formData.entryDate}
                  onChange={(e) => handleInputChange('entryDate', e.target.value)}
                />
                {errors.entryDate && <p className="text-red-500 text-sm mt-1">{errors.entryDate}</p>}
              </div>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <DollarSign className="h-4 w-4" />
                <span>Step 5 of 6</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Payment Method</h3>
              <p className="text-gray-600">Select your preferred payment option to complete your application</p>
            </div>
            
            <div className="space-y-6">
              {/* Payment Method Selection */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Select Payment Method</h4>
                
                <div className="space-y-4">
                  {/* EVC Plus Option */}
                  <div className={`border-2 rounded-xl p-4 transition-all duration-200 cursor-pointer ${
                    formData.paymentMethod === 'evc' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleInputChange('paymentMethod', 'evc')}>
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        formData.paymentMethod === 'evc' 
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-400'
                      }`}>
                        {formData.paymentMethod === 'evc' && (
                          <div className="w-3 h-3 rounded-full bg-white"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-900">EVC Plus</h5>
                        <p className="text-gray-600 text-sm">Pay instantly with your EVC Plus account</p>
                      </div>
                      <div className="bg-blue-100 px-3 py-1 rounded-lg">
                        <span className="text-sm font-medium text-blue-700">Secure</span>
                      </div>
                    </div>
                    
                    {/* EVC Phone Number Input (shown only when EVC is selected) */}
                    {formData.paymentMethod === 'evc' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pl-10"
                      >
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">
                            Phone Number Verification
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="tel"
                              className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                                errors.evcPhoneNumber 
                                  ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                                  : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
                              }`}
                              placeholder="Enter your phone number"
                              value={formData.evcPhoneNumber || ''}
                              onChange={(e) => handleInputChange('evcPhoneNumber', e.target.value)}
                            />
                          </div>
                          {errors.evcPhoneNumber && <p className="text-red-500 text-sm mt-1">{errors.evcPhoneNumber}</p>}
                          <p className="text-xs text-gray-500">
                            Enter the phone number associated with your EVC Plus account
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Payment Summary */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Payment Summary</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Application Fee</span>
                    <span className="font-medium">$0.01</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-200">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-blue-600">$0.01</span>
                  </div>
                </div>
                
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Important</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>Your application will only be processed after successful payment. Payments are refundable only if the application is rejected.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
 
              
            
            {/* <div className="space-y-8"> 
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-dashed border-blue-200 rounded-2xl p-8 text-center hover:border-blue-400 transition-all duration-300 hover:shadow-lg">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Official Transcript <span className="text-red-500">*</span></h4>
                <p className="text-gray-600 mb-6">Upload your official academic transcript (PDF, DOC, DOCX)</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="transcript"
                  onChange={(e) => handleFileUpload('transcript', e.target.files[0])}
                />
                <label
                  htmlFor="transcript"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <Upload className="h-5 w-5" />
                  Choose File
                </label>
                {formData.transcript && (
                  <div className="mt-4 p-3 bg-green-100 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">{formData.transcript.name}</span>
                    </div>
                  </div>
                )}
                {errors.transcript && <p className="text-red-500 text-sm mt-2">{errors.transcript}</p>}
              </div>
              
             
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-dashed border-purple-200 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Personal Statement <span className="text-red-500">*</span></h4>
                  <p className="text-gray-600">Tell us about yourself, your goals, and why you want to join our university</p>
                </div>
                <textarea
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 min-h-[200px] resize-none ${
                    errors.personalStatement 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                      : 'border-gray-200 focus:border-purple-500 focus:ring-purple-100'
                  }`}
                  value={formData.personalStatement}
                  onChange={(e) => handleInputChange('personalStatement', e.target.value)}
                  placeholder="Tell us about yourself, your academic goals, and why you're interested in our university..."
                />
                {errors.personalStatement && <p className="text-red-500 text-sm mt-2">{errors.personalStatement}</p>}
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-dashed border-green-200 rounded-2xl p-8 text-center hover:border-green-400 transition-all duration-300 hover:shadow-lg">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Recommendation Letters</h4>
                <p className="text-gray-600 mb-6">Upload recommendation letters (optional but recommended)</p>
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
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <Upload className="h-5 w-5" />
                  Choose Files
                </label>
                {formData.recommendationLetters && formData.recommendationLetters.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {Array.from(formData.recommendationLetters).map((file, index) => (
                      <div key={index} className="p-2 bg-green-100 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 text-green-800">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">{file.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
           
              <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-dashed border-orange-200 rounded-2xl p-8 text-center hover:border-orange-400 transition-all duration-300 hover:shadow-lg">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Passport/ID Copy</h4>
                <p className="text-gray-600 mb-6">Upload a copy of your passport or government-issued ID</p>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  id="passport"
                  onChange={(e) => handleFileUpload('passport', e.target.files[0])}
                />
                <label
                  htmlFor="passport"
                  className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <Upload className="h-5 w-5" />
                  Choose File
                </label>
                {formData.passport && (
                  <div className="mt-4 p-3 bg-green-100 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">{formData.passport.name}</span>
                    </div>
                  </div>
                )}
              </div>
            </div> */}
          </motion.div>
        );

      case 6:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Modern Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
                <CheckCircle className="h-5 w-5" />
                <span>Final Step - Review & Submit</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
                Almost There!
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Please review your application details carefully before submitting. You can go back to make changes if needed.
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      currentStep >= step.id 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {currentStep > step.id ? <CheckCircle className="h-5 w-5" /> : step.id}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                        currentStep > step.id 
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-500' 
                          : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Modern Information Cards */}
            <div className="space-y-8">
              {/* Personal Information Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">Personal Information</h4>
                    <p className="text-gray-600 dark:text-gray-400">Your basic details</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</span>
                        <p className="text-gray-900 font-semibold">{formData.fullname}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Mother's Name</span>
                        <p className="text-gray-900 font-semibold">{formData.motherName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Place of Birth</span>
                        <p className="text-gray-900 font-semibold">{formData.placeOfBirth}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</span>
                        <p className="text-gray-900 font-semibold">{formData.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Gender</span>
                        <p className="text-gray-900 font-semibold">{formData.gender}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Information Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl shadow-lg">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">Contact Information</h4>
                    <p className="text-gray-600 dark:text-gray-400">Your contact details</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</span>
                        <p className="text-gray-900 font-semibold">{formData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</span>
                        <p className="text-gray-900 font-semibold">{formData.phone}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Emergency Phone</span>
                        <p className="text-gray-900 font-semibold">{formData.emergencyPhone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Educational Background Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">Educational Background</h4>
                    <p className="text-gray-600 dark:text-gray-400">Your academic history</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">School Name</span>
                        <p className="text-gray-900 font-semibold">{formData.schoolName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Graduation Year</span>
                        <p className="text-gray-900 font-semibold">{formData.graduationYear}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Grade/GPA</span>
                        <p className="text-gray-900 font-semibold">{formData.grade}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Certificate</span>
                        <p className="text-gray-900 font-semibold">
                          {formData.certificate ? formData.certificate.name : 'Not uploaded'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Academic Information Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">Academic Information</h4>
                    <p className="text-gray-600 dark:text-gray-400">Your chosen program</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Faculty</span>
                        <p className="text-gray-900 font-semibold">{faculties.find(f => f._id === formData.faculty)?.name || '-'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Department</span>
                        <p className="text-gray-900 font-semibold">{departments.find(d => d._id === formData.department)?.name || '-'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Mode</span>
                        <p className="text-gray-900 font-semibold">{formData.mode}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Entry Date</span>
                        <p className="text-gray-900 font-semibold">{formData.entryDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-indigo-500/10 rounded-full blur-xl"></div>
      </div>

      <div className="relative container py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <GraduationCap className="h-4 w-4" />
              <span>2024 Admissions Open</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="block">University</span>
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admission Portal
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Begin your journey to academic excellence. Complete your application in just a few simple steps 
              and join thousands of successful students.
            </p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  
                  return (
                    <div key={step.id} className="flex items-center flex-1">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                            isCompleted
                              ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/25'
                              : isActive
                              ? 'bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/25'
                              : 'bg-white border-gray-300 text-gray-400'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle className="h-7 w-7" />
                          ) : (
                            <Icon className="h-7 w-7" />
                          )}
                        </div>
                        <span className={`text-sm font-semibold mt-3 ${
                          isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          {step.title}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-300 ${
                          currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Form Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20"
          >
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`group flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentStep === 1 
                    ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                <span>Previous</span>
              </button>

              {currentStep < steps.length ? (
                <button
                  onClick={nextStep}
                  className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <span>Next Step</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="group flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
                >
                  <span>Submit Application</span>
                  <CheckCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Admission;
