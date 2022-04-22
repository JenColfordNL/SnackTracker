import { useState } from 'react';
import { RiCloseCircleLine, RiCheckFill } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import SnackForm from './SnackForm';

export default function Snack({ snack, toggleSnack, removeSnack, updateSnack }) {
  const [editMode, setEditMode] = useState(false);

  const handleUpdate = (snack) => {
    updateSnack(snack);
    setEditMode(false);
  };

  return (
    <>
      <div className={`snack-row ${snack.isEaten ? 'eaten' : ''}`}>
        {editMode && <SnackForm snack={snack} onSubmit={handleUpdate} />}

        {!editMode && (
          <>
            <div onClick={() => toggleSnack(snack.id)} className="snack-row-text">
              {snack.text}
            </div>
            {!snack.isEaten && (
              <div className="snack-row-icons">
                <TiEdit className="snack-row-icons-edit" onClick={() => setEditMode(true)} />
                <RiCloseCircleLine className="snack-row-icons-delete" onClick={() => removeSnack(snack.id)} />
              </div>
            )}
            {snack.isEaten && (
              <div className="snack-row-icons">
                <RiCheckFill className="snack-row-icons-checkmark" />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
