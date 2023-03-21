const CHAR_SET = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const MIN_LENGTH = 6;
const MAX_LENGTH = 32;

function getRandomInt(min, max) {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt) + minInt);
}

function randomPassword(min, max) {
  const minLength = min || MIN_LENGTH;
  const maxLength = max || MAX_LENGTH;
  const length = getRandomInt(minLength, maxLength + 1);
  let password = '';

  for (let i = 0; i <= length; i += 1) {
    const randomNumber = Math.floor(Math.random() * CHAR_SET.length);
    password += CHAR_SET.substring(randomNumber, randomNumber + 1);
  }
  return password;
}

module.exports = { getRandomInt, randomPassword };
