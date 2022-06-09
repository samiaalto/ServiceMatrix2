import { Toast, ToastContainer } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { ReactComponent as AlertIcon } from './icons/Alert.svg';
import './styles/Alert_styles.css';

const Alert = ({ data, t }) => {
  const [list, setList] = useState(data);

  useEffect(() => {
    setList([...data]);
  }, [data]);

  useEffect(() => {
    console.log(list);
  }, [list]);

  const deleteToast = (id) => {
    const listItemIndex = list.findIndex((e) => e.id === id);
    list.splice(listItemIndex, 1);
    setList([...list]);
  };

  return (
    <ToastContainer position="top-end" className="p-3">
      {list.length > 0
        ? list.map((item) => (
            <>
              <Toast
                key={item.id}
                onClose={() => deleteToast(item.id)}
                show={item.show}
                delay={item.delay}
                autohide>
                <Toast.Header>
                  <AlertIcon className="alert-icon" />
                  <strong className="me-auto">{item.title ? t(item.title) : t('Error')}</strong>
                  <small>
                    {Math.floor(((Date.now() - item.datestamp) / 1000) * 100) / 100} s {t('ago')}
                  </small>
                </Toast.Header>
                <Toast.Body>
                  {t(item.text) +
                    ' "' +
                    item.value +
                    '" ' +
                    t("'in parameter'") +
                    ' "' +
                    item.param +
                    '"'}
                </Toast.Body>
              </Toast>
            </>
          ))
        : ''}
    </ToastContainer>
  );
};

export default Alert;
