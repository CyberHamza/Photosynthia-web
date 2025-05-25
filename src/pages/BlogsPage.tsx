import { useEffect, useState } from 'react';
import { fetchBlogs, } from '../services/blogService';
import type { BlogArticle } from '../services/blogService';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const articles = await fetchBlogs();
        setBlogs(articles);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Environmental Blogs</h1>

      {loading && <p className="text-blue-600">Loading blogs...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={blog.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image'}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-green-800 mb-2">{blog.title}</h2>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Source:</strong> {blog.source.name}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Published:</strong>{' '}
                {new Date(blog.publishedAt).toLocaleDateString('en-US')}
              </p>
              <p className="text-sm text-gray-700 mb-3">
                {blog.description || 'No description available.'}
              </p>
              <a
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-blue-500 hover:underline"
              >
                Read Full Article →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
