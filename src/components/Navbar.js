import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class Navbar extends React.Component {
  render () {
    return  <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-4">
      <div className='container mx-auto'>
      <Link to='/'>
    <div className="flex items-center flex-shrink-0 text-white mx-2"><span className="font-semibold text-xl tracking-tight">My Github</span>
    </div>
    </Link>
    <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div className="text-sm lg:flex-grow">
      </div>
    </div>
    </div>
  </nav>;
  }
}

export default Navbar;
