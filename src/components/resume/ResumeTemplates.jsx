import { FaBriefcase, FaGraduationCap, FaTools, FaCertificate, FaHeart, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const DefaultTemplate = ({ children, className = '' }) => (
  <div className={`max-w-4xl mx-auto p-8 bg-white shadow-lg ${className}`}>
    {children}
  </div>
);

export const templates = {
  modern: {
    name: 'Modern',
    component: ({ data = {} }) => {
      const {
        personalInfo = {},
        experience = [],
        education = [],
        skills = [],
        projects = [],
        hobbies = [],
      } = data;

      return (
        <DefaultTemplate>
          {/* Header */}
          <div className="border-b-2 border-gray-300 pb-4 mb-6">
            <h1 className="text-4xl font-bold text-gray-800">{personalInfo.name || 'Your Name'}</h1>
            <div className="text-gray-600 mt-2">
              <p>{personalInfo.email || 'email@example.com'} | {personalInfo.phone || 'Phone Number'}</p>
              <p>{personalInfo.location || 'Location'}</p>
            </div>
          </div>

          {/* Work Experience */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <FaBriefcase className="mr-2 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-gray-800">Work Experience</h2>
            </div>
            {experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">{exp.title || 'Position'}</h3>
                <p className="text-gray-600">{exp.company || 'Company'} | {exp.duration || 'Duration'}</p>
                <ul className="list-disc ml-5 mt-2">
                  {(exp.responsibilities || []).map((resp, idx) => (
                    <li key={idx} className="text-gray-700">{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <FaGraduationCap className="mr-2 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-gray-800">Education</h2>
            </div>
            {education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">{edu.degree || 'Degree'}</h3>
                <p className="text-gray-600">{edu.school || 'School'} | {edu.duration || 'Duration'}</p>
                <p className="text-gray-700">{edu.description || ''}</p>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <FaTools className="mr-2 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-gray-800">Skills</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <FaCertificate className="mr-2 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-gray-800">Projects</h2>
            </div>
            {projects.map((project, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">{project.name || 'Project Name'}</h3>
                <p className="text-gray-600">{project.technologies || 'Technologies Used'}</p>
                <p className="text-gray-700">{project.description || ''}</p>
              </div>
            ))}
          </div>

          {/* Hobbies */}
          <div>
            <div className="flex items-center mb-3">
              <FaHeart className="mr-2 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-gray-800">Hobbies</h2>
            </div>
            <p className="text-gray-700">{hobbies.join(', ')}</p>
          </div>
        </DefaultTemplate>
      );
    },
  },

  professional: {
    name: 'Professional',
    component: ({ data = {} }) => {
      const {
        personalInfo = {},
        experience = [],
        education = [],
        skills = [],
        projects = [],
      } = data;

      return (
        <DefaultTemplate className="font-serif">
          {/* Header */}
          <div className="text-center border-b-2 border-gray-800 pb-4 mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-2">{personalInfo.name || 'Your Name'}</h1>
            <div className="flex justify-center items-center space-x-4 text-gray-700">
              <span className="flex items-center"><FaEnvelope className="mr-1" /> {personalInfo.email}</span>
              <span className="flex items-center"><FaPhone className="mr-1" /> {personalInfo.phone}</span>
              <span className="flex items-center"><FaMapMarkerAlt className="mr-1" /> {personalInfo.location}</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-400 mb-3">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.objective || 'Professional summary goes here'}</p>
          </div>

          {/* Experience */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-400 mb-3">Experience</h2>
            {experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
                  <span className="text-gray-600">{exp.duration}</span>
                </div>
                <p className="text-gray-700 font-semibold mb-2">{exp.company}</p>
                <ul className="list-disc ml-5">
                  {(exp.responsibilities || []).map((resp, idx) => (
                    <li key={idx} className="text-gray-700 mb-1">{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-400 mb-3">Skills</h2>
            <div className="grid grid-cols-3 gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="text-gray-700">{skill}</span>
              ))}
            </div>
          </div>
        </DefaultTemplate>
      );
    },
  },

  minimal: {
    name: 'Minimal',
    component: ({ data = {} }) => {
      const {
        personalInfo = {},
        experience = [],
        education = [],
        skills = [],
        projects = [],
      } = data;

      return (
        <DefaultTemplate className="font-sans">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-light text-gray-900 mb-2">{personalInfo.name || 'Your Name'}</h1>
            <div className="text-gray-600 space-x-2">
              <span>{personalInfo.email}</span>
              <span>•</span>
              <span>{personalInfo.phone}</span>
              <span>•</span>
              <span>{personalInfo.location}</span>
            </div>
          </div>

          {/* Experience */}
          <div className="mb-8">
            <h2 className="text-lg uppercase tracking-wider text-gray-500 mb-4">Experience</h2>
            {experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between mb-1">
                  <h3 className="font-medium text-gray-900">{exp.title}</h3>
                  <span className="text-gray-500">{exp.duration}</span>
                </div>
                <p className="text-gray-700 mb-2">{exp.company}</p>
                <ul className="list-disc ml-5 text-gray-600">
                  {(exp.responsibilities || []).map((resp, idx) => (
                    <li key={idx} className="mb-1">{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h2 className="text-lg uppercase tracking-wider text-gray-500 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </DefaultTemplate>
      );
    },
  },

  creative: {
    name: 'Creative',
    component: ({ data = {} }) => {
      const {
        personalInfo = {},
        experience = [],
        education = [],
        skills = [],
        projects = [],
      } = data;

      return (
        <DefaultTemplate className="bg-gradient-to-br from-indigo-50 to-white">
          {/* Header */}
          <div className="relative pb-8 mb-8">
            <div className="absolute inset-0 bg-indigo-600 transform -skew-y-3"></div>
            <div className="relative text-center py-8">
              <h1 className="text-5xl font-bold text-white mb-2">{personalInfo.name || 'Your Name'}</h1>
              <div className="text-indigo-100 space-x-4">
                <span>{personalInfo.email}</span>
                <span>|</span>
                <span>{personalInfo.phone}</span>
                <span>|</span>
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4 flex items-center">
              <FaBriefcase className="mr-2" /> Experience
            </h2>
            {experience.map((exp, index) => (
              <div key={index} className="mb-6 bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
                  <span className="text-indigo-600">{exp.duration}</span>
                </div>
                <p className="text-gray-700 font-medium mb-2">{exp.company}</p>
                <ul className="list-none space-y-2">
                  {(exp.responsibilities || []).map((resp, idx) => (
                    <li key={idx} className="text-gray-600 flex items-start">
                      <span className="text-indigo-500 mr-2">›</span>
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4 flex items-center">
              <FaTools className="mr-2" /> Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <div key={index} className="bg-white p-3 rounded-lg shadow-md text-center transform hover:-translate-y-1 transition-transform duration-200">
                  <span className="text-gray-700">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </DefaultTemplate>
      );
    },
  },
};
