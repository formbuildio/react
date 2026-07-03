<div align="center">
  <a href="https://formbuild.io">
    <img src="https://raw.githubusercontent.com/formbuildio/.github/main/assets/banner.svg" alt="formbuild.io" width="100%" />
  </a>
</div>

# @formbuild/react 

This package provides native React hooks to handle form submissions, loading states, and error parsing, replacing the need for manual `fetch` calls.

## Installation

```bash
npm install @formbuild/react
```

## Usage

Pass your Formbuild endpoint ID to the `useFormbuild` hook. It returns a `submit` function and state variables for rendering your UI.

```tsx
import { useState } from 'react';
import { useFormbuild } from '@formbuild/react';

export default function ContactForm() {
  const { submit, isLoading, isSuccess, error } = useFormbuild("YOUR_FORM_ID");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit({ email, message });
  };

  if (isSuccess) {
    return <p>Message sent successfully.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required 
      />
      <textarea 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required 
      />
      
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Send"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
```

## API Reference

### `useFormbuild(formId: string, options?: UseFormbuildOptions)`

**Arguments:**
- `formId` (string): Your unique endpoint ID from the dashboard.
- `options` (object, optional): Configuration options.
  - `endpoint` (string): Override the default API URL (defaults to `https://formbuild.io`).

**Returns:**
- `submit(data: Record<string, any> | FormData)`: Function to submit the data.
- `isLoading` (boolean): `true` while the request is pending.
- `isSuccess` (boolean): `true` if the submission was successful.
- `error` (string | null): Contains the error message if the submission fails.
