#!/usr/bin/env bash
ng build --prod --aot
aws s3 cp ./dist s3://fishtankiot --recursive
