import React from 'react';
import { Modal, Icon } from 'antd';
import UserSearchForm from "../../../../pages/ProfilePage/forms/UserSearchForm";

const UserSearchModal=({visible, onCancel})=>{
    return(
        <Modal
            title={"Advanced User Search"}
            visible={visible}
            onCancel={onCancel}
            closable={true}
            bodyStyle={{padding: 10}}
            footer={null}
            width={500}
        >
            <UserSearchForm />
        </Modal>
    )
};

const styles = {
    linkStyle: {
        color: "#003478",
        marginLeft: '15px',
        textDecoration:'underline',
        marginBottom:'40px'
    }
};

export default UserSearchModal;