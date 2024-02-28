import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const storeStringValue = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    Alert.alert(e);
  }
};

export const storeObjectValue = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    Alert.alert(e);
  }
};
