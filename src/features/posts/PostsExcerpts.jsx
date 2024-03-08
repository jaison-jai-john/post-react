import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';
import { selectPostById } from './postSlice';

const PostsExcerpts = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <Link to={`post/${post.id}`}>View Post</Link>
      <PostAuthor userId={post.userId}></PostAuthor>
      <TimeAgo timestamp={post.date}></TimeAgo>
      <ReactionButtons post={post}></ReactionButtons>
    </article>
  );
};

export default PostsExcerpts;
