import './styles.scss';
import React from 'react';
import PropTypes from 'prop-types';

Footer.propTypes = {};

function Footer(props) {
  return (
    <footer className="footer">
      <div className="footer__copyright">@Copyright by Hiep</div>
      <ul className="footer__navigation">
        <li className="footer__item">
          <a className="footer__link" href="#">
            Giới thiệu
          </a>
        </li>
        <li className="footer__item">
          <a className="footer__link" href="#">
            Quy định đăng bài
          </a>
        </li>
        <li className="footer__item">
          <a className="footer__link" href="#">
            Chính sách bảo mật
          </a>
        </li>
        <li className="footer__item">
          <a className="footer__link" href="#">
            Điều khoản sử dụng
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
