import { useState } from 'react';
import { FaMagic, FaPlus, FaTrash } from 'react-icons/fa';
import { generateWorkExperience } from '../../services/gemini';

export default function WorkExperience({ experience, onChange }) {
  const [loading, setLoading] = useState(false);

  const addExperience = () => {
    onChange([...experience, {
      title: '',
      company: '',
      duration: '',
      industry: '',
      responsibilities: ['']
    }]);
  };

  const removeExperience = (index) => {
    onChange(experience.filter((_, i) => i !== index));
  };

  const updateExperience = (index, field, value) => {
    const newExperience = [...experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    onChange(newExperience);
  };

  const addResponsibility = (expIndex) => {
    const newExperience = [...experience];
    newExperience[expIndex].responsibilities.push('');
    onChange(newExperience);
  };

  const updateResponsibility = (expIndex, respIndex, value) => {
    const newExperience = [...experience];
    newExperience[expIndex].responsibilities[respIndex] = value;
    onChange(newExperience);
  };

  const removeResponsibility = (expIndex, respIndex) => {
    const newExperience = [...experience];
    newExperience[expIndex].responsibilities = newExperience[expIndex].responsibilities
      .filter((_, i) => i !== respIndex);
    onChange(newExperience);
  };

  const generateAIContent = async (index) => {
    const exp = experience[index];
    try {
      setLoading(true);
      const generatedContent = await generateWorkExperience(
        exp.title,
        exp.company,
        exp.duration,
        exp.industry
      );
      
      // Split the generated content into bullet points
      const responsibilities = generatedContent
        .split('\n')
        .filter(item => item.trim())
        .map(item => item.replace(/^[•-]\s*/, ''));

      updateExperience(index, 'responsibilities', responsibilities);
    } catch (error) {
      console.error('Error generating work experience:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Work Experience</h3>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
        >
          <FaPlus /> Add Experience
        </button>
      </div>

      {experience.map((exp, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => removeExperience(index)}
              className="text-red-600 hover:text-red-800"
            >
              <FaTrash />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Title</label>
              <input
                type="text"
                value={exp.title}
                onChange={(e) => updateExperience(index, 'title', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateExperience(index, 'company', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Duration</label>
              <input
                type="text"
                value={exp.duration}
                onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="e.g., Jan 2020 - Present"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Industry</label>
              <input
                type="text"
                value={exp.industry}
                onChange={(e) => updateExperience(index, 'industry', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">Responsibilities</label>
              <div className="flex gap-2">
                <button
                  onClick={() => generateAIContent(index)}
                  className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
                  disabled={loading}
                >
                  <FaMagic /> {loading ? 'Generating...' : 'Generate with AI'}
                </button>
                <button
                  onClick={() => addResponsibility(index)}
                  className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
                >
                  <FaPlus /> Add
                </button>
              </div>
            </div>

            {exp.responsibilities.map((resp, respIndex) => (
              <div key={respIndex} className="flex gap-2">
                <input
                  type="text"
                  value={resp}
                  onChange={(e) => updateResponsibility(index, respIndex, e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <button
                  onClick={() => removeResponsibility(index, respIndex)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
