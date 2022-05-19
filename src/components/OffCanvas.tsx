import { Offcanvas, Tabs, Tab } from 'react-bootstrap';
import ParcelLabel from './ParcelLabel';
import FreightLabel from './FreightLabel';
import './styles/OffCanvas_styles.css';

interface offCanvasProps {
  openCanvas: boolean;
  closeCanvas: () => void;
  data: any;
  t: () => void;
}

const OffCanvas = ({ openCanvas, closeCanvas, data, t }: offCanvasProps) => {
  return (
    <>
      <Offcanvas backdrop={false} placement="end" show={openCanvas} onHide={closeCanvas}>
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <Tabs
            id="controlled-tab-example"
            activeKey={data.drawerTab ? data.drawerTab : 'label'}
            //onSelect={(k) => setKey(k)}
            className="mb-3">
            <Tab eventKey="label" title="Label">
              <FreightLabel data={data} />
              <ParcelLabel data={data} />
            </Tab>
            <Tab eventKey="profile" title="Profile"></Tab>
            <Tab eventKey="contact" title="Contact"></Tab>
          </Tabs>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default OffCanvas;
