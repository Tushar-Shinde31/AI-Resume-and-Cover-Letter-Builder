import { FaPlus, FaTrash } from 'react-icons/fa';

function Hobbies({ hobbies, onChange }) {
  const addHobby = () => {
    onChange([...hobbies, '']);
  };

  const removeHobby = (index) => {
    const newHobbies = hobbies.filter((_, i) => i !== index);
    onChange(newHobbies);
  };

  const updateHobby = (index, value) => {
    const newHobbies = [...hobbies];
    newHobbies[index] = value;
    onChange(newHobbies);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Hobbies & Interests</h3>
        <button
          type="button"
          onClick={addHobby}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FaPlus className="mr-2" /> Add Hobby
        </button>
      </div>
      
      <div className="space-y-4">
        {hobbies.map((hobby, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={hobby}
              onChange={(e) => updateHobby(index, e.target.value)}
              placeholder="Enter a hobby or interest"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => removeHobby(index)}
              className="inline-flex items-center p-2 border border-transparent rounded-md text-red-600 hover:text-red-700 focus:outline-none"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hobbies;
