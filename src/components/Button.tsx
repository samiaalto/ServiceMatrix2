import { ReactComponent as Redo } from './icons/Redo.svg';
import { ReactComponent as Clipboard } from './icons/Clipboard.svg';
import { ReactComponent as Select } from './icons/Select.svg';
import { ReactComponent as Samples } from './icons/Samples.svg';
import './styles/Button_styles.css';

interface buttonProps {
  title: string;
  type: string;
  onClick: (el) => void;
}

function ResetButton({ title, type, onClick }: buttonProps) {
  function handleOnClick(el) {
    onClick(el);
    //console.log('CLICKED');
  }

  function renderSwitch(param) {
    switch (param) {
      case 'samples':
        return <Samples />;
      case 'clipboard':
        return <Clipboard />;
      case 'select':
        return <Select />;
      default:
        return <Redo />;
    }
  }

  return (
    <div className={'btn-wrapper ' + type}>
      <div
        tabIndex={0}
        className="btn-header"
        role="button"
        onKeyPress={(el) => handleOnClick(el)}
        onClick={(el) => handleOnClick(el)}>
        <div className="btn-header_title">
          <p className="btn-header_title--bold">{title}</p>
        </div>
        <div className="btn-header_icon">{renderSwitch(type)}</div>
      </div>
    </div>
  );
}

export default ResetButton;
