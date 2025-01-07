import React from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Extracurricular = ({ activities, onChange }) => {
  const handleAdd = () => {
    onChange([...activities, {
      title: '',
      organization: '',
      date: '',
      description: ''
    }]);
  };

  const handleRemove = (index) => {
    onChange(activities.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updatedActivities = activities.map((activity, i) => {
      if (i === index) {
        return { ...activity, [field]: value };
      }
      return activity;
    });
    onChange(updatedActivities);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Extracurricular Activities & Achievements</h3>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <FaPlus size={12} />
          Add Activity
        </button>
      </div>

      {activities.map((activity, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gray-50 rounded-lg space-y-3"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title/Achievement</label>
                <input
                  type="text"
                  value={activity.title}
                  onChange={(e) => handleChange(index, 'title', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., Student Body President"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Organization</label>
                <input
                  type="text"
                  value={activity.organization}
                  onChange={(e) => handleChange(index, 'organization', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., University Student Council"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date/Duration</label>
                <input
                  type="text"
                  value={activity.date}
                  onChange={(e) => handleChange(index, 'date', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., 2022 - 2023"
                />
              </div>
            </div>
            <button
              onClick={() => handleRemove(index)}
              className="ml-4 text-red-600 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={activity.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Describe your role, achievements, and impact..."
            />
          </div>
        </motion.div>
      ))}

      {activities.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No activities added yet. Click "Add Activity" to get started.
        </div>
      )}
    </div>
  );
};

export default Extracurricular;
