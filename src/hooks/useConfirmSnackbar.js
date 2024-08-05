import React from 'react';
import { useSnackbar } from 'notistack';

const useConfirmSnackbar = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showConfirmation = (message, proceedWithAction) => {
    const handleAction = (key) => (
      <React.Fragment>
        <button
          onClick={() => {
            closeSnackbar(key);
            proceedWithAction();
          }}
        >
          Yes
        </button>
        <button
          onClick={() => {
            closeSnackbar(key);
          }}
        >
          No
        </button>
      </React.Fragment>
    );

    enqueueSnackbar(message, {
      variant: 'warning',
      persist: true,
      action: handleAction,
    });
  };

  return { showConfirmation };
};

export default useConfirmSnackbar;
