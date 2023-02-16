import './BlogArticle.css'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import {
  useQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { Comments } from './Comments'

type Article = {
  id: number,
  image: string,
  title: string,
  content: string
}

export const BlogArticle = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const queryClient = useQueryClient()
  const { id } = useParams()
  const navigate = useNavigate()
  
  const getArticle = async () => {
    const { data } = await axios.get<Article[]>(`http://localhost:3004/posts/${id}`)
    return data
  }

  const {data, isLoading} = useQuery({
    queryKey: ['blog'],
    queryFn: getArticle
  })

  const handleAddPostClick = () => {
    console.log({ title, content, image})
    const post = { title, content, image }
    mutate(post)
    setTitle('')
    setContent('')
    setImage('')
    navigate("/blogs")
    window.location.reload()
  }

  const addPost = (post: any) => {
    return axios.post('http://localhost:3004/posts', post)
  }

  const useAddPost = () => {
    return useMutation(addPost, {
      onSuccess: () => {
        queryClient.invalidateQueries(['blog'])
      }
    })
  }

  const { mutate } = useAddPost()

  const handleDeletePost = async (id:number) => {
    try {
      await axios.delete(`http://localhost:3004/posts/${id}`)
      window.location.reload()
      navigate("/blogs")
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
      <div className="article__container">
        <div className="article__buttons" id='top'>
          <button 
            className='button'
            type='button'>
              <a href='#add' className='anchor'>Pievienot rakstu</a> 
          </button>
        </div>
        <div className='article__main'>
          {data.map((article) => {
            return (
              <>
                <div className="article__picture">
                  <img 
                    src={article.image}
                    className="article__image">
                    </img>
                </div>
                <div className='article__text'>
                  <h1 
                    className="article__title">
                      {article.title}
                  </h1>
                  <div 
                    className="article__description">
                      {article.content}
                  </div>
                </div>
                <button 
                  className="button"
                  onClick={() => handleDeletePost(article.id)}
                  >
                    Dzēst rakstu
                </button>
              </>
            )
          })}
        </div>
      </div>

      <Comments />

      <div className='postsInteraction__container'>
        <div className='newPost__container'>
          <h3 className='newPost__heading'>
            Pievienot jaunu rakstu
          </h3>
          <form 
            className='newPost__form'
            onSubmit={e => e.preventDefault()}>
            <label
              className='newPost__label'>
              Raksta nosaukums:
              <input
                placeholder='glampings'
                className='newPost__input'
                type='text'
                value={title}
                name="title"
                required
                onChange = {(e) => setTitle(e.target.value)}>
              </input>
            </label>
            <label
              className='newPost__label'>
              Raksts:
              <textarea
                rows={4} 
                cols={35}
                placeholder='apraksts...'
                className='newPost__input'
                value={content}
                name="content"
                required
                onChange = {(e) => setContent(e.target.value)}>
              </textarea>
            </label>
            <label
              className='newPost__label'>
              Links uz fotogrāfiju:
              <input
                placeholder='https://...'
                className='newPost__input'
                type='text'
                value={image}
                name="image"
                required
                onChange = {(e) => setImage(e.target.value)}>
              </input>
            </label>
            <button 
              className="button"
              id='add'
              onClick={handleAddPostClick}
              >
              Pievienot rakstu
            </button>
          </form>
        </div>
      </div>

      <footer className="footer">
        <h5 className="footer__text">
          Radīts ar 
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_406_1997)">
            <path d="M17.5 1.9165C16.3739 1.93402 15.2724 2.24836 14.3067 2.82778C13.341 3.40719 12.5453 4.23117 12 5.2165C11.4546 4.23117 10.6589 3.40719 9.6932 2.82778C8.7275 2.24836 7.62601 1.93402 6.49996 1.9165C4.7049 1.99449 3.01366 2.77976 1.79574 4.10074C0.577818 5.42171 -0.0677922 7.17103 -4.17093e-05 8.9665C-4.17093e-05 13.5135 4.78596 18.4795 8.79996 21.8465C9.69618 22.5996 10.8293 23.0125 12 23.0125C13.1706 23.0125 14.3037 22.5996 15.2 21.8465C19.214 18.4795 24 13.5135 24 8.9665C24.0677 7.17103 23.4221 5.42171 22.2042 4.10074C20.9863 2.77976 19.295 1.99449 17.5 1.9165Z" fill="#374957"/>
            </g>
            <defs>
            <clipPath id="clip0_406_1997">
            <rect width="24" height="24" fill="white"/>
            </clipPath>
            </defs>
          </svg> 
          Latvijā
        </h5>
      </footer>
    </>
  )
}