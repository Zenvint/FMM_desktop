import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';

function NetworkListener() {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Handler for online event
    const handleOnline = () => {
      enqueueSnackbar('You are back online!', { variant: 'success' });
    };

    // Handler for offline event
    const handleOffline = () => {
      enqueueSnackbar('You are offline. Please check your connection.', { variant: 'warning' });
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [enqueueSnackbar]);

  return null; // This component doesn't render anything visible
}

export default NetworkListener;
