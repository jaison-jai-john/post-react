import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAddNewPostMutation } from '../posts/postSlice';
import { selectAllUsers } from '../users/usersSlice';

function AddPostForm() {
  const [addNewPost, { isLoading }] = useAddNewPostMutation();

  // for controlled elements
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  // for navigation
  const navigate = useNavigate();

  // getting all the users
  const users = useSelector(selectAllUsers);

  // for dispatching the action

  // for knowing if the form can be submitted
  const canSave = [title, content, userId] && !isLoading;

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
  const onSubmit = async (e) => {
    // preventing the default action of renavigating
    e.preventDefault();

    try {
      // the request is sent and status is changed so new request is not sent
      // the action is dispatched
      await addNewPost({ title, content, userId: Number(userId) }).unwrap();

      // the form is reset and the user is navigated to the home page
      setTitle('');
      setContent('');
      setUserId('');
      navigate('/');
    } catch (err) {
      console.log('Failed to save the post', err);
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
