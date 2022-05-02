import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import PostList from '../components/PostList';
PostPage.propTypes = {};

const postList = [
  {
    id: 1,
    title: 'Bài viết 1',
    describe: 'Mô tả 1',
    images: '',
    category: 'Thời trang',
    price: '30000',
  },
  { id: 2, title: 'Bài viết 2', describe: 'Mô tả 2', images: '', category: 'Sách', price: '50000' },
];

function PostPage(props) {
  return (
    <div className="post">
      <NavLink className="btn-text u-margin-bottom-small" to="new">
        Bài viết mới
      </NavLink>
      <PostList postList={postList} />
    </div>
  );
}

export default PostPage;
