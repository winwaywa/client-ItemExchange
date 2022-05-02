import React from 'react';
import PropTypes from 'prop-types';
import PostItem from '../PostItem';

PostList.propTypes = {};

function PostList({ postList }) {
  return (
    <ul className="table">
      <li class="table-header">
        <div class="col col-1">Bài viết</div>
        <div class="col col-2">Trạng thái</div>
        <div class="col col-3">Thời gian</div>
        <div class="col col-4">Thao tác</div>
      </li>
      {postList.map((post) => (
        <PostItem post={post} />
      ))}
    </ul>
  );
}

export default PostList;
