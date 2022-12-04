import React from "react";

const NextUiModal = ({ open, onClose }) => {
  if (open) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed z-20 inset-0 bg-elephant-50 bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-80  "
      />
      <main className="z-50 max-w-lg w-full m-3 mx-auto h-[calc(100%-0rem)] sm:h-[calc(100%-2.5rem)]">
       
      </main>
    </>
  );
};

export default NextUiModal;
