import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const BookingRender = () => {
    const { id } = useParams();

    useEffect(() => {
        if (_id) {
            axios
                .get(`https://school-restaurant-api.azurewebsites.net/booking/${id}`)
                .then((response) => {
                    console.log('Get Booking', response.data);
                })
                .catch((error) => {
                    console.error('Error fetching booking:', error);
                });
        }
    }, [id]);

    return (
        <>
            <div>
                Ditt bokningsId {id}
            </div>
            <div>

                <input type="text" placeholder="Skriv in ditt bokningsId" />          

                <button type="submit" onClick={BookingRender}>Hämta bokning</button>
               
            </div>
        </>
    );};

    