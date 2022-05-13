import { Offcanvas } from 'react-bootstrap';
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
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FreightLabel data={data} />
          <ParcelLabel data={data} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default OffCanvas;
