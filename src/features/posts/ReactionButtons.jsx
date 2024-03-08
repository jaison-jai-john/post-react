import { useDispatch } from 'react-redux';
import { reactionAdded } from './postSlice';

import React from 'react';

const reactions = {
  thumbsUp: '👍',
  wow: '😲',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕️',
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactions).map(([reaction, emoji]) => {
    return (
      <button
        key={reaction}
        type='button'
        onClick={() => {
          dispatch(
            reactionAdded({
              postId: post.id,
              reaction: reaction,
            })
          );
        }}>
        {emoji} {post.reactions[reaction]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
