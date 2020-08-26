import asyncRedis from "async-redis";

class RedisWrapper {
  private _client?: any;

  get client() {
    if (!this._client) {
      throw new Error("Cannot access Redis client before connecting");
    }

    return this._client;
  }

  connect(url?: string, port?: string) {
    if (url && port) {
      this._client = asyncRedis.createClient({host: url, port: port});
    } else {
      this._client = asyncRedis.createClient();
    }

    return new Promise((resolve, reject) => {
      this.client.on("connect", () => {
        console.log("Connected to Redis");
        resolve();
      });
      this.client.on("error", (err) => {
        reject(err);
      });
    });
  }
}

export const redisWrapper = new RedisWrapper();
