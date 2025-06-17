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
          className: 'w-32 h-64 bg-gray-700 rounded-lg shadow-2xl'
        }) :
        React.createElement(motion.div, {
          className: 'relative w-40 h-40 flex items-center justify-center',
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 1 }
        },
          React.createElement(motion.div, {
            className: 'text-white text-7xl',
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
            className: 'w-40 h-40 md:w-48 md:h-48 bg-black border border-gray-700 shadow-inner flex items-center justify-center hover:shadow-xl transition'
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
  const [showPlans, setShowPlans] = useState(false);
  useEffect(() => {
    fetch('data/flavors.json')
      .then(res => res.json())
      .then(data => setPlans(data.plans));
  }, []);
  return (
    React.createElement('div', null,
      !showPlans && React.createElement(CanAnimation, { onEnd: () => setShowPlans(true) }),
      showPlans && React.createElement(Plans, { plans }),
      showPlans && React.createElement('div', { id: 'feedback' },
        React.createElement(FeedbackForm, null)
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
