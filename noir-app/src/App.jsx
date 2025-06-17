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
          className="relative w-32 h-64 rounded-lg bg-gradient-to-b from-gray-400 via-gray-700 to-gray-900 shadow-2xl ring-1 ring-white/30 flex items-center justify-center"
        >
          <span className="font-bold">Noir</span>
        </motion.div>
      ) : (
        <motion.div
          className="relative w-40 h-40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-white font-bold text-7xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            O
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
    <div className="flex flex-col md:flex-row justify-center gap-8 p-8 bg-black text-white">
      {plans.map((p, idx) => (
        <div key={idx} className="flex flex-col items-center w-full md:w-1/3 space-y-2">
          <div className="w-40 h-40 md:w-48 md:h-48 bg-black border border-gray-700 shadow-inner hover:shadow-xl transition" />
          <h3 className="font-bold text-center">{p.title}</h3>
          <button
            className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700"
            onClick={() => p.link && (window.location.href = p.link)}
          >
            Open
          </button>
        </div>
      ))}
    </div>
  );
}

function CrackedReveal({ children }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white flex items-center justify-center">
      {!visible && (
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      )}
      {visible && (
        <>
          <motion.div
            className="absolute inset-0 marble-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1 }}
          />
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none crack-lines"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0 50 L20 48 L50 60 L80 55 L100 58" />
            <path d="M50 0 L52 20 L48 40 L52 60 L50 80 L55 100" />
          </svg>
          <div className="relative z-10 w-full">{children}</div>
        </>
      )}
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
      {showPlans && (
        <CrackedReveal>
          <Plans plans={plans} />
          <div id="feedback">
            <FeedbackForm />
          </div>
        </CrackedReveal>
      )}
    </div>
  );
}

export default App;
