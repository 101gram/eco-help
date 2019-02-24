import * as I   from '@modules/interfaces';

export function getTypeScriptType(
    classPrototype: I.ClassPrototype, 
    propName: string | symbol
): I.ClassType {
    return Reflect.getOwnMetadata('design:type', classPrototype, propName);
}

export function setTypeScriptType(
    classPrototype: I.ClassPrototype,
    propName:       string | symbol,
    type:           I.ClassType
) {
    Reflect.defineMetadata('design:type', type, classPrototype, propName);
}
