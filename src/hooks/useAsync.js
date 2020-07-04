import { useCallback, useState } from 'react';

// default
const func = () => {};

const defaultOptions = {
  onSuccess: func,
  onError: func,
};

const useAsync = (
  options = defaultOptions
) => {
  const { onSuccess, onError } = options;

  /**
   * @description
   * init loading and swap data
   */
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(undefined);

  const clearInputData = useCallback(() => {
    setLoading(false);
    return setData(undefined);
  }, [setLoading, setData]);
  
  const runService = useCallback(async (api, ...arg) => {
    if (typeof api === 'undefined') {
      throw new Error('Api endpoint is required.');
    }

    /**
     * @description
     * pre set loading
     */
    setLoading(true);

    if (typeof api === 'string') {

    }
   
    try {
      const response = await api(...arg);

      setLoading(false);

      if (response.ok || response.success) {
        /**
         * @description
         * callback response success
         */
        setData(response);
        return onSuccess(response);
      };

      clearInputData();
      return onError({
        status: response.status,
        msg: response.error,
      });
    } catch (e) {
      /**
       * @description
       * reset data
       */
      clearInputData();
  
      return onError({
        status: 1000,
        msg: e 
      });
    }
  }, [onError, onSuccess, clearInputData]);

  return {
    run: runService,
    loading,
    data
  };
}

export default useAsync;
