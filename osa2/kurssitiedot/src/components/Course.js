import React from 'react';
import Header from './Header';
import CourseList from './CourseList';
import Total from './Total';

const Course = ({ course }) => {
  return (
    <>
    <Header text={course.name} />
    <CourseList parts={course.parts} />
    <Total parts={course.parts} />
    </>
  );
}

export default Course;
