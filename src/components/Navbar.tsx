import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-green-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Photosynthia</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-green-200">Home</Link>
          <Link to="/weather" className="hover:text-green-200">Weather</Link>
          <Link to="/plants" className="hover:text-green-200">Plants</Link>
          <Link to="/blogs" className="hover:text-green-200">Blogs</Link>

        </div>
      </div>
    </nav>
  )
}