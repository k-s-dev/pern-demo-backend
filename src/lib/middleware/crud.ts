import type { RequestHandler } from "express";

export interface ICRUD {
  list: <GDataOut>(limit: number, page: number) => Promise<GDataOut[]>;
  create: <GDataIn, GDataOut>(data: GDataIn) => Promise<GDataOut>;
  getById: <GDataOut>(id: string) => Promise<GDataOut>;
  patchById: <GDataIn, GDataOut>(
    id: string,
    data: GDataIn,
  ) => Promise<GDataOut>;
  putById: <GDataIn, GDataOut>(id: string, data: GDataIn) => Promise<GDataOut>;
  deleteById: <GDataOut>(id: string) => Promise<GDataOut>;
}

export abstract class CRUD {
  abstract create: RequestHandler;
  abstract list: RequestHandler;
  abstract getById: RequestHandler;
  abstract updateByIdPatch: RequestHandler;
  abstract updateByIdPut: RequestHandler;
  abstract deleteById: RequestHandler;
}

export abstract class CRUD_SERVICE {
  abstract create<GDataIn, GDataOut>(data: GDataIn): Promise<GDataOut>;
  abstract list<GDataOut>(limit: number, page: number): Promise<GDataOut[]>;
  abstract readById<GDataOut>(id: string): Promise<GDataOut>;
  abstract updatePatchById<GDataIn, GDataOut>(
    id: string,
    data: GDataIn,
  ): Promise<GDataOut>;
  abstract updatePutById<GDataIn, GDataOut>(
    id: string,
    data: GDataIn,
  ): Promise<GDataOut>;
  abstract deleteById<GDataOut>(id: string): Promise<GDataOut>;
}
