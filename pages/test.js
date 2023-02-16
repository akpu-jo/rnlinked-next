import React, { useState, useEffect, useRef } from "react";

const Test = () => {
  const prevScrollPosition = useRef(0);
  const [show, setShow] = useState(false);

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1024 });
  const isBigScreen = useMediaQuery({ minWidth: 1820 });
  const isTablet = useMediaQuery({ minWidth: 768 });
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const isPortrait = useMediaQuery({ orientation: "portrait" });
  const isRetina = useMediaQuery({ minResolution: "2dppx" });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      if (currentScrollPosition > prevScrollPosition) {
        console.log("Scrolling down");
      }
    };

    window.addEventListener('scroll', handleScroll)
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    function handleScroll() {
      setScrollPosition(window.pageYOffset);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className=" h-screen " ref={prevScrollPosition}>
      {/* <p className="fixed top-0 my-3 bg-white ">{scrollPosition}</p>
      <div className="  overflow-y-scroll mt-10">
        {show && (
          <div className=" bg-red-300 ">
            <p>Scroll down to see the scroll position update:</p>
            <p>Scroll down to see the scroll position update:</p>
            <p>Scroll down to see the scroll position update:</p>
            <p>Scroll down to see the scroll position update:</p>
            <p>Scroll down to see the scroll position update:</p>
            <p>Scroll down to see the scroll position update:</p>
            <p>Scroll down to see the scroll position update:</p>
          </div>
        )}
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
        <p>Scroll down to see the scroll position update:</p>
      </div> */}
    </div>
  );
};

export default Test;
