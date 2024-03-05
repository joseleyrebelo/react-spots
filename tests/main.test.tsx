import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import React, { useEffect } from "react";
import { newSpot } from "../src/newSpot";

describe("newSpot", () => {
  const { ContextProvider: Spot, useContext: useSpot } = newSpot(
    { states: { exampleState: "initial" } },
    {
      getExampleState: function (context) {
        return context.states.exampleState;
      },
      setExampleState: function (context, value) {
        const { setExampleState } = context.setStates;
        setExampleState(value);
      },
    }
  );

  const ComponentAutoUpdater = ({ value }: { value: string }) => {
    const spot = useSpot();
    // Updates state on component mount
    useEffect(() => spot.setExampleState(value), [spot]);
    return <></>;
  };

  const ComponentPrinter = () => {
    // Prints the react state
    return <>{useSpot().getExampleState()}</>;
    return <></>;
  };

  it("Updates states on sibling component (expects 'overwritten' instead of 'initial')", async () => {
    await act(async () =>
      render(
        <Spot>
          <ComponentPrinter />
          <ComponentAutoUpdater value="overwritten" />
        </Spot>
      )
    );

    expect(screen.getByText("overwritten")).toBeInTheDocument();
  });
});
