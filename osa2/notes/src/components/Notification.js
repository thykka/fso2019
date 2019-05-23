import React from 'react';

const Notification = ({ notification }) => {
  if(
    !notification ||
    !notification.hasOwnProperty('message')
  ) return null;

  const type = notification.type || 'error';

  return (
    <div className={ `notification notification--${ type }` }>
      { notification.message }
    </div>
  )
}

export default Notification;
