import { useState, useEffect} from "react";
import { IMG_CDN_URL } from "./Constants";
import { restaurantList } from "./Constants";
import ShimmerUI from "./Shimmer";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";

//config driven UI

// const McDonalds = {
//     "image":'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/405645b3118d83e89db4c65361e43733',
//     "name":"McDonald's",
//     "cusines": ["Burgers","Beverages","American"],
//     "rating": "4.2"
// }

const RestaurantCard = ({cloudinaryImageId, name, cuisines, avgRating}) => {
return(
    <div className="w-56 p-2 m-2 shadow-lg rounded-lg h-70 mr-9 mb-4 ml-6 mt-4 hover:translate-y-1 hover:translate-x-1">
        <img className="rounded-lg size-60" src={IMG_CDN_URL+
        cloudinaryImageId}/>
        <h2 className="font-bold text-xl">{name}</h2>
        <h3>{cuisines.join(", ")}</h3>
        <h4>{avgRating}stars</h4>
    </div>
  )
}

function filterData(searchInputText, allRestaurants){
    const filterData = allRestaurants.filter((restaurant)=>
        restaurant.info.name.toLowerCase().includes(searchInputText.toLowerCase())
    );
    return filterData;
}

const Body = () => {

    const [allRestaurants, setAllRestaurants] = useState([]);
    const [filteredRestaurants, setfilteredRestaurants] = useState([]);
    const [searchInputText, setSearchInputText] = useState("");

    useEffect(()=>{
        getRestaurants();
    }, []);
    
    async function getRestaurants(){
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5204303&lng=73.8567437&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();
        setAllRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setfilteredRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }

    const isOnline = useOnline();
    if(!isOnline) return <h1 className="flex justify-center">It seems you're Offline!!!</h1>

//Conditional rendering
//if restaurants not present => load shimmer UI
// else => restaurantList

//early render => when you dont want to render a component
if(!allRestaurants) return null;

return (allRestaurants.length === 0) ? <ShimmerUI/> : (
    <>
        <div className="p-3 m-2 bg-orange-400 flex justify-center">
            <input type="text" className="h-9 w-15 pl-2 mt-2 pr-2 mr-4 rounded-lg" placeholder="Search" value={searchInputText} onChange={(e)=>{
                setSearchInputText(e.target.value);
            }}/>
            <button className="p-1 m-2 border bg-green-500 text-white pr-2 pl-2 rounded-lg hover:bg-green-700" onClick={
                () => {
                    if(searchInputText!=""){
                    const data = filterData(searchInputText, allRestaurants);
                    setfilteredRestaurants(data);
                    }
                    else{
                      getRestaurants();
                    }
                }}
            >Search</button>
        </div>
        <div className='flex flex-wrap from-stone-100 p-8'>
        {
          (filteredRestaurants.length === 0) ? 
          <h1 style={{ color: 'red', fontSize: '24px', textAlign: 'center', margin:'180px 200px 200px 675px' }}>
            No match found!
          </h1> :
          filteredRestaurants.map((restaurant) => {
            return (
              <Link to={"/restaurant/"+restaurant.info.id} key={restaurant.info.id}>
                <RestaurantCard {...restaurant.info} />
              </Link>
            );
          })
        }
        </div>
    </>
  );
};

export default Body;