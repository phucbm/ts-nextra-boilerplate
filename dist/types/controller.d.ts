import { BoilerplateInstance, BoilerplateOptions } from './instance';
/**
 * Controller class to manage all instances
 */
export declare class BoilerplateController {
    private instances;
    /**
     * Create a new instance
     */
    create(options?: BoilerplateOptions): BoilerplateInstance;
    /**
     * Add an instance to the registry
     */
    private add;
    /**
     * Get a component instance by ID
     */
    get(id: string): BoilerplateInstance | undefined;
    /**
     * Get all component instances
     */
    getAll(): BoilerplateInstance[];
    /**
     * Destroy a specific component instance
     */
    destroy(id: string): boolean;
    /**
     * Destroy all component instances
     */
    destroyAll(): void;
}
