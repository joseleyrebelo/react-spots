import { SlashTuple } from "./lib/types";

type RevokePartial<Stable, Fragment extends Partial<Stable>> = {
  [key in keyof Stable]: key extends keyof Fragment
    ? Exclude<Fragment[key], undefined>
    : Stable[key];
};

export type InstantiationValues = {
  states: { [key: string]: any };
  data: { [key: string]: any };
  middleware: { [key: string]: (...args: any) => void };
};

export type InstantiationMethods<
  Values extends Partial<InstantiationValues> = InstantiationValues
> = {
  readonly [key: string]: (
    context: ContextValuesGhost<Values>,
    ...args: any[]
  ) => any;
};

export type ContextData<
  Context extends Partial<InstantiationValues> = InstantiationValues,
  Methods extends InstantiationMethods<Context> = InstantiationMethods<Context>
> = {
  isLive: ContextValuesGhost<Context>["isLive"];
  data: ContextValuesGhost<Context>["data"];
  states: ContextValuesGhost<Context>["states"];
  setStates: ContextValuesGhost<Context>["setStates"];
  middleware: ContextValuesGhost<Context>["middleware"];
} & {
  [key in keyof Methods]: (
    ...args: SlashTuple<Parameters<Methods[key]>>
  ) => ReturnType<Methods[key]>;
};

export type ContextValuesGhost<Context extends Partial<InstantiationValues>> = {
  isLive: boolean;
  data: { [key in keyof Context["data"]]: Context["data"][key] };
  states: { [key in keyof Context["states"]]: Context["states"][key] };
  setStates: {
    [key in keyof Context["states"] & string as `set${Capitalize<key>}`]: (
      update:
        | Context["states"][key]
        | ((state: Context["states"][key]) => Context["states"][key]),
      callback?: (state: Context["states"][key]) => void
    ) => void;
  };
  middleware: {
    [key in keyof Context["middleware"]]: (
      context: Context,
      ...args: any
    ) => Promise<
      ReturnType<RevokePartial<InstantiationValues, Context>["middleware"][key]>
    >;
  };
  methods: {
    [key: string]: (...args: any) => any;
  };
};
