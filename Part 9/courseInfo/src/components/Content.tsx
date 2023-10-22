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
        return <Course coursePart={coursePart} />;
      case "group":
        return <Course coursePart={coursePart} />;
      case "background":
        return <Course coursePart={coursePart} />;
      default:
        return assertNever(coursePart);
    }
  });
  return <div>{parts}</div>;
};

export default Content;
