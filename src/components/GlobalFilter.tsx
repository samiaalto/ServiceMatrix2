interface globalFilterProps {
  filter: string;
  setFilter: (e) => void;
}

const GlobalFilter = ({ filter, setFilter }: globalFilterProps) => {
  return (
    <span>
      <input
        value={filter || ''}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Global Filter"
      />
    </span>
  );
};

export default GlobalFilter;
