#!/bin/bash

PROTO_DEST=./src/proto

mkdir -p ${PROTO_DEST}

protoc  --proto_path=./proto \
        --js_out=import_style=commonjs,binary:${PROTO_DEST}  \
        proto/*.proto


protoc  --proto_path=./proto \
        --grpc-web_out=import_style=commonjs,mode=grpcwebtext:${PROTO_DEST}  \
        proto/*.proto

