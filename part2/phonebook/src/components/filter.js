const Filter = ({ filterr, handleChange }) => {
  return (
    <div>
      filter shown with
      <input value={filterr} onChange={handleChange} />
    </div>
  );
};
export default Filter;
