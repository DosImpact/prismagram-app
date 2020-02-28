import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default {
  window: {
    width,
    height
  },
  screen: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height
  },
  isSmallDevice: width < 375
};
