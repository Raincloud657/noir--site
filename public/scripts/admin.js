const { useState, useEffect } = React;

function AdminApp() {
  const [flavors, setFlavors] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const loadFlavors = () => {
    const stored = localStorage.getItem('flavors');
    if (stored) {
      setFlavors(stored);
    } else {
      fetch('data/flavors.json')
        .then(res => res.text())
        .then(text => setFlavors(text));
    }
  };

  const saveFlavors = () => {
    localStorage.setItem('flavors', flavors);
    alert('Saved to local storage.');
  };

  useEffect(loadFlavors, []);

  if (!loggedIn) {
    return React.createElement('div', { className: 'p-6 space-y-4' },
      React.createElement('h1', { className: 'text-xl font-bold' }, 'Admin Login'),
      React.createElement('input', {
        type: 'password',
        className: 'text-black p-2',
        placeholder: 'Password',
        value: password,
        onChange: e => setPassword(e.target.value)
      }),
      React.createElement('button', {
        className: 'bg-gray-800 text-white px-4 py-2 rounded',
        onClick: () => password === 'noir' ? setLoggedIn(true) : alert('Wrong password')
      }, 'Login')
    );
  }

 oxh74b-codex/create-production-ready-react-website-for-noir
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
      }, 'Save')
    )

  return React.createElement('div', { className: 'p-6 space-y-4' },
    React.createElement('h1', { className: 'text-xl font-bold' }, 'Admin Dashboard'),
    React.createElement('textarea', {
      className: 'w-full h-64 text-black',
      value: flavors,
      onChange: e => setFlavors(e.target.value)
    }),
    React.createElement('button', {
      className: 'bg-gray-800 px-4 py-2 rounded text-white',
      onClick: saveFlavors
    }, 'Save')
 main
  );
}

ReactDOM.createRoot(document.getElementById('admin-root')).render(React.createElement(AdminApp));
