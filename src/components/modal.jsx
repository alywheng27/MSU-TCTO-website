import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg">
        {children}
        <button
          onClick={onClose}
          className="mt-4 p-2 bg-red-600 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
