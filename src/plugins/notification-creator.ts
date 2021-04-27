import {notification} from "antd";
import { IconType } from "antd/lib/notification";

const NotificationCreator:
    (title: string, type?: IconType, description?: string) => void =
    (title: string, type: IconType = 'info', description?: string) => {
    notification.open({
        className: 'app-notification',
        type,
        message: title,
        style: {borderRadius: 15},
        description: description || "",
    });
}
export default NotificationCreator