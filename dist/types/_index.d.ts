/**
 * @file Boilerplate - Generic boilerplate for TypeScript-based utility libraries
 * This can be adapted for any feature that doesn't require DOM manipulation
 */
import { BoilerplateInstance, BoilerplateOptions } from './instance';
import { BoilerplateController } from './controller';
declare const controller: BoilerplateController;
declare global {
    interface Window {
        Boilerplate: BoilerplateController;
    }
}
export type { BoilerplateOptions };
export { BoilerplateInstance };
export declare const Boilerplate: BoilerplateController;
export default controller;
