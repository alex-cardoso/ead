const NodeCache = require('node-cache');

class Cache {
    constructor() {
        this.cache = new NodeCache({
            stdTTL: 10800000,
            checkperiod: this.period || 160,
            useClones: false,
        });
    }

    get(key) {
        return this.cache.get(key);
    }

    has(key) {
        return this.cache.has(key);
    }

    set(key, value, period = 1800) {
        this.period = period;
        this.cache.set(key, value);
    }

    del(key) {
        this.cache.del(key);
    }
}

module.exports = new Cache();
