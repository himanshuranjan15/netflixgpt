import { jest } from '@jest/globals'; // Ensure Jest's globals are available

export const useAppSelector = jest.fn();
export const useAppDispatch = jest.fn();

// You can provide a default mock implementation for useAppDispatch
// if you want it to return a mock dispatch function automatically.
// Otherwise, tests will need to mock its return value if the dispatch
// function itself is called within the component.
const mockDispatch = jest.fn();
useAppDispatch.mockReturnValue(mockDispatch);

// Helper to reset mocks (though Jest's clearMocks: true should also handle this)
export const mockClear = () => {
  useAppSelector.mockClear();
  useAppDispatch.mockClear();
  mockDispatch.mockClear();
};

// Helper to set a specific return value for useAppSelector for a test
export const mockSelector = (state) => {
  useAppSelector.mockImplementation(callback => callback(state));
};

export { mockDispatch }; // Export mockDispatch if tests need to assert calls on it directly
