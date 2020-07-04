import { useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
  const location = useLocation();
  
  const filters = useMemo(() => {

  }, []);

  console.log('location:', useLocation());

  return {
    filters
  }
};

export default useQuery;
