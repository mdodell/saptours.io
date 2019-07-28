import { notification } from 'antd';

export const openNotification = (type, placement, message, description, duration) => {
    notification.config({placement: placement});
    notification[type]({
        message: message,
        description: description,
        duration: duration,
    });
};