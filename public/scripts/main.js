function App() {
  return React.createElement(
    'div',
    { className: 'flex items-center justify-center min-h-screen bg-black' },
    React.createElement(
      'div',
      { className: 'animate-spin text-white text-8xl font-extrabold' },
      'Ø'
    )
  );
}

const rootEl = document.getElementById('root');
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(React.createElement(App));
}
