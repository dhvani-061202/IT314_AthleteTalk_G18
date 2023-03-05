export const server =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://se-project-test.vercel.app';
