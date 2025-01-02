"use client";
import { useState, useEffect } from "react";

export default function ShowBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings from the backend
  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await fetch("https://backend-0hgc.onrender.com/api/getbookings"); // Adjust API endpoint if needed
        const data = await response.json();
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/rest.jpeg')" }}>
        <p className="text-white font-medium text-lg bg-opacity-80 bg-black px-4 py-2 rounded-lg">Loading bookings...</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/rest.jpeg')" }}>
        <p className="text-white font-medium text-lg bg-opacity-80 bg-black px-4 py-2 rounded-lg">
          No bookings found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center py-8" style={{ backgroundImage: "url('/loading.jpg')" }}>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-6 text-center bg-opacity-80 bg-black px-4 py-2 rounded-lg">
          All Bookings
        </h1>

        {/* Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
           
            <div
              key={booking.id}
              className="p-4 bg-white bg-opacity-90 text-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >  
              <p className="text-lg font-semibold mb-2">Name: {booking.doc.name}</p>
              <p className="text-gray-600 mb-2">Date: {booking.doc.date}</p>
              <p className="text-gray-600 mb-2">Time: {booking.doc.time}</p>
              <p className="text-gray-600">Guests: {booking.doc.guests}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
