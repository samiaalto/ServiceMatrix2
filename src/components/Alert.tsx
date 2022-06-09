import { Toast, ToastContainer } from 'react-bootstrap';
import { ReactComponent as AlertIcon } from './icons/Alert.svg';
import './styles/Alert_styles.css';

const Alert = ({ data, t, show, closeToast }) => {
  const test = [
    { id: 0, text: 'kokeilu', param: 'addons', value: '3199' },
    { id: 1, text: 'kokeilu2', param: 'addons', value: '3198' },
    { id: 2, text: 'kokeilu3', param: 'service', value: '3199' },
  ];

  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast key={0} onClose={closeToast} show={show} delay={10000} autohide>
        <Toast.Header>
          <AlertIcon className="alert-icon" />
          <strong className="me-auto">{t('Error')}</strong>
          <small>1 s {t('ago')}</small>
        </Toast.Header>
        <Toast.Body>
          {data
            ? t(data.text) +
              ' "' +
              data.value +
              '" ' +
              t("'in parameter'") +
              ' "' +
              data.param +
              '"'
            : ''}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default Alert;
