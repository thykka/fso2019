import React from 'react';

const Course = ({ course }) => {
  return (
    <>
    <Header text={course.name} />
    <CourseList parts={course.parts} />
    <Total parts={course.parts} />
    </>
  );
}

const Header = ({ text }) => (
  <h2>{ text }</h2>
);

const CourseList = ({ parts }) => parts.map(part => (
  <CourseItem
    key={part.name}
    name={part.name}
    exercises={part.exercises}
    />
));

const CourseItem = (props) => (
  <p>
    {props.name} {props.exercises}
  </p>
);

const Total = ({parts}) =>
  <p>
    Yhteensä {
      parts.reduce((acc, part) => acc + part.exercises, 0)
    } tehtävää
  </p>;

export default Course;
