import { BoilerplateInstance, BoilerplateOptions } from './instance';

/**
 * Controller class to manage all instances
 */
export class BoilerplateController {
    private instances: BoilerplateInstance[] = [];

    /**
     * Create a new instance
     */
    public create(options: BoilerplateOptions = {}): BoilerplateInstance {
        const instance = new BoilerplateInstance(options);
        this.add(instance);
        return instance;
    }

    /**
     * Add an instance to the registry
     */
    private add(instance: BoilerplateInstance): void {
        this.instances.push(instance);
    }

    /**
     * Get a component instance by ID
     */
    public get(id: string): BoilerplateInstance | undefined {
        return this.instances.find(instance => instance.id === id);
    }

    /**
     * Get all component instances
     */
    public getAll(): BoilerplateInstance[] {
        return [...this.instances];
    }

    /**
     * Destroy a specific component instance
     */
    public destroy(id: string): boolean {
        const instance = this.get(id);
        if (instance) {
            instance.destroy();
            this.instances = this.instances.filter(item => item.id !== id);
            return true;
        }
        return false;
    }

    /**
     * Destroy all component instances
     */
    public destroyAll(): void {
        this.instances.forEach(instance => instance.destroy());
        this.instances = [];
    }
}