import { useEffect, useState } from "react";
import "./App.css";
import { IRestaurant } from "./models/IRestaurant";
import axios from 'axios';
import { Restaurant } from "./models/Restaurant";

function App() {

  const [restaurants, setRestaurants] = useState<IRestaurant[]>([
    new Restaurant("My Restaurant", {
      street: "123 Main St",
      zip: "12345",
      city: "Cityville"
    })
  ]);

  // New restaurant data to be created
  const newRestaurantData: IRestaurant = {
    name: "Happy Dumpling",
    address: {
      street: "Malmögatan 8",
      zip: "54321",
      city: "Malmö"
    }
  };

  useEffect(() => {
    
    setRestaurants(prevRestaurants => [...prevRestaurants, newRestaurantData]);

    
    axios
      .post("https://school-restaurant-api.azurewebsites.net/restaurant/create", newRestaurantData)
      .then((response) => {
        console.log('New restaurant created successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error creating restaurant:', error);
      });

      axios
      .get("https://school-restaurant-api.azurewebsites.net/restaurant/65c6276ee125e85f5e15b79f")
      .then((response) => {
        console.log('Get Restaurant', response.data);
        setRestaurants(response.data || []);
      })
      .catch((error) => {
        console.error('Error fetching restaurants:', error);
      });
  }, []);

 
  

  return (
    <div>
      <h1>Restaurant Page</h1>
      
    </div>
  );
}

export default App;