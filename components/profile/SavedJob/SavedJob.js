import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Line from "../../common/Line/Line";
import Company from "../../jobdetails/company/Company";
import { useRouter } from "expo-router";
import RouteName from "../../../constants/routeName";

const SavedJob = ({ jobs }) => {
  const router = useRouter();

  return (
    <>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Line />
        <Text style={{ width: 100, textAlign: "center" }}>Saved Job</Text>
        <Line />
      </View>
      {jobs.map((job) => (
        <View key={job?.job_id}>
          <TouchableOpacity
            onPress={() => router.push(RouteName.JOB_DETAILS(job?.job_id))}
          >
            <Company
              companyLogo={job.employer_logo}
              jobTitle={job.job_title}
              companyName={job.employer_name}
              Location={job.job_country}
            />
          </TouchableOpacity>
        </View>
      ))}
    </>
  );
};

export default SavedJob;
