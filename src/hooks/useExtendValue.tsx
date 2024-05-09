import { useState, useEffect } from 'react';

const useExtendValue = (value: boolean) => {
  const [isExtendedValue, setIsExtendedValue] = useState(value);

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
    if (value) {
      timeoutId = setTimeout(() => {
        setIsExtendedValue(false);
      }, 3000); // 3 seconds
    } else {
      setIsExtendedValue(true); // Set to true if value is initially false
    }
    return () => clearTimeout(timeoutId);
  }, [value]);

  return isExtendedValue;
};

export default useExtendValue;