import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";

const UserBookings = ({ onBookingChange }) => {
  const { user, token } = useUser();
  const [bookings, setBookings] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user || !token) return;

      try {
        const res = await axios.get("http://localhost:3001/api/bookings/user", {
          headers: { "x-auth-token": token },
        });
        setBookings(res.data);
      } catch (err) {
        console.error(err.response.data);
        alert(err.response.data.message || "Failed to fetch bookings");
      }
    };

    fetchBookings();
  }, [user, token]);

  const confirmCancelBooking = (bookingId) => {
    setBookingToCancel(bookingId);
    setShowConfirm(true);
  };

  const handleCancelBooking = async () => {
    try {
      await axios.put(
        `http://localhost:3001/api/bookings/${bookingToCancel}/cancel`,
        {},
        { headers: { "x-auth-token": token } }
      );
      setShowConfirm(false);
      setBookingToCancel(null);
      alert("Booking cancelled successfully!");
      if (onBookingChange) onBookingChange();
      const res = await axios.get("http://localhost:3001/api/bookings/user", {
        headers: { "x-auth-token": token },
      });
      setBookings(res.data);
    } catch (err) {
      console.error(err.response.data);
      alert(err.response.data.message || "Failed to cancel booking");
      setShowConfirm(false);
      setBookingToCancel(null);
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
    <div className="container mx-auto p-4 relative">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-gray-600">You have no bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-lg border-2 border-gray-300 shadow-sm p-5 hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-xl font-bold mb-2 text-gray-900">
                Show ID: {booking.show_id}
              </h2>
              <p className="text-gray-700 mb-1">
                Seats:{" "}
                <span className="font-medium">{booking.seats.join(", ")}</span>
              </p>
              <p className="text-gray-700 mb-1">
                Status: <span className="font-medium">{booking.status}</span>
              </p>
              <p className="text-gray-500 text-sm mb-3">
                Booking ID: {booking.id}
              </p>
              {booking.status !== "cancelled" && (
                <button
                  onClick={() => confirmCancelBooking(booking.id)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white border-2 border-gray-300 rounded-lg shadow-lg p-6 w-96 text-center">
            <h2 className="text-xl font-bold mb-4">Confirm Cancellation</h2>
            <p className="mb-6">
              Do you want to cancel this booking and continue?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancelBooking}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded transition-colors duration-300"
              >
                Yes, Cancel
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded transition-colors duration-300"
              >
                No, Keep Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBookings;
