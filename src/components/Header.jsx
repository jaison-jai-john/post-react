import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCount, increaseCount } from '../features/posts/postSlice';

const Header = () => {
  const dispatch = useDispatch();
  const count = useSelector(getCount);

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='post'>Post</Link>
          </li>
          <li>
            <Link to='user'>Users</Link>
          </li>
        </ul>
      </nav>
      <button onClick={() => dispatch(increaseCount())}>{count}</button>
    </header>
  );
};

export default Header;
