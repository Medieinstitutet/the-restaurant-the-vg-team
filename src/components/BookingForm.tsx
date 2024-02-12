import axios from "axios";
import { ChangeEvent, SyntheticEvent, useState } from "react"

export const BookingForm = () => {

    const [addBooking, setAddBooking] = useState({restaurantId: '',
        date: '',
        time: '',
        numberOfGuests: 0,
        customer: {
            name: '',
            lastname: '',
            email: '',
            phone: ''
        }})
    
        const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            if (name.startsWith("customer.")) {
                
                setAddBooking(prevState => ({
                    ...prevState,
                    customer: {
                        ...prevState.customer,
                        [name.split('.')[1]]: value
                    }
                }));
            } else {
                const newValue = name === 'numberOfGuests' ? parseInt(value) : value;
                setAddBooking(prevState => ({
                    ...prevState,
                    [name]: newValue
                }));
            }
        };

    
    const onSubmit = (e:  SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()
    axios.post("https://school-restaurant-api.azurewebsites.net/booking/create", addBooking)
              .then((response) => {
                console.log('New booking created successfully:', response.data);
              })
              .catch((error) => {
                console.error('Error creating booking:', error);
              });
        
                console.log(addBooking)
    }
    return(
        <>
        <div>Make your reservation</div>
        <form action="" onSubmit={onSubmit}>
        <div>
            <label>Choose restaurant </label>
            <select
            name="restaurantId"
            value={addBooking.restaurantId}
            onChange={handleInputChange}>
            <option value="0">None</option>
            <option value="65c6276ee125e85f5e15b79f">Happy Dumpling</option>
            </select>
        </div>
        <div>
            <label>Date</label>
            <input 
            type="date" 
            placeholder="Add Date"
            name="date"
            value={addBooking.date}
            onChange={handleInputChange} />
        </div>
        <div>
            <label>Time</label>
            <select
            name="time"
            value={addBooking.time}
            onChange={handleInputChange}>
                <option value="18.00">18:00</option>
                <option value="21.00">21:00</option>
            </select>
        </div>
        <div>
            <label>How many seats</label>
            <select
            name="numberOfGuests"
            value={addBooking.numberOfGuests}
            onChange={handleInputChange}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>
        </div>
        <div>
            <label>Name</label>
            <input 
            type="text" 
            placeholder="Name"
            name="customer.name"
            value={addBooking.customer.name}
            onChange={handleInputChange} />
        </div>
        <div>
            <label>LastName</label>
            <input 
            type="text" 
            placeholder="LastName"
            name="customer.lastname"
            value={addBooking.customer.lastname}
            onChange={handleInputChange} />
        </div>
        <div>
            <label>Email</label>
            <input 
            type="text" 
            placeholder="Email"
            name="customer.email"
            value={addBooking.customer.email}
            onChange={handleInputChange} />
        </div>
        <div>
            <label>Phone</label>
            <input 
            type="text" 
            placeholder="Phone"
            name="customer.phone"
            value={addBooking.customer.phone}
            onChange={handleInputChange} />
        </div>
        <button
        className="btn btn-block" 
        type="submit" 
        value="Save Task"
        >Book a table</button>
        </form>
        </>
    )
}