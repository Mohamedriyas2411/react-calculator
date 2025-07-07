import React, { useState, useEffect } from 'react';
import Button from './Button';

const buttons = [
  'C', '⌫', '/', '*',
  '7', '8', '9', '-',
  '4', '5', '6', '+',
  '1', '2', '3', '=',
  '0', '.',
];

const keyMap = {
  'Enter': '=',  // Enter key becomes "="
  'Backspace': '⌫',
  'c': 'C',
  'C': 'C',
};

const Calculator = () => {
  const [input, setInput] = useState('');

  const handleClick = (value) => {
    if (value === 'C') {
      setInput('');
    } else if (value === '⌫') {
      setInput((prev) => prev.slice(0, -1));
    } else if (value === '=') {
      try {
        // Evaluate the expression
        // eslint-disable-next-line no-eval
        setInput(eval(input).toString());
      } catch {
        setInput('Error');
      }
    } else {
      setInput((prev) => prev + value);
    }
  };

  // Add keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;

      const mappedKey = keyMap[key] || key;
      if (
        buttons.includes(mappedKey) ||
        ['+', '-', '*', '/', '.', '='].includes(mappedKey)
      ) {
        e.preventDefault(); // Prevent form submit or page scroll
        handleClick(mappedKey);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input]);

  return (
    <div className="calculator">
      <div className="display">{input || '0'}</div>
      <div className="button-grid">
        {buttons.map((btn, idx) => (
          <Button key={idx} label={btn} onClick={() => handleClick(btn)} />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
