import { useState, useEffect } from 'react';

const initBeforeUnLoad = showExitPrompt => {
  window.onbeforeunload = event => {
    if (showExitPrompt) {
      const e = event || window.event;
      e.preventDefault();
      if (e) {
        e.returnValue = '';
      }
      return '';
    }
  };
};

// Hook
const useExitPrompt = bool => {
  const [showExitPrompt, setShowExitPrompt] = useState(bool);

  window.onload = () => {
    initBeforeUnLoad(showExitPrompt);
  };

  useEffect(() => {
    initBeforeUnLoad(showExitPrompt);
  }, [showExitPrompt]);

  return [showExitPrompt, setShowExitPrompt];
};

export default useExitPrompt;
