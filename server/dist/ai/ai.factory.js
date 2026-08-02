"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIFactory = void 0;
const ollama_service_1 = require("./ollama.service");
const fallback_service_1 = require("./fallback.service");
class AIFactory {
    static instance;
    static getService() {
        if (!this.instance) {
            const ollama = new ollama_service_1.OllamaService();
            const fallback = new fallback_service_1.FallbackService();
            this.instance = new Proxy(ollama, {
                get(target, propKey, receiver) {
                    const origMethod = Reflect.get(target, propKey, receiver);
                    if (typeof origMethod === 'function') {
                        return async function (...args) {
                            try {
                                return await origMethod.apply(target, args);
                            }
                            catch (err) {
                                console.log(`[AIFactory] Ollama unavailable (${err?.message || err}). Falling back to Smart Concierge AI Engine.`);
                                const fallbackMethod = fallback[propKey];
                                if (typeof fallbackMethod === 'function') {
                                    return await fallbackMethod.apply(fallback, args);
                                }
                            }
                        };
                    }
                    return origMethod;
                },
            });
        }
        return this.instance;
    }
}
exports.AIFactory = AIFactory;
