import './styles.scss';
import React, { useEffect, useState } from 'react';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

//mui
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';

import PropTypes from 'prop-types';
PostForm.propTypes = {};

const Input = styled(MuiInput)`
    width: 42px;
`;

function PostForm({ categories, handleCreateProduct }) {
    const [title, setTitle] = useState('');
    const [describe, setDescribe] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState(categories[0]?._id);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [images, setImages] = useState([]);

    const mdParser = new MarkdownIt(/* Markdown-it options */);
    useEffect(() => setCategory(categories[0]?._id), [categories]);

    //slider %
    const [value, setValue] = React.useState(99);
    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };
    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };

    function handleEditorChange({ html, text }) {
        console.log('handleEditorChange', html, text);
        setDescribe(html);
    }

    const handlePreviewImages = (e) => {
        setImagesPreview([]);
        const files = e.target.files;
        const length = files.length;
        const imageList = [];
        for (let i = 0; i < length; i++) {
            const preview = URL.createObjectURL(files[i]);
            imageList.push({ name: files[i].name, url: preview });
        }
        setImagesPreview(imageList);
        setImages(files);
    };

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            //validate
            // if (images.length > 5) {
            //     throw new Error('Số ảnh vượt quá 5');
            // }
            const values = {
                product_name: title,
                describe,
                price,
                category_id: category,
                images_url: images,
                percent_new: value,
            };
            console.log(values);
            handleCreateProduct(values);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form className="post__form">
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
                    <MdEditor
                        style={{ height: '200px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleEditorChange}
                    />
                </div>
            </div>
            <div>
                <div>
                    <label>Độ mới</label>
                    <div style={{ display: 'flex', marginBottom: '1rem' }}>
                        <Slider
                            sx={{ marginRight: 2 }}
                            value={typeof value === 'number' ? value : 0}
                            onChange={handleSliderChange}
                        />
                        <Input
                            value={value}
                            size="small"
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            inputProps={{
                                step: 10,
                                min: 0,
                                max: 100,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </div>
                </div>
                <div className="form__group">
                    <label htmlFor="price">Giá</label>
                    <input
                        type="number"
                        id="price"
                        placeholder="vnd"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="form__group">
                    <label htmlFor="select-category">Loại đồ</label>
                    <select id="select-category" onChange={(e) => setCategory(e.target.value)}>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.category_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form__group form__images">
                    <label htmlFor="images">
                        <span className="btn btn--small btn--grey">Thêm ảnh +</span>
                    </label>
                    <span>(Tối đa 5 ảnh)</span>
                    <input
                        type="file"
                        id="images"
                        name="images"
                        multiple
                        accept="image/*"
                        onChange={(e) => handlePreviewImages(e)}
                    />
                    {imagesPreview && (
                        <div className="images">
                            {imagesPreview.map((image, index) => (
                                <img
                                    key={index}
                                    className="images__img"
                                    src={image.url}
                                    alt={image.name}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <button
                className="btn btn--primary btn--small post__btn"
                onClick={(e) => handleSubmit(e)}
            >
                Đăng
            </button>
        </form>
    );
}

export default PostForm;
