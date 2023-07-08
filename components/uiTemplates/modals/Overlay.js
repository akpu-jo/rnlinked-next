import { useEffect } from "react";

const Overlay = ({ isOpen, setIsOpen, children }) => {
  const toggleScroll = () => {
    document.querySelector("body").classList.toggle("noscroll", false);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    isOpen && body.classList.add("noscroll");
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 w-full h-full bg-white opacity-90 z-4"
      onClick={() => {
        setIsOpen(false);
        toggleScroll();
      }}
    >
      {children}
    </div>
  );
};

export default Overlay;
