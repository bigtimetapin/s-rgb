#!/usr/bin/env zsh

aws s3 sync ./target/deploy/ s3://rgb.industries-solana-program-deployer/target/deploy/ --profile s-rgb
