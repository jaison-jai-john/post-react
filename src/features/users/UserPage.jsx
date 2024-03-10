import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useGetPostsByUserIdQuery } from '../posts/postSlice';
import { selectUserById } from './usersSlice';

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));
  const {
    data: postsForUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsByUserIdQuery(Number(userId));

  let content;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    const { ids, entities } = postsForUser;
    content = ids.map((id) => {
      return (
        <li key={id}>
          <Link to={`/post/${id}`}>{entities[id]?.title}</Link>
        </li>
      );
    });
  } else if (isError) {
    content = <div>{error}</div>;
  }

  return (
    <section>
      <h2>Posts by {user?.name}</h2>
      <ol>{content}</ol>
    </section>
  );
};

export default UserPage;
