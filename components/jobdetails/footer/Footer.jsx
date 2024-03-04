import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from "react-native";

import styles from "./footer.style";
import { icons } from "../../../constants";
import { Job } from "../../../model/job";
import { storeObjectValue } from "../../../utils/AsyncStorage";
import String from "../../../constants/string";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Footer = ({ data }) => {
  const [jobs, setJobs] = useState([]);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const jsonValue = await AsyncStorage.getItem(String.JOB);
      const parsedValue = jsonValue != null ? JSON.parse(jsonValue) : [];
      setJobs(parsedValue);

      if (data === undefined) return;
      const isJobBookmarked = parsedValue.some(
        (job) => job.job_id === data[0]?.job_id
      );
      setBookmarked(isJobBookmarked);
    };

    fetchData();
  }, []);

  const handleBookmark = () => {
    if (data === undefined) {
      Alert.alert("Missing Data");
      return;
    }

    const updatedJobs = [...jobs];
    const jobIndex = updatedJobs.findIndex(
      (job) => job.job_id === data[0]?.job_id
    );

    if (jobIndex !== -1) {
      updatedJobs.splice(jobIndex, 1);
      setBookmarked(false);
      storeObjectValue(String.JOB, updatedJobs);
    } else {
      const newJob = new Job(
        data[0]?.job_id,
        data[0]?.employer_logo,
        data[0]?.employer_name,
        data[0]?.job_title,
        data[0]?.job_country
      );
      updatedJobs.push(newJob);
      setBookmarked(true);
      storeObjectValue(String.JOB, updatedJobs);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.likeBtn} onPress={handleBookmark}>
        <Image
          source={bookmarked ? icons.heart : icons.heartOutline}
          resizeMode="contain"
          style={styles.likeBtnImage}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() =>
          Linking.openURL(
            data !== undefined
              ? data[0]?.job_google_link
              : "https://careers.google.com/jobs/results/"
          )
        }
      >
        <Text style={styles.applyBtnText}>Apply for job</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
