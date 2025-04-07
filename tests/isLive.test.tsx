import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import { newSpot } from "../src/newSpot";
import React from "react";

describe("newSpot", () => {
  const { useSpot } = newSpot({}, {});
  const TestComponent = () => {
    return <div>{useSpot().isLive ? "is_consumer" : "is_not_consumer"}</div>;
  };

  it("Expects to not be consumer", async () => {
    await act(async () => render(<TestComponent />));
    expect(screen.getByText("is_not_consumer")).toBeInTheDocument();
  });
});

describe("newSpot", () => {
  const { SpotBounds, useSpot } = newSpot({}, {});
  const TestComponent = () => {
    return <div>{useSpot().isLive ? "is_consumer" : "is_not_consumer"}</div>;
  };

  it(
    "Expects to not be consumer. \n TestComponent is an effective Consumer of " +
      "the Provider Spot, since it not part of its children.",
    async () => {
      await act(async () =>
        render(
          <>
            <SpotBounds>{"sample children"}</SpotBounds>
            <TestComponent />
          </>
        )
      );
      expect(screen.getByText("is_not_consumer")).toBeInTheDocument();
    }
  );
});

describe("newSpot", () => {
  const { SpotBounds, useSpot } = newSpot({}, {});
  const TestComponent = () => {
    return <div>{useSpot().isLive ? "is_consumer" : "is_not_consumer"}</div>;
  };

  it("Expects to be consumer", async () => {
    await act(async () =>
      render(
        <SpotBounds>
          <TestComponent />
        </SpotBounds>
      )
    );
    expect(screen.getByText("is_consumer")).toBeInTheDocument();
  });
});
