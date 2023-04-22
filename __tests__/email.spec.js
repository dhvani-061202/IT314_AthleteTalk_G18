const { isEmail, isPassword } = require('../utils/checker');

// a test for checking if email is valid
describe('Email Validation', () => {
  it('should return true for valid email', () => {
    const validEmails = [
      'test@example.com',
      'user123@gmail.com',
      'john.doe@hotmail.com',
      'jane_doe@yahoo.co.uk',
      'testuser+test@gmail.com',
      '1234testuser@mail.com',
      'test-user@subdomain.domain.com',
      'user1234@my-domain.net',
      'john.doe@company.io',
      'jane.doe@my-company.com',
    ];

    validEmails.forEach((email) => {
      expect(isEmail(email)).toBeTruthy();
    });

    const invalidEmails = [
      'test@example',
      'user123@gmail',
      'john.doe@hotmail',
      'jane_doe@yahoo',
      'test@',
      'test@@example.com',
      'test@123.456.789.10',
      'test@exa!mple.com',
    ];

    invalidEmails.forEach((email) => {
      expect(isEmail(email)).toBeFalsy();
    });
  });
});
