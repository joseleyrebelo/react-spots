import React, { Context, createContext, Dispatch } from "react";
import {
  InstantiationMethods,
  InstantiationContext,
  ContextData,
} from "./types";

import useStateCallback from "./lib/useStateCallback";
import { capitalize } from "./lib/capitalize";
import { objKeys } from "./lib/objKeys";

export const newSpot = <
  Values extends Partial<InstantiationContext>,
  Methods extends InstantiationMethods<Values>
>(
  values: Values,
  methods: Methods
) => {
  const Context = createContext(shapeData(values, methods));
  const ContextProvider = createContextProvider(Context, { values, methods });
  const useContext = () => React.useContext(Context);

  return { Context, ContextProvider, useContext };
};

const createContextProvider = <
  NewContext extends Context<any>,
  Data extends {
    values: Partial<InstantiationContext>;
    methods: InstantiationMethods<Data["values"]>;
  }
>(
  context: NewContext,
  data: Data
) => {
  const { values, methods } = data;
  return ({
    children,
    ...props
  }: { children: React.ReactNode } & {
    [key in keyof Data["values"]["states"]]?: Data["values"]["states"][key];
  } & {
    [key in keyof Data["values"]["data"]]?: Data["values"]["data"][key];
  } & {
    [key in keyof Data["values"]["middleware"]]?: Data["values"]["middleware"][key];
  }) => {
    // Overrides instantiated states with ones declared along with
    // the respective ContextProvider.
    objKeys(props).forEach((key) => {
      if (values.states && key in values.states)
        values.states[key as string] = props[key as keyof typeof props];
      else if (values.data && key in values.data)
        values.data[key as string] = props[key as keyof typeof props];
      else if (values.middleware && key in values.middleware)
        values.middleware[key as string] = props[
          key as keyof typeof props
        ] as any;
      // @todo - correct for 'as any'
    });

    return (
      <context.Provider value={shapeData(values, methods, true)}>
        {children}
      </context.Provider>
    );
  };
};

const shapeData = <
  Context extends Partial<InstantiationContext>,
  Methods extends InstantiationMethods<Context>
>(
  values: Context,
  methods: Methods,
  withState: boolean = false
) => {
  const { states } = values;
  return {
    ...values,
    ...methods,
    ...(states &&
      objKeys(states).reduce((aggregate, key) => {
        let state = states[key];
        let setState: Dispatch<typeof state> = () => {};

        if (withState) [state, setState] = useStateCallback(states[key]);

        return {
          ...aggregate,
          states: { ...aggregate.states, [key]: state },
          setStates: {
            ...aggregate.setStates,
            // @todo - "as string" - fix objKeys accuracy)
            [`set${capitalize(key as string)}`]: setState,
          },
        };
      }, {} as ContextData<Context, Methods>)),
    ...(methods &&
      (objKeys(methods) as (keyof typeof methods)[]).reduce(
        (aggregate, key) => {
          return {
            ...aggregate,
            [key]: function (...args: any[]) {
              return methods[key](
                this as Parameters<(typeof methods)[typeof key]>[0],
                ...args
              );
            },
          };
        },
        {} as ContextData<Context, Methods>
      )),
  } as ContextData<Context, Methods>;
};
