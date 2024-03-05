import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import { newSpot } from "../src/newSpot";
import React from "react";

describe("newSpot", () => {
  const { useContext: useSpot } = newSpot({}, {});
  const TestComponent = () => {
    return (
      <div>{useSpot().isConsumer ? "is_consumer" : "is_not_consumer"}</div>
    );
  };

  it("Expects to not be consumer", async () => {
    await act(async () => render(<TestComponent />));
    expect(screen.getByText("is_not_consumer")).toBeInTheDocument();
  });
});

describe("newSpot", () => {
  const { ContextProvider: Spot, useContext: useSpot } = newSpot({}, {});
  const TestComponent = () => {
    return (
      <div>{useSpot().isConsumer ? "is_consumer" : "is_not_consumer"}</div>
    );
  };

  it(
    "Expects to not be consumer. \n TestComponent is an effective Consumer of " +
      "the Provider Spot, since it not part of its children.",
    async () => {
      await act(async () =>
        render(
          <>
            <Spot>{"sample children"}</Spot>
            <TestComponent />
          </>
        )
      );
      expect(screen.getByText("is_not_consumer")).toBeInTheDocument();
    }
  );
});

describe("newSpot", () => {
  const { ContextProvider: Spot, useContext: useSpot } = newSpot({}, {});
  const TestComponent = () => {
    return (
      <div>{useSpot().isConsumer ? "is_consumer" : "is_not_consumer"}</div>
    );
  };

  it("Expects to be consumer", async () => {
    await act(async () =>
      render(
        <Spot>
          <TestComponent />
        </Spot>
      )
    );
    expect(screen.getByText("is_consumer")).toBeInTheDocument();
  });
});
