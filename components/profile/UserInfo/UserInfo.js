import { View, Text, TextInput } from "react-native";
import React from "react";
import { styles } from "../../../app/profile/styles";
import { COLORS } from "../../../constants";
import Icon from "react-native-vector-icons/FontAwesome";
import { storeStringValue } from "../../../utils/AsyncStorage";

const UserInfo = ({ userName, iconName, placeholder, type }) => {
  return (
    <View style={styles.inputContainer}>
      <Icon name={iconName} size={24} style={styles.icon} />
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        defaultValue={userName}
        onChangeText={async (text) => {
          await storeStringValue(type, text);
        }}
        placeholderTextColor={COLORS.gray2}
      />
    </View>
  );
};

export default UserInfo;
