"use client"
import { useState } from "react";

export default function CancelBooking() {
  const [formData, setFormData] = useState({
    name: "",
    orderId: "",
  });

  const [showModal, setShowModal] = useState(false); // State for popup
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Mock API Call Simulation
    if (formData.name && formData.orderId) {
    const response=await fetch('https://backend-0hgc.onrender.com/api/deletebooking', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    const res=await response.json()
    if(res.success){
        
        setModalMessage("Your order has been canceled successfully.");
        setShowModal(true);
        setFormData({ name: "", orderId: "" }); // Reset form
    }
    } else {
      setModalMessage("Please fill in all fields.");
      setShowModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-[#00ff00] mb-6">
          Cancel Your Order
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-[#00ff00] text-sm mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:ring-[#00ff00]"
              placeholder="Enter your name"
            />
          </div>

          {/* Order ID Field */}
          <div>
            <label
              htmlFor="orderId"
              className="block text-[#00ff00] text-sm mb-2"
            >
              Order ID
            </label>
            <input
              type="text"
              id="orderId"
              name="orderId"
              value={formData.orderId}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:ring-[#00ff00]"
              placeholder="Enter your order ID"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#00ff00] text-black px-4 py-2 rounded-md font-semibold shadow-md hover:bg-[#00cc00] transition"
          >
            Cancel Booking
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
