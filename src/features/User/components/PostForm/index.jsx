import './styles.scss';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from '../../../../components/form-controll/InputField';

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
    // validate vs yup
    const schema = yup
        .object()
        .shape({
            product_name: yup
                .string()
                .required('Tên món đồ không được để trống')
                .min(10, 'Tên món đồ ít nhất 10 kí tự')
                .max(30, 'Tên món đồ nhiều nhất 25 kí tự'),
            price: yup
                .number()
                .typeError('Bắt buộc phải nhập số')
                .min(0, 'Giá nhỏ nhất là 0')
                .max(999999999, 'Giá lớn nhất 999999999'),
        })
        .required();

    //form
    const form = useForm({
        defaultValues: {
            product_name: '',
            price: 0,
        },
        //validate vs yup
        resolver: yupResolver(schema),
    });

    const [describe, setDescribe] = useState('');
    const [category, setCategory] = useState(categories[0]?._id);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [images, setImages] = useState([]);

    const mdParser = new MarkdownIt(/* Markdown-it options */);
    useEffect(() => setCategory(categories[0]?._id), [categories]);

    //slider %
    const [value, setValue] = React.useState(100);
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

    const handleSubmit = (values) => {
        console.log(values);
        const data = {
            ...values,
            describe,
            category_id: category,
            images_url: images,
            percent_new: value,
        };
        console.log(data);
        if (handleCreateProduct) handleCreateProduct(data);
    };

    return (
        <form className="post__form" onSubmit={form.handleSubmit(handleSubmit)}>
            <div>
                <div className="form__group">
                    <InputField form={form} name="product_name" label="Tên món đồ" />
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
                    <InputField form={form} name="price" label="Giá" />
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
                </div>
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
            <button className="btn btn--primary btn--small post__btn">Đăng</button>
        </form>
    );
}

export default PostForm;
