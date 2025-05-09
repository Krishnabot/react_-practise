import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import { FormComponent } from './formComponent';
import '@testing-library/jest-dom';

describe('FormComponent (with real store)', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        form: formReducer,
      },
    });

    render(
      <Provider store={store}>
        <FormComponent />
      </Provider>
    );
  });

  test('renders form inputs and button', () => {
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/age/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('inputs update state correctly', () => {
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'Krishna' },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'krishna@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/age/i), {
      target: { value: '30' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'secret' },
    });

    expect(screen.getByPlaceholderText(/username/i)).toHaveValue('Krishna');
    expect(screen.getByPlaceholderText(/email/i)).toHaveValue('krishna@example.com');
    expect(screen.getByPlaceholderText(/age/i)).toHaveValue(30);
    expect(screen.getByPlaceholderText(/password/i)).toHaveValue('secret');
  });

  test('shows confirmation box after submit', () => {
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'Tester' },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'tester@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/age/i), {
      target: { value: '28' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'mypassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/confirm submission/i)).toBeInTheDocument();
    expect(screen.getByText(/tester@example.com/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /yes, submit/i })).toBeInTheDocument();
  });
});
