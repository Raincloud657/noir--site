const { useState, useEffect } = React;
const { motion } = window['framer-motion'];

function CanAnimation({ onEnd }) {
  const [showSymbol, setShowSymbol] = useState(false);
  return (
    React.createElement('div', { className: 'flex items-center justify-center h-screen' },
      showSymbol ?
        React.createElement(motion.div, {
          initial: { rotate: -180, opacity: 0 },
          animate: { rotate: 0, opacity: 1 },
          transition: { duration: 1 },
          className: 'text-6xl gold'
        }, 'ø') :
        React.createElement(motion.img, {
          src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=200&q=80',
          alt: 'Noir can',
          initial: { rotate: 0, opacity: 0 },
          animate: { rotate: 360, opacity: 1, y: [0, 40] },
          transition: { duration: 4 },
          onAnimationComplete: () => { setShowSymbol(true); onEnd && onEnd(); },
          className: 'w-32 h-64 object-cover rounded-lg shadow-2xl border border-gray-700'
        })
    )
  );
}

function Plans({ plans }) {
  return (
    React.createElement('div', { className: 'flex flex-col md:flex-row justify-center gap-4 p-8' },
      plans.map((p, idx) =>
        React.createElement('div', {
          key: idx,
          className: 'bg-black/60 backdrop-blur-md border border-gray-600 rounded-xl p-6 shadow-lg w-full md:w-1/3'
        },
          React.createElement('h3', { className: 'text-xl font-semibold mb-2' }, p.title),
          React.createElement('p', { className: 'mb-4' }, p.description),
          p.title === 'Experimental Flavors' &&
            React.createElement('a', { href: '#feedback', className: 'underline text-gold-400' }, 'Feedback Form')
        )
      )
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
      React.createElement(CanAnimation, { onEnd: () => setShowPlans(true) }),
      showPlans && React.createElement(Plans, { plans }),
      React.createElement('div', { id: 'feedback' },
        React.createElement(FeedbackForm, null)
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
