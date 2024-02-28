import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Alert,
} from "react-native";

import styles from "./welcome.style";
import { COLORS, icons, SIZES } from "../../../constants";
import { useRouter } from "expo-router";
import {
  storeStringValue,
  storeObjectValue,
} from "../../../utils/AsyncStorage";
import String from "../../../constants/string";
import RouteName from "../../../constants/routeName";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Welcome = ({
  userName,
  userPosition = "",
  searchTerm,
  setSearchTerm,
  handleClick,
}) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("");
  const [showAddJobType, setShowAddJobType] = useState(false);
  const [newJobType, setNewJobType] = useState("");
  const [jobTypes, setJobTypes] = useState([]);

  useEffect(() => {
    const fetchJobTypes = async () => {
      const storedJobTypes = await AsyncStorage.getItem(String.JOB_TYPES);
      if (storedJobTypes) {
        setJobTypes(JSON.parse(storedJobTypes));
      }
    };

    fetchJobTypes();
  }, [jobTypes]);

  const handleAddJobType = () => {
    setShowAddJobType(true);
  };

  const handleSaveJobType = async () => {
    if (newJobType) {
      jobTypes.push(newJobType);
      await storeObjectValue(String.JOB_TYPES, jobTypes);
      setNewJobType("");
      setShowAddJobType(false);
    }
  };

  const handleDeleteJobType = async (item) => {
    const updatedJobTypes = jobTypes.filter((jobType) => jobType !== item);
    await storeObjectValue(String.JOB_TYPES, updatedJobTypes);
  };

  return (
    <View>
      {/* Greeting */}
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.userName}>Hello </Text>
          <TextInput
            style={styles.userName}
            defaultValue={userName}
            onChangeText={async (text) => {
              await storeStringValue(String.USER_NAME, text);
            }}
            placeholder="User Name..."
            placeholderTextColor={COLORS.gray2}
          />
          <Text style={styles.userName}> : </Text>
        </View>

        <Text style={styles.welcomeMessage}>Searching Job For</Text>
      </View>

      {/* Search Box */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(Text) => setSearchTerm(Text)}
            placeholder={`${userPosition} ?`}
            placeholderTextColor={"grey"}
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          ></Image>
        </TouchableOpacity>
      </View>

      {/* Job Types List */}
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(RouteName.SEARCH(item));
              }}
              onLongPress={() => handleDeleteJobType(item)}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
        />

        {/* Add Job Type */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddJobType}>
          <MaterialCommunityIcons name="tag-plus" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Popup Screen */}
      <Modal visible={showAddJobType} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Job Type</Text>
            <TextInput
              style={styles.modalInput}
              value={newJobType}
              onChangeText={(text) => setNewJobType(text)}
              placeholder="Enter job type"
              placeholderTextColor={COLORS.gray2}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleSaveJobType}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowAddJobType(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Welcome;
