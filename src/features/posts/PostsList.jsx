import { useSelector } from 'react-redux';
import PostsExcerpts from './PostsExcerpts';
import { selectPostIds, useGetPostsQuery } from './postSlice';

function PostsList() {
  const { isLoading, isSuccess, isError, error } = useGetPostsQuery();

  const orderedPosts = useSelector(selectPostIds);

  let content;
  if (isLoading) {
    content = <p>loading....</p>;
  } else if (isSuccess) {
    content = orderedPosts.map((postId) => (
      <PostsExcerpts key={postId} postId={postId} />
    ));
  } else if (isError) {
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
