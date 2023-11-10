import { Dispatch } from 'react';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { default as React_2 } from 'react';
import { SetStateAction } from 'react';

declare type ContextData<Context extends InstantiationContext = InstantiationContext, Methods extends InstantiationMethods<Context> = InstantiationMethods<Context>> = {
    data: Context["data"];
    states: ContextDataGhost<Context>["states"];
    setStates: ContextDataGhost<Context>["setStates"];
    middleware: ContextDataGhost<Context>["middleware"];
} & {
    [key in keyof Methods]: (...args: SlashTuple<Parameters<Methods[key]>>) => ReturnType<Methods[key]>;
};

declare type ContextDataGhost<Context extends InstantiationContext> = {
    data: {
        [key in keyof Context["data"]]: Context["data"][key];
    };
    states: {
        [key in keyof Context["states"]]: Context["states"][key];
    };
    setStates: {
        [key in keyof Context["states"] & string as `set${Capitalize<key>}`]: (update: Dispatch<SetStateAction<Context["states"][key]>> | Context["states"][key], callback?: (state: Context["states"][key]) => void) => void;
    };
    middleware: {
        [key in keyof Context["middleware"]]: (context: Context, ...args: any) => Promise<ReturnType<Context["middleware"][key]>>;
    };
    methods: {
        [key: string]: (...args: any) => any;
    };
};

declare type InstantiationContext = {
    states: {
        [key: string]: any;
    };
    data: {
        [key: string]: any;
    };
    middleware: {
        [key: string]: (...args: any) => void;
    };
};

declare type InstantiationMethods<Context extends InstantiationContext = InstantiationContext> = {
    readonly [key: string]: (context: ContextDataGhost<Context>, ...args: any[]) => any;
};

export declare const newSpot: <Context_1 extends InstantiationContext, Methods extends InstantiationMethods<Context_1>>(values: Context_1, methods: Methods) => {
    context: React_2.Context<ContextData<Context_1, Methods>>;
    contextProvider: ({ children, ...props }: {
        children: React_2.ReactNode;
    } & { [key in keyof Context_1["states"]]?: Context_1["states"][key] | undefined; } & { [key_1 in keyof Context_1["data"]]?: Context_1["data"][key_1] | undefined; } & { [key_2 in keyof Context_1["middleware"]]?: Context_1["middleware"][key_2] | undefined; }) => JSX_2.Element;
    useContext: () => ContextData<Context_1, Methods>;
};

declare type SlashTuple<TupleSet extends any[]> = ((...args: TupleSet) => any) extends (_: any, ..._1: infer Rest) => any ? Rest : never;

export { }
