import { useState, useEffect } from 'react';
import Snack from './Snack';
import SnackForm from './SnackForm';
import SnackProgressBar from './SnackProgressBar';

export default function SnackList() {
  const [snackList, setSnackList] = useState([]);
  const [snacksEaten, setSnacksEaten] = useState(0);

  /** When component loads, set 'snackList' state to list in localStorage, if it exists. */
  useEffect(() => {
    const lsSnackList = localStorage.getItem('snack-list');
    if (lsSnackList) setSnackList(JSON.parse(lsSnackList));
  }, []);

  /** Update 'snacksEaten' state when 'snackList' state changes */
  useEffect(() => {
    if (snackList && snackList.length > 0) {
      setSnacksEaten(snackList.reduce((acc, snack) => acc + snack.isEaten, 0));
      localStorage.setItem('snack-list', JSON.stringify(snackList));
    }
  }, [snackList]);

  const addSnack = (snackToAdd) => {
    if (!snackToAdd.text || /^\s*$/.test(snackToAdd.text)) return;

    const newList = [snackToAdd, ...snackList];

    setSnackList(newList);
  };

  const updateSnack = (updatedSnack) => {
    if (!updatedSnack.text || /^\s*$/.test(updatedSnack.text)) return;

    const newList = snackList.map((snack) =>
      snack.id === updatedSnack.id ? { ...snack, text: updatedSnack.text } : snack
    );

    setSnackList(newList);
  };

  const removeSnack = (snackIdToRemove) => {
    const newList = snackList.filter((snack) => snack.id !== snackIdToRemove);

    setSnackList(newList);
  };

  const toggleSnack = (snackIdToToggle) => {
    const newList = snackList.map((snack) =>
      snack.id === snackIdToToggle ? { ...snack, isEaten: !snack.isEaten } : snack
    );

    setSnackList(newList);
  };

  return (
    <div className="snack-app">
      <h1 className="snack-header">Snacks for today?</h1>

      <SnackProgressBar count={snacksEaten} targetSnacks={snackList && snackList.length} />

      <SnackForm onSubmit={addSnack} snack={undefined} />

      {snackList &&
        snackList.map((snack, index) => (
          <Snack
            key={index}
            snack={snack}
            toggleSnack={toggleSnack}
            removeSnack={removeSnack}
            updateSnack={updateSnack}
          />
        ))}
    </div>
  );
}
