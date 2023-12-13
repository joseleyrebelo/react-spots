import { useSpot } from "../spots/spot";

const AutoUpdater = () => {
  useSpot().setStates.setExampleState("overwrite");
  return <></>;
};

export default AutoUpdater;
