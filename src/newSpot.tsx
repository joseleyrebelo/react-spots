import React, { Context, createContext, Dispatch } from "react";
import {
  InstantiationMethods,
  InstantiationValues,
  ContextData,
} from "./types";

import useStateCallback from "./lib/useStateCallback";
import { capitalize } from "./lib/capitalize";
import { objKeys } from "ts-util";

export const newSpot = <
  Values extends Partial<InstantiationValues>,
  Methods extends InstantiationMethods<Values>
>(
  values: Values,
  methods: Methods
) => {
  const Context = createContext(shapeData(values, methods));
  const ContextProvider = createContextProvider(Context, values, methods);
  const useContext = () => React.useContext(Context);

  return { Context, ContextProvider, useContext };
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
