import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { StorageService } from './storage.service';

const CATEGORIES_KEY = 'categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private storageService: StorageService) {}

  async getCategories(): Promise<Category[]> {
    const categories = await this.storageService.get(CATEGORIES_KEY);
    return categories || [];
  }

  async getCategory(id: string): Promise<Category | undefined> {
    const categories = await this.getCategories();
    return categories.find(c => c.id === id);
  }

  async createCategory(category: Omit<Category, 'id' | 'createdAt'>): Promise<Category> {
    const categories = await this.getCategories();
    const newCategory: Category = {
      ...category,
      id: this.generateId(),
      createdAt: new Date()
    };
    categories.push(newCategory);
    await this.storageService.set(CATEGORIES_KEY, categories);
    return newCategory;
  }

  async updateCategory(id: string, updates: Partial<Category>): Promise<Category> {
    const categories = await this.getCategories();
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Category not found');
    }
    categories[index] = { ...categories[index], ...updates };
    await this.storageService.set(CATEGORIES_KEY, categories);
    return categories[index];
  }

  async deleteCategory(id: string): Promise<void> {
    const categories = await this.getCategories();
    const filtered = categories.filter(c => c.id !== id);
    await this.storageService.set(CATEGORIES_KEY, filtered);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
