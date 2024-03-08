import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewPost } from '../posts/postSlice';
import { selectAllUsers } from '../users/usersSlice';

function AddPostForm() {
  // for controlled elements
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  // for knowing if a request should be made
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  // for navigation
  const navigate = useNavigate();

  // getting all the users
  const users = useSelector(selectAllUsers);

  // for dispatching the action
  const dispatch = useDispatch();

  // for knowing if the form can be submitted
  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

  // for handling the form submission
  const onAuthorChanged = (e) => {
    setUserId(Number(e.target.value));
  };

  const onTitleChanged = (e) => {
    setTitle(e.target.value);
  };

  const onContentChanged = (e) => {
    setContent(e.target.value);
  };

  // for handling the form submission
  const onSubmit = (e) => {
    // preventing the default action of renavigating
    e.preventDefault();

    try {
      // the request is sent and status is changed so new request is not sent
      setAddRequestStatus('pending');
      // the action is dispatched
      dispatch(addNewPost({ title, content, userId })).unwrap();

      // the form is reset and the user is navigated to the home page
      setTitle('');
      setContent('');
      setUserId('');
      navigate('/');
    } catch (err) {
      console.log('Failed to save the post', err);
    } finally {
      // the request is completed and the status is changed so new request can be made
      setAddRequestStatus('idle');
    }
  };

  // displaying the users for select
  const userOptions = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });

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
          Add Post
        </button>
      </form>
    </section>
  );
}

export default AddPostForm;
