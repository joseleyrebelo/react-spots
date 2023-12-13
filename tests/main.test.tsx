import "@testing-library/jest-dom";
import { newSpot } from "../src/newSpot";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useEffect } from "react";

describe("newSpot", () => {
  const { ContextProvider: Spot, useContext: useSpot } = newSpot(
    { states: { exampleState: "initial" } },
    {
      getExampleState: function (context) {
        return context.states.exampleState;
      },
    }
  );

  const AutoUpdater = ({ value }: { value: string }) => {
    const spot = useSpot();
    // Updates state on component mount
    useEffect(() => spot.setStates.setExampleState(value), [spot]);
    return <></>;
  };

  const Printer = () => {
    // Prints the react state
    return <>{useSpot().getExampleState()}</>;
  };

  it("Updates states on sibling component (expects 'overwritten' instead of 'initial')", async () => {
    await act(async () => {
      render(
        <Spot>
          <Printer />
          <AutoUpdater value="overwritten" />
        </Spot>
      );
    });

    expect(screen.getByText("overwritten")).toBeInTheDocument();
  });
});
