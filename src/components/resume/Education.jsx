import { useState } from 'react';
import { FaMagic, FaPlus, FaTrash } from 'react-icons/fa';
import { generateEducation } from '../../services/gemini';

export default function Education({ education, onChange }) {
  const [loading, setLoading] = useState(false);

  const addEducation = () => {
    onChange([...education, {
      degree: '',
      school: '',
      field: '',
      duration: '',
      description: ''
    }]);
  };

  const removeEducation = (index) => {
    onChange(education.filter((_, i) => i !== index));
  };

  const updateEducation = (index, field, value) => {
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    onChange(newEducation);
  };

  const generateAIContent = async (index) => {
    const edu = education[index];
    try {
      setLoading(true);
      const generatedContent = await generateEducation(
        edu.degree,
        edu.school,
        edu.field
      );
      updateEducation(index, 'description', generatedContent);
    } catch (error) {
      console.error('Error generating education description:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Education</h3>
        <button
          onClick={addEducation}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
        >
          <FaPlus /> Add Education
        </button>
      </div>

      {education.map((edu, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => removeEducation(index)}
              className="text-red-600 hover:text-red-800"
            >
              <FaTrash />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="e.g., Bachelor of Science"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Field of Study</label>
              <input
                type="text"
                value={edu.field}
                onChange={(e) => updateEducation(index, 'field', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="e.g., Computer Science"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">School</label>
              <input
                type="text"
                value={edu.school}
                onChange={(e) => updateEducation(index, 'school', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Duration</label>
              <input
                type="text"
                value={edu.duration}
                onChange={(e) => updateEducation(index, 'duration', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="e.g., 2018 - 2022"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <button
                onClick={() => generateAIContent(index)}
                className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
                disabled={loading}
              >
                <FaMagic /> {loading ? 'Generating...' : 'Generate with AI'}
              </button>
            </div>
            <textarea
              value={edu.description}
              onChange={(e) => updateEducation(index, 'description', e.target.value)}
              rows={4}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Describe your academic achievements, relevant coursework, etc."
            />
          </div>
        </div>
      ))}
    </div>
  );
}
