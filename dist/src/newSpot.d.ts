import { default as React, Context } from 'react';
import { InstantiationMethods, InstantiationValues, ContextData } from './types';

export type UnwrapContext<U> = U extends Context<infer I> ? I : never;
export declare const newSpot: <Values extends Partial<InstantiationValues>, Methods extends InstantiationMethods<Values>>(values: Values, methods: Methods) => {
    Context: React.Context<ContextData<Values, Methods>>;
    ContextProvider: ({ children, ...props }: {
        children: React.ReactNode;
    } & { [key in keyof Values["states"]]?: Values["states"][key] | undefined; } & { [key_1 in keyof Values["data"]]?: Values["data"][key_1] | undefined; } & { [key_2 in keyof Values["middleware"]]?: Values["middleware"][key_2] | undefined; }) => import("react/jsx-runtime").JSX.Element;
    useContext: (context?: UnwrapContext<React.Context<ContextData<Values, Methods>>>) => ContextData<Values, Methods>;
    clone: () => {
        Context: React.Context<ContextData<Values, Methods>>;
        ContextProvider: ({ children, ...props }: {
            children: React.ReactNode;
        } & { [key in keyof Values["states"]]?: Values["states"][key] | undefined; } & { [key_1 in keyof Values["data"]]?: Values["data"][key_1] | undefined; } & { [key_2 in keyof Values["middleware"]]?: Values["middleware"][key_2] | undefined; }) => import("react/jsx-runtime").JSX.Element;
        useContext: (context?: UnwrapContext<React.Context<ContextData<Values, Methods>>>) => ContextData<Values, Methods>;
    };
};
