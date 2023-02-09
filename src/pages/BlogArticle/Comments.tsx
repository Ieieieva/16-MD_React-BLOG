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
  avatar: string,
  comment: string
}

export const Comments = () => {
  const [comment, setComment] = useState('')
  const [avatar, setAvatar] = useState('')

  const getComments = async () => {
    const { data } = await axios.get<Comment[]>(`http://localhost:3000/comments/`)

    return data
  }

  const {data, isLoading} = useQuery({
    queryKey: ['comment'],
    queryFn: getComments
  })

 const handleAddCommentClick = () => {
    console.log({ comment, avatar })
    const text = { comment, avatar }
    mutate(text)
    setComment('')
    setAvatar('')
  }

  const addComment = (text: any) => {
    return axios.post('http://localhost:3000/comments', text)
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
                    src={comment.avatar}
                    className='comment__picture'>
                  </img>
                </div>
                <div className="comment__text">
                  <p>
                    {comment.comment}
                  </p>
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
              value={avatar}
              onChange = {(e) => setAvatar(e.target.value)}>
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