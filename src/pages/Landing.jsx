import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaEnvelope, FaMagic, FaDownload, FaCloud, FaLock, FaCheckCircle, FaUsers } from 'react-icons/fa';
import { BiTargetLock } from 'react-icons/bi';
import { MdOutlineDesignServices } from 'react-icons/md';
import { AiOutlineThunderbolt } from 'react-icons/ai';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaMagic className="text-4xl text-blue-500" />,
      title: "AI-Powered Content Generation",
      description: "Leverage advanced AI to create professional resumes and cover letters tailored to your industry."
    },
    {
      icon: <MdOutlineDesignServices className="text-4xl text-purple-500" />,
      title: "Professional Templates",
      description: "Choose from a variety of ATS-friendly templates designed by industry experts."
    },
    {
      icon: <BiTargetLock className="text-4xl text-green-500" />,
      title: "Job-Specific Targeting",
      description: "Customize your documents to match specific job requirements and company culture."
    },
    {
      icon: <AiOutlineThunderbolt className="text-4xl text-yellow-500" />,
      title: "Real-Time Preview",
      description: "See changes instantly with our live preview feature as you build your documents."
    },
    {
      icon: <FaCloud className="text-4xl text-cyan-500" />,
      title: "Cloud Storage",
      description: "Securely save and access your documents from anywhere, anytime."
    },
    {
      icon: <FaLock className="text-4xl text-red-500" />,
      title: "Privacy Focused",
      description: "Your data is encrypted and protected with enterprise-grade security."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      content: "This platform helped me land my dream job! The AI suggestions were spot-on and the templates are truly professional.",
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      name: "Michael Chen",
      role: "Marketing Manager",
      content: "The cover letter builder is incredible. It helped me customize my application for each company while maintaining professionalism.",
      image: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      name: "Emily Davis",
      role: "UX Designer",
      content: "Clean interface, intuitive design, and powerful features. This is exactly what I needed for my job search.",
      image: "https://randomuser.me/api/portraits/women/3.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Create Stunning Resumes & <span className="text-blue-600">Cover Letters</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Powered by AI, designed for success. Build professional documents that stand out and get you noticed by top employers.
            </p>
            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/create-resume')}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <FaFileAlt /> Create Resume
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/create-cover-letter')}
                className="px-8 py-4 bg-purple-600 text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-purple-700 transition-colors"
              >
                <FaEnvelope /> Write Cover Letter
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need to create professional documents</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-xl">Resumes Created</div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-xl">Success Rate</div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.4 }}
            >
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-xl">Support Available</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied professionals</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Build Your Future?</h2>
            <p className="text-xl text-gray-600 mb-8">Start creating your professional resume today</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/create-resume')}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold inline-flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <FaFileAlt /> Get Started Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
