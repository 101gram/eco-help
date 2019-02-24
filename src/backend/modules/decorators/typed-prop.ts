import * as I from '@modules/interfaces';
import * as TSMeta from '@modules/metadata/typescript-api';
import { prop, PropOptions } from 'typegoose';

export function TypedProp(
    typeFn:   (arg?: void | undefined) => I.ClassType, 
    options?: PropOptions
) {
    const decorateWithProp= prop(options);

    return (classPrototype: I.ClassPrototype, propName: string) => {        
        TSMeta.setTypeScriptType(
            classPrototype,
            propName,
            typeFn()
        );
        decorateWithProp(classPrototype, propName);
    };
}