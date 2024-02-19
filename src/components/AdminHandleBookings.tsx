import { useEffect, useState } from "react";
import axios from "axios";
import { AdminSearchBooking } from "./AdminSearchBookings";
import { IBookingsRestaurant } from "../models/IBookingsRestaurant";
import { ICustomer } from "../models/ICustomer";
import { AdminChangeBooking } from "./AdminChangeBookings";
import { Link } from "react-router-dom";
import { IBookingsRestaurantChangeBooking } from '../models/IChangeBooking';

export const AdminHandleBookings = () => {
  const [bookings, setBookings] = useState<IBookingsRestaurant[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<IBookingsRestaurant[]>([]);

  useEffect(() => {
    getAllBookings();
  }, []);

  const getAllBookings = async () => {
    try {
      const response = await axios.get(
        `https://school-restaurant-api.azurewebsites.net/booking/restaurant/65c6276ee125e85f5e15b79f`
      );

      const bookingsWithNames = await Promise.all(
        response.data.map(async (booking: ICustomer) => {
          const customerResponse = await axios.get(
            `https://school-restaurant-api.azurewebsites.net/customer/${booking.customerId}`
          );
          const [user] = customerResponse.data;
          return {
            ...booking,
            customerName: `${user.name} ${user.lastname}`,
          };
        })
      );
      setBookings(bookingsWithNames);
      setFilteredBookings([]);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleSearch = (searchTerm: string) => {
    const filtered = bookings.filter((booking) =>
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredBookings(filtered);
  };

  const handleDelete = async (_id: string) => {
    try {
      const isConfirmed = window.confirm("Är du säker på att du vill radera bokningen?");
      if (isConfirmed) {
        const response = await axios.delete(
          `https://school-restaurant-api.azurewebsites.net/booking/delete/${_id}`
        );

        console.log(response.data);
        setBookings(prevBookings => prevBookings.filter(booking => booking._id !== _id));
        setFilteredBookings(prevFilteredBookings => prevFilteredBookings.filter(booking => booking._id !== _id));
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const updateBookingState = (updatedBooking: IBookingsRestaurantChangeBooking) => {
    const updatedBookings = bookings.map(booking => {
        if (booking._id === updatedBooking.id) {
            return {
                ...booking,
                date: updatedBooking.date,
                time: updatedBooking.time,
                numberOfGuests: updatedBooking.numberOfGuests
            };
        }
        return booking;
    });
    setBookings(updatedBookings);
    setFilteredBookings(updatedBookings);
};

  return (
    <div>
      <Link to={"/admin/add"}><button>Lägg till bokning</button></Link>
      <br />
      <AdminSearchBooking handleSearch={handleSearch} />
      <h2>Sökresultat:</h2>
        {filteredBookings.length === 0 && (
          <p>Finns ingen bokning med det angivna namnet!</p>
        )}
      <ul>
        {filteredBookings.map((booking) => {
          return (
            <li key={booking._id}>
              <p>
                BokningsID: {booking._id} <br />
                Namn: {booking.customerName} {booking.customerLastname} <br />
                Datum: {booking.date} <br />
                Tid: {booking.time} <br />
                Antal gäster: {booking.numberOfGuests} <br />
              </p>
              <AdminChangeBooking booking={booking} updateBookingState={updateBookingState} />
              <button onClick={() => handleDelete(booking._id)}>Radera</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};