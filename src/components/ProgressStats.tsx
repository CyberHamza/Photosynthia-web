import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

type Stat = {
  label: string;
  value: number;
  suffix?: string;
};

const stats: Stat[] = [
  { label: 'Plants Sold', value: 25000, suffix: '+' },
  { label: 'Environmental Campaigns', value: 10, suffix: '+' },
  { label: 'Community Members', value: 15000, suffix: '+' },
  { label: 'Blogs Published', value: 100, suffix: '+' }
];

const progressData = [
  { label: 'Plant Growth Target', progress: 75 },
  { label: 'User Engagement', progress: 60 },
  { label: 'Carbon Footprint Reduction', progress: 45 }
];

export default function ProgressStats() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Trigger animation on mount or scroll - for demo just start immediately
    setInView(true);
  }, []);

  return (
    <section className="my-16 max-w-5xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">
        Our Progress & Achievements
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {stats.map(({ label, value, suffix }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 * stats.indexOf({ label, value }) }}
            className="bg-white rounded-lg shadow-lg p-6 text-center"
          >
            <div className="text-5xl font-extrabold text-green-700">
              {inView ? <CountUp end={value} duration={2} suffix={suffix} /> : '0'}
            </div>
            <p className="mt-2 text-lg font-semibold text-green-900">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Progress Bars */}
      <div className="space-y-8">
        {progressData.map(({ label, progress }) => (
          <div key={label}>
            <div className="flex justify-between mb-1 text-green-900 font-semibold">
              <span>{label}</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-4 bg-green-200 rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${progress}%` } : { width: 0 }}
                transition={{ duration: 1.8 }}
                className="h-full bg-green-600 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
