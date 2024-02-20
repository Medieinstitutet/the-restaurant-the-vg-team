import { ChangeEvent, useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import axios from 'axios';
import { IBookingsRestaurantChangeBooking } from '../models/IBookingsRestaurantChangeBooking';
import { IBookingsRestaurant } from '../models/IBookingsRestaurant';
import { Link } from 'react-router-dom';
 
export const AdminChangeBooking = ({ booking, updateBookingState }: { booking: IBookingsRestaurantChangeBooking, updateBookingState: Function }) => {
    const [newDate, setNewDate] = useState(booking.date);
    const [newTime, setNewTime] = useState(booking.time);
    const [newNumberOfGuests, setNewNumberOfGuests] = useState(booking.numberOfGuests);
    const [isOpen, setIsOpen] = useState(false); // Add state for popup visibility
    const [bookings, setBookings] = useState<IBookingsRestaurant[]>([]);
    const [filteredBookings, setFilteredBookings] = useState<IBookingsRestaurant[]>([]);
    const [searchDate, setSearchDate] = useState('');
    const [searchItem, setSearchItem] = useState('');
    const [filteredUsers, setFilteredUsers] = useState<IBookingsRestaurant[]>([]);
 
    const togglePopup = () => {
        setIsOpen(!isOpen); // Toggle the state to open/close the popup
    };
 
 
 
    const changeBooking = async (updatedBooking: IBookingsRestaurantChangeBooking) => {
        try {
            console.log('Startar uppdatering av bokning...');
            const response = await axios.put(
                `https://school-restaurant-api.azurewebsites.net/booking/update/${updatedBooking.id}`,
                {
                    date: updatedBooking.date,
                    time: updatedBooking.time,
                    numberOfGuests: updatedBooking.numberOfGuests,
                    id: updatedBooking.id
                }
            );
            console.log('Bokningen uppdaterades:', response.data);
            setNewDate(updatedBooking.date);
            setNewTime(updatedBooking.time);
            setNewNumberOfGuests(updatedBooking.numberOfGuests);
            updateBookingState(updatedBooking);
        } catch (error) {
            console.error('Update not possible', error);
        }
    };
 
    console.log('Renderar AdminChangeBooking-komponenten med bokning:', booking);
 
    useEffect(() => {
        getAllBookings();
      }, []);
   
      const getAllBookings = async () => {
        try {
   
            const response = await axios.get(
                `https://school-restaurant-api.azurewebsites.net/booking/restaurant/65c6276ee125e85f5e15b79f`
   
            );
           
            setBookings(response.data);
            setFilteredBookings([])
        } catch (error) {
            console.error("Error fetching restaurants:", error);
        }
    };
   
   
         
     
   
      const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);
   
        const filteredItems = bookings.filter((user) =>
          user.date.toLowerCase().includes(searchTerm.toLowerCase())
        );
   
        setFilteredUsers(filteredItems);
        console.log('handlechange', searchTerm);
      };
    return (
        <>
     {/* <Popup trigger={<button onClick={togglePopup} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-4">Ändra</button>} position="right center"> */}
        <Popup trigger={<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-4">Ändra</button>} position="right center" open={isOpen} onClose={togglePopup}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', backgroundColor: 'white', padding: '20px'}}>
                Namn: {booking.customerName} {booking.customerLastname}
                <input
                    type='date'
                    value={newDate}
                    onChange={(e) => {
                        console.log('Nytt datum valt:', e.target.value);
                        setNewDate(e.target.value);
                    }}
                />
                <select
                    value={newTime}
                    onChange={(e) => {
                        console.log('Ny tid vald:', e.target.value);
                        setNewTime(e.target.value);
                    }}
                >
                    <option value='18:00'>18:00</option>
                    <option value='21:00'>21:00</option>
                </select>
                <input
                    type='number'
                    value={newNumberOfGuests}
                    onChange={(e) => {
                        console.log('Nytt antal gäster valt:', e.target.value);
                        setNewNumberOfGuests(parseInt(e.target.value));
                       
                    }}
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-4" onClick={() => {
                    console.log('Sparaknappen klickad, startar uppdatering...');
                    changeBooking({
                        date: newDate,
                        time: newTime,
                        numberOfGuests: newNumberOfGuests,
                        id: booking._id,
                        _id: booking._id,
                        restaurantId: booking.restaurantId,
                        customerID: booking.customerID,
                        customerName: booking.customerName,
                        customerLastname: booking.customerLastname
                    });
                   
                }}>Spara</button>
            </div>
        </Popup>
 
<div>
<Link to={"/admin/add"}><button>Lägg till bokning</button></Link>
<br />
<label htmlFor="">Sök bokning på datum: </label>
<input
  type="date"
  name="date"
  value={searchDate}
  onChange={handleInputChange}
/>
 
 
{filteredUsers.map((booking) => (
 
  <li key={booking._id}>
    {booking.date}, {booking._id}
  </li>
 
))}
</div>
</>
    );
};