const PersonForm = ({ nName, hName, nNum, hNum, oSub }) => {
  return (
    <form onSubmit={oSub}>
      <div>
        name: <input value={nName} onChange={hName} />
      </div>

      <div>
        number: <input value={nNum} onChange={hNum} />
      </div>

      <button type="submit">add</button>
    </form>
  );
};
export default PersonForm;
