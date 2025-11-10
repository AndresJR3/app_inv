import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login page on initial load', () => {
  render(<App />);
  // Since the default route navigates to /dashboard, which is protected,
  // it should redirect to /login. We expect to see the login form.
  const headingElement = screen.getByRole('heading', { name: /Iniciar Sesión/i });
  expect(headingElement).toBeInTheDocument();
});
