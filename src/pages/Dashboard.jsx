import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Bot, Settings, Award, CheckCircle } from 'lucide-react';
import { Button } from "../components/ui/button";
import { useAuth } from '../context/AuthContext';

const features = [
  {
    icon: <Bot className="w-6 h-6" />,
    title: 'AI-Powered Writing',
    description: 'Let our AI help you craft the perfect resume and cover letter tailored to your industry.'
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'ATS-Friendly Templates',
    description: 'Our templates are designed to pass Applicant Tracking Systems and catch the recruiter\'s eye.'
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Industry-Specific Content',
    description: 'Get suggestions and templates specific to your industry and job role.'
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: 'Professional Review',
    description: 'AI-powered review ensures your documents meet professional standards.'
  }
];

const steps = [
  {
    number: "01",
    title: "Choose Your Document",
    description: "Select whether you want to create a resume or cover letter"
  },
  {
    number: "02",
    title: "Input Your Details",
    description: "Provide your experience and preferences"
  },
  {
    number: "03",
    title: "AI Generation",
    description: "Our AI crafts your professional document"
  },
  {
    number: "04",
    title: "Download & Apply",
    description: "Get your polished document ready for applications"
  }
];

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleCreateResume = () => {
    navigate('/create-resume');
  };

  const handleCreateCoverLetter = () => {
    navigate('/create-cover-letter');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16"> 
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
            alt="Hero background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-700/90 z-10"></div>
        
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                Create Your Perfect Resume Today
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl mb-8 text-gray-100"
              >
                Stand out from the crowd with our AI-powered resume and cover letter builder
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-x-4"
              >
                <Button
                  onClick={handleCreateResume}
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Create Resume
                </Button>
                <Button
                  onClick={handleCreateCoverLetter}
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Create Cover Letter
                </Button>
              </motion.div>
            </div>
            <div className="hidden md:block">
              <motion.img
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
                alt="Resume Example"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center items-start space-y-8 md:space-y-0 md:space-x-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col items-center text-center max-w-sm mx-auto"
            >
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4 text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-2">Choose Your Document</h3>
              <p className="text-gray-600">Select between creating a resume or cover letter</p>
            </motion.div>
            <div className="hidden md:block w-12 h-1 md:w-1 md:h-24 bg-blue-600/20 rounded"></div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1 flex flex-col items-center text-center max-w-sm mx-auto"
            >
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4 text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-2">Fill Your Details</h3>
              <p className="text-gray-600">Input your information or let our AI help you</p>
            </motion.div>
            <div className="hidden md:block w-12 h-1 md:w-1 md:h-24 bg-blue-600/20 rounded"></div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex-1 flex flex-col items-center text-center max-w-sm mx-auto"
            >
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4 text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-2">Download & Apply</h3>
              <p className="text-gray-600">Get your professional document ready to use</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ResumeAI</h3>
              <p className="text-gray-400">Creating professional documents made easy</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/templates" className="text-gray-400 hover:text-white">Templates</Link></li>
                <li><Link to="/profile" className="text-gray-400 hover:text-white">Profile</Link></li>
                <li><Link to="/settings" className="text-gray-400 hover:text-white">Settings</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">support@resumeai.com</li>
                <li className="text-gray-400">1-800-RESUME-AI</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;