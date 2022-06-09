import { Modal, Button, Row, Col, Table, Tabs, Tab } from 'react-bootstrap';
import './styles/Modal_styles.css';

const ModalWindow = ({
  openModal,
  closeModal,
  data,
  t,
  selected,
  setSelected,
  updateSearchParams,
}) => {
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
          {data.availability ? (
            <>
              <Row>
                <Col className="modal-text-header">{t('Availability')}</Col>
              </Row>
              {data.availability.pudo && data.availability.home ? (
                <Row>
                  <Col className="modal-text">{t('BOTH')}</Col>
                </Row>
              ) : (
                ''
              )}
              {!data.availability.pudo && data.availability.home ? (
                <Row>
                  <Col className="modal-text">{t('HOME')}</Col>
                </Row>
              ) : (
                ''
              )}
              {data.availability.pudo && !data.availability.home ? (
                <Row>
                  <Col className="modal-text">{t('PUDO')}</Col>
                </Row>
              ) : (
                ''
              )}
              {!data.availability.pudo && !data.availability.home ? (
                <Row>
                  <Col className="modal-text">{t('NONE')}</Col>
                </Row>
              ) : (
                ''
              )}
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

          {data.mandatory ? (
            <>
              <Row>
                <Col className="modal-text-header">{t("'Mandatory Information'")}</Col>
              </Row>
              <Row>
                <Col>{data.mandatory}</Col>
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

          {data.fields ? (
            <>
              <Row>
                <Col className="modal-text-header">{t("'Technical Instructions'")}</Col>
              </Row>
              <Tabs
                id="controlled-tab-example"
                activeKey={selected.modalTab ? selected.modalTab : ''}
                onSelect={(k) => {
                  updateSearchParams('modalTab', k);
                  setSelected((prevState) => ({
                    ...prevState,
                    modalTab: k,
                  }));
                }}
                className="mb-3 modal-tabs">
                {data.fields.POSTRA ? (
                  <Tab eventKey="postra" title="Postra">
                    <Table className="modal-tech-table">
                      <thead>
                        <tr>
                          <td>{t("'Attribute Name'")}</td>
                          <td className="attribute_title">{t('Attribute')}</td>
                          <td className="mandatory_title">{t('Mandatory')}</td>
                          <td>{t("'Additional Information'")}</td>
                          <td className="example_title">{t('Example')}</td>
                        </tr>
                      </thead>
                      <tbody>
                        {data.fields.POSTRA.map((item) => (
                          <tr>
                            <td></td>
                            <td className="attribute_col">{item.PropertyName}</td>
                            <td className="mandatory_col">
                              {item.Mandatory ? t('TRUE') : t('FALSE')}
                            </td>
                            <td></td>
                            <td className="example_col">{item.Example}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Tab>
                ) : (
                  ''
                )}
                {data.fields.SMARTSHIP ? (
                  <Tab eventKey="smartship" title="Smartship">
                    <Table className="modal-table">
                      <thead>
                        <tr>
                          <td>{t("'Attribute Name'")}</td>
                          <td>{t('Attribute')}</td>
                          <td>{t('Mandatory')}</td>
                          <td>{t("'Additional Information'")}</td>
                          <td>{t('Example')}</td>
                        </tr>
                      </thead>
                      <tbody>
                        {data.fields.SMARTSHIP.map((item) => (
                          <tr>
                            <td></td>
                            <td>{item.PropertyName}</td>
                            <td>{item.Mandatory ? t('TRUE') : t('FALSE')}</td>
                            <td></td>
                            <td>{item.Example}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Tab>
                ) : (
                  ''
                )}

                {data.fields.WAYBILD16A ? (
                  <Tab eventKey="waybil" title="Waybild16a">
                    <Table className="modal-table">
                      <thead>
                        <tr>
                          <td>{t("'Attribute Name'")}</td>
                          <td>{t('Attribute')}</td>
                          <td>{t('Mandatory')}</td>
                          <td>{t("'Additional Information'")}</td>
                          <td>{t('Example')}</td>
                        </tr>
                      </thead>
                      <tbody>
                        {data.fields.WAYBILD16A.map((item) => (
                          <tr>
                            <td></td>
                            <td>{item.PropertyName}</td>
                            <td>{item.Mandatory ? t('TRUE') : t('FALSE')}</td>
                            <td></td>
                            <td>{item.Example}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Tab>
                ) : (
                  ''
                )}
              </Tabs>
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
