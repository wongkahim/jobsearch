import React from "react";

import styles from "./screenheader.style";
import { Image, TouchableOpacity } from "react-native";

const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image
        source={iconUrl}
        resizeMode="cover"
        style={styles.btnImg(dimension)}
      ></Image>
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
