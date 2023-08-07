import { ExtensionFactory, Root } from 'joi';
import { BigIntSchema } from './types';
export declare const joiBigint: ExtensionFactory;
export declare const extendJoi: <T extends Root>(baseJoi: T) => T & {
    bigint<U = bigint>(): BigIntSchema<U>;
};
