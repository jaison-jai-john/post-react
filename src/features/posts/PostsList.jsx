import { useSelector } from 'react-redux';
import PostsExcerpts from './PostsExcerpts';
import { getPostsError, getPostsStatus, selectPostIds } from './postSlice';

function PostsList() {
  const orderedPosts = useSelector(selectPostIds);
  const postsStatus = useSelector((state) => getPostsStatus(state));
  const error = useSelector((state) => getPostsError(state));

  let content;
  if (postsStatus === 'loading') {
    content = <p>loading....</p>;
  } else if (postsStatus === 'succeeded') {
    content = orderedPosts.map((postId) => (
      <PostsExcerpts key={postId} postId={postId} />
    ));
  } else if (postsStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
}

export default PostsList;
