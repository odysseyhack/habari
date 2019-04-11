#!/bin/sh
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
#export PATH=$GOPATH/src/github.com/hyperledger/fabric/build/bin:${PWD}/bin:${PWD}:$PATH
export FABRIC_CFG_PATH=${PWD}
CHANNEL_NAME1=mychannel

# remove previous crypto material and config transactions
rm -rf config/*
rm -rf crypto-config/*

mkdir -p config

# generate crypto material
network/shared/bin/cryptogen generate --config=crypto-config.yaml
if [[ "$?" -ne 0 ]]; then
  echo "Failed to generate crypto material..."
  exit 1
fi

# generate genesis block for orderer
network/shared/bin/configtxgen -profile OneOrgOrdererGenesis -outputBlock ./config/genesis.block
if [[ "$?" -ne 0 ]]; then
  echo "Failed to generate orderer genesis block..."
  exit 1
fi

# generate first channel configuration transaction
network/shared/bin/configtxgen -profile OneOrgChannel -outputCreateChannelTx ./config/channel.tx -channelID $CHANNEL_NAME1
if [[ "$?" -ne 0 ]]; then
  echo "Failed to generate channel1 configuration transaction..."
  exit 1
fi

# generate anchor peer transaction
network/shared/bin/configtxgen -profile OneOrgChannel -outputAnchorPeersUpdate ${basicNetworkDir}/config/Org1MSPanchors.tx -channelID $CHANNEL_NAME1 -asOrg Org1MSP
if [ "$?" -ne 0 ]; then
  echo "Failed to generate anchor peer update for Org1MSP..."
  exit 1
fi