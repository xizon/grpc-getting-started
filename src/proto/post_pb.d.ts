// package: mypost
// file: post.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class Post extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getTitle(): string;
  setTitle(value: string): void;

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
  }
}

export class PostList extends jspb.Message {
  clearItemsList(): void;
  getItemsList(): Array<Post>;
  setItemsList(value: Array<Post>): void;
  addItems(value?: Post, index?: number): Post;

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
    itemsList: Array<Post.AsObject>,
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

