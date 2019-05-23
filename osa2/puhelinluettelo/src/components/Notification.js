import React from 'react';

const Notification = ({ notification }) => {
  if(
    !notification ||
    !notification.hasOwnProperty('message')
  ) return null;

  const type = notification.type || 'error';

  if(notification.error) {
    notification.message += '; ' + (notification.error).toString();
  }

  return (
    <div className={ `notification notification--${ type }` }>
      { notification.message }
    </div>
  )
}

export default Notification;

export const NotificationDuration = {
  'error': 10000,
  'confirm': 5000
};
