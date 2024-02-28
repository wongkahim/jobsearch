import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import styles from "./popularjobs.style";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import usePopularJobFetch from "../../../hook/usePopularJobFetch";
import RouteName from "../../../constants/routeName";

const Popularjobs = ({ userPosition }) => {
  const router = useRouter();

  const { data, isLoading, error } = usePopularJobFetch("search", userPosition);

  const [selectedJob, setSelectedJob] = useState();
  const handleCardPress = (item) => {
    router.push(RouteName.JOB_DETAILS(item.job_id));
    setSelectedJob(item.job_id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity
          onPress={() => {
            router.push(RouteName.SEARCH(userPosition));
          }}
        >
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
