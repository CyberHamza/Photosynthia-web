import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import WeatherPage from './pages/WeatherPage'
import BlogsPage from './pages/BlogsPage';


export default function App() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
        </Routes>
      </main>
    </>
  )
}