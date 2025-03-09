/**
 * Type definitions for Boilerplate options
 */
export interface BoilerplateOptions {
    debug?: boolean;
    [key: string]: any;
}
/**
 * Boilerplate class - Core implementation of the feature
 */
export declare class BoilerplateInstance {
    id: string;
    options: BoilerplateOptions;
    constructor(options?: BoilerplateOptions);
    /**
     * Update component with new options
     */
    update(newOptions: Partial<BoilerplateOptions>): this;
    /**
     * Destroy this instance and clean up resources
     */
    destroy(): void;
}
