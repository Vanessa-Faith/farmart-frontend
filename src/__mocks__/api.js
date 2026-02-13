// Mock API for testing
const API_URL = import.meta.env.VITE_API_URL;
const username = "testuser";
const password = "test123";
fetch(`${API_URL}/login`, {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({username, password})
})
  .then(res => res.json())
  .then(data => console.log(data));

const mockApi = {
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} })),
  interceptors: {
    request: {
      use: jest.fn(),
    },
    response: {
      use: jest.fn(),
    },
  },
};

export default mockApi;
