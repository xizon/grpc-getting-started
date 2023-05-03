// package: myarray
// file: array.proto

import * as array_pb from "./array_pb";
import {grpc} from "@improbable-eng/grpc-web";

type ArrayServiceSaveArrList = {
  readonly methodName: string;
  readonly service: typeof ArrayService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof array_pb.SaveArrListReq;
  readonly responseType: typeof array_pb.SaveArrListRes;
};

export class ArrayService {
  static readonly serviceName: string;
  static readonly SaveArrList: ArrayServiceSaveArrList;
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

export class ArrayServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  saveArrList(
    requestMessage: array_pb.SaveArrListReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: array_pb.SaveArrListRes|null) => void
  ): UnaryResponse;
  saveArrList(
    requestMessage: array_pb.SaveArrListReq,
    callback: (error: ServiceError|null, responseMessage: array_pb.SaveArrListRes|null) => void
  ): UnaryResponse;
}

