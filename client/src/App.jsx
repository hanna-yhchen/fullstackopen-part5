import { useState, useEffect } from 'react'
import Notification, { NotificationType } from './components/Notification'
import LoginForm from '@/components/LoginForm'
import Blog from '@/components/Blog'
import blogService from '@/services/blogs'

const LOGGED_USER_KEY = 'loggedBloglistAppUser'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem(LOGGED_USER_KEY)
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLoggedInUser = (user) => {
    showNotification(`Welcome back, ${user.name}!`, NotificationType.SUCCESS)
    window.localStorage.setItem(LOGGED_USER_KEY, JSON.stringify(user))
    blogService.setToken(user.token)
    setUser(user)
  }

  const handleErrorMessage = (message) => {
    showNotification(message, NotificationType.ERROR)
  }

  const handleLogoutButtonClicked = () => {
    window.localStorage.removeItem(LOGGED_USER_KEY)
    blogService.setToken(null)
    setUser(null)
    showNotification("You've been logged out!", NotificationType.SUCCESS)
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
      <p>
        Current User: {user.name} <br />
        <button onClick={handleLogoutButtonClicked}>logout</button>
      </p>
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
