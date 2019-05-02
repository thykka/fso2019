import React from 'react';
import CourseItem from './CourseItem'

const CourseList = ({ parts }) => parts.map(part => (
  <CourseItem
    key={part.name}
    name={part.name}
    exercises={part.exercises}
    />
));

export default CourseList;
