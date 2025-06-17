const { useState, useEffect } = React;
const { motion } = window['framer-motion'];

function CanAnimation({ onEnd }) {
  const [phase, setPhase] = useState('can');

  // after a short spin, switch to the loading symbol
  useEffect(() => {
    const timer = setTimeout(() => setPhase('symbol'), 3000);
    return () => clearTimeout(timer);
  }, []);

  // notify parent when the symbol appears
  useEffect(() => {
    if (phase === 'symbol' && onEnd) {
      const t = setTimeout(onEnd, 1000);
      return () => clearTimeout(t);
    }
  }, [phase, onEnd]);

  return (
    React.createElement('div', { className: 'flex flex-col items-center justify-center h-screen bg-black text-white space-y-4' },
      phase === 'can' ?
        React.createElement(motion.div, {
          initial: { rotate: 0, opacity: 0 },
          animate: { rotate: 360, opacity: [1, 1, 0] },
          transition: { duration: 3 },
          className: 'relative w-32 h-64 rounded-lg bg-gradient-to-b from-gray-400 via-gray-700 to-gray-900 shadow-2xl ring-1 ring-white/30 flex items-center justify-center'
        },
          React.createElement('span', { className: 'font-bold' }, 'Noir')
        ) :
        React.createElement(motion.div, {
          className: 'relative w-40 h-40 flex items-center justify-center',
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 1 }
        },
          React.createElement(motion.div, {
            className: 'text-white font-bold text-7xl',
            animate: { rotate: 360 },
            transition: { duration: 4, repeat: Infinity, ease: 'linear' }
          }, 'O'),
          React.createElement(motion.div, {
            className: 'absolute bg-white',
            style: { width: '80%', height: '4px' },
            animate: { x: ['-50%', '50%', '-50%'] },
            transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
          })
        ),
      phase === 'symbol' && React.createElement('div', { className: 'text-lg' }, 'Loading...')
    )
  );
}

function Plans({ plans }) {
  return (
    React.createElement('div', { className: 'flex flex-col md:flex-row justify-center gap-8 p-8' },
      plans.map((p, idx) =>
        React.createElement('div', { key: idx, className: 'flex flex-col items-center w-full md:w-1/3 space-y-2' },
          React.createElement('div', {
            className: 'w-40 h-40 md:w-48 md:h-48 bg-black/60 border border-gray-600 shadow-inner backdrop-blur-sm flex items-center justify-center hover:shadow-xl transition'
          }),
          React.createElement('h3', { className: 'text-white font-bold text-center' }, p.title),
          React.createElement('button', {
            className: 'bg-gray-800 px-4 py-2 rounded hover:bg-gray-700',
            onClick: () => p.link && (window.location.href = p.link)
          }, 'Open')
        )
      )
    )
  );
}

function CrackedReveal({ children }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(t);
  }, []);
  return (
    React.createElement('div', { className: 'relative min-h-screen overflow-hidden bg-black text-white flex items-center justify-center' },
      !visible && React.createElement(motion.div, {
        className: 'absolute inset-0 bg-black',
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 1 }
      }),
      visible && React.createElement(React.Fragment, null,
        React.createElement(motion.div, {
          className: 'absolute inset-0 marble-bg',
          initial: { opacity: 0 },
          animate: { opacity: 0.6 },
          transition: { duration: 1 }
        }),
        React.createElement('svg', { className: 'absolute inset-0 w-full h-full pointer-events-none crack-lines', viewBox: '0 0 100 100', preserveAspectRatio: 'none' },
          React.createElement('path', { d: 'M0 50 L20 48 L50 60 L80 55 L100 58' }),
          React.createElement('path', { d: 'M50 0 L52 20 L48 40 L52 60 L50 80 L55 100' })
        ),
        React.createElement('div', { className: 'relative z-10 w-full' }, children)
      )
    )
  );
}

function PlanDetail({ slug }) {
  const [plan, setPlan] = useState(null);
  useEffect(() => {
    fetch('data/flavors.json')
      .then(res => res.json())
      .then(data => setPlan(data.plans.find(p => p.slug === slug)));
  }, [slug]);
  if (!plan) {
    return React.createElement('div', { className: 'p-8 text-center' }, 'Loading...');
  }
  return (
    React.createElement('div', { className: 'p-6 space-y-4 max-w-xl mx-auto' },
      React.createElement('h1', { className: 'text-3xl font-bold text-center' }, plan.title),
      React.createElement('p', { className: 'italic' }, plan.boxAppearance),
      React.createElement('p', null, plan.aura),
      React.createElement('p', null, plan.description),
      React.createElement('p', { className: 'font-semibold' }, plan.price),
      React.createElement('a', { href: 'index.html', className: 'underline block text-center' }, 'Back')
    )
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
    alert('Feedback saved locally.');
  };
  return (
    React.createElement('div', { className: 'p-6 space-y-4 max-w-md mx-auto' },
      React.createElement('h2', { className: 'text-2xl font-semibold mb-2' }, 'Experimental Feedback'),
      React.createElement('input', {
        className: 'w-full p-2 text-black rounded',
        placeholder: 'Name', value: name,
        onChange: e => setName(e.target.value)
      }),
      React.createElement('textarea', {
        className: 'w-full h-32 text-black rounded p-2',
        placeholder: 'Comments', value: notes,
        onChange: e => setNotes(e.target.value)
      }),
      React.createElement('button', {
        className: 'bg-gray-800 text-white px-4 py-2 rounded',
        onClick: save
      }, 'Submit')
    )
  );
}

function App() {
  const [plans, setPlans] = useState([]);
  const [phase, setPhase] = useState('loading');
  useEffect(() => {
    fetch('data/flavors.json')
      .then(res => res.json())
      .then(data => setPlans(data.plans));
  }, []);
  return (
    React.createElement('div', null,
      phase === 'loading' && React.createElement(CanAnimation, { onEnd: () => setPhase('crack') }),
      phase === 'crack' && React.createElement(CrackedReveal, null,
        React.createElement(React.Fragment, null,
          React.createElement(Plans, { plans }),
          React.createElement('div', { id: 'feedback' }, React.createElement(FeedbackForm))
        )
      )
    )
  );
}

const rootEl = document.getElementById('root');
const planEl = document.getElementById('plan-root');
if (planEl) {
  const slug = planEl.dataset.slug;
  ReactDOM.createRoot(planEl).render(React.createElement(PlanDetail, { slug }));
} else if (rootEl) {
  ReactDOM.createRoot(rootEl).render(React.createElement(App));
}
