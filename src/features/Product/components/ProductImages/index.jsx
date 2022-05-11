import './styles.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

ProductImages.propTypes = {};

function ProductImages({ images_url }) {
    var settings = {
        arrows: false,
        dots: true,
        infinite: true,
        speed: 100,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        centerMode: true,
        focusOnSelect: true, //Chọn để chuyển qua slide đó
    };

    const images_arr = images_url.split(',');

    return (
        <div className="images">
            <Slider {...settings}>
                {images_arr.map((url, index) => (
                    <div key={index}>
                        <img className="image__item" src={url} alt={url} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default ProductImages;
