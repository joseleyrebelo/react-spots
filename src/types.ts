import { AsyncFunction, ShiftTuple } from "ts-util";

/**

The utility types below cover two main application: instantiation and framework. 
The instantiation concers with ... while framework concerns with
*/


// @todo:commentary - why so complex, ot sure what is doing*/
//type RevokePartial<Target, Fragment extends Partial<Target>> = {
//  [key in keyof Target]: key extends keyof Fragment
//    ? Exclude<Fragment[key], undefined>
//    : Target[key];
//};

//type Function_ReplaceFirstArg<F extends (...args:any) => any, N extends Parameters<F>[1]> = (x: N, ...args: ShiftTuple<Parameters<F>>) => ReturnType<F>
//Function_ReplaceFirstArg<Discretion["middleware"][key], Discretion>;

/**
 * Declares type for values(states, data, middleware)
 *
 * @remarks
 * Its distinguishment from methods happens simply because TypeScript can't by
 * normal approach have objects properties infer sibling properties, but can
 * infer a sibling argument. Additionaly further inferences can be implemented.
 */
export type Declaration_Values = {
  states: { [key: string]: any };
  data: { [key: string]: any };
  middleware: {[key: string]: AsyncFunction<[spot: any, ...args:any ], any>};
};

/**
 * Declares type for methods (refers Values [Declaration_Values])
 *
 * @remarks
 * Creates methods type that which logic is aware of the values type. Plus has
 * additional inference of setStates, based on states in values in compliance
 * with React setState types. This inferences are done through DiscretionGhost
 * utility type.
 */
export type Declaration_Methods<
  Values extends Partial<Declaration_Values>
> = { readonly [key: string]:
			(spot: Declaration_Discretion<Values>, ...args: any[]) => any;
};

/**
 * Declares spot usage-type
 *
 * @remarks
 * Builds on values and methods types:
 *
 * @privateRemarks
 * Makes use of DiscretionGhost: setStates from it;
 * Updates middleware function first arg to be spot, such that middleware overwriting can use spot usage-type
 Final type inference of Spot discretion (options).
 * - Refer to DiscretionGhost, primarily for setStates optionality.
 * -   setStates to the discretion, Improve type for methods
 */
export type Usage_Discretion<
  Values extends Partial<Declaration_Values>,
  Methods extends Declaration_Methods<Values>,
	Discretion extends Declaration_Discretion<Values>
		= Declaration_Discretion<Values>
> = {
  isLive: Discretion["isLive"];
  data: Discretion["data"];
  states: Discretion["states"];
  setStates: Discretion["setStates"];
  middleware: {
		[key in keyof Discretion["middleware"]]:(
			spot: Discretion & Usage_Methods<Methods, Values>,
			...args: ShiftTuple<Parameters<Methods[key]>>
  	) => ReturnType<Methods[key]>;
	};
} & Usage_Methods<Methods, Values>
/**
 * Creates framework-type for methods
 *
 * @remarks
 * Infers from Methods. Removes spot (1st arg) since that is not an argument
 * exposed to framework usage.
 */
type Usage_Methods<
	Methods extends Declaration_Methods<Values>,
	Values extends Partial<Declaration_Values>
> = {
	[key in keyof Methods]: (
    ...args: ShiftTuple<Parameters<Methods[key]>>
  ) => ReturnType<Methods[key]>;
}

export type Declaration_Discretion<
	Values extends Partial<Declaration_Values>
> = {
  isLive: boolean;
  data: { [key in keyof Values["data"]]: Values["data"][key] };
  states: { [key in keyof Values["states"]]: Values["states"][key] };
  setStates: {
    [key in keyof  Values["states"] & string as `set${Capitalize<key>}`]: (
      update:
        | Values["states"][key]
        | ((state: Values["states"][key]) => Values["states"][key]),
      callback?: (state: Values["states"][key]) => void
    ) => void;
  };
  middleware: {
    [key in keyof Values["middleware"]]: Values["middleware"][key];
  };
};
