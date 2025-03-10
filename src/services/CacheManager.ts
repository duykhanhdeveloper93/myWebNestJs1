import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RCacheManager {
    constructor(
        @Inject(CACHE_MANAGER) 
        private readonly cacheManager: Cache) {}

    subStore() {
        return this.cacheManager.store;
    }

    set(key: string, value: unknown, options?: any) {
        return this.cacheManager.set(key, value, options);
    }

    get(key: string) {
        return this.cacheManager.get(key);
    }

    async getAndSet(key: string, value: unknown, options?: any) {
        const hasKey = !!(await this.get(key));
        if (!hasKey) {
            await this.set(key, value, options);
        }
        return value;
    }

    delete(key: string) {
        return this.cacheManager.del(key);
    }

    /**
     * Delete mutiple keys with pattern
     * @param keyPattern - Ex: key:* <=> key:1 key:2 key:3
     * @returns
     */
    async deleteKeys(keyPattern: string) {
        const keys : any = await this.getKeys(keyPattern);
        try {
            const results = await this.cacheManager.store.del(keys);
            return results;
            // eslint-disable-next-line no-empty
        } catch {}
    }
    /**
     * Get mutiple keys with pattern
     * @param key - explicit value or implicit value. Ex: key:* <=> key:1 key:2 key:3
     */
    async getKeys(key: string) {
        try {
            const value = await this.cacheManager.store.keys(key);
            return value;
            // eslint-disable-next-line no-empty
        } catch {}
    }
}
