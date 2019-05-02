import React from 'react';

const Total = ({parts}) =>
  <p>
    Yhteensä {
      parts.reduce((acc, part) => acc + part.exercises, 0)
    } tehtävää
  </p>;

export default Total;
