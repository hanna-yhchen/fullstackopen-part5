import { useState } from 'react'
import blogService from '@/services/blogs'

const Input = ({ title, value, setter }) => (
  <label className='inputLabel'>
    {title}
    <input
      type='text'
      value={value}
      onChange={({ target }) => setter(target.value)}
    />
  </label>
)

const BlogForm = ({ handleCreatedBlog, handleErrorMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({ title, author, url })
      setTitle('')
      setAuthor('')
      setUrl('')
      handleCreatedBlog(newBlog)
    } catch (error) {
      console.error('failed to create blog:', error)
      handleErrorMessage('Something went wrong!')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input title='Title:' value={title} setter={setTitle} />
      <Input title='Author:' value={author} setter={setAuthor} />
      <Input title='URL:' value={url} setter={setUrl} />
      <button type='submit'>Create</button>
    </form>
  )
}

export default BlogForm
