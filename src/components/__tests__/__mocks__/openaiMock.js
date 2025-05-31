const mockChatCompletionsCreate = jest.fn();

const openai = {
  chat: {
    completions: {
      create: mockChatCompletionsCreate,
    },
  },
};

// Helper to reset the mock before each test if needed, or access the mock
openai.mockChatCompletionsCreate = mockChatCompletionsCreate;

export default openai;
