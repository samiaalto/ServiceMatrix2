import './styles/Checkbox_styles.css';
import { useEffect, useState } from 'react';
import { animated, useSpring, useChain, useSpringRef } from 'react-spring';

interface checkboxProps {
  title: string;
  classname: string;
  value: boolean;
  onClick: (el) => void;
}

const Checkbox = ({
  title,
  classname,
  onClick,
  row: { index },
  column: { id },
  value,
}: checkboxProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [checkMarkLength, setCheckMarkLenght] = useState(null);

  const checkboxAnimationRef = useSpringRef();
  const checkMarkAnimationRef = useSpringRef();

  const checkboxAnimationStyle = useSpring({
    backgroundColor: isChecked ? '#394b58' : 'transparent',
    ref: checkboxAnimationRef,
  });
  const checkMarkAnimationStyle = useSpring({
    x: isChecked ? 0 : checkMarkLength,
    ref: checkMarkAnimationRef,
  });

  useChain(
    isChecked
      ? [checkboxAnimationRef, checkMarkAnimationRef]
      : [checkMarkAnimationRef, checkboxAnimationRef],
    [0, 0.1]
  );

  function handleOnClick(el) {
    setIsChecked(!isChecked);
    onClick({
      row: index,
      column: id,
      isChecked: !isChecked,
    });
  }

  useEffect(() => {
    setIsChecked(value);
  }, [value]);

  return (
    <label className="checkboxLabel">
      <input
        type="checkbox"
        value={value}
        className={classname}
        onChange={(el) => {
          handleOnClick(el);
        }}
      />
      <animated.svg
        className={`checkbox ${isChecked ? 'checkbox--active' : ''}`}
        aria-hidden="true"
        viewBox="-5.5 0 25 10"
        fill="none"
        style={checkboxAnimationStyle}>
        <animated.path
          d="M1 4.5L5 9L14 1"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="3"
          stroke={isChecked ? '#394b58' : '#d3d3d3'}
        />
        <animated.path
          d="M1 4.5L5 9L14 1"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="3"
          strokeDasharray={checkMarkLength}
          strokeDashoffset={checkMarkAnimationStyle.x}
          stroke={isChecked ? '#fff' : '#fff'}
          ref={(ref) => {
            if (ref) {
              setCheckMarkLenght(ref.getTotalLength());
            }
          }}
        />
      </animated.svg>
    </label>
  );
};

export default Checkbox;
