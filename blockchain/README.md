# MIMEA Blockchain Network
peer channel signconfigtx -f /etc/hyperledger/configtx/channel.tx
peer channel create -o orderer.example.com:7050 -c mychannel -f /etc/hyperledger/configtx/channel.tx