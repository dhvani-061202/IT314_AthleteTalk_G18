// logging in with valid credentials
test('API call for logging in a user with valid token', async () => {
  const res = await fetch(`http://localhost:3000/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'newuser27@gmail.com',
      password: '123@Password$',
    }),
  });

  const responseData = await res.json();
  expect(responseData).toBeDefined();
  expect(responseData.token).toBeDefined();
});

// logging in with bogus credentials
test('API call for logging in a user with valid token', async () => {
  const res = await fetch(`http://localhost:3000/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'randomguy@nodomain.com',
      password: '12345688',
    }),
  });

  const responseData = await res.json();
  expect(responseData).toBeDefined();
  expect(responseData.status).toBe('fail');
});
