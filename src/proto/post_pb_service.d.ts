// package: mypost
// file: post.proto

import * as post_pb from "./post_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import {grpc} from "@improbable-eng/grpc-web";

type PostServiceGetPost = {
  readonly methodName: string;
  readonly service: typeof PostService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof post_pb.PostList;
};

type PostServiceAddPost = {
  readonly methodName: string;
  readonly service: typeof PostService;
  readonly requestStream: true;
  readonly responseStream: false;
  readonly requestType: typeof post_pb.Post;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type PostServiceFindId = {
  readonly methodName: string;
  readonly service: typeof PostService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof post_pb.FilterId;
  readonly responseType: typeof post_pb.PostList;
};

export class PostService {
  static readonly serviceName: string;
  static readonly GetPost: PostServiceGetPost;
  static readonly AddPost: PostServiceAddPost;
  static readonly FindId: PostServiceFindId;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class PostServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getPost(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: post_pb.PostList|null) => void
  ): UnaryResponse;
  getPost(
    requestMessage: google_protobuf_empty_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: post_pb.PostList|null) => void
  ): UnaryResponse;
  addPost(metadata?: grpc.Metadata): RequestStream<post_pb.Post>;
  findId(requestMessage: post_pb.FilterId, metadata?: grpc.Metadata): ResponseStream<post_pb.PostList>;
}

