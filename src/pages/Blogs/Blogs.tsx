import { Link, Outlet } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import './Blogs.css'

type BlogCard = {
  id: number,
  image: string,
  title: string
}

const getAllBlogs = async () => {
  const { data } = await axios.get<BlogCard[]>('http://localhost:3004/posts')
  return data
} 

export const Blogs = () => {
  const {data, isLoading} = useQuery({
    queryKey: ['blogs'],
    queryFn: getAllBlogs
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (!data) {
    throw Error('Ooops, something went wrong :(')
  }

  return (
    <div className="blogs__page">
      <div className="blogs__all">
        <h1 className="blogs__page--name">Visi glampingi</h1>
        <section className="blogs">
          {data.map((card) => {
            return (
              <Link 
                to={`${card.id}`}
                className="card-link">
                  <div
                    className="blogs__container"
                    key={card.id}>
                    <div 
                      className="blogs__card"
                      style={{backgroundImage: `url(${card.image})`}}
                      >
                      <h3 className="blogs__card--title">
                        {card.title}
                      </h3>
                    </div>
                  </div>
              </Link>
            )
          })}
          <Outlet />
        </section>
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
    </div>
  )
}

