import React from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const Achievements = ({ achievements, onChange }) => {
  const handleAdd = () => {
    onChange([...achievements, '']);
  };

  const handleRemove = (index) => {
    const newAchievements = achievements.filter((_, i) => i !== index);
    onChange(newAchievements);
  };

  const handleChange = (index, value) => {
    const newAchievements = [...achievements];
    newAchievements[index] = value;
    onChange(newAchievements);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Achievements</h3>
        <button
          type="button"
          onClick={handleAdd}
          className="text-blue-600 hover:text-blue-700 flex items-center"
        >
          <FaPlus className="mr-1" /> Add Achievement
        </button>
      </div>
      
      {achievements.map((achievement, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            value={achievement}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder="Enter your achievement"
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="text-red-600 hover:text-red-700 p-2"
          >
            <FaTrash />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Achievements;
