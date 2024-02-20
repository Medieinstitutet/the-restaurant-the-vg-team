import axios from "axios";
import { useEffect, useState } from "react";
import { IRestaurant } from "../models/IRestaurant";
import hamster from '../graphics/hamster.png';

export const ApiRendering = () => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);

  useEffect(() => {
    axios
      .get("https://school-restaurant-api.azurewebsites.net/restaurant/65c6276ee125e85f5e15b79f")
      .then((response) => {
        console.log('Get Restaurants', response.data);
        setRestaurants(response.data || []);
      })
      .catch((error) => {
        console.error('Error fetching restaurants:', error);
      });
  }, []);

  return (
    <div className="border-8 border-black flex">
      <ul>
      {restaurants.map((restaurant, index) => {
        return (
        <li key={index}>
          <h1 className="">{restaurant.name}</h1>
          <p className="">Adress: {restaurant.address} </p>
          <p className="">{restaurant.zip} {restaurant.city}</p>
          <p className="">RestaurangID: {restaurant._id} </p>

          <img src={ hamster} alt="Hamster eating dumplings" className="min-h-80 m  "/>

        </li>
        );
        })}
    </ul>
            </div>


  );
}