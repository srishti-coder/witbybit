import React, { ReactNode } from 'react';

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Drawer = ({ isOpen, onClose, children }: DrawerProps) => {
  return (
    <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 z-50`}>
      <button onClick={onClose} className="p-2 text-gray-600">Close</button>
      {children}
    </div>
  );
};

export default Drawer;
