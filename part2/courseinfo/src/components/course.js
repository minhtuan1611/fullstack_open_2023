import Header from "./header";
import Content from "./content";
import Total from "./total";

const Course = ({ course }) => (
  <>
    <Header headling={course.name} />
    <Content ctent={course.parts} />
    <Total total={course.parts} />
  </>
);
export default Course;
