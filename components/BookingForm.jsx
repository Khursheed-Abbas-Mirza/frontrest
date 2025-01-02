"use client"
import { useState } from "react";

// Modal Component
function Modal({ isOpen, message, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
        <p className="text-lg font-bold text-black">{message.msg}</p>
      
        <p className="text-xs text-black"><b>Order_id:{message.order_id}</b></p>
        <p className="text-black">{message.order_id.length>0?"Thank you for your reservation plz remember your order_id":"please try another time slot"}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function BookingForm() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "",
    name: "",
    contact: "",
  });

  const [modal, setModal] = useState({ isOpen: false, message: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBooking = async(e) => {
    e.preventDefault();

    // Example logic to check for filled slots
   

    if (!formData.date || !formData.time || !formData.guests || !formData.name || !formData.contact) {
      setModal({ isOpen: true, message: "All fields are required." });
      return;
    }
    const isSlotFilled = await fetch('https://backend-0hgc.onrender.com/api/check',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        date:formData.date,
        time:formData.time,
      })
    })

    const isFilled=await isSlotFilled.json()
    if(!isFilled.available){
      setModal({ isOpen: true, message: {msg:"Sorry, this slot is already filled.",order_id:""} });
      return;
    }
    const response = await fetch("https://backend-0hgc.onrender.com/api/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const res=await response.json()
    
    setModal({ isOpen: true, message:{ msg:"Booking Confirmed! Thank you for your reservation.",order_id:res.order_id} });
    setFormData({ date: "", time: "", guests: "", name: "", contact: "" });
    return 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Restaurant Booking</h2>
        <form onSubmit={handleBooking} className="space-y-4">
          <div>
            <label htmlFor="date" className="block text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded text-gray-900 bg-white focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-gray-700">
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded text-gray-900 bg-white focus:outline-none focus:ring focus:ring-blue-500"
              min="12:00"
              max="22:00"
              required
            />
          </div>
          <div>
            <label htmlFor="guests" className="block text-gray-700">
              Number of Guests
            </label>
            <input
              type="number"
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded text-gray-900 bg-white focus:outline-none focus:ring focus:ring-blue-500"
              min="1"
              required
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded text-gray-900 bg-white focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="contact" className="block text-gray-700">
              Contact
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded text-gray-900 bg-white focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring focus:ring-green-500"
          >
            Book Now
          </button>
        </form>
      </div>

      {/* Popup Modal */}
      <Modal
        isOpen={modal.isOpen}
        message={modal.message}
        onClose={() => setModal({ isOpen: false, message: "" })}
      />
    </div>
  );
}
