import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from './pages/Layout/Layout';
import { Home } from './pages/Home/Home';
import { Blogs } from './pages/Blogs/Blogs';
import { NoPage } from './pages/NoPage/NoPage';
import { BlogArticle } from './pages/BlogArticle/BlogArticle';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/blogs/:id' element={<BlogArticle />} />
          <Route path='*' element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
