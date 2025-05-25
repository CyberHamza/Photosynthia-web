import { motion } from 'framer-motion';
import ProgressStats from '../components/ProgressStats';
import HomepageDetails from '../components/HomepageDetails';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 flex flex-col justify-center items-center px-6 text-center">
      {/* Hero Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl"
      >
        <h1 className="text-5xl font-extrabold text-green-900 mb-4 leading-tight drop-shadow-lg">
          Photosynthia
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-green-800 drop-shadow-md">
          Your Green Companion for a Sustainable Future
        </p>

        {/* CTA Buttons */}
        <div className="space-x-4">
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="/plants"
            className="inline-block bg-green-700 text-white font-semibold px-8 py-3 rounded shadow-lg hover:bg-green-800 transition"
          >
            Explore Plants
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="/weather"
            className="inline-block bg-green-500 text-white font-semibold px-8 py-3 rounded shadow-lg hover:bg-green-600 transition"
          >
            Check Weather
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="/blogs"
            className="inline-block bg-green-300 text-green-900 font-semibold px-8 py-3 rounded shadow-lg hover:bg-green-400 transition"
          >
            Read Blogs
          </motion.a>
        </div>
      </motion.div>

      {/* Hero Image */}
      <motion.img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
        alt="Beautiful green leaves"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
        className="mt-12 rounded-xl shadow-xl max-w-xl mx-auto w-full object-cover"
      />
      <ProgressStats />
      <HomepageDetails />
    </main>
  );
}
