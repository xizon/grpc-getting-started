// package: hello
// file: example.proto

import * as example_pb from "./example_pb";
import {grpc} from "@improbable-eng/grpc-web";

type HelloServiceGetHelloReq = {
  readonly methodName: string;
  readonly service: typeof HelloService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof example_pb.HelloRequest;
  readonly responseType: typeof example_pb.HelloResponse;
};

export class HelloService {
  static readonly serviceName: string;
  static readonly GetHelloReq: HelloServiceGetHelloReq;
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

export class HelloServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getHelloReq(
    requestMessage: example_pb.HelloRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: example_pb.HelloResponse|null) => void
  ): UnaryResponse;
  getHelloReq(
    requestMessage: example_pb.HelloRequest,
    callback: (error: ServiceError|null, responseMessage: example_pb.HelloResponse|null) => void
  ): UnaryResponse;
}

