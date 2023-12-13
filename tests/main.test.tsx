import "@testing-library/jest-dom";
import { newSpot } from "../src/newSpot";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("newSpot", () => {
  const { ContextProvider: Spot, useContext: useSpot } = newSpot(
    { states: { exampleState: "initial" } },
    {
      getExampleState: function (ctx) {
        return ctx.states.exampleState;
      },
    }
  );

  const AutoUpdater = () => {
    useSpot().setStates.setExampleState("overwrite");
    return <></>;
  };

  const Printer = () => {
    return <>{useSpot().states.exampleState}</>;
  };

  it("Updates states on sibling component.", async () => {
    await act(async () => {
      render(
        <Spot>
          <Printer />
          <AutoUpdater />
        </Spot>
      );
    });

    expect(screen.getByText("overwrite")).toBeInTheDocument();
  });
});
