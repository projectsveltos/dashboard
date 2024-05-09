import { useState, useEffect } from "react";

const useExtendValue = (value: boolean) => {
  const [isExtendedValue, setIsExtendedValue] = useState(value);

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
    if (value) {
      timeoutId = setTimeout(() => {
        setIsExtendedValue(true);
      }, 3000);
    } else {
      setIsExtendedValue(false);
    }
    return () => clearTimeout(timeoutId);
  }, [value]);

  return isExtendedValue;
};

export default useExtendValue;
