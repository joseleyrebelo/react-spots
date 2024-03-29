import { Context } from 'react';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { default as React_2 } from 'react';

declare type ContextData<Context extends Partial<InstantiationValues> = InstantiationValues, Methods extends InstantiationMethods<Context> = InstantiationMethods<Context>> = {
    isLive: ContextValuesGhost<Context>["isLive"];
    data: ContextValuesGhost<Context>["data"];
    states: ContextValuesGhost<Context>["states"];
    setStates: ContextValuesGhost<Context>["setStates"];
    middleware: ContextValuesGhost<Context>["middleware"];
} & {
    [key in keyof Methods]: (...args: SlashTuple<Parameters<Methods[key]>>) => ReturnType<Methods[key]>;
};

declare type ContextValuesGhost<Context extends Partial<InstantiationValues>> = {
    isLive: boolean;
    data: {
        [key in keyof Context["data"]]: Context["data"][key];
    };
    states: {
        [key in keyof Context["states"]]: Context["states"][key];
    };
    setStates: {
        [key in keyof Context["states"] & string as `set${Capitalize<key>}`]: (update: Context["states"][key] | ((state: Context["states"][key]) => Context["states"][key]), callback?: (state: Context["states"][key]) => void) => void;
    };
    middleware: {
        [key in keyof Context["middleware"]]: (context: Context, ...args: any) => Promise<ReturnType<RevokePartial<InstantiationValues, Context>["middleware"][key]>>;
    };
    methods: {
        [key: string]: (...args: any) => any;
    };
};

declare type InstantiationMethods<Values extends Partial<InstantiationValues> = InstantiationValues> = {
    readonly [key: string]: (context: ContextValuesGhost<Values>, ...args: any[]) => any;
};

declare type InstantiationValues = {
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

export declare const newSpot: <Values extends Partial<InstantiationValues>, Methods extends InstantiationMethods<Values>>(values: Values, methods: Methods) => {
    Context: React_2.Context<ContextData<Values, Methods>>;
    ContextProvider: ({ children, ...props }: {
        children: React_2.ReactNode;
    } & { [key in keyof Values["states"]]?: Values["states"][key] | undefined; } & { [key_1 in keyof Values["data"]]?: Values["data"][key_1] | undefined; } & { [key_2 in keyof Values["middleware"]]?: Values["middleware"][key_2] | undefined; }) => JSX_2.Element;
    useContext: (context?: ContextData<Values, Methods> | undefined) => ContextData<Values, Methods>;
    clone: () => {
        Context: React_2.Context<ContextData<Values, Methods>>;
        ContextProvider: ({ children, ...props }: {
            children: React_2.ReactNode;
        } & { [key in keyof Values["states"]]?: Values["states"][key] | undefined; } & { [key_1 in keyof Values["data"]]?: Values["data"][key_1] | undefined; } & { [key_2 in keyof Values["middleware"]]?: Values["middleware"][key_2] | undefined; }) => JSX_2.Element;
        useContext: (context?: ContextData<Values, Methods> | undefined) => ContextData<Values, Methods>;
    };
};

declare type RevokePartial<Stable, Fragment extends Partial<Stable>> = {
    [key in keyof Stable]: key extends keyof Fragment ? Exclude<Fragment[key], undefined> : Stable[key];
};

declare type SlashTuple<TupleSet extends any[]> = ((...args: TupleSet) => any) extends (_: any, ..._1: infer Rest) => any ? Rest : never;

export declare type UnwrapContext<U> = U extends Context<infer I> ? I : never;

export { }
