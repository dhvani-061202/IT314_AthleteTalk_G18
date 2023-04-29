// updating chatName with valid chatId and valid token
test('should check update chat name API', async () => {
  const res = await fetch(`http://localhost:3000/api/chat/rename`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmY3MjkwY2MzZmYwZTM0ZTgyYWQ5YyIsImlhdCI6MTY4MDcxMDE4NCwiZXhwIjoxNjg4NDg2MTg0fQ.Svs6jJyMfgoRqLSwIHDJzOiqLKodfwJGc5xJDK1R_vE`,
    },
    body: JSON.stringify({
      chatId: '64393739d88cc41d92b96b56',
      chatName: 'myNewChatName',
    }),
  });
  const responseData = await res.json();
  expect(responseData).toBeDefined();
  expect(responseData.status).toBe('success');
  expect(responseData.data.chat.chatName).toBe('myNewChatName');
});

// updating chatName with bogus chatId
test('should check update chat name API', async () => {
  const res = await fetch(`http://localhost:3000/api/chat/rename`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmY3MjkwY2MzZmYwZTM0ZTgyYWQ5YyIsImlhdCI6MTY4MDcxMDE4NCwiZXhwIjoxNjg4NDg2MTg0fQ.Svs6jJyMfgoRqLSwIHDJzOiqLKodfwJGc5xJDK1R_vE`,
    },
    body: JSON.stringify({
      chatId: 'noChatWithThisId',
      chatName: 'myNewChatName',
    }),
  });
  const responseData = await res.json();
  expect(responseData).toBeDefined();
  expect(responseData.status).toBe('error');
});
