// package: myarray
// file: array.proto

import * as jspb from "google-protobuf";

export class ArrData extends jspb.Message {
  getArrId(): number;
  setArrId(value: number): void;

  getTitle(): string;
  setTitle(value: string): void;

  getDesc(): string;
  setDesc(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ArrData.AsObject;
  static toObject(includeInstance: boolean, msg: ArrData): ArrData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ArrData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ArrData;
  static deserializeBinaryFromReader(message: ArrData, reader: jspb.BinaryReader): ArrData;
}

export namespace ArrData {
  export type AsObject = {
    arrId: number,
    title: string,
    desc: string,
  }
}

export class SaveArrListReq extends jspb.Message {
  getArrId(): number;
  setArrId(value: number): void;

  clearArrListList(): void;
  getArrListList(): Array<ArrData>;
  setArrListList(value: Array<ArrData>): void;
  addArrList(value?: ArrData, index?: number): ArrData;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SaveArrListReq.AsObject;
  static toObject(includeInstance: boolean, msg: SaveArrListReq): SaveArrListReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SaveArrListReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SaveArrListReq;
  static deserializeBinaryFromReader(message: SaveArrListReq, reader: jspb.BinaryReader): SaveArrListReq;
}

export namespace SaveArrListReq {
  export type AsObject = {
    arrId: number,
    arrListList: Array<ArrData.AsObject>,
  }
}

export class SaveArrListRes extends jspb.Message {
  getCode(): number;
  setCode(value: number): void;

  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SaveArrListRes.AsObject;
  static toObject(includeInstance: boolean, msg: SaveArrListRes): SaveArrListRes.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SaveArrListRes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SaveArrListRes;
  static deserializeBinaryFromReader(message: SaveArrListRes, reader: jspb.BinaryReader): SaveArrListRes;
}

export namespace SaveArrListRes {
  export type AsObject = {
    code: number,
    message: string,
  }
}

