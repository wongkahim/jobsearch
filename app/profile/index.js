import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import HomeFooter from "../../components/jobdetails/footer/homeFooter";
import { COLORS, SIZES, icons, images } from "../../constants";
import { Stack, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeStringValue } from "../../utils/AsyncStorage";
import Icon from "react-native-vector-icons/FontAwesome";
import String, { screenEnum } from "../../constants/string";
import { ScreenHeaderBtn } from "../../components";
import RouteName from "../../constants/routeName";

const Profile = () => {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [position, setPosition] = useState("");
  const [country, setCountry] = useState("");

  const getUserProfileData = async () => {
    await AsyncStorage.getItem(String.USER_NAME).then((value) =>
      setUserName(value)
    );
    await AsyncStorage.getItem(String.POSITION).then((value) =>
      setPosition(value)
    );
    await AsyncStorage.getItem(String.COUNTRY).then((value) =>
      setCountry(value)
    );
  };

  useEffect(() => {
    getUserProfileData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: "M O R E",
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.replace(RouteName.HOME)}
            />
          ),
        }}
      />
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <TouchableOpacity>
                <Image source={images.profile} style={styles.profileImage} />
              </TouchableOpacity>
              <View style={styles.inputContainer}>
                <Icon name="user" size={24} style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your username"
                  defaultValue={userName}
                  onChangeText={async (text) => {
                    await storeStringValue(String.USER_NAME, text);
                  }}
                  placeholderTextColor={COLORS.gray2}
                />
              </View>
              <View style={styles.inputContainer}>
                <Icon name="briefcase" size={24} style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your position"
                  defaultValue={position}
                  onChangeText={async (text) => {
                    await storeStringValue(String.POSITION, text);
                  }}
                  placeholderTextColor={COLORS.gray2}
                />
              </View>
              <View style={styles.inputContainer}>
                <Icon name="globe" size={24} style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your country"
                  defaultValue={country}
                  onChangeText={async (text) => {
                    await storeStringValue(String.COUNTRY, text);
                  }}
                  placeholderTextColor={COLORS.gray2}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <HomeFooter ScreenName={screenEnum.user} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  header: {
    paddingHorizontal: SIZES.medium,
    paddingTop: SIZES.large,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: SIZES.medium,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SIZES.medium,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "column",
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: SIZES.medium,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.medium,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: SIZES.small,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 4,
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.medium,
  },
});

export default Profile;
