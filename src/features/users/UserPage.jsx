import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectPostsByUser } from '../posts/postSlice';
import { selectUserById } from './usersSlice';

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));
  const postsForUser = useSelector((state) =>
    selectPostsByUser(state, Number(userId))
  );
  const postsRendered = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));
  return (
    <section>
      <h2>Posts by {user?.name}</h2>
      <ol>{postsRendered}</ol>
    </section>
  );
};

export default UserPage;
