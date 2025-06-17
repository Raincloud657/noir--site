import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function CanAnimation({ onComplete }) {
  const [phase, setPhase] = useState('can');

  useEffect(() => {
    const t = setTimeout(() => setPhase('symbol'), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase === 'symbol') {
      const t = setTimeout(() => onComplete && onComplete(), 2000);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      {phase === 'can' ? (
        <motion.div
          initial={{ rotate: 0, opacity: 0 }}
          animate={{ rotate: 360, opacity: [1, 1, 0] }}
          transition={{ duration: 3 }}
          className="w-32 h-64 bg-gray-700 rounded-lg shadow-2xl"
        />
      ) : (
        <motion.div
          className="relative w-40 h-40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-white text-7xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            ø
          </motion.div>
          <motion.div
            className="absolute bg-white"
            style={{ width: '60%', height: '2px' }}
            animate={{ x: ['-50%', '50%', '-50%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
      {phase === 'symbol' && <div className="mt-4">Loading...</div>}
    </div>
  );
}

function Plans({ plans }) {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-6 p-8 bg-black text-white">
      {plans.map((p, idx) => (
        <div
          key={idx}
          className="bg-black/70 backdrop-blur border border-gray-700 rounded-xl p-6 cursor-pointer hover:shadow-lg transition w-full md:w-1/3"
          onClick={() => p.link && (window.location.href = p.link)}
        >
          <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
          <p className="mb-4">{p.description}</p>
          {p.title === 'Experimental Flavors' && (
            <a href="#feedback" className="underline">Feedback Form</a>
          )}
        </div>
      ))}
    </div>
  );
}

function FeedbackForm() {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');

  const save = () => {
    const items = JSON.parse(localStorage.getItem('feedback') || '[]');
    items.push({ name, notes, date: new Date().toISOString() });
    localStorage.setItem('feedback', JSON.stringify(items));
    setName('');
    setNotes('');
    alert('Feedback saved locally');
  };

  return (
    <div className="p-6 space-y-4 max-w-md mx-auto text-white">
      <h2 className="text-2xl font-semibold">Experimental Feedback</h2>
      <input
        className="w-full p-2 text-black rounded"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <textarea
        className="w-full h-32 p-2 text-black rounded"
        placeholder="Comments"
        value={notes}
        onChange={e => setNotes(e.target.value)}
      />
      <button
        className="bg-gray-800 text-white px-4 py-2 rounded"
        onClick={save}
      >
        Submit
      </button>
    </div>
  );
}

function App() {
  const [plans, setPlans] = useState([]);
  const [showPlans, setShowPlans] = useState(false);

  useEffect(() => {
    fetch('/data/flavors.json')
      .then(res => res.json())
      .then(data => setPlans(data.plans));
  }, []);

  return (
    <div>
      {!showPlans && <CanAnimation onComplete={() => setShowPlans(true)} />}
      {showPlans && <Plans plans={plans} />}
      {showPlans && (
        <div id="feedback">
          <FeedbackForm />
        </div>
      )}
    </div>
  );
}

export default App;
