const { useState, useEffect } = React;
const { motion, AnimatePresence } = window['framer-motion'];

function CanAnimation() {
  return (
    React.createElement('div', { className: 'flex items-center justify-center h-screen' },
      React.createElement(motion.div, {
        initial: { rotate: 0, opacity: 0 },
        animate: { rotate: 360, opacity: 1 },
        transition: { duration: 4 },
        className: 'w-40 h-80 bg-black rounded-lg shadow-lg flex items-center justify-center border border-gray-700'
      },
        React.createElement('span', { className: 'text-white text-3xl font-bold' }, 'Noir')
      )
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

function App() {
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    fetch('../data/flavors.json')
      .then(res => res.json())
      .then(data => setPlans(data.plans));
  }, []);
  return (
    React.createElement('div', null,
      React.createElement(CanAnimation, null),
      React.createElement(Plans, { plans })
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
