import { useState } from 'react';
import { FaMagic, FaPlus, FaTrash } from 'react-icons/fa';
import { generateProject } from '../../services/gemini';

export default function Projects({ projects, onChange }) {
  const [loading, setLoading] = useState(false);

  const addProject = () => {
    onChange([...projects, {
      name: '',
      technologies: '',
      industry: '',
      description: ''
    }]);
  };

  const removeProject = (index) => {
    onChange(projects.filter((_, i) => i !== index));
  };

  const updateProject = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    onChange(newProjects);
  };

  const generateAIContent = async (index) => {
    const project = projects[index];
    try {
      setLoading(true);
      const generatedContent = await generateProject(
        project.name,
        project.technologies,
        project.industry
      );
      updateProject(index, 'description', generatedContent);
    } catch (error) {
      console.error('Error generating project description:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Projects</h3>
        <button
          onClick={addProject}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
        >
          <FaPlus /> Add Project
        </button>
      </div>

      {projects.map((project, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => removeProject(index)}
              className="text-red-600 hover:text-red-800"
            >
              <FaTrash />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Name</label>
              <input
                type="text"
                value={project.name}
                onChange={(e) => updateProject(index, 'name', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Technologies Used</label>
              <input
                type="text"
                value={project.technologies}
                onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="e.g., React, Node.js, MongoDB"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Industry/Domain</label>
              <input
                type="text"
                value={project.industry}
                onChange={(e) => updateProject(index, 'industry', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="e.g., E-commerce, Healthcare, Education"
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
              value={project.description}
              onChange={(e) => updateProject(index, 'description', e.target.value)}
              rows={4}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Describe the project, its impact, and your role"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
