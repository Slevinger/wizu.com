import partyIcon from "../../assets/icons/partyIcon.jpg";
import getTogetherIcon from "../../assets/icons/getTogetherIcon.jpg";
import celebrationIcon from "../../assets/icons/celebrationIcon.png";
import sportIcon from "../../assets/icons/sportIcon.png";

export const EventNatureList = [
  { value: "PARTY", label: "Party", icon: partyIcon },
  {
    value: "GET_TOGHETHER",
    label: "Get Together",
    icon: getTogetherIcon
  },
  {
    value: "OUT_DOORS",
    label: "Out Doors",
    icon: { type: "foundation", name: "trees" }
  },
  {
    value: "CELEBRATING",
    label: "Celebartion",
    icon: celebrationIcon
  },
  { value: "SPORT", label: "Sport", icon: sportIcon },
  { value: "OTHER", label: "Other", icon: { type: "", name: "" } }
];
