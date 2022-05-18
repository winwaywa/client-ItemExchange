import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import userApi from '../../../../api/userApi';

//mui
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

FilterByProvince.propTypes = {};

function FilterByProvince({ onChange }) {
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

    const handleChangeProvince = (newValue) => {
        if (onChange) onChange({ province: newValue });
    };
    return (
        <div>
            <h3>Khu vực</h3>
            <Autocomplete
                disablePortal
                id="combo-box-provinces"
                options={provinces}
                renderInput={(params) => <TextField {...params} label="Tỉnh/Thành phố" />}
                onChange={(e, newValue) => {
                    handleChangeProvince(newValue);
                }}
            />
        </div>
    );
}

export default FilterByProvince;
