import React from 'react';

const CourseItem = (props) => (
  <p>
    {props.name} {props.exercises}
  </p>
);

export default CourseItem;
