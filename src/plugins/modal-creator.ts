import { Modal } from 'antd';

const { confirm } = Modal

interface IModalProps {
    title: string,
    content: string,
    okText: string,
    cancelText: string,
    onOk: () => void,
    onCancel?: () => void
}

const ModalCreator: ({title, content, okText, cancelText, onOk, onCancel}: IModalProps) => void = (
    {title, content, okText, cancelText, onOk, onCancel} :IModalProps) => {
    confirm({
        title: title,
        content: content,
        okText: okText,
        okType: 'primary',
        cancelText: cancelText,
        className: 'app-modal',
        onOk() {onOk()},
        onCancel() {

            if (onCancel) {
                onCancel()
            }},
    });
}

export default ModalCreator
