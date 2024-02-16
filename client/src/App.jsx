import { useState, useEffect } from 'react'
import Notification, { NotificationType } from './components/Notification'
import LoginForm from '@/components/LoginForm'
import Blog from '@/components/Blog'
import blogService from '@/services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLoggedInUser = (user) => {
    showNotification(`Welcome back, ${user.name}!`, NotificationType.SUCCESS)
    setUser(user)
  }

  const handleErrorMessage = (message) => {
    showNotification(message, NotificationType.ERROR)
  }

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const onboardingSection = () => (
    <div>
      <h2>Log in to application</h2>
      <LoginForm
        handleLoggedInUser={handleLoggedInUser}
        handleErrorMessage={handleErrorMessage}
      />
    </div>
  )

  const loggedInSection = () => (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )

  return (
    <div>
      <Notification message={notification?.message} type={notification?.type} />
      {user === null ? onboardingSection() : loggedInSection()}
    </div>
  )
}

export default App
