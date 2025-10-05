import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";

const MAX_SEATS = 6;

const Seat = ({ seatNumber, isSelected, isBooked, onSelect }) => {
  return (
    <div
      className={`w-10 h-10 m-1 flex justify-center items-center border rounded text-sm ${
        isBooked
          ? "bg-red-500 text-white cursor-not-allowed"
          : isSelected
          ? "bg-blue-500 text-white cursor-pointer"
          : "bg-gray-200 cursor-pointer"
      }`}
      onClick={!isBooked ? onSelect : null}
    >
      {seatNumber.slice(1)}
    </div>
  );
};

const SeatSelection = () => {
  const { id: show_id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useUser();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/bookings/${show_id}/seats`
        );
        setBookedSeats(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchBookedSeats();
  }, [show_id]);

  const handleSelectSeat = (seatNumber) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatNumber)) {
        return prevSelectedSeats.filter((seat) => seat !== seatNumber);
      } else {
        if (prevSelectedSeats.length < MAX_SEATS) {
          return [...prevSelectedSeats, seatNumber];
        } else {
          alert(`You can select a maximum of ${MAX_SEATS} seats.`);
          return prevSelectedSeats;
        }
      }
    });
  };

  const handleBooking = async () => {
    if (!user) {
      alert("Please login to book seats.");
      navigate("/login");
      return;
    }

    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3001/api/bookings",
        { user_id: user.id, show_id, seats: selectedSeats },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      console.log(res.data);
      alert("Booking successful!");
      // After successful booking, re-fetch booked seats to update the UI
      const updatedBookedSeats = await axios.get(
        `http://localhost:3001/api/bookings/${show_id}/seats`
      );
      setBookedSeats(updatedBookedSeats.data);
      setSelectedSeats([]);
    } catch (err) {
      console.error(err.response.data);
      alert(err.response.data.message || "Booking failed");
    }
  };

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const cols = 10;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Select Your Seats</h1>
      <div className="bg-gray-800 text-white p-2 text-center mb-4 rounded">
        Screen
      </div>
      <div className="flex flex-col items-center">
        {rows.map((row) => (
          <div key={row} className="flex items-center mb-2">
            <span className="w-8 text-center font-bold mr-2">{row}</span>
            <div className="grid grid-cols-10 gap-1">
              {[...Array(cols)].map((_, colIndex) => {
                const seatNumber = `${row}${colIndex + 1}`;
                return (
                  <Seat
                    key={seatNumber}
                    seatNumber={seatNumber}
                    isSelected={selectedSeats.includes(seatNumber)}
                    isBooked={bookedSeats.includes(seatNumber)}
                    onSelect={() => handleSelectSeat(seatNumber)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {/* <div className="mt-4">
        <h2 className="text-2xl">Selected Seats: {selectedSeats.join(", ")}</h2>
        <button
          onClick={handleBooking}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        >
          Pay
        </button>
      </div> */}
      <div className="mt-6 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Selected Seats:{" "}
          {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
        </h2>
        <button
          onClick={handleBooking}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded mt-4 transition duration-300"
          disabled={selectedSeats.length === 0}
        >
          Pay
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;
