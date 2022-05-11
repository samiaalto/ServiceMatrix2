import { Modal, Button, Row, Col, Table } from 'react-bootstrap';
import './styles/Modal_styles.css';

const ModalWindow = ({ openModal, closeModal, data, t }) => {
  return (
    <>
      <Modal show={openModal} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>{t(data.title) + ' (' + data.title + ')'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {data.description && data.dimensions ? (
            <>
              <Row>
                <Col className="modal-text-header">{t('Description')}</Col>
                <Col className="modal-text-header">{t('Dimensions')}</Col>
              </Row>
              <Row className="modal-text">
                <Col> {t(data.description)}</Col>
                <Col>
                  <Table className="modal-table">
                    <thead>
                      <tr>
                        <td></td>
                        {data.dimensions.map((dimension) => (
                          <td>{dimension.Name}</td>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{t('Height') + ' (cm)'}</td>
                        {data.dimensions.map((dimension) => (
                          <td>{dimension.MinHeight + '-' + dimension.MaxHeight}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>{t('Width') + ' (cm)'}</td>
                        {data.dimensions.map((dimension) => (
                          <td>{dimension.MinWidth + '-' + dimension.MaxWidth}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>{t('Depth') + ' (cm)'}</td>
                        {data.dimensions.map((dimension) => (
                          <td>{dimension.MinDepth + '-' + dimension.MaxDepth}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>{t('Weight') + ' (kg)'}</td>
                        {data.dimensions.map((dimension) => (
                          <td>{dimension.MinWeight + '-' + dimension.MaxWeight}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>{t('Cirmumference') + ' (cm)'}</td>
                        {data.dimensions.map((dimension) => (
                          <td>{dimension.Circumference}</td>
                        ))}
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </>
          ) : (
            ''
          )}
          {data.description && !data.dimensions ? (
            <>
              <Row>
                <Col className="modal-text-header">{t('Description')}</Col>
              </Row>
              <Row className="modal-text">
                <Col> {t(data.description)}</Col>
              </Row>
            </>
          ) : (
            ''
          )}

          {data.routes ? (
            <>
              <Row>
                <Col className="modal-text-header">{t('Routes')}</Col>
              </Row>
              <Row>
                <Table className="modal-table">
                  <thead>
                    <tr>
                      <th>{t('Departure')}</th>
                      <th>{t('Destination')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.routes.map((route) => (
                      <tr>
                        <td>{t(route.DepartureCountry)}</td>
                        <td>
                          {route.DestinationCountries.map((destination) => (
                            <Row>{destination.Country}</Row>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Row>
            </>
          ) : (
            ''
          )}

          {data.excluded ? (
            <>
              <Row>
                <Col className="modal-text-header">{t("'Excluded Additional Services'")}</Col>
              </Row>
              {data.excluded.map((addon) => (
                <Row>
                  <Col>{t(addon) + ' (' + addon + ')'}</Col>
                </Row>
              ))}
            </>
          ) : (
            ''
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalWindow;
