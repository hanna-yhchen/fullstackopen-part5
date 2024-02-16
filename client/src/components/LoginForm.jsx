import { useState } from 'react'
import loginService from '@/services/login'

const LoginForm = ({ handleLoggedInUser, handleErrorMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      handleLoggedInUser(user)
    } catch (error) {
      console.error('failed to login:', error)
      handleErrorMessage('wrong credentials')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className='inputLabel'>
        Username:
        <input
          type='text'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <label className='inputLabel'>
        Password:
        <input
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <button type='submit'>Login</button>
    </form>
  )
}

export default LoginForm
