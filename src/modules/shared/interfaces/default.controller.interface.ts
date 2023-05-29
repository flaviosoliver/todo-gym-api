export interface IDefaultController<T> {
  create: (doc: T) => Promise<T>;
  getAll: () => Promise<T[]>;
  getByField: (field: any) => Promise<T>;
  update: (id: string, doc: T) => Promise<void>;
  delete: (id: string) => Promise<void>;
}
