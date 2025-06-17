function Card({ title }) {
  return React.createElement(
    'div',
    { className: 'bg-white text-black rounded shadow w-64 overflow-hidden' },
    React.createElement('img', {
      src: 'https://via.placeholder.com/256x160?text=Crate',
      className: 'w-full h-40 object-cover',
      alt: ''
    }),
    React.createElement(
      'div',
      { className: 'p-4 text-center font-bold' },
      title
    ),
    React.createElement(
      'div',
      { className: 'p-4' },
      React.createElement(
        'button',
        { className: 'bg-black text-white px-4 py-2 rounded w-full' },
        'Open'
      )
    )
  );
}

function App() {
  const { useState, useEffect } = React;
  const [phase, setPhase] = useState('video');

  useEffect(() => {
    const t = setTimeout(() => setPhase('fade'), 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase === 'fade') {
      const t = setTimeout(() => setPhase('cards'), 1000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const cards = ['It\u2019s Just Water', 'Signature Flavors', 'Experimental Flavors'];

  return React.createElement(
    'div',
    { className: 'relative min-h-screen bg-black text-white flex items-center justify-center' },
    phase !== 'cards' &&
      React.createElement(
        'div',
        {
          className: `fixed inset-0 flex items-center justify-center transition-opacity duration-1000 ${
            phase === 'fade' ? 'opacity-0' : 'opacity-100'
          }`
        },
        React.createElement('video', {
          src: 'https://www.w3schools.com/html/mov_bbb.mp4',
          autoPlay: true,
          muted: true,
          playsInline: true,
          className: 'w-full h-full object-cover'
        })
      ),
    phase === 'cards' &&
      React.createElement(
        'div',
        { className: 'w-full flex flex-col items-center p-8 space-y-8' },
        React.createElement(
          'div',
          { className: 'flex flex-col md:flex-row gap-8' },
          cards.map((title, i) =>
            React.createElement(Card, { title, key: i })
          )
        )
      )
  );
}

const rootEl = document.getElementById('root');
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(React.createElement(App));
}
