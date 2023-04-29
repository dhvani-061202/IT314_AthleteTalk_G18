test('API call for creating a new user', async () => {
  const res = await fetch(`http://localhost:3000/api/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Test User',
      email: `newuser${Math.round(Math.random() * 100)}@gmail.com`,
      password: `123@Password$`,
      passwordConfirm: `123@Password$`,
      role: 'user',
    }),
  });

  const responseData = await res.json();
  expect(responseData).toBeDefined();
  expect(responseData.token).toBeDefined();
});

// signup with bogus data
test('API call for creating a new user', async () => {
  const res = await fetch(`http://localhost:3000/api/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Test User',
      email: `bogusemail.com`,
      password: `123`,
      passwordConfirm: `123`,
      role: 'not a role',
    }),
  });

  const responseData = await res.json();
  expect(responseData).toBeDefined();
  expect(responseData.status).toBe('error');
});
