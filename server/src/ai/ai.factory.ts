import { AIService } from './ai.interface';
import { OllamaService } from './ollama.service';
import { FallbackService } from './fallback.service';

export class AIFactory {
  private static instance: AIService;

  public static getService(): AIService {
    if (!this.instance) {
      const ollama = new OllamaService();
      const fallback = new FallbackService();

      this.instance = new Proxy(ollama, {
        get(target, propKey, receiver) {
          const origMethod = Reflect.get(target, propKey, receiver);
          if (typeof origMethod === 'function') {
            return async function (...args: any[]) {
              try {
                return await origMethod.apply(target, args);
              } catch (err: any) {
                console.log(`[AIFactory] Ollama unavailable (${err?.message || err}). Falling back to Smart Concierge AI Engine.`);
                const fallbackMethod = (fallback as any)[propKey];
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
