import { motion } from 'framer-motion';

const features = [
  {
    icon: (
      <svg
        className="w-10 h-10 text-green-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L2 7h20L12 2z" />
        <path d="M2 7v7a10 10 0 0010 10 10 10 0 0010-10V7" />
      </svg>
    ),
    title: 'Real-Time Weather Updates',
    description:
      'Know the climate conditions wherever you are with our accurate weather tracking system.',
  },
  {
    icon: (
      <svg
        className="w-10 h-10 text-green-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx={12} cy={12} r={10} />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: 'E-Commerce Plant Store',
    description:
      'Browse and buy healthy plants easily, with secure payments and quick delivery.',
  },
  {
    icon: (
      <svg
        className="w-10 h-10 text-green-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h12a2 2 0 012 2z" />
      </svg>
    ),
    title: 'Eco Blogs & Articles',
    description:
      'Stay informed with trending and expert articles on environmental conservation.',
  },
  {
    icon: (
      <svg
        className="w-10 h-10 text-green-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 10h18M3 6h18M3 14h18M3 18h18" />
      </svg>
    ),
    title: 'Campaigns & Initiatives',
    description:
      'Join and support ongoing green movements for real social and environmental impact.',
  },
];

export default function HomepageDetails() {
  return (
    <section className="bg-green-50 py-16 px-6">
      {/* Mission & Goals */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold text-green-900 mb-6">Our Mission & Goals</h2>
        <p className="max-w-3xl mx-auto text-green-800 text-lg leading-relaxed mb-4">
          We aim to foster a greener world by connecting people with nature through technology and education. Our goals include planting over 100,000 plants, engaging tens of thousands of users, and reducing carbon footprints through urban gardening and awareness campaigns.
        </p>
        <p className="max-w-3xl mx-auto text-green-700 italic">
          Together, we create lasting impact for a sustainable planet.
        </p>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon, title, description }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
          >
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">{title}</h3>
            <p className="text-green-700">{description}</p>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-green-900 mb-4">
          Ready to join the green revolution?
        </h2>
        <p className="text-green-800 mb-8 max-w-2xl mx-auto">
          Sign up today and start your journey with Photosynthia to nurture the Earth and inspire change.
        </p>
        <a
          href="/signup"
          className="inline-block bg-green-700 text-white font-semibold px-10 py-3 rounded shadow-lg hover:bg-green-800 transition"
        >
          Get Started
        </a>
      </div>

      {/* Footer */}
      <footer className="mt-32 bg-green-900 text-green-100 py-8 px-6 text-center">
        <p>© 2025 Photosynthia. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
        </div>
      </footer>
    </section>
  );
}
