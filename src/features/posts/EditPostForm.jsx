import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectAllUsers } from '../users/usersSlice';
import {
  selectPostById,
  useDeletePostMutation,
  useUpdatePostMutation,
} from './postSlice';

const EditPost = () => {
  // getting post id to fetch the post info
  const { postId } = useParams();

  const [deletePost] = useDeletePostMutation();
  const [updatePost, { isLoading }] = useUpdatePostMutation();

  // for navigation
  const navigate = useNavigate();

  // for getting the post and users
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  // for controlling elements
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);

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
  const canSave = [title, content, userId].every(Boolean) && isLoading;

  // handle submission
  const onSubmit = async () => {
    // if the form is not valid then sent request
    if (canSave) {
      try {
        // send request and navigate to the post
        await updatePost({
          id: post.id,
          title,
          body: content,
          userId: Number(userId),
        }).unwrap();

        setTitle('');
        setContent('');
        setUserId('');
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error('Failed to save the post: ', err);
      }
    }
  };

  const onDelete = async () => {
    try {
      await deletePost(post.id).unwrap();

      setTitle('');
      setContent('');
      setUserId('');
      navigate(`/`);
    } catch (err) {
      console.error('Failed to delete the post: ', err);
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
