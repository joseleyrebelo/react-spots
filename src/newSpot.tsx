import React, { Context, createContext, Dispatch } from "react";

import {
  Declaration_Methods,
  Declaration_Values,
  Usage_Discretion,
} from "./types";

// @todo:promote useStateCallback should be in react-util
import useStateCallback from "./lib/useStateCallback";
import { UnwrapContext } from "react-util";
import { objKeys, isString, capitalize } from "ts-util";

/**
	* Returns a Spot (opinionated wrapper on context)
	* @remarks
	* @param values - React states and data used by the spot
	* @param methods - Functionality related to the spot
	* @returns A Spot set (useContext, Context, ContextProvider)
	*/
export const newSpot = <
  Values extends Partial<Declaration_Values>,
  Methods extends Declaration_Methods<Values>
>(
  values: Values,
  methods: Methods
) => {
  const Spot = createContext(shapeData(values, methods));
  const SpotBounds = createContextProvider(Spot, values, methods);
  const useSpot = (context?: typeof Spot) => 
		React.useContext(context ? context : Spot); 
  const clone = () => newSpot(values, methods);

  return { Spot, SpotBounds, useSpot, clone };
};

const createContextProvider = <
	SpotDiscretion extends Usage_Discretion<Values, Methods>,
  Spot extends Context<Usage_Discretion<Values, Methods>>,
  Values extends Partial<Declaration_Values>,
  Methods extends Declaration_Methods<Values>,
>(
  spot: Spot,
  values: Values,
  methods: Methods
) => {
  return function contextProvider({
    children,
    ...props
  }: { children: React.ReactNode } & {
    [key in keyof Values["states"]]?: SpotDiscretion["states"][key];
  } & {
    [key in keyof Values["data"]]?: SpotDiscretion["data"][key];
  } & {
    [key in keyof Values["middleware"]]?: SpotDiscretion["middleware"][key];
  }) {
		type MiddlewareKeys = keyof SpotDiscretion["middleware"]
    // Override states, data, and middleware with(if any) prop declarations
		// made upo implementation of the SpotProvider on newSpot with ones declared
		// directly on "Spot" ContextProvider.
    objKeys(props).forEach((key) => {
			if (!isString(key)) return

      if (values.states && key in values.states)
        values.states[key] = props[key];
      else if (values.data && key in values.data)
        values.data[key] = props[key];
      else if (values.middleware && key in values.middleware)
        values.middleware[key] = props[key] as SpotDiscretion["middleware"][MiddlewareKeys]
    });

    return (
      <spot.Provider value={shapeData(values, methods, true)}>
        {children}
      </spot.Provider>
    );
  };
};

const shapeData = <
  Values extends Partial<Declaration_Values>,
  Methods extends Declaration_Methods<Values>
>(
  values: Values,
  methods: Methods,
  isEffectiveData: boolean = false
) => {
  const { states, middleware } = values;
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
            // @todo Correct usage of 'as string'
            [`set${capitalize(key as string)}`]: setState,
          },
        };
      }, {} as Usage_Discretion<Values, Methods>
		)),
		...(middleware && 
			objKeys(middleware).reduce(
				(aggregate, key) => ({
					...aggregate,
					[key]: middleware[key]
				}),
				{} as Usage_Discretion<Values, Methods>
		)),
    ...(methods &&
      objKeys(methods).reduce(
        (aggregate, key) => ({
          ...aggregate,
          // @todo Correct usage of 'any[]'
          [key]: function (...args: any[]) {
            return methods[key](
              this as Parameters<(typeof methods)[typeof key]>[0],
              ...args
            );
          },
        }),
        {} as Usage_Discretion<Values, Methods>
		)),
    isLive: isEffectiveData,
  } as Usage_Discretion<Values, Methods>;
};
