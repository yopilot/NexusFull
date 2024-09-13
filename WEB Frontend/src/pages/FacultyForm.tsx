import { useState } from 'react';

interface FormData {
  name: string;
  employeeId: string;
  specialization: string;
  department: string;
  email: string;
  phone: string;
  joiningDate: string;
}

const FacultyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    employeeId: '',
    specialization: '',
    department: '',
    email: '',
    phone: '',
    joiningDate: '',
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setShowPopup(true);
      setFormData({
        name: '',
        employeeId: '',
        specialization: '',
        department: '',
        email: '',
        phone: '',
        joiningDate: '',
      });
      setTimeout(() => setShowPopup(false), 3000); 
    }, 1000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-gray-900 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-3xl font-bold text-pink-300 mb-6">Add New Faculty</h2>
        
        <div className="mb-4">
          <label className="block text-purple-300 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
            id="name"
            type="text"
            placeholder="Enter faculty name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-purple-300 text-sm font-bold mb-2" htmlFor="employeeId">
            Employee ID
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
            id="employeeId"
            type="text"
            placeholder="Enter employee ID"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-purple-300 text-sm font-bold mb-2" htmlFor="specialization">
            Specialization
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
            id="specialization"
            type="text"
            placeholder="Enter area of specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-purple-300 text-sm font-bold mb-2" htmlFor="department">
            Department
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
            id="department"
            type="text"
            placeholder="Enter department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-purple-300 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
            id="email"
            type="email"
            placeholder="Enter email address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-purple-300 text-sm font-bold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
            id="phone"
            type="tel"
            placeholder="Enter phone number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-purple-300 text-sm font-bold mb-2" htmlFor="joiningDate">
            Joining Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
            id="joiningDate"
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            className="bg-gradient-to-r from-pink-300 to-purple-500 hover:from-pink-400 hover:to-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Faculty
          </button>
        </div>
      
      </form>
      <img
              src='src\assets\pages-svgrepo-com.svg'
              alt="SVG"
              style={{ width: '150px', height: '200px' }}
              className="absolute top-12 left-12"
          />
         
      {showPopup && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          Faculty added successfully!
        </div>
      )}
    </div>
  );
};

export default FacultyForm;