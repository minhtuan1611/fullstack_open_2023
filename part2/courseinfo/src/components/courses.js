import Course from "./course";
const Courses = ({ courses }) => (
  <>
    <h1> Web development curriculum </h1>
    {courses.map((course) => (
      <Course course={course} key={course.id} />
    ))}
  </>
);

export default Courses;
