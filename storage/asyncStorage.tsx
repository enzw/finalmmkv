import AsyncStorage from '@react-native-async-storage/async-storage';

export const set = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("AsyncStorage set error:", e);
  }
};

export const getObject = async (key: string) => {
  try {
    const val = await AsyncStorage.getItem(key);
    return val ? JSON.parse(val) : null;
  } catch (e) {
    console.error("AsyncStorage get error:", e);
    return null;
  }
};

export const remove = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error("AsyncStorage remove error:", e);
  }
};
