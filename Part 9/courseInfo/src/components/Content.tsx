import { CoursePart } from "../types";
import Course from "./Course";
import { assertNever } from "../utils";
const Content = ({
  courseParts,
}: {
  courseParts: CoursePart[];
}): JSX.Element => {
  const parts = courseParts.map((coursePart) => {
    switch (coursePart.kind) {
      case "basic":
        return <Course coursePart={coursePart} key={coursePart.description} />;
      case "group":
        return <Course coursePart={coursePart} key={coursePart.name} />;
      case "background":
        return <Course coursePart={coursePart} key={coursePart.description} />;
      case "special":
        return <Course coursePart={coursePart} key={coursePart.description} />;
      default:
        return assertNever(coursePart);
    }
  });
  return <div>{parts}</div>;
};

export default Content;
