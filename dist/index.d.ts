import { JSX as JSX_2 } from 'react/jsx-runtime';
import { default as React_2 } from 'react';
import { SetStateAction } from 'react';

declare type ContextData<Context extends Partial<InstantiationContext> = InstantiationContext, Methods extends InstantiationMethods<Context> = InstantiationMethods<Context>> = {
    data: ContextValuesGhost<Context>["data"];
    states: ContextValuesGhost<Context>["states"];
    setStates: ContextValuesGhost<Context>["setStates"];
    middleware: ContextValuesGhost<Context>["middleware"];
} & {
    [key in keyof Methods]: (...args: SlashTuple<Parameters<Methods[key]>>) => ReturnType<Methods[key]>;
};

declare type ContextValuesGhost<Context extends Partial<InstantiationContext>> = {
    data: {
        [key in keyof Context["data"]]: Context["data"][key];
    };
    states: {
        [key in keyof Context["states"]]: Context["states"][key];
    };
    setStates: {
        [key in keyof Context["states"] & string as `set${Capitalize<key>}`]: (update: SetStateAction<Context["states"][key]> | Context["states"][key], callback?: (state: Context["states"][key]) => void) => void;
    };
    middleware: {
        [key in keyof Context["middleware"]]: (context: Context, ...args: any) => Promise<ReturnType<RevokePartial<InstantiationContext, Context>["middleware"][key]>>;
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

declare type InstantiationMethods<Values extends Partial<InstantiationContext> = InstantiationContext> = {
    readonly [key: string]: (context: ContextValuesGhost<Values>, ...args: any[]) => any;
};

export declare const newSpot: <Values extends Partial<InstantiationContext>, Methods extends InstantiationMethods<Values>>(values: Values, methods: Methods) => {
    Context: React_2.Context<ContextData<Values, Methods>>;
    ContextProvider: ({ children, ...props }: {
        children: React_2.ReactNode;
    } & { [key in keyof Values["states"]]?: Values["states"][key] | undefined; } & { [key_1 in keyof Values["data"]]?: Values["data"][key_1] | undefined; } & { [key_2 in keyof Values["middleware"]]?: Values["middleware"][key_2] | undefined; }) => JSX_2.Element;
    useContext: () => ContextData<Values, Methods>;
};

declare type RevokePartial<Stable, Fragment extends Partial<Stable>> = {
    [key in keyof Stable]: key extends keyof Fragment ? Exclude<Fragment[key], undefined> : Stable[key];
};

declare type SlashTuple<TupleSet extends any[]> = ((...args: TupleSet) => any) extends (_: any, ..._1: infer Rest) => any ? Rest : never;

export { }
