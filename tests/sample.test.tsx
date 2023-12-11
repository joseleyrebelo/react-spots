import "@testing-library/jest-dom";
import { newSpot } from "../src/newSpot";
import { render, screen, waitFor } from "@testing-library/react";

describe("newSpot", () => {
  const { ContextProvider, useContext } = newSpot(
    { states: { exampleState: "initial" } },
    {
      getExampleState: function (ctx) {
        return ctx.states.exampleState;
      },
    }
  );
  const SpotContextPrintCallBack = ({
    printable,
    callback,
  }: {
    printable: (ctx: ReturnType<typeof useContext>) => any;
    callback: (ctx: ReturnType<typeof useContext>) => void;
  }) => {
    return (
      <ContextProvider>
        {(() => {
          // const [as, setAs] = useState("one");
          const spot = useContext();
          // const { exampleState } = spot.states;
          // useEffect(() => {
          //   console.log("Happening");
          //   callback(spot);
          //   spot.setStates.setExampleState("over");
          //   setAs("two");
          // }, []);
          // return <>{printable(spot)}</>;
          return <>{spot.states.exampleState}</>;
        })()}
        {(() => {
          // const [as, setAs] = useState("one");
          const spot = useContext();
          // const { exampleState } = spot.states;
          // useEffect(() => {
          //   console.log("Happening");
          //   callback(spot);
          spot.setStates.setExampleState("over");
          //   setAs("two");
          // }, []);
          return <></>;
        })()}
      </ContextProvider>
    );
  };

  it("one argument", async () => {
    await waitFor(async () => {
      render(
        <SpotContextPrintCallBack
          printable={(ctx) => ctx.states.exampleState}
          callback={(ctx) => ctx.setStates.setExampleState("overwrite")}
        />
      );
    });

    expect(screen.getByText("initial")).toBeInTheDocument();
  });
});
