import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";

const UserBookings = ({ onBookingChange }) => {
  // added prop to trigger seat refresh
  const { user, token } = useUser();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user || !token) return;

      try {
        const res = await axios.get("http://localhost:3001/api/bookings/user", {
          headers: {
            "x-auth-token": token,
          },
        });
        setBookings(res.data);
      } catch (err) {
        console.error(err.response.data);
        alert(err.response.data.message || "Failed to fetch bookings");
      }
    };

    fetchBookings();
  }, [user, token]);

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await axios.put(
          `http://localhost:3001/api/bookings/${bookingId}/cancel`,
          {},
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        alert("Booking cancelled successfully!");
        if (onBookingChange) onBookingChange(); // notify SeatSelection to refresh
        const res = await axios.get("http://localhost:3001/api/bookings/user", {
          headers: {
            "x-auth-token": token,
          },
        });
        setBookings(res.data);
      } catch (err) {
        console.error(err.response.data);
        alert(err.response.data.message || "Failed to cancel booking");
      }
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto p-4">
        Please log in to view your bookings.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold mb-2">
                Show ID: {booking.show_id}
              </h2>
              <p className="text-gray-700">Seats: {booking.seats.join(", ")}</p>
              <p className="text-gray-700">Status: {booking.status}</p>
              <p className="text-gray-500 text-sm">Booking ID: {booking.id}</p>
              {booking.status !== "cancelled" && (
                <button
                  onClick={() => handleCancelBooking(booking.id)}
                  className="mt-4 bg-red-300 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookings;
