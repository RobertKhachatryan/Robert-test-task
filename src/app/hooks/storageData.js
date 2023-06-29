import { useState } from "react";

export const useStorageData = (key) => {
  const [data, setData] = useState(JSON.parse(localStorage[key]));

  const setStorageData = (data) => {
    localStorage[key] = JSON.stringify(data);
    setData(data);
  };

  return [data, setStorageData];
};
