import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import PostList from '../components/PostList';
import NewPostForm from '../components/NewPostForm';
//mui
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

PostPage.propTypes = {};

const postList = [
  {
    id: 1,
    title: 'Sản phẩm 1',
    describe: 'Mô tả 1',
    images: '',
    category: 'Thời trang',
    price: '30000',
  },
  { id: 2, title: 'Sản phẩm 2', describe: 'Mô tả 2', images: '', category: 'Sách', price: '50000' },
];

function PostPage(props) {
  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="post">
      <Box sx={{ width: '90%', margin: '0 auto' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Đang chờ" value={0} />
            <Tab label="Đã đổi" value={1} />
            <Tab label="Thêm sản phẩm" value={2} />
          </Tabs>
        </Box>
        <PostList postList={postList} tabIndex={value} />
        <NewPostForm tabIndex={value} />
      </Box>
    </div>
  );
}

export default PostPage;
