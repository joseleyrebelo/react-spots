import React, { Context, createContext, Dispatch } from "react";
import {
  InstantiationMethods,
  InstantiationValues,
  ContextData,
} from "./types";

import useStateCallback from "./lib/useStateCallback";
import { capitalize } from "./lib/capitalize";
import { objKeys } from "ts-util";

// Todo - Add to ts-util
export type UnwrapContext<U> = U extends Context<infer I> ? I : never;

// Todo Export ContextType (ts)

export const newSpot = <
  Values extends Partial<InstantiationValues>,
  Methods extends InstantiationMethods<Values>
>(
  values: Values,
  methods: Methods
) => {
  const Context = createContext(shapeData(values, methods));
  const ContextProvider = createContextProvider(Context, values, methods);
  /**
   * Consider the scenario where a Spot is used by a component that is reused
   * on the same render: multiple instances of the reusable component
   * are affecting the same Spot, unintentionally.
   *
   * This could be taken as bad design or as a reductionist design, I take to
   * the later.
   *
   * As to remediate/allow a more composability, react-spots useContext
   * accepts a parameter of type context; components can be designed
   * without having to share the Spot (instance).
   */
  const useContext = (context?: UnwrapContext<typeof Context>) =>
    context ? context : React.useContext(Context);
  /**
   * Todo - extractor parameters - objects that allow to reshape the spot by
   * selecting some properties, excluding some properties, overwriting some
   * properties.
   * - Can easily be overkill...
   * Additionally it could ghost all functions as to remain present but have
   * no action.
   * - Todo, exclude clone?
   * */

  const clone = () => {
    const { Context, ContextProvider, useContext } = newSpot(values, methods);
    return { Context, ContextProvider, useContext };
  };

  return { Context, ContextProvider, useContext, clone };
};

const createContextProvider = <
  NewContext extends Context<ContextData<Values, Methods>>,
  Values extends Partial<InstantiationValues>,
  Methods extends InstantiationMethods<Values>
>(
  context: NewContext,
  values: Values,
  methods: Methods
) => {
  return function contextProvider({
    children,
    ...props
  }: { children: React.ReactNode } & {
    [key in keyof Values["states"]]?: Values["states"][key];
  } & {
    [key in keyof Values["data"]]?: Values["data"][key];
  } & {
    [key in keyof Values["middleware"]]?: Values["middleware"][key];
  }) {
    // TODO: correct usage of 'as string' and 'as () => void'
    // Overrides states declared on newSpot with ones declared directly on "Spot"ContextProvider.
    objKeys(props).forEach((key) => {
      if (values.states && key in values.states)
        values.states[key as string] = props[key];
      else if (values.data && key in values.data)
        values.data[key as string] = props[key];
      else if (values.middleware && key in values.middleware)
        values.middleware[key as string] = props[key] as () => void;
    });

    return (
      <context.Provider value={shapeData(values, methods, true)}>
        {children}
      </context.Provider>
    );
  };
};

const shapeData = <
  Values extends Partial<InstantiationValues>,
  Methods extends InstantiationMethods<Values>
>(
  values: Values,
  methods: Methods,
  isEffectiveData: boolean = false
) => {
  const { states } = values;
  return {
    ...values,
    ...methods,
    ...(states &&
      objKeys(states).reduce((aggregate, key) => {
        let state = states[key];
        let setState: Dispatch<typeof state> = () => {};

        if (isEffectiveData) [state, setState] = useStateCallback(states[key]);

        return {
          ...aggregate,
          states: { ...aggregate.states, [key]: state },
          setStates: {
            ...aggregate.setStates,
            // TODO: Correct usage of 'as string'
            [`set${capitalize(key as string)}`]: setState,
          },
        };
      }, {} as ContextData<Values, Methods>)),
    ...(methods &&
      objKeys(methods).reduce(
        (aggregate, key) => ({
          ...aggregate,
          // TODO: Correct usage of 'any[]'
          [key]: function (...args: any[]) {
            return methods[key](
              this as Parameters<(typeof methods)[typeof key]>[0],
              ...args
            );
          },
        }),
        {} as ContextData<Values, Methods>
      )),
    isLive: isEffectiveData,
  } as ContextData<Values, Methods>;
};
