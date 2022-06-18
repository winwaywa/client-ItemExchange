import './styles.scss';
import videobg from '../../../images/about-video.mp4';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

About.propTypes = {};

function About(props) {
    const aboutRef = useRef();

    const handleNext = (index) => {
        aboutRef.current.style.marginLeft = `-${index * 100}vw`;
    };

    return (
        <div ref={aboutRef} className="about">
            <div className="about__container">
                <div className="bg-video">
                    <video
                        className="bg-video__content"
                        src={videobg}
                        loop
                        autoPlay={true}
                        muted
                        playsInline
                    />
                </div>
                <div className="about__text-box">
                    <h1>Chodoido.vn - Trang chợ trực tuyến hàng đầu tại Việt Nam</h1>
                    <p>
                        Với tiêu chí “Cũ người mới ta”, những món đồ cũ có thể bạn không cần nhưng
                        nhiều người vẫn đang cần đến chúng. Website là cầu nối giúp gắn kết giữa
                        những người cần mua bán, trao đổi đồ với nhau một cách nhanh chóng và tiết
                        kiệm nhất. Ngoài ra các đồ vật cũ được tái sử dụng chính là chúng ta đã
                        chung tay giảm thải ra môi trường, góp phần bảo vệ môi trường sống xanh –
                        sạch – đẹp.
                    </p>
                    <a
                        onClick={() => handleNext(1)}
                        href="#"
                        className="btn btn--white btn--animated"
                    >
                        Hướng dẫn
                    </a>
                </div>
            </div>
            <div style={{ backgroundColor: 'green' }} className="about__container">
                <div className="btn--next">
                    <a
                        onClick={() => handleNext(2)}
                        href="#"
                        className="btn btn--white btn--animated"
                    >
                        Tiếp theo
                    </a>
                </div>
            </div>
            <div style={{ backgroundColor: 'violent' }} className="about__container">
                <div className="btn--next">
                    <a
                        onClick={() => handleNext(3)}
                        href="#"
                        className="btn btn--white btn--animated"
                    >
                        Tiếp theo
                    </a>
                </div>
            </div>
            <div style={{ backgroundColor: 'black' }} className="about__container">
                <div className="btn--next">
                    <a
                        onClick={() => handleNext(4)}
                        href="#"
                        className="btn btn--white btn--animated"
                    >
                        Tiếp theo
                    </a>
                </div>
            </div>
            <div style={{ backgroundColor: 'orange' }} className="about__container">
                <div className="btn--next">
                    <Link to="/" className="btn btn--white btn--animated">
                        Khám phá ngay
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default About;
