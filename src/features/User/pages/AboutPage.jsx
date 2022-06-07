import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import AboutForm from '../components/AboutForm';
AboutPage.propTypes = {};

function AboutPage({ user = {}, handleUpdateUser }) {
    const [provinces, setProvinces] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                //lấy ds tỉnh VN
                const url = 'https://provinces.open-api.vn/api/';
                const data = await axios.get(url);
                const provinces = data.data.map((province) => province.name);
                setProvinces(provinces);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    return (
        <>
            <AboutForm user={user} provinces={provinces} handleUpdateUser={handleUpdateUser} />
        </>
    );
}

export default AboutPage;
