#!/usr/bin/env bash

BUCKET=s3://rgb.industries

echo "Building Elm Assets..."
./build.sh

## echo "Building Sass Assets"
## cd web/sass && (npm run build)
## cd ..
##
## echo "Building JS Assets"
## cd js && (npm run build)
## cd ../..

echo "Publishing New Assets..."
## aws s3 sync web/images/ $BUCKET/images/ --profile s-rgb
aws s3 cp web/index.html $BUCKET --profile s-rgb
aws s3 cp web/elm.min.js $BUCKET --profile s-rgb
aws s3 cp web/css/ $BUCKET/css/ --recursive --profile s-rgb
aws s3 cp web/logo/ $BUCKET/logo/ --recursive --profile s-rgb
aws s3 cp web/svg/ $BUCKET/svg/ --recursive --profile s-rgb
aws s3 cp web/js/bundle.js $BUCKET/js/ --profile s-rgb

## echo "Invalidating CloudFront Cache..."
aws cloudfront create-invalidation --distribution-id EJCQDZWYPAS9C --paths "/*" --profile s-rgb
