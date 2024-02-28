import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { screenEnum } from "../../../constants/string";
import RouteName from "../../../constants/routeName";

const HomeFooter = ({ ScreenName }) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.shadowLine} />
      <View style={styles.tab}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => router.replace(RouteName.HOME)}
        >
          <Icon
            name="home"
            size={25}
            color={ScreenName === screenEnum.home ? "orange" : "black"}
          />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tab}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => router.replace(RouteName.PROFILE)}
        >
          <Icon
            name="user"
            size={20}
            color={ScreenName === screenEnum.user ? "orange" : "black"}
          />
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  shadowLine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    zIndex: 1,
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  tabButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    marginTop: 5,
    fontSize: 12,
  },
});

export default HomeFooter;
