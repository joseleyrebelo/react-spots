import { Dispatch, SetStateAction } from "react";
import { SlashTuple } from "./lib/types";

export type InstantiationContext = {
  states: { [key: string]: any };
  data: { [key: string]: any };
  middleware: { [key: string]: (...args: any) => void };
};

export type InstantiationMethods<
  Context extends InstantiationContext = InstantiationContext
> = {
  readonly [key: string]: (
    context: ContextDataGhost<Context>,
    ...args: any[]
  ) => any;
};

export type ContextData<
  Context extends InstantiationContext = InstantiationContext,
  Methods extends InstantiationMethods<Context> = InstantiationMethods<Context>
> = {
  data: Context["data"];
  states: ContextDataGhost<Context>["states"];
  setStates: ContextDataGhost<Context>["setStates"];
  middleware: ContextDataGhost<Context>["middleware"];
} & {
  [key in keyof Methods]: (
    ...args: SlashTuple<Parameters<Methods[key]>>
  ) => ReturnType<Methods[key]>;
};

export type ContextDataGhost<Context extends InstantiationContext> = {
  data: { [key in keyof Context["data"]]: Context["data"][key] };
  states: { [key in keyof Context["states"]]: Context["states"][key] };
  setStates: {
    [key in keyof Context["states"] & string as `set${Capitalize<key>}`]: (
      update:
        | Dispatch<SetStateAction<Context["states"][key]>>
        | Context["states"][key],
      callback?: (state: Context["states"][key]) => void
    ) => void;
  };
  middleware: {
    [key in keyof Context["middleware"]]: (
      context: Context,
      ...args: any
    ) => Promise<ReturnType<Context["middleware"][key]>>;
  };
  methods: {
    [key: string]: (...args: any) => any;
  };
};
