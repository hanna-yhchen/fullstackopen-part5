const NotificationType = Object.freeze({
  ERROR: 'error',
  SUCCESS: 'success'
})

const Notification = ({ message, type }) => {
  if (message == null) { return null }

  const color = {
    color: type === NotificationType.ERROR ? 'red' : 'green'
  }

  return (
    <div className='notification' style={color}>
      {message}
    </div>
  )
}

export default Notification
export { NotificationType }
