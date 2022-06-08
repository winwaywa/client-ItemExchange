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
                        Ra mắt năm 2022, nền tảng Chodoido.vn được xây dựng nhằm cung cấp cho người
                        dùng những trải nghiệm dễ dàng, an toàn và nhanh chóng khi mua sắm, trao đổi
                        trực tuyến thông qua hệ thống hỗ trợ thanh toán và vận hành vững mạnh. Chúng
                        tôi có niềm tin mạnh mẽ rằng trải nghiệm mua sắm, trao đổi trực tuyến phải
                        đơn giản, dễ dàng và mang đến cảm xúc vui thích. Niềm tin này truyền cảm
                        hứng và thúc đẩy chúng tôi mỗi ngày tại Chodoido.vn.
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
