import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "./Constants";

const RestaurantMenu = () => {
    const {resId} = useParams();

    const[restaurant, setRestaurant] = useState({});
    const[menuRestaurant, setMenuRestaurant] = useState({});

    useEffect(() => {
        getRestaurantInfo();
    },[]);

    async function getRestaurantInfo(){
        const data = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.5204303&lng=73.8567437&restaurantId="+resId);
        const json = await data.json();
        setRestaurant(json.data.cards[0].card.card.info);
    }
    
    useEffect(() => {
        getRestaurantMenu();
    },[]);

    async function getRestaurantMenu(){
        const data = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.5204303&lng=73.8567437&restaurantId="+resId);
        const json = await data.json();
        setMenuRestaurant(json.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards[2].card.card.itemCards);
    }

    return (
        <div className="flex justify-between pr-8 mt-5">
            <div className="ml-6">
                <h1>Restaurant id: {resId}</h1>
                <h2 className="font-bold mb-3">{restaurant.name}</h2>
                <img className="size-180" src={IMG_CDN_URL + restaurant.cloudinaryImageId}/>
                <h3>{restaurant.areaName}</h3>
                <h3>{restaurant.city}</h3>
                <h3>{restaurant.avgRating} stars</h3>
                <h3>{restaurant.costForTwoMessage}</h3>
            </div>
            <div>
                <h1 className="font-bold">Menu</h1>
                <ul>
                {Object.values(
                    menuRestaurant
                    ).map((item) => (
                    <li key={item.id}>{...item.card.info.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RestaurantMenu;