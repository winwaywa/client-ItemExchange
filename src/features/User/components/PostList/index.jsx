import React from 'react';
import PropTypes from 'prop-types';
import PostItem from '../PostItem';

PostList.propTypes = {};

function PostList({ postList, tabIndex }) {
  return (
    <div>
      {tabIndex === 0 && (
        <ul className="table u-margin-top-small">
          <li class="table-header">
            <div class="col col-1">Sản phẩm</div>
            <div class="col col-2">Trạng thái</div>
            <div class="col col-3">Thời gian</div>
            <div class="col col-4">Thao tác</div>
          </li>
          {postList.map((post) => (
            <PostItem post={post} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostList;
