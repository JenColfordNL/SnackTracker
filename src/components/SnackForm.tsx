import { useState, useRef, useEffect } from 'react';

export default function SnackForm({ snack, onSubmit }) {
  const [input, setInput] = useState(snack ? snack.text : '');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (snack) {
      onSubmit({
        ...snack,
        text: input,
      });
    } else {
      onSubmit({
        id: Math.floor(Math.random() * 10000),
        text: input,
        isEaten: false,
      });
    }

    setInput('');
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <>
      <form className={`snack-form ${snack && 'edit'}`} onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          placeholder="Enter a new snack..."
          className={`snack-input ${snack && 'edit'}`}
          onChange={handleChange}
          ref={inputRef}
        />
        <button onClick={handleSubmit} type="submit" className={`snack-button ${snack && 'edit'}`}>
          {snack ? 'Update Snack' : 'Add Snack'}
        </button>
      </form>
    </>
  );
}
