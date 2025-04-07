import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import React, { useEffect } from "react";
import { newSpot } from "../src/newSpot";

describe("newSpot", () => {
  const { SpotBounds, useSpot } = newSpot(
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

  // Update state on component mount
  const ComponentAutoUpdater = ({ value }: { value: string }) => {
    const spot = useSpot();
    useEffect(() => spot.setExampleState(value), [spot]);
    return <></>;
  };

  // Print the react state
  const ComponentPrinter = () => {
    return <>{useSpot().getExampleState()}</>;
  };

  it("Updates states on sibling component (expects 'overwritten' instead of " +
		"'initial')", async () => {
    await act(async () =>
      render(
        <SpotBounds>
          <ComponentPrinter />
          <ComponentAutoUpdater value="overwritten" />
        </SpotBounds>
      )
    );

    expect(screen.getByText("overwritten")).toBeInTheDocument();
  });
});
