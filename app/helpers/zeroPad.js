/**
 * Pads a string value with leading zeroes until length is reached
 * ? Example: zeroPad(8, 3) => "008"
 * @param {String|Number} value 
 * @param {Number} length 
 * @returns {String}
 */
const zeroPad = (value, length = 2) => `${value}`.padStart(length, '0')
export default zeroPad
