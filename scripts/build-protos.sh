#!/bin/bash

PROTO_DEST=./src/proto

# Path to this plugin
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"


mkdir -p ${PROTO_DEST}

protoc  --proto_path=./proto \
        --plugin=protoc-gen-ts=${PROTOC_GEN_TS_PATH} \
        --js_out=import_style=commonjs,binary:${PROTO_DEST}  \
        --ts_out="${PROTO_DEST}" \
        proto/*.proto


protoc  --proto_path=./proto \
        --plugin=protoc-gen-ts=${PROTOC_GEN_TS_PATH} \
        --ts_out="service=grpc-web:${PROTO_DEST}" \
        proto/*.proto

