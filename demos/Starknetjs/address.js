const starknet = require('starknet');


function getChecksumAddress(address) {
    return starknet.getChecksumAddress(address);
}

module.exports = {
    getChecksumAddress,
}