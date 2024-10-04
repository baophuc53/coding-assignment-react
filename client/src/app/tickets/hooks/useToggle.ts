import { useCallback, useState } from 'react';

export const useToggle = (): [boolean, VoidFunction] => {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);
  return [open, toggle];
};
