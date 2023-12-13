import { useSpot } from "../spots/spot";

const Printer = () => {
  return <>{useSpot().states.exampleState}</>;
};

export default Printer;
