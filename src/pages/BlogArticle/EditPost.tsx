import { useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const EditPost = () => {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [picture, setPicture] = useState('')

  const handleEditPostClick = () => {
    console.log({ title, description, picture})
    const post = { title, description, picture }
    mutate(post)
    setTitle('')
    setDescription('')
    setPicture('')
  }

  const editPost = (post: any) => {
    return axios.put(`http://localhost:3000/glempings/${id}`, post)
  }

  const useEditPost = () => {
    const queryClient = useQueryClient()

    return useMutation(editPost, {
      onSuccess: () => {
        queryClient.invalidateQueries(['blog'])
      }
    })
  }

  const { mutate} = useEditPost()

  return (
    <>
      <div className='newPost__container'>
        <h3 className='newPost__heading'>
          Labot rakstu
        </h3>
        <form 
          className='newPost__form'
          onSubmit={e => e.preventDefault()}>
          <label
            className='newPost__label'>
            Labot nosaukumu:
            <input
              className='newPost__input'
              type='text'
              value={title}
              onChange = {(e) => setTitle(e.target.value)}
              >
            </input>
          </label>
          <label
            className='newPost__label'>
            Raksts:
            <textarea
              name="postContent" 
              rows={4} 
              cols={35}
              className='newPost__input'
              value={description}
              onChange = {(e) => setDescription(e.target.value)}
              >
            </textarea>
          </label>
          <label
            className='newPost__label'>
            Links uz fotogrāfiju:
            <input
              placeholder='https://...'
              className='newPost__input'
              type='text'
              value={picture}
              onChange = {(e) => setPicture(e.target.value)}
              >
            </input>
          </label>
          <button 
            className="button"
            id='edit'
            onClick={handleEditPostClick}
            >
            <a href='#top' className='anchor'>Labot rakstu</a> 
          </button>
        </form>
      </div>
    </>
  )
}