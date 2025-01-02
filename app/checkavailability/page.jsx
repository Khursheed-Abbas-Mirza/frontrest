"use client"
import { useState } from "react";

export default function CancelBooking() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
  });

  const [showModal, setShowModal] = useState(false); // State for popup
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (formData.date && formData.time) {
    const response=await fetch('https://backend-0hgc.onrender.com/api/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    const res=await response.json()
   
    if(res.available){
        setModalMessage("Your slot is available come with hurray let's have a fun.");
        setShowModal(true);
        setFormData({ date: "",time: "" }); // Reset form
    }
    else {
        setModalMessage("Sorry Your Desired slot is not available. can please try another time slot.");
        setShowModal(true);
      }
    } 
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-[#00ff00] mb-6">
          Check Your Time slot
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-[#00ff00] text-sm mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-gray-900 bg-white focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          {/* Order ID Field */}
          <div>
            <label
              htmlFor="orderId"
              className="block text-[#00ff00] text-sm mb-2"
            >
              Time:
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-gray-900 bg-white focus:outline-none focus:ring focus:ring-blue-500"
              min="12:00"
              max="22:00"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#00ff00] text-black px-4 py-2 rounded-md font-semibold shadow-md hover:bg-[#00cc00] transition"
          >
            Check
          </button>
        </form>
      </div>

      {/* Popup Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="w-full max-w-sm bg-gray-900 text-center p-6 rounded-lg shadow-lg">
            <p className="text-[#00ff00] font-medium mb-4">{modalMessage}</p>
            <button
              className="bg-[#00ff00] text-black px-4 py-2 rounded-md font-semibold shadow-md hover:bg-[#00cc00] transition"
              onClick={() => setShowModal(false)} // Close the modal
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
