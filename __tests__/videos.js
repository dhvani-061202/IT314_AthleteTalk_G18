test('API call returns video data', async () => {
  const res = await fetch(`http://localhost:3000/api/videos`, {
    method: 'GET',
    headers: {
      authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmY3MjkwY2MzZmYwZTM0ZTgyYWQ5YyIsImlhdCI6MTY4MDcxMDE4NCwiZXhwIjoxNjg4NDg2MTg0fQ.Svs6jJyMfgoRqLSwIHDJzOiqLKodfwJGc5xJDK1R_vE`,
    },
  });
  const responseData = await res.json();
  expect(responseData).toBeDefined();
  expect(responseData.results).toBeGreaterThan(0);
});

// calling the some other api endpoint
test('API call returns video data', async () => {
  const res = await fetch(`http://localhost:3000/api/myvideos/videos`, {
    method: 'GET',
    headers: {
      authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmY3MjkwY2MzZmYwZTM0ZTgyYWQ5YyIsImlhdCI6MTY4MDcxMDE4NCwiZXhwIjoxNjg4NDg2MTg0fQ.Svs6jJyMfgoRqLSwIHDJzOiqLKodfwJGc5xJDK1R_vE`,
    },
  });
  expect(res.ok).toBeFalsy();
});
