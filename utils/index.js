import { Alert, Share } from "react-native";

// Check Image Is Valid
export const checkImageURL = (url) => {
  if (url == null) return false;
  return true;
  // else {
  //   const pattern = new RegExp(
  //     "^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$",
  //     "i"
  //   );
  //   return pattern.test(url);
  // }
};

// Share Url Link
export const onShare = async (url) => {
  try {
    const result = await Share.share({
      title: "Share the job link",
      url: url,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    Alert.alert(error.message);
  }
};
