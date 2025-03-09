/**
 * @file TsLibrary - Generic boilerplate for TypeScript-based UI component libraries
 * This can be adapted for any feature (Slider, Popup, Cursor, etc.)
 */

// Type definitions
export interface TsLibraryOptions {
    el?: HTMLElement;
    selector?: string;
    debug?: boolean;
    [key: string]: any;
}

/**
 * TsLibrary class - Core implementation of the feature
 */
export class TsLibrary {
    id: string;
    options: TsLibraryOptions;

    constructor(options: TsLibraryOptions) {
        this.id = crypto.randomUUID();
        this.options = {
            el: undefined,
            debug: false,
            ...options
        };

        if (this.options.el) {
            this.init();
        } else if (this.options.debug) {
            console.warn('TsLibrary created without element reference');
        }
    }

    private init(): void {
        if (!this.options.el) return;

        // Initialize the component on the element
        this.options.el.innerHTML = 'TsLibrary initialized!';

        if (this.options.debug) {
            console.log(`TsLibrary ${this.id} initialized with options`, this.options);
        }
    }

    /**
     * Update component with new options
     */
    public update(newOptions: Partial<TsLibraryOptions>): this {
        this.options = { ...this.options, ...newOptions };
        // Re-initialize with new options if needed

        if (this.options.debug) {
            console.log(`TsLibrary ${this.id} updated with new options`, newOptions);
        }

        return this;
    }

    /**
     * Destroy this component instance and clean up resources
     */
    public destroy(): void {
        // Cleanup logic
        if (this.options.el) {
            // Remove event listeners, animations, etc.
            this.options.el.innerHTML = '';
        }

        if (this.options.debug) {
            console.log(`TsLibrary ${this.id} destroyed`);
        }
    }
}

/**
 * Controller class to manage all component instances
 */
class TsLibraryController {
    private instances: TsLibrary[] = [];

    /**
     * Create one or more component instances
     */
    public create(options: TsLibraryOptions): TsLibrary {
        // Handle selector-based initialization
        if (!options.el && options.selector) {
            const elements = document.querySelectorAll(options.selector);

            if (elements.length === 0) {
                if (options.debug) {
                    console.warn(`No elements found matching selector: ${options.selector}`);
                }
                return this.createInstance(options);
            }

            // Create instances for all matching elements
            elements.forEach(el => {
                this.add(new TsLibrary({
                    ...options,
                    el: el as HTMLElement,
                }));
            });

            // Return the first instance
            return this.instances[this.instances.length - elements.length];
        }

        // Create a single instance
        return this.createInstance(options);
    }

    /**
     * Create a single instance and add it to the registry
     */
    private createInstance(options: TsLibraryOptions): TsLibrary {
        const instance = new TsLibrary(options);
        this.add(instance);
        return instance;
    }

    /**
     * Add an instance to the registry
     */
    private add(instance: TsLibrary): void {
        this.instances.push(instance);
    }

    /**
     * Get a component instance by ID
     */
    public get(id: string): TsLibrary | undefined {
        return this.instances.find(instance => instance.id === id);
    }

    /**
     * Get all component instances
     */
    public getAll(): TsLibrary[] {
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

// Window interface augmentation
declare global {
    interface Window {
        TsLibrary: {
            create: (options?: TsLibraryOptions) => TsLibrary;
            get: (id: string) => TsLibrary | undefined;
            getAll: () => TsLibrary[];
            destroy: (id: string) => boolean;
            destroyAll: () => void;
            init: (options?: TsLibraryOptions) => void;
        };
    }
}

// Initialize the global object
if (typeof window !== 'undefined') {
    const controller = new TsLibraryController();

    window.TsLibrary = {
        // Create a new component instance
        create: (options: TsLibraryOptions = {}): TsLibrary => controller.create(options),

        // Get a component by ID
        get: (id: string): TsLibrary | undefined => controller.get(id),

        // Get all component instances
        getAll: (): TsLibrary[] => controller.getAll(),

        // Destroy a specific component instance
        destroy: (id: string): boolean => controller.destroy(id),

        // Destroy all component instances
        destroyAll: (): void => controller.destroyAll(),

        // Initialize components on page load (backward compatibility)
        init: (options: TsLibraryOptions = {}): void => {
            // Default initialization using a selector
            const selector = options.selector || '.ts-component';
            controller.create({ ...options, selector });
        }
    };

    // Auto-initialization on DOMContentLoaded (optional)
    document.addEventListener('DOMContentLoaded', () => {
        // Auto-initialize elements with data-ts-component attribute
        document.querySelectorAll('[data-ts-component]').forEach(el => {
            // Parse data attributes as options
            const dataOptions = Array.from(el.attributes)
                .filter(attr => attr.name.startsWith('data-ts-'))
                .reduce((acc, attr) => {
                    const key = attr.name.replace('data-ts-', '');
                    acc[key] = attr.value;
                    return acc;
                }, {} as Record<string, string>);

            // Convert string values to appropriate types
            const parsedOptions: Record<string, any> = {};
            Object.entries(dataOptions).forEach(([key, value]) => {
                if (value === 'true') parsedOptions[key] = true;
                else if (value === 'false') parsedOptions[key] = false;
                else if (!isNaN(Number(value))) parsedOptions[key] = Number(value);
                else parsedOptions[key] = value;
            });

            window.TsLibrary.create({
                el: el as HTMLElement,
                ...parsedOptions
            });
        });
    });
}

// Export for module usage
export default TsLibrary;
export const createTsLibrary = (options: TsLibraryOptions = {}): TsLibrary => {
    if (typeof window !== 'undefined') {
        return window.TsLibrary.create(options);
    }
    return new TsLibrary(options);
};