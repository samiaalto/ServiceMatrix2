import './styles/Checkbox_styles.css';

interface checkboxProps {
  title: string;
  type: string;
  onClick: (el) => void;
}

function Checkbox({ title, type, onClick }: checkboxProps) {
  function handleOnClick(el) {
    onClick(el);
    //console.log('CLICKED');
  }

  return (
    <div className={'checkbox-wrapper ' + type}>
      <div
        tabIndex={0}
        className="checkbox-header"
        role="button"
        onKeyPress={(el) => handleOnClick(el)}
        onClick={(el) => handleOnClick(el)}>
        <div className="checkbox-header_title">
          <p className="checkbox-header_title--bold">{title}</p>
        </div>
        <div className="checkbox-header_icon">{}</div>
      </div>
    </div>
  );
}

export default Checkbox;
