import React, { useState, useEffect, useRef } from "react";

const Test = () => {
  // const prevScrollPosition = useRef(0);
  // const [show, setShow] = useState(false);

  // const isDesktopOrLaptop = useMediaQuery({ minWidth: 1024 });
  // const isBigScreen = useMediaQuery({ minWidth: 1820 });
  // const isTablet = useMediaQuery({ minWidth: 768 });
  // const isMobile = useMediaQuery({ maxWidth: 640 });
  // const isPortrait = useMediaQuery({ orientation: "portrait" });
  // const isRetina = useMediaQuery({ minResolution: "2dppx" });

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollPosition = window.scrollY;
  //     if (currentScrollPosition > prevScrollPosition) {
  //       console.log("Scrolling down");
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll)
  //   return () => {
  //       window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  // const [scrollPosition, setScrollPosition] = useState(0);
  // useEffect(() => {
  //   function handleScroll() {
  //     setScrollPosition(window.pageYOffset);
  //   }

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const [messages, setMessages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userInput = event.target.elements.message.value;
    const response = await fetch(`/api/chatgpt?message=${userInput}`);
    const data = await response.json();
    setMessages([...messages, data.response]);
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col justify-end">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">Chat with ChatGPT</h1>
        <ul className="mt-4 space-y-2">
          {messages.map((message, index) => (
            <li key={index} className="p-2 bg-gray-200 rounded">
              {message}
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-white">
        <input
          type="text"
          name="message"
          placeholder="Type your message here"
          className="w-full px-4 py-2 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          style={{ position: "absolute", bottom: 0 }}
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Test;
