// package: mypost
// file: post.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class PostRow extends jspb.Message {
  getPostId(): number;
  setPostId(value: number): void;

  getPostPath(): string;
  setPostPath(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PostRow.AsObject;
  static toObject(includeInstance: boolean, msg: PostRow): PostRow.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PostRow, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PostRow;
  static deserializeBinaryFromReader(message: PostRow, reader: jspb.BinaryReader): PostRow;
}

export namespace PostRow {
  export type AsObject = {
    postId: number,
    postPath: string,
  }
}

export class Post extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getTitle(): string;
  setTitle(value: string): void;

  getCatName(): string;
  setCatName(value: string): void;

  hasLogName(): boolean;
  clearLogName(): void;
  getLogName(): string;
  setLogName(value: string): void;

  hasPostProperty(): boolean;
  clearPostProperty(): void;
  getPostProperty(): PostRow | undefined;
  setPostProperty(value?: PostRow): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Post.AsObject;
  static toObject(includeInstance: boolean, msg: Post): Post.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Post, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Post;
  static deserializeBinaryFromReader(message: Post, reader: jspb.BinaryReader): Post;
}

export namespace Post {
  export type AsObject = {
    id: number,
    title: string,
    catName: string,
    logName: string,
    postProperty?: PostRow.AsObject,
  }
}

export class PostList extends jspb.Message {
  clearItemsListList(): void;
  getItemsListList(): Array<Post>;
  setItemsListList(value: Array<Post>): void;
  addItemsList(value?: Post, index?: number): Post;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PostList.AsObject;
  static toObject(includeInstance: boolean, msg: PostList): PostList.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PostList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PostList;
  static deserializeBinaryFromReader(message: PostList, reader: jspb.BinaryReader): PostList;
}

export namespace PostList {
  export type AsObject = {
    itemsListList: Array<Post.AsObject>,
  }
}

export class FilterId extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FilterId.AsObject;
  static toObject(includeInstance: boolean, msg: FilterId): FilterId.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FilterId, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FilterId;
  static deserializeBinaryFromReader(message: FilterId, reader: jspb.BinaryReader): FilterId;
}

export namespace FilterId {
  export type AsObject = {
    id: number,
  }
}

