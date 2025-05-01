import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [selectedKey, setSelectedKey] = useState('');
  const [result, setResult] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dictionary, setDictionary] = useState({});

  useEffect(() => {
    fetch('https://youngkingneely.github.io/Service-Desk-History/react_dictionary_export.json?v=2')
      .then((res) => res.json())
      .then((data) => setDictionary(data));
  }, []);

  const handleSelect = (key) => {
    setSelectedKey(key);
    setResult(dictionary[key]);
    setMenuOpen(false);
  };

  return (
    <div className={`app-wrapper ${menuOpen ? 'blurred' : ''}`}>
      <h1 className="header">Service Desk Assistant History</h1>
      <h2 className="title">Search Knowledge/Incident Record</h2>

      {!menuOpen && (
        <div className="icon-button" onClick={() => setMenuOpen(true)}>
          🔍
        </div>
      )}

      {menuOpen && (
        <div className="fullscreen-menu">
          <ul className="dropdown-list">
            {Object.entries(dictionary).map(([key, entry]) => (
              <li
                key={key}
                className="dropdown-item"
                onClick={() => handleSelect(key)}
              >
                {key}: {entry["Summary"].slice(0, 60)}...
              </li>
            ))}
          </ul>
        </div>
      )}

      {result && (
        <div className="result-card">
          <h3>{result.Type} Record</h3>
          <strong>Summary:</strong>
          <p>{result["Summary"]}</p>
          <strong>Troubleshooting/History:</strong>
          <pre>{result["Troubleshooting History"]}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
