import { useAddReactionMutation } from './postSlice';

import React from 'react';

const reactions = {
  thumbsUp: '👍',
  wow: '😲',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕️',
};

const ReactionButtons = ({ post }) => {
  const [addReaction] = useAddReactionMutation();

  const reactionButtons = Object.entries(reactions).map(([reaction, emoji]) => {
    return (
      <button
        key={reaction}
        type='button'
        onClick={async () => {
          await addReaction({
            postId: post.id,
            reactions: {
              ...post.reactions,
              [reaction]: post.reactions[reaction] + 1,
            },
          });
        }}>
        {emoji} {post.reactions[reaction]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
