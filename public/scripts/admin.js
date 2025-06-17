const { useState, useEffect } = React;

function AdminApp() {
  const [flavors, setFlavors] = useState('');

  const loadFlavors = () => {
    fetch('../data/flavors.json')
      .then(res => res.text())
      .then(text => setFlavors(text));
  };

  const saveFlavors = () => {
    alert('Saving requires backend integration.');
  };

  useEffect(loadFlavors, []);

  return (
    React.createElement('div', { className: 'p-6 space-y-4' },
      React.createElement('h1', { className: 'text-xl font-bold' }, 'Admin Dashboard'),
      React.createElement('textarea', {
        className: 'w-full h-64 text-black',
        value: flavors,
        onChange: e => setFlavors(e.target.value)
      }),
      React.createElement('button', {
        className: 'bg-gray-800 px-4 py-2 rounded text-white',
        onClick: saveFlavors
      }, 'Save (stub)')
    )
  );
}

ReactDOM.createRoot(document.getElementById('admin-root')).render(React.createElement(AdminApp));
