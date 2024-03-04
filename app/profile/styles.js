import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

export const styles = StyleSheet.create({
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
