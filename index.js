const ipv4 = require('deep-ipv4')

module.exports = function () {
  if (!ipv4) {
    console.log('Cannot find an IPv4 address')
    return false
  }

  const cipher = 'ertyuidfghjxcvbn'
  const ipv4Blocks = ipv4.split('.')
  let passcode

  function encode (blocks) {
    let characters = []
    blocks.forEach(block => {
      let blockHex = parseInt(block, 10).toString(16)
      blockHex = blockHex.length < 2 ? '0' + blockHex : blockHex
      blockHex = blockHex.split('')
      blockHex.forEach(character => {
        characters.push(cipher[parseInt(character, 16)])
      })
    })
    passcode = characters.join('')
  }

  if (ipv4Blocks[0] === '172') {
    const decimalBlock = ipv4Blocks[1]
    if (decimalBlock >= 16 && decimalBlock <= 31) {
      characters.push(cipher[decimalBlock - 16])
      encode(ipv4Blocks.slice(2, ipv4Blocks.length))
    }
    return false
  } else {
    if (ipv4Blocks[0] === '192') {
      encode(ipv4Blocks.slice(2, ipv4Blocks.length))
    } else {
      encode(ipv4Blocks.slice(1, ipv4Blocks.length))
    }
  }

  return passcode
}()
