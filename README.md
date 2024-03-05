# React Spots (Context based)

Intends to make composing react applications that use contexts a nudge simpler, by doing useful boilerplate and having an opinionated yet accessible framework to:

- Easily define contexts with instantiated states, methods, data.
- Easily access contextual methods with `useContext(MyContext).aMethod(withParams);`
- Use Context, and ContextProvider code as you normally would.

This is an approach that may be useful for some implementations, but is not meant to replace proper state management frameworks; use with caution.

## What is a Spot?

A context invoked with this framework - works along React-Spots tooling.

## How to create a new Spot?

The react-spot framework is design for types in typescript. The current structure allows for declaring initial contextual information, can be directly referred to by the methods. The most performant and ergonomic way to achieve this is to separate it in two parameters:

- Context - Where all contextual data (and their types) will be declared.
- Methods - Where all the methods can be declared and be capable of referring to the context.

### Bland example

```tsx
export const {
  context: MySpotContext,
  contextProvider: MySpotContextProvider,
  useContext: useMySpot,
} = newSpot(
  {
    states: { mySpotState: "initial" },
    data: { mySpotData: "initial" },
    middleware: { mySpotMiddlewareMethod: () => null },
  },
  {
    mySpotMethod: function (context) {
      console.log(context.states.mySpotState);
      this.anotherMethod();
    },
    anotherMethod: function (context) {
      context.setStates.setMy;
    },
  }
);
```

## What can be found within a Spot (context)?

As of now the requirements met are states, data, and middleware (interceptors):

- **context.data** - Contains data meant to be accessed throughout the Spot that may change or not but need to operate as a React state.
- **context.states** - Contains data meant to used throughout this Spot but different than data is meant to be interacted with as a React state.
- **context.setStates** (auto generated) - Contains React setState functions generated from the states properties declarations.
  - As such `states: { mySpotState: "initial" }` will be mapped into `setStates: { setMySpotState: "initial" }`, and will be accessible as `context.setStates.setMySpotState("modified.")`:
- **context.middleware** - Contains all the middleware entries that can be declared to add specific functionality upon a certain event... (more on this later)
- **context.\* (methods)** - Contains all methods declared on the Spot instantiation.
- **context.isConsuming** - (auto generated) - Contains flag-value on whether this context handle is a consumer of the provider or not. As of now useContext simply returns the context, it does not enforce it being a consumer or not. Perhaps there's a need for useConsumer? ... (more on this later)

### How does it work, how to use?

All of this properties with exception of the methods are typescript inferred and accessible when instantiating the Spot methods though the `context` parameter. But, as expected when working with the React framework, they are only compiled into the Spot context when `<MySpotContextProvider> ... </MySpotContextProvider>` (as per bland example) is executed on runtime.

The way to access the methods is to use `this.* (methods)`, as you would with object methods. The reason is that in typescript the object cannot self reference itself, as in the `methods` parameters in `newSpot` objects can not refer to itself (more on this later)... if you have a solution for this let me know.

## How to use a Spot?

Taking the blank example a few paragraphs before, you can make use of `useMySpot`:

```tsx
import { useMySpot } from "../contexts/mySpot";

const ExampleComponent = () => {
  const mySpot = useMySpot();
  const { mySpotState } = mySpot.states;


  useEffect(() => {


  }, [mySpotState]);

  return (
    <div>mySpot state says "{mySpotState}"<div>
  )
};
```

## Footnotes

This is all for now - I plan to follow up with making the code more concise in the near future.
