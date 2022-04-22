import { useState, useEffect } from "react";
import { GiStarFormation } from "react-icons/gi";

export default function SnackProgressBar({ count, targetSnacks }) {
  const targetSnacksDefault = 5;

  const [percentProgress, setPercentProgress] = useState(0);

  useEffect(() => {
    if (count < 0) count = 0;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (targetSnacks < 1 || targetSnacks > targetSnacksDefault)
      targetSnacks = targetSnacksDefault;

    if (count > targetSnacks) count = targetSnacks;

    setPercentProgress(Math.floor((count / targetSnacks) * 100));
  }, [count]);

  return (
    <div className="progress-container">
      <div className="progress-wrapper">
        <h3>Hey Jack, check your progress!</h3>
        <div className="progressbar-icon-wrapper">
          <ProgressBar progressPercentage={percentProgress} />
          <div className="progress-icons">
            <GiStarFormation
              style={{ opacity: `${Math.max(percentProgress, 50)}%` }}
              className="progressbar-icon-star"
            />
          </div>
        </div>
        <div>
          {percentProgress !== 100 && count === 0 && (
            <p>What will be your first snack today?</p>
          )}

          {percentProgress !== 100 && count === 1 && <p>Great Start!!!</p>}

          {percentProgress !== 100 && count > 1 && (
            <p>Excellent, {count} snacks gone!</p>
          )}

          {percentProgress === 100 && (
            <p>Congratulations Jack, all snacks eaten!!!</p>
          )}
        </div>
      </div>
    </div>
  );
}

const ProgressBar = ({ progressPercentage }) => {
  return (
    <div className="progressbar-outer">
      <div
        style={{ width: `${progressPercentage}%` }}
        className="progressbar-inner"
      ></div>
    </div>
  );
};
