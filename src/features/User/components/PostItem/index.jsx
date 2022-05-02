import React from 'react';
import PropTypes from 'prop-types';

PostItem.propTypes = {};

function PostItem({ post }) {
  return (
    <li class="table-row">
      <div class="col col-1">{post.title}</div>
      <div class="col col-2">{post.describe}</div>
      <div class="col col-3">{post.price}</div>
      <div class="col col-4">
        <a className="btn-text" href="#">
          Sửa
        </a>
        <a className="btn-text" href="#">
          Xoá
        </a>
      </div>
    </li>
  );
}

export default PostItem;
