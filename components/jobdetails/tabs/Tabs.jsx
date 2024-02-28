import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

import styles from "./tabs.style";
import { SIZES } from "../../../constants";

const TabButton = ({ name, activeTab, onHandleSearchType }) => (
  <TouchableOpacity
    style={styles.btn(name, activeTab)}
    onPress={onHandleSearchType}
  >
    <Text style={styles.btnText(name, activeTab)}>{name}</Text>
  </TouchableOpacity>
);

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        {tabs.map((item) => (
          <TabButton
            key={item}
            name={item}
            activeTab={activeTab}
            onHandleSearchType={() => setActiveTab(item)}
          />
        ))}
      </View>
    </View>
  );
};

export default Tabs;
