import { useParams } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


type Comment = {
  id: number,
  image: string,
  comment: string,
  author: string,
  post_id: number
}

export const Comments = () => {
  const [comment, setComment] = useState('')
  const [image, setImage] = useState('')
  const [author, setAuthor] = useState('')

  const getComments = async () => {
    const { data } = await axios.get<Comment[]>(`http://localhost:3004/comments`)

    return data
  }

  const {data, isLoading} = useQuery({
    queryKey: ['comment'],
    queryFn: getComments
  })

 const handleAddCommentClick = () => {
    console.log({ comment, image, author })
    const text = { comment, image, author }
    mutate(text)
    setComment('')
    setImage('')
    setAuthor('')
  }


  const addComment = (text: any) => {
    return axios.post('http://localhost:3004/comments', text)
  }

  const useAddComment = () => {
    const queryClient = useQueryClient()

    return useMutation(addComment, {
      onSuccess: () => {
        queryClient.invalidateQueries(['comment'])
      }
    })
  }

  const { mutate } = useAddComment()

  const handleDeleteComment = async (id:number) => {
    try {
      await axios.delete(`http://localhost:3004/comments/${id}`)
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }


  if (isLoading) {
    return <span>Loading...</span>
  }
  if (!data) {
    throw Error('Ooops, something went wrong :(')
  }



  return (
    <>
      <div className="comments__container">
        <h3 className='comments__heading'>Komentāri</h3>
        <div className="comments">
          {data.map(comment => {
            return (
              <div 
                key={comment.id}
                className="one__comment">
                <div className="comment__profile">
                  <img 
                    src={comment.image}
                    className='comment__picture'>
                  </img>
                </div>
                <div>
                  <div className="comment__text">
                    <p className="comment__author">
                      {comment.author}
                    </p>
                  </div>
                  <div className="comment__text">
                    <p>
                      {comment.comment}
                    </p>
                  </div>
                </div>
                <div className="comment__button">
                  <button 
                  className="button"
                  onClick={() => handleDeleteComment(comment.id)}
                  >
                    Dzēst komentāru
                  </button>
                </div>
              </div>
            )
          })}
        </div>
        <form 
          className="comment__form"
          onSubmit={e => e.preventDefault()}>
          <label
            className='comment__label'>
            Pievienot profila bildes linku:
            <input
              placeholder='https://...'
              className='comment__input'
              type='text'
              value={image}
              name="image"
              required
              onChange = {(e) => setImage(e.target.value)}>
            </input>
          </label>
          <label
            className='comment__label'>
            Autors:
            <input
              placeholder='https://...'
              className='comment__input'
              type='text'
              value={author}
              name="author"
              required
              onChange = {(e) => setAuthor(e.target.value)}>
            </input>
          </label>   
          <label
            className='comment__label'>
            Pievienot komentāru:
            <input
              placeholder='komentiņš'
              className='comment__input'
              type='text'
              value={comment}
              name="comment"
              required
              onChange = {(e) => setComment(e.target.value)}>
            </input>
          </label>
          <button 
            className="button"
            onClick={handleAddCommentClick}
            >
            Pievienot
          </button>
        </form>
      </div>
    </>
    
  )
}