import {notification} from "antd";

const NotificationCreator: (title: string, description?: string) => void = (title: string, description?:string) => {
    notification.open({
        className: 'app-notification',
        message: title,
        description: description || "",
    });
}
export default NotificationCreator