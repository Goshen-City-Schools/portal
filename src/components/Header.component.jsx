import React from 'react';
import { Link } from 'react-router-dom';

import { FaChevronDown } from 'react-icons/fa';

import Avatar from './Avatar.component';

export default function Header() {
  return (
    <header className="h-20 sticky top-0 left-0 px-6 z-50 bg-gray-50 shadow-md w-full flex items-center justify-between  ">
      <h3 className="text-xl font-bold">Welcome back, Nkechinyere</h3>

      <div className="flex items-center gap-4 text-sm">
        <div className="flex flex-col">
          <p className="font-bold first-letter:">2023/2024 session</p>
          <p>First Term</p>
        </div>

        {/*  */}

        <div className="absolute top-20 hidden">
          <ul>
            <li>
              <Link>My Profile</Link>
            </li>
            <li>
              <Link>Settings</Link>
            </li>
          </ul>
        </div>
        <Link to="/dashboard/profile" className="flex gap-2 items-center">
          <Avatar imageUrl="/avatar.png" altText="user avatar" />
          <FaChevronDown />.
        </Link>
      </div>
    </header>
  );
}
