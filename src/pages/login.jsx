import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, FileText, Users, Shield } from 'lucide-react';
import AppContext from '../contexts/AppContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginUser } = useContext(AppContext);

  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await loginUser(credentials);
      if (res && res.success) {
        // Redirect based on user role
        const userRole = res.user?.role;
        if (userRole === 'admin') {
          navigate('/admin');
        } else if (userRole === 'staff') {
          navigate('/admin'); // Staff can also access admin panel
        } else {
          navigate('/'); // Students go to home page
        }
      } else if (res && res.message) {
        alert(res.message);
      }
    } catch (error) {
      console.error('Unexpected login error:', error);
      alert('Unexpected login error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex">
          <div className="w-full lg:w-1/2 p-8 lg:p-10">
            <div className="max-w-sm mx-auto">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Hello!</h1>
                <p className="text-gray-600">Sign in to your account.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={credentials.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                      placeholder="Email"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={credentials.password}
                      onChange={handleChange}
                      className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                      placeholder="Password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>SIGN IN</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-8 right-8 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
              <div className="absolute top-16 right-16 w-24 h-24 bg-white/30 rounded-full blur-lg"></div>
              <div className="absolute bottom-16 right-12 w-40 h-40 bg-white/15 rounded-full blur-xl"></div>
              <div className="absolute bottom-8 right-24 w-20 h-20 bg-white/25 rounded-full blur-lg"></div>
              <div className="absolute top-1/3 left-8 w-16 h-16 bg-white/20 rounded-full blur-lg"></div>
              <div className="absolute bottom-1/3 left-16 w-12 h-12 bg-white/30 rounded-full blur-md"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-white/15 rounded-full blur-lg"></div>
            </div>

            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-10">
              <h2 className="text-4xl font-bold text-white mb-6">Online Student Admission System</h2>
              <div className="flex items-center justify-center space-x-6 mb-6">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white/80 text-xs">Applications</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white/80 text-xs">Students</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white/80 text-xs">Security</span>
                </div>
              </div>

              <p className="text-white/90 text-base leading-relaxed max-w-xs">
                Streamline your student admission process with our comprehensive system. Manage applications, track admissions, and process student data efficiently.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
