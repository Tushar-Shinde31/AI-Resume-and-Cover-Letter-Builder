import { useState } from 'react';
import { FaMagic, FaPlus, FaTrash } from 'react-icons/fa';
import { generateSkills } from '../../services/gemini';

export default function Skills({ skills, jobInfo, onChange }) {
  const [loading, setLoading] = useState(false);

  const addSkill = () => {
    onChange([...skills, '']);
  };

  const removeSkill = (index) => {
    onChange(skills.filter((_, i) => i !== index));
  };

  const updateSkill = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    onChange(newSkills);
  };

  const generateAIContent = async () => {
    try {
      setLoading(true);
      const generatedContent = await generateSkills(
        jobInfo.title,
        jobInfo.experience,
        jobInfo.industry
      );
      
      // Split the generated content into individual skills
      const skillsList = generatedContent
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill);

      onChange(skillsList);
    } catch (error) {
      console.error('Error generating skills:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Skills</h3>
        <div className="flex gap-2">
          <button
            onClick={generateAIContent}
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
            disabled={loading}
          >
            <FaMagic /> {loading ? 'Generating...' : 'Generate with AI'}
          </button>
          <button
            onClick={addSkill}
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
          >
            <FaPlus /> Add Skill
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={skill}
              onChange={(e) => updateSkill(index, e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., JavaScript"
            />
            <button
              onClick={() => removeSkill(index)}
              className="text-red-600 hover:text-red-800"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      {skills.length === 0 && (
        <p className="text-gray-500 text-center">
          No skills added yet. Click "Add Skill" or use AI to generate skills.
        </p>
      )}
    </div>
  );
}
