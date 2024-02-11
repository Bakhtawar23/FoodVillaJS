import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import About from './components/About';
import Error from './components/Error';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import RestaurantMenu from './components/RestaurantMenu';
import ShimmerUI from './components/Shimmer';

const Contact = lazy(() => import('./components/Contact'));

const AppLayout = () => {
    return (
        <>
        <Header/>
        <Outlet/>
        <Footer/>
        </>
    );
};

//Single Page Application
//Client-side Routing click on about us to load that page as we have our component
//Server-side Routing /about in url makes server call to load page

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        errorElement: <Error/>,
        children: [
            {
                path: "/",
                element: <Body/>,
            },
            {
                path: "/about",
                element: <About/>,
            },
            {
                path: "/contact",
                element: (<Suspense fallback={<ShimmerUI/>}><Contact/></Suspense>),
            },
            {
                path: "/restaurant/:resId",
                element: <RestaurantMenu/>,
            },
        ]
    },
]);

const root  = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter}/>);