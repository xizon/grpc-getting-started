#!/bin/bash

PROTO_DEST=./hello

mkdir -p ${PROTO_DEST}

protoc  --proto_path=./proto \
        --js_out=import_style=commonjs,binary:${PROTO_DEST}  \
        proto/example.proto
