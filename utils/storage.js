import { AsyncStorage } from "react-native";

import { STORE_DEFAULTS } from "./constants";
import type { Store } from "./types";

export const getLocalData = async (): Store => {
  try {
    const config: JSON = await AsyncStorage.getItem("@HWYD:store");
    return { ...STORE_DEFAULTS, ...(config ? JSON.parse(config) : {}) };
  } catch (error) {
    console.error(error);
    return { ...STORE_DEFAULTS };
  }
};

export const setLocalData = async (operator: Store => Object) => {
  const config: Store = await getLocalData();
  const newConfig = operator(config);
  return AsyncStorage.mergeItem("@HWYD:store", JSON.stringify(newConfig));
};
