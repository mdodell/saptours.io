import React, { useState } from 'react';
import { Upload, Icon, message } from 'antd';
import { connect } from 'react-redux';
import {updateUserProfileImage} from "../../../../redux/user/userActions";

const mapDispatchToProps = {
    updateUserProfileImage
};

const mapStateToProps = (state) => ({
    profile: state.firebase.profile
});

const UploadProfileImage = ({profile, updateUserProfileImage}) => {

    const [loading, toggleLoading ] = useState(false);

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            toggleLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            toggleLoading(false);
        }
        updateUserProfileImage(info);
    };
        const uploadButton = (
            <div style={styles.avatarUploader}>
                <Icon type={loading ? 'loading' : 'plus'} />
                <div style={{marginTop: '1em'}}>Upload Profile Image</div>
            </div>
        );
        return (
            <Upload
                name="avatar"
                listType="picture-card"
                showUploadList={false}
                style={{padding: 0}}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >
                {profile.photoURL ? <img src={profile.photoURL} alt="avatar" style={{
                    width: '128px',
                    borderRadius: '50%',
                    height: '128px' }} /> : uploadButton}
            </Upload>
        );
};

const styles = {
    avatarUploader: {
        width: '128px',
        height: '128px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50px'
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadProfileImage);
