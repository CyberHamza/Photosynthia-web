export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Photosynthia is Loading!
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
        <p className="text-lg text-gray-700 mb-4">
          If you see this message, Tailwind CSS is working!
        </p>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={() => alert('It works!')}
        >
          Test Button
        </button>
      </div>
    </div>
  )
}