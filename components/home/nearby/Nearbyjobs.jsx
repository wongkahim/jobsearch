import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "./nearbyjobs.style";
import { useRouter } from "expo-router";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import RouteName from "../../../constants/routeName";
import useNearbyJobFetch from "../../../hook/useNearbyJobFetch";

const Nearbyjobs = ({ userPosition, userCountry }) => {
  const router = useRouter();
  const { data, isLoading, error } = useNearbyJobFetch(
    "search",
    userPosition,
    userCountry
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity
          onPress={() => {
            router.push(RouteName.SEARCH(`${userPosition}, ${userCountry}`));
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
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job?.job_id}`}
              handleNavigate={() =>
                router.push(RouteName.JOB_DETAILS(job?.job_id))
              }
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
