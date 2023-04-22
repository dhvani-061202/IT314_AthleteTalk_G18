// Test for checking if an API call returns data where token is valid

test('API call returns users data', async () => {
  const res = await fetch(`http://localhost:3000/api/users`, {
    method: 'GET',
    headers: {
      authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmY3MjkwY2MzZmYwZTM0ZTgyYWQ5YyIsImlhdCI6MTY4MDcxMDE4NCwiZXhwIjoxNjg4NDg2MTg0fQ.Svs6jJyMfgoRqLSwIHDJzOiqLKodfwJGc5xJDK1R_vE`,
    },
  });
  const responseData = await res.json();
  expect(responseData).toBeDefined();
  expect(responseData.users.length).toBeGreaterThan(0);
});

// Test for checking if an API call returns data with invalid token

test('API call returns users data', async () => {
  const res = await fetch(`http://localhost:3000/api/users`, {
    method: 'GET',
    headers: {
      authorization: `Bearer bogusToken`,
    },
  });
  const responseData = await res.json();
  expect(responseData.status).toBe('error');
});
