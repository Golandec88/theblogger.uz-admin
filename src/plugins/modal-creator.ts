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

const ModalCreator = (props : IModalProps) => {
    confirm({
        title: props.title,
        content: props.content,
        okText: props.okText,
        okType: 'primary',
        cancelText: props.cancelText,
        className: 'app-modal',
        onOk() {props.onOk()},
        onCancel() {if (props.onCancel) props.onCancel()},
    });
}

export default ModalCreator
