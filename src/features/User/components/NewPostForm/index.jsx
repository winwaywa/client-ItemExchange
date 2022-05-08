import './styles.scss';
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
// import categoryApi from '../../../../api/categoryApi';
NewPostForm.propTypes = {};

function NewPostForm({ categories, handleCreateProduct }) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState(categories[0]._id);
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
        const values = {
            product_name: title,
            describe: editorRef.current.getContent(),
            price,
            category_id: category,
            // images_url: images,
            images_url: '',
        };
        handleCreateProduct(values);
    };

    return (
        <div>
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
                                content_style:
                                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                            }}
                        />
                    </div>
                    <input className="btn btn--submit" type="submit" value="Đăng" />
                </div>
                <div>
                    <div className="form__group">
                        <label htmlFor="price">Giá</label>
                        <input
                            type="text"
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
                                        <img
                                            className="images__img"
                                            src={image.url}
                                            alt={image.name}
                                        />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default NewPostForm;
