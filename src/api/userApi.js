import axiosClient from './axiosClient';

const userApi = {
    getUser() {
        const url = '/user';
        return axiosClient.get(url);
    },
    getUserById(id) {
        const url = `/user/${id}`;
        return axiosClient.get(url);
    },
    updateUser(data) {
        const url = '/user';
        const formData = new FormData();
        formData.append('file_avatar', data.avatar);
        formData.append('full_name', data.full_name);
        formData.append('phone', data.phone);
        formData.append('address', data.address);
        formData.append('province', data.province);
        // in key : value của formData
        // for (var pair of formData.entries()) {
        //     console.log(pair[0] + ', ' + pair[1]);
        // }

        //Khi tải một tệp lên sv, axios sẽ tự động mã hóa dưới dạng dữ liệu multipart/form-data
        // Ex: return axiosClient.put(url, data.avatar);

        //formData giúp gửi file với 'Content-Type': 'multipart/form-data'
        //Nghĩa là khi gửi lên file thì nó dc lưu ở req.files và object thì dc lưu ở req.body
        return axiosClient.put(url, formData);
    },
};

export default userApi;
