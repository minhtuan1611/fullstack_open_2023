import { CoursePart } from "../types";

const Course = ({ coursePart }: { coursePart: CoursePart }): JSX.Element => {
  if (coursePart.kind === "basic")
    return (
      <div>
        <p>
          {" "}
          <b>{coursePart.name}</b>{" "}
        </p>
        <p>
          <i>{coursePart.description}</i>
        </p>
      </div>
    );
  else if (coursePart.kind === "group")
    return (
      <div>
        <p>
          {" "}
          <b>{coursePart.name}</b>{" "}
        </p>
        <p>project exercises {coursePart.exerciseCount}</p>
      </div>
    );
  else if (coursePart.kind === "background") {
    return (
      <div>
        <p>
          {" "}
          <b>{coursePart.name}</b>{" "}
        </p>
        <p>submiss to {coursePart.backgroundMaterial}</p>
      </div>
    );
  }
  return <div></div>;
};

export default Course;
