import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePost, selectPostById, updatePost } from './postSlice';

import { selectAllUsers } from '../users/usersSlice';

const EditPost = () => {
  // getting post id to fetch the post info
  const { postId } = useParams();

  // for navigation
  const navigate = useNavigate();

  // for getting the post and users
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  // for controlling elements
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState('idle');

  // for dispatching fetch requests
  const dispatch = useDispatch();

  // if post is not found then return a not found
  if (!post) {
    return (
      <section>
        <h2>Post Not Found!</h2>
      </section>
    );
  }

  // for handling the form submission
  const onTitleChanged = (e) => {
    setTitle(e.target.value);
  };
  const onContentChanged = (e) => {
    setContent(e.target.value);
  };
  const onAuthorChanged = (e) => {
    setUserId(e.target.value);
  };

  // for knowing if the form can be submitted
  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === 'idle';

  // handle submission
  const onSubmit = () => {
    // if the form is not valid then sent request
    if (canSave) {
      try {
        // send request and navigate to the post
        setRequestStatus('pending');
        dispatch(
          updatePost({
            id: postId,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();

        setTitle('');
        setContent('');
        setUserId('');
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error('Failed to save the post: ', err);
      } finally {
        // regardless if request failed or fulfilled set status to idle so new request can be made
        setRequestStatus('idle');
      }
    }
  };

  const onDelete = () => {
    try {
      setRequestStatus('pending');
      dispatch(deletePost({ id: post.id })).unwrap();

      setTitle('');
      setContent('');
      setUserId('');
      navigate(`/`);
    } catch (err) {
      console.error('Failed to delete the post: ', err);
    } finally {
      setRequestStatus('idle');
    }
  };

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a post</h2>
      <form>
        <label htmlFor='userId'>Author</label>
        <select
          value={userId}
          name='userId'
          id='userIdSelect'
          onChange={onAuthorChanged}>
          <option value=''></option>
          {userOptions}
        </select>
        <label htmlFor='title'>Title: </label>
        <input
          value={title}
          id='titleInput'
          onChange={onTitleChanged}
          name='title'
          type='text'
        />
        <label htmlFor='content'>Content</label>
        <textarea
          name='content'
          id='contentInput'
          cols='30'
          rows='10'
          value={content}
          onChange={onContentChanged}></textarea>
        <button onClick={onSubmit} type='button' disabled={!canSave}>
          save
        </button>
        <button onClick={onDelete} type='button'>
          Delete
        </button>
      </form>
    </section>
  );
};

export default EditPost;
