const { isPassword } = require('../utils/checker');

// a test for checking if password is in proper format
describe('Password Validation', () => {
  it('should return true for valid password', () => {
    const validPasswords = [
      'Abcdefg1!',
      'HjkloP5@',
      'Qrstuv7#',
      'WxyZ123$',
      'Abcdefg1!',
      'MnbvCxz3$',
      'PoiuytR2!',
    ];

    validPasswords.forEach((password) => {
      expect(isPassword(password)).toBeTruthy();
    });

    const invalidPasswords = [
      'abcdefg1',
      'ABCDEFG1',
      'abcdefg',
      'ABCDEFGH',
      '12345678',
      '123456789',
    ];

    invalidPasswords.forEach((password) => {
      expect(isPassword(password)).toBeFalsy();
    });
  });
});
