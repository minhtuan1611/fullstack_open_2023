import { CoursePart } from "../types";

const Course = ({ coursePart }: { coursePart: CoursePart }): JSX.Element => {
  if (coursePart.kind === "basic")
    return (
      <div>
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
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
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
        </p>
        <p>project exercises {coursePart.groupProjectCount}</p>
      </div>
    );
  else if (coursePart.kind === "background") {
    return (
      <div>
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
        </p>
        <p> {coursePart.description}</p>
        <p>submiss to {coursePart.backgroundMaterial}</p>
      </div>
    );
  } else if (coursePart.kind === "special") {
    return (
      <div>
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
        </p>
        <p>{coursePart.description}</p>
        <p>Requirements: {coursePart.requirements.join(", ")}</p>
      </div>
    );
  }
  return <div></div>;
};

export default Course;
