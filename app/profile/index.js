import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import HomeFooter from "../../components/jobdetails/footer/homeFooter";
import { COLORS, icons, images } from "../../constants";
import { Stack, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import String, { screenEnum } from "../../constants/string";
import { ScreenHeaderBtn } from "../../components";
import RouteName from "../../constants/routeName";
import { styles } from "./styles";
import SavedJob from "../../components/profile/SavedJob/SavedJob";
import UserInfo from "../../components/profile/UserInfo/UserInfo";

const Profile = () => {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [position, setPosition] = useState("");
  const [country, setCountry] = useState("");
  const [jobs, setJobs] = useState([]);

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
    const jsonValue = await AsyncStorage.getItem(String.JOB);
    const parsedValue = jsonValue != null ? JSON.parse(jsonValue) : [];
    setJobs(parsedValue);
  };

  useEffect(() => {
    getUserProfileData();
  }, [jobs]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} translucent={false} />
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <TouchableOpacity>
                <Image source={images.favicon} style={styles.profileImage} />
              </TouchableOpacity>
              <UserInfo
                userName={userName}
                iconName={"user"}
                placeholder={"Enter your user name..."}
                type={String.USER_NAME}
              />
              <UserInfo
                userName={position}
                iconName={"briefcase"}
                placeholder={"Enter your position..."}
                type={String.POSITION}
              />
              <UserInfo
                userName={country}
                iconName={"globe"}
                placeholder={"Enter your country..."}
                type={String.COUNTRY}
              />
            </View>
          </View>
        </View>
        <SavedJob jobs={jobs} />
      </ScrollView>
      <HomeFooter ScreenName={screenEnum.user} />
    </SafeAreaView>
  );
};

export default Profile;
