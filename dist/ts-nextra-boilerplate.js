
/**!
 * TypeScript Nextra Boilerplate v1.0.0
 * @author undefined
 * @homepage https://github.com/phucbm/ts-nextra-boilerplate
 * @license MIT 2025
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Boilerplate: () => (/* binding */ Boilerplate),
  BoilerplateInstance: () => (/* reexport */ BoilerplateInstance),
  "default": () => (/* binding */ _index)
});

;// ./src/instance.ts
/**
 * Boilerplate class - Core implementation of the feature
 */
class BoilerplateInstance {
    constructor(options = {}) {
        this.id = crypto.randomUUID();
        // Set debug based on environment
        const isDevMode = "production" !== 'production';
        this.options = Object.assign({ debug: isDevMode }, options);
        if (this.options.debug) {
            console.log(`Boilerplate ${this.id} initialized with options`, this.options);
        }
    }
    /**
     * Update component with new options
     */
    update(newOptions) {
        this.options = Object.assign(Object.assign({}, this.options), newOptions);
        if (this.options.debug) {
            console.log(`Boilerplate ${this.id} updated with new options`, newOptions);
        }
        return this;
    }
    /**
     * Destroy this instance and clean up resources
     */
    destroy() {
        // Cleanup logic (no DOM cleanup needed)
        if (this.options.debug) {
            console.log(`Boilerplate ${this.id} destroyed`);
        }
    }
}

;// ./src/controller.ts

/**
 * Controller class to manage all instances
 */
class BoilerplateController {
    constructor() {
        this.instances = [];
    }
    /**
     * Create a new instance
     */
    create(options = {}) {
        const instance = new BoilerplateInstance(options);
        this.add(instance);
        return instance;
    }
    /**
     * Add an instance to the registry
     */
    add(instance) {
        this.instances.push(instance);
    }
    /**
     * Get a component instance by ID
     */
    get(id) {
        return this.instances.find(instance => instance.id === id);
    }
    /**
     * Get all component instances
     */
    getAll() {
        return [...this.instances];
    }
    /**
     * Destroy a specific component instance
     */
    destroy(id) {
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
    destroyAll() {
        this.instances.forEach(instance => instance.destroy());
        this.instances = [];
    }
}

;// ./src/_index.ts
/**
 * @file Boilerplate - Generic boilerplate for TypeScript-based utility libraries
 * This can be adapted for any feature that doesn't require DOM manipulation
 */


// Create a singleton controller instance
const controller = new BoilerplateController();
// Initialize the global object
if (typeof window !== 'undefined') {
    window.Boilerplate = controller;
}

// Export for module usage
const Boilerplate = controller;
/* harmony default export */ const _index = (controller);

/******/ 	return __webpack_exports__;
/******/ })()
;
});