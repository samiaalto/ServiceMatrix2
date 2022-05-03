import './styles/Filter_styles.css';

interface filterProps {
  value: string;
  placeHolder: string;
  onChange: (item) => void;
}

const Filter = ({ placeHolder, onChange, value }: filterProps) => {
  return (
    <div className="filter-wrapper">
      <input id="filter" value={value} placeholder={placeHolder} onChange={onChange} />
    </div>
  );
};

export default Filter;
