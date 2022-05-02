import './styles.scss';
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';

NewPostForm.propTypes = {};

function NewPostForm({ tabIndex }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('value01');
  const [images, setImages] = useState([]);

  const editorRef = useRef(null);

  const handlePreviewImages = (e) => {
    setImages([]);
    const files = e.target.files;
    const length = files.length;
    const imageList = [];
    for (let i = 0; i < length; i++) {
      files[i].preview = URL.createObjectURL(files[i]);
      imageList.push({ name: files[i].name, url: files[i].preview });
    }
    setImages(imageList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = { title, describe: editorRef.current.getContent(), category, images };
    console.log(post);
  };

  return (
    <div>
      {tabIndex === 2 && (
        <form
          className="post__form u-margin-top-small"
          encType="multipart/form-data"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div>
            <div className="form__group">
              <input
                type="text"
                id="title"
                placeholder="Tên sản phẩm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form__group">
              <label htmlFor="describe">Mô tả</label>
              <Editor
                apiKey="bl5gkgnz9lf4fz7or1lqz3lfr6jwqta733kg1u467skruk4q"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                  height: 200,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                  ],
                  toolbar:
                    'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
              />
            </div>
            <input className="btn btn--submit" type="submit" value="Đăng" />
          </div>
          <div>
            <div className="form__group">
              <label htmlFor="price">Giá</label>
              <input type="text" id="price" placeholder="vnd" />
            </div>
            <div className="form__group">
              <label htmlFor="select">Loại đồ</label>
              <select id="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="value01">Thời trang</option>
                <option value="value02">Đồ gia dụng</option>
                <option value="value03">Sách</option>
                <option value="value04">Xe</option>
              </select>
            </div>
            <div className="form__group">
              <label htmlFor="images">Thêm ảnh +</label>
              <input
                type="file"
                id="images"
                name="images"
                multiple
                accept=".jpg, .jpeg, .png"
                onChange={(e) => handlePreviewImages(e)}
              />
              {images && (
                <ul className="images">
                  {images.map((image) => (
                    <li>
                      <img className="images__img" src={image.url} alt={image.name} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default NewPostForm;
