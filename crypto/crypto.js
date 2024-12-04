const crypto = require('crypto');

// function generateResetToken() {
//     return crypto.randomBytes(32).toString('hex'); // 64-character random token
// }

// const resetToken = generateResetToken();
// console.log(`Reset Token: ${resetToken}`);

const randomValue = crypto.randomBytes(32)
console.log(randomValue.toString("hex"))

//* crypto.createHash(algorithm)



const hash = crypto.createHash("sha256").update("codesnippet").digest("hex")

console.log(hash);