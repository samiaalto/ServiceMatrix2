import { useState } from 'react';
import { Offcanvas, Tabs, Tab, Form } from 'react-bootstrap';
import ParcelLabel from './ParcelLabel';
import FreightLabel from './FreightLabel';
import SampleCodeView from './SampleCodeView';
import './styles/OffCanvas_styles.css';

interface offCanvasProps {
  openCanvas: boolean;
  closeCanvas: () => void;
  data: any;
  showOptional: any;
  showSamples: any;
  t: any;
}

const OffCanvas = ({
  openCanvas,
  closeCanvas,
  data,
  t,
  showOptional,
  showSamples,
}: offCanvasProps) => {
  //const defaultKey = data.drawerTab ? data.drawerTab : 'label';
  const [key, setKey] = useState(data.drawerTab ? data.drawerTab : 'label');
  //const [showOptional, setShowOptional] = useState(false);
  //const [showSamples, setShowSamples] = useState(false);

  return (
    <>
      <Offcanvas backdrop={false} placement="end" show={openCanvas} onHide={closeCanvas}>
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3">
            <Tab eventKey="label" title={t('Label')}>
              {data.serviceGroup === 'FREIGHT' ? (
                <FreightLabel data={data} />
              ) : (
                <ParcelLabel data={data} />
              )}
            </Tab>
            {data.POSTRA && (
              <Tab eventKey="postra" title="Postra">
                <Form.Group>
                  <Form.Check
                    type="switch"
                    id="mandatoryOnly"
                    label={t("'Show optional fields'")}
                    checked={data.showOptional}
                    onChange={showOptional}
                  />
                  <Form.Check
                    type="switch"
                    id="sampleValues"
                    label={t("'Show sample values'")}
                    checked={data.showSamples}
                    onChange={showSamples}
                  />
                </Form.Group>
                <SampleCodeView data={data.POSTRA} />
              </Tab>
            )}
            {data.SMARTSHIP && (
              <Tab eventKey="smartship" title="SmartShip">
                <Form.Group>
                  <Form.Check
                    type="switch"
                    id="mandatoryOnly"
                    label={t("'Show optional fields'")}
                    checked={data.showOptional}
                    onChange={showOptional}
                  />
                  <Form.Check
                    type="switch"
                    id="sampleValues"
                    label={t("'Show sample values'")}
                    checked={data.showSamples}
                    onChange={showSamples}
                  />
                </Form.Group>
                <SampleCodeView data={data.SMARTSHIP} />
              </Tab>
            )}
          </Tabs>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default OffCanvas;
