import React, { useState } from 'react';
import { generateCoverLetter, customizeCoverLetter } from '../services/gemini';
import { generatePDF, saveDraft, updateDraft } from '../services/documentUtils';
import { toast } from 'react-hot-toast';
import { FaDownload, FaSave } from 'react-icons/fa';

function CoverLetterBuilder() {
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    experience: '',
    skills: '',
    userBackground: '',
  });
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [draftId, setDraftId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const content = await generateCoverLetter(
        formData.jobTitle,
        formData.company,
        formData.experience,
        formData.skills,
        formData.userBackground
      );
      setCoverLetter(content);
      toast.success('Cover letter generated successfully!');
    } catch (error) {
      console.error('Error generating cover letter:', error);
      toast.error('Failed to generate cover letter');
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = async () => {
    if (!coverLetter) {
      toast.error('Please generate a cover letter first');
      return;
    }

    try {
      setLoading(true);
      const contentRef = document.getElementById('cover-letter-content');
      if (!contentRef) {
        throw new Error('Cover letter content not found');
      }
      
      const fileName = `Cover_Letter_${formData.company}`;
      await generatePDF(contentRef, fileName);
      toast.success('Cover letter exported successfully!');
    } catch (error) {
      console.error('Error exporting cover letter:', error);
      toast.error('Failed to export cover letter');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!coverLetter) {
      toast.error('Please generate a cover letter first');
      return;
    }

    setSavingDraft(true);
    try {
      const draftContent = {
        formData,
        coverLetter,
      };

      if (draftId) {
        await updateDraft(draftId, draftContent);
      } else {
        const result = await saveDraft(draftContent, 'coverLetter');
        setDraftId(result.id);
      }
      toast.success('Draft saved successfully!');
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error('Failed to save draft');
    } finally {
      setSavingDraft(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Cover Letter Builder</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Key Skills</label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Professional Background</label>
              <textarea
                name="userBackground"
                value={formData.userBackground}
                onChange={handleInputChange}
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? 'Generating...' : 'Generate Cover Letter'}
              </button>
            </div>
          </form>
        </div>

        {/* Preview Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Preview</h2>
            <div className="space-x-2">
              <button
                onClick={handleExportPDF}
                disabled={!coverLetter || loading}
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 inline-flex items-center"
              >
                <FaDownload className="mr-2" />
                {loading ? 'Exporting...' : 'Export PDF'}
              </button>
              <button
                onClick={handleSaveDraft}
                disabled={!coverLetter || savingDraft}
                className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 inline-flex items-center"
              >
                <FaSave className="mr-2" />
                {savingDraft ? 'Saving...' : 'Save Draft'}
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : coverLetter ? (
            <div id="cover-letter-content" className="prose max-w-none">
              <div className="whitespace-pre-wrap p-8 bg-white">
                {coverLetter}
              </div>
            </div>
          ) : (
            <div className="text-gray-500 text-center h-64 flex items-center justify-center">
              Your cover letter will appear here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CoverLetterBuilder;
