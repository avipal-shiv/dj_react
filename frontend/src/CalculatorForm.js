import React, { useState } from 'react';

function CalculatorForm() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/calculate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression }),
      });
      const data = await response.json();
      if (response.ok) {
        setResult(data.result);
        setError('');
      } else {
        setError(data.error);
        setResult('');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter arithmetic expression"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          required
        />
        <button type="submit">Calculate</button>
      </form>
      {result && <p>Result: {result}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default CalculatorForm;
