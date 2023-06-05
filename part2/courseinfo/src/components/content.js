const Content = ({ ctent }) => (
  <div>
    {ctent.map((content) => (
      <Part key={content.id} part={content} />
    ))}
  </div>
);
const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

export default Content;
