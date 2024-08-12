import React from 'react';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg max-w-md w-full max-h-[75vh] overflow-y-auto relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
