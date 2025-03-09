/**
 * @file Boilerplate - Generic boilerplate for TypeScript-based utility libraries
 * This can be adapted for any feature that doesn't require DOM manipulation
 */

import { BoilerplateInstance, BoilerplateOptions } from './instance';
import { BoilerplateController } from './controller';

// Create a singleton controller instance
const controller = new BoilerplateController();

// Window interface augmentation
declare global {
    interface Window {
        Boilerplate: BoilerplateController;
    }
}

// Initialize the global object
if (typeof window !== 'undefined') {
    window.Boilerplate = controller;
}

// Export types
export type { BoilerplateOptions };
export { BoilerplateInstance };

// Export for module usage
export const Boilerplate = controller;
export default controller;