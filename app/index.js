import { View, Text, SafeAreaView, ScrollView, StatusBar } from "react-native";
import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import HomeFooter from "../components/jobdetails/footer/homeFooter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import String, { screenEnum } from "../constants/string";
import RouteName from "../constants/routeName";

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [userName, setUserName] = useState("");
  const [userPosition, setUserPosition] = useState("");
  const [userCountry, setUserCountry] = useState("");

  const getUserProfile = async () => {
    await AsyncStorage.getItem(String.USER_NAME).then((value) =>
      setUserName(value)
    );
    await AsyncStorage.getItem(String.POSITION).then((value) =>
      setUserPosition(value)
    );
    await AsyncStorage.getItem(String.COUNTRY).then((value) =>
      setUserCountry(value)
    );
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <StatusBar barStyle={"dark-content"} translucent={false} />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.menu}
              dimension="60%"
              handlePress={() => router.replace(RouteName.PROFILE)}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.favicon} dimension="100%" />
          ),
          headerTitle: "",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome
            userName={userName}
            userPosition={userPosition}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(RouteName.SEARCH(searchTerm));
              }
            }}
          />

          <Popularjobs userPosition={userPosition} />

          <Nearbyjobs userPosition={userPosition} userCountry={userCountry} />
        </View>
      </ScrollView>
      <HomeFooter ScreenName={screenEnum.home} />
    </SafeAreaView>
  );
};

export default Home;
