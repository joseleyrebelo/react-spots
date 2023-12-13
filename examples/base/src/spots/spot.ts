import { newSpot } from "react-spots";

export const {
  Context: SpotContext,
  ContextProvider: Spot,
  useContext: useSpot,
} = newSpot(
  {
    states: {
      exampleState: "initial",
    },
  },
  {
    scrapeExampleState: function (context) {
      context.setStates.setExampleState("");
    },
  }
);
