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
export class BoilerplateInstance {
    id: string;
    options: BoilerplateOptions;

    constructor(options: BoilerplateOptions = {}) {
        this.id = crypto.randomUUID();

        // Set debug based on environment
        const isDevMode = process.env.NODE_ENV !== 'production';

        this.options = {
            debug: isDevMode,
            ...options
        };

        if (this.options.debug) {
            console.log(`Boilerplate ${this.id} initialized with options`, this.options);
        }
    }

    /**
     * Update component with new options
     */
    public update(newOptions: Partial<BoilerplateOptions>): this {
        this.options = { ...this.options, ...newOptions };

        if (this.options.debug) {
            console.log(`Boilerplate ${this.id} updated with new options`, newOptions);
        }

        return this;
    }

    /**
     * Destroy this instance and clean up resources
     */
    public destroy(): void {
        // Cleanup logic (no DOM cleanup needed)

        if (this.options.debug) {
            console.log(`Boilerplate ${this.id} destroyed`);
        }
    }
}