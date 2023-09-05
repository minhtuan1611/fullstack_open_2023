const Total = ({ total }) => (
  <p>
    <strong>
      total of {total.reduce((a, b) => a + b.exercises, 0)} exercises
    </strong>
  </p>
);
export default Total;
