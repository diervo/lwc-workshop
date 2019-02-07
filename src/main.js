/**
 * NOTE: THIS IS FOR DIDACTIC PURPOSES ONLY
 * READ THE OFFICIAL DOCUMENTATION TO FULLY UNDERSTANDING ALL THIS CONCEPTS
 *
 * There are 3 options to initialize this LWC application:
 *
 * Option 1:
 * Uses proprietary APIs `lwc.createElement` to create elements. Uses a synthetic Shadow DOM.
 * - customElementRegistry: false
 * - useNativeShadow: false
 *
 * Option 2:
 * Uses proprietary APIs `lwc.createElement` to create elements. Uses native Shadow DOM.
 * - customElementRegistry: false
 * - useNativeShadow: true
 *
 * Options 3:
 * Uses native CustomElementRegistry and native Shadow DOM.
 * - customElementRegistry: true
 * - useNativeShadow: true
 */

import App from "todo/app";
import { createElement, buildCustomElementConstructor } from "lwc";

const useNativeShadow = LWC_USE_NATIVE_SHADOW === 'enabled';
const useCustomElementRegistry = LWC_CUSTOM_ELEMENT_REGISTRY === 'enabled';
const fullWebComponent = useNativeShadow && useCustomElementRegistry;

if (useCustomElementRegistry) {
    customElements.define('todo-app', buildCustomElementConstructor(App));
}

const element = fullWebComponent
    ? document.createElement("todo-app")
    : createElement("todo-app", { is: App, fallback: !useNativeShadow });

// eslint-disable-next-line @lwc/lwc/no-document-query
const container = document.getElementById("main");
container.appendChild(element);
