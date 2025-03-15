import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import lemonLogo from '../assets/lemonlogo.png'; 

const NAV_ITEMS = [
  { key: 'home', label: 'Home', path: '/home' },
  { key: 'stores', label: 'Stores', path: '/stores' },
  { key: 'products', label: 'Products', path: '/products' },
  { key: 'catalogue', label: 'Catalogue', path: '/catalogue' },
  { key: 'promotions', label: 'Promotions', path: '/promotions' },
  { key: 'reports', label: 'Reports', path: '/reports' },
  { key: 'docs', label: 'Docs', path: '/docs' },
  { key: 'settings', label: 'Settings', path: '/settings' },
];

const Sidebar = () => {
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (itemKey: string) => {
    setSelected(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey],
    }));
  };

  return (
    <aside className="w-64 h-screen flex flex-col justify-between bg-white border-r">
      {/* Top: Logo */}
      <div className="px-6 py-4 flex items-center">
        <img
          src={lemonLogo}
          alt="Lemon Inc."
          className="w-32 h-auto"
        />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-6 py-4 overflow-y-auto">
        <ul className="space-y-3 text-gray-700">
          {NAV_ITEMS.map(item => (
            <li key={item.key}>
              <NavLink to={item.path} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="accent-blue-500"
                  checked={!!selected[item.key]}
                  onChange={() => handleToggle(item.key)}
                />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

 
      <div className="flex items-center px-6 py-4 border-t">
        <div className="w-8 h-8 rounded-full bg-gray-300 mr-3"></div>
        <div className="leading-tight">
          <p className="font-medium text-sm text-gray-800">Andy Samberg</p>
          <p className="text-xs text-gray-500">andy.samberg@gmail.com</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
