import { Outlet } from "react-router-dom";

import ScrollToTop from "../utils/ScrollToTop"

import SmoothScroll from "../utils/SmoothScroll";

import Navigation from "../components/structure/Navigation"
import PageTransition from "../components/structure/PageTransition"
import Footer from "../components/structure/Footer"
import Intro from "../components/structure/Intro"

const RootLayout = () => {

  return (
    <>
    <ScrollToTop/>
    <SmoothScroll />


    <Navigation/>
    <Intro/>

    <PageTransition/>

        <main>
          <div className="overlay-gradient position-fixed uts-inset-0 pe-none user-select-none"></div>
          <Outlet />
        </main>

    <Footer/>    
    </>
  );
};

export default RootLayout;
