import { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { templates } from '../components/resume/ResumeTemplates';
import WorkExperience from '../components/resume/WorkExperience';
import Education from '../components/resume/Education';
import Skills from '../components/resume/Skills';
import Projects from '../components/resume/Projects';
import { FaDownload, FaSave, FaMagic } from 'react-icons/fa';
import { generateFullResume } from '../services/gemini';
import { generatePDF, saveDraft, updateDraft } from '../services/documentUtils';

const initialResumeData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
    jobTitle: '',
    experience: '',
    industry: '',
    objective: ''
  },
  experience: [{
    title: '',
    company: '',
    duration: '',
    industry: '',
    responsibilities: ['']
  }],
  education: [{
    degree: '',
    school: '',
    field: '',
    duration: '',
    description: ''
  }],
  skills: [''],
  projects: [{
    name: '',
    technologies: '',
    industry: '',
    description: ''
  }]
};

function ResumeBuilder() {
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [loading, setLoading] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [draftId, setDraftId] = useState(null);
  const resumeRef = useRef();

  const handleExportPDF = async () => {
    if (!resumeRef.current) {
      toast.error('Resume content not ready');
      return;
    }

    try {
      setLoading(true);
      const fileName = `${resumeData.personalInfo.name || 'My'}_Resume`;
      await generatePDF(resumeRef.current, fileName);
      toast.success('Resume exported successfully!');
    } catch (error) {
      console.error('Error exporting resume:', error);
      toast.error('Failed to export resume');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!resumeData.personalInfo.name) {
      toast.error('Please fill in at least your name before saving');
      return;
    }

    setSavingDraft(true);
    try {
      const draftContent = {
        resumeData,
        selectedTemplate,
        lastModified: new Date().toISOString()
      };

      if (draftId) {
        await updateDraft(draftId, draftContent);
      } else {
        const result = await saveDraft(draftContent, 'resume');
        setDraftId(result.id);
      }
      toast.success('Resume draft saved successfully!');
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error('Failed to save resume draft');
    } finally {
      setSavingDraft(false);
    }
  };

  const handleAIGenerate = async () => {
    if (!resumeData.personalInfo.jobTitle || !resumeData.personalInfo.industry) {
      toast.error('Please fill in job title and industry first');
      return;
    }

    setGenerating(true);
    try {
      const generatedContent = await generateFullResume(resumeData);
      setResumeData(prevData => ({
        ...prevData,
        ...generatedContent
      }));
      toast.success('Resume content generated successfully!');
    } catch (error) {
      console.error('Error generating resume:', error);
      toast.error('Failed to generate resume content');
    } finally {
      setGenerating(false);
    }
  };

  const handlePersonalInfoChange = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const TemplateComponent = templates[selectedTemplate].component;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Resume Builder</h1>
        <div className="space-x-2">
          <button
            onClick={handleExportPDF}
            disabled={loading}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 inline-flex items-center"
          >
            <FaDownload className="mr-2" />
            {loading ? 'Exporting...' : 'Export PDF'}
          </button>
          <button
            onClick={handleSaveDraft}
            disabled={savingDraft}
            className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 inline-flex items-center"
          >
            <FaSave className="mr-2" />
            {savingDraft ? 'Saving...' : 'Save Draft'}
          </button>
          <button
            onClick={handleAIGenerate}
            disabled={generating}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 inline-flex items-center"
          >
            <FaMagic className="mr-2" />
            {generating ? 'Generating...' : 'AI Generate'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          {/* Personal Information */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Resume Details</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(initialResumeData.personalInfo).map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700">
                      {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                    </label>
                    <input
                      type="text"
                      value={resumeData.personalInfo[field]}
                      onChange={(e) => handlePersonalInfoChange(field, e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={handleAIGenerate}
                disabled={generating}
                className="flex items-center gap-2 w-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FaMagic /> {generating ? 'Generating...' : 'AI Generate'}
              </button>
            </div>
          </div>

          {/* Work Experience */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <WorkExperience
              experience={resumeData.experience}
              onChange={(newExperience) =>
                setResumeData(prev => ({ ...prev, experience: newExperience }))
              }
            />
          </div>

          {/* Education */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Education
              education={resumeData.education}
              onChange={(newEducation) =>
                setResumeData(prev => ({ ...prev, education: newEducation }))
              }
            />
          </div>

          {/* Skills */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Skills
              skills={resumeData.skills}
              jobInfo={resumeData.personalInfo}
              onChange={(newSkills) =>
                setResumeData(prev => ({ ...prev, skills: newSkills }))
              }
            />
          </div>

          {/* Projects */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Projects
              projects={resumeData.projects}
              onChange={(newProjects) =>
                setResumeData(prev => ({ ...prev, projects: newProjects }))
              }
            />
          </div>

          {/* Template Selection */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Select Template</h3>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {Object.keys(templates).map((template) => (
                <option key={template} value={template}>
                  {templates[template].name}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleExportPDF}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              <FaDownload /> {loading ? 'Exporting...' : 'Export PDF'}
            </button>
            <button
              onClick={handleSaveDraft}
              disabled={savingDraft}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              <FaSave className="mr-2" />
              {savingDraft ? 'Saving...' : 'Save Draft'}
            </button>
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Preview</h2>
          <div ref={resumeRef} className="w-full">
            <TemplateComponent data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;
