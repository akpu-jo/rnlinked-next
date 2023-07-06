const Overlay = ({ isOpen, setIsOpen, children }) => {
    if (!isOpen) {
      return null;
    }
  
    return (
      <div
        className="absolute top-0 left-0 w-full h-full bg-white opacity-90 z-4"
        onClick={() => setIsOpen(false)}
      >
        {children}
      </div>
    );
  };
  
  export default Overlay;