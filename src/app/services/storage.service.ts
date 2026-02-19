import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private _ready: Promise<void>;

  constructor(private storage: Storage) {
    this._ready = this.init();
  }

  private async init(): Promise<void> {
    this._storage = await this.storage.create();
  }

  private async ensureReady(): Promise<void> {
    await this._ready;
  }

  async set(key: string, value: any): Promise<void> {
    await this.ensureReady();
    await this._storage?.set(key, value);
  }

  async get(key: string): Promise<any> {
    await this.ensureReady();
    return await this._storage?.get(key);
  }

  async remove(key: string): Promise<void> {
    await this.ensureReady();
    await this._storage?.remove(key);
  }

  async clear(): Promise<void> {
    await this.ensureReady();
    await this._storage?.clear();
  }

  async keys(): Promise<string[]> {
    await this.ensureReady();
    return await this._storage?.keys() || [];
  }
}
