import { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as ChevronIcon } from './icons/ChevronIcon.svg';
import './styles/Dropdown_styles.css';

type item = { id: number; value: string; additionalInfo: string };

interface dropdownProps {
  title: string;
  value: string;
  items: item[];
  multiSelect: boolean;
  onChange: (item) => void;
  t: any;
}

function Dropdown({ title, items, multiSelect, onChange, value, t }: dropdownProps) {
  const [open, setOpen] = useState(false);
  const [handle, setHandle] = useState(-90);
  const [selection, setSelection] = useState([]);
  const [menuHeight, setMenuHeight] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const toggle = (prop: boolean) => setOpen(!open);

  function handleOnClick(item) {
    if (!selection.some((current) => current.id === item.id)) {
      if (!multiSelect) {
        setSelection([item]);
        setSelectedTitle(item.value);
        toggle(!open);
        onChange([item]);
      } else if (multiSelect) {
        setSelection([...selection, item]);
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter((current) => current.id !== item.id);
      setSelection([...selectionAfterRemoval]);
      setSelectedTitle(title);
      onChange([]);
    }
  }

  function isItemInSelection(item) {
    if (selection.some((current) => current.id === item.id)) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (items.length > 0) {
      for (let item of items) {
        if (item.value === value) {
          setSelection([item]);
          setSelectedTitle(item.value);
        }
      }
    }
  }, [value]);

  function calcHeight(el: any) {
    if (open) {
      const maxHeight = 300;
      const height = 47 + el.offsetHeight;
      if (height > maxHeight) {
        setMenuHeight(maxHeight);
      } else {
        setMenuHeight(height);
      }
      setHandle(90);
    } else {
      setMenuHeight(0);
      setHandle(-90);
    }
  }

  return (
    <div className="dd-wrapper" style={{ height: menuHeight }}>
      <div
        tabIndex={0}
        className="dd-header"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}>
        <div className="dd-header_title">
          <p className="dd-header_title--bold">{!selectedTitle ? title : t(selectedTitle)}</p>
        </div>
        <div className="dd-header_action">
          <p>
            <ChevronIcon className="chevron" style={{ transform: 'rotate(' + [handle] + 'deg)' }} />
          </p>
        </div>
      </div>
      <CSSTransition
        in={open}
        timeout={300}
        classNames="menu-primary"
        onEnter={calcHeight}
        onExited={() => {
          calcHeight(0);
        }}
        unmountOnExit>
        <div className="menu">
          <ul className="dd-list">
            {items.map((item) => (
              <li className="dd-list-item" key={item.id}>
                <button type="button" onClick={() => handleOnClick(item)}>
                  <span className="dd-list-item_group">
                    <span className="dd-list-item_value">{t(item.value)}</span>
                    <span className="dd-list-item_selection">
                      {isItemInSelection(item) && 'Selected'}
                    </span>
                    <span className="dd-list-item_additionalInfo">{item.additionalInfo}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </CSSTransition>
    </div>
  );
}

export default Dropdown;
//module.exports = { Dropdown };
