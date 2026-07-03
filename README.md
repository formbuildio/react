# @formbuild/react

The official React SDK for [formbuild.io](https://formbuild.io). 

Easily connect your React frontend to your formbuild backend without writing manual `fetch` boilerplate or managing complex form states.

## Installation

```bash
npm install @formbuild/react
# or
yarn add @formbuild/react
# or
pnpm add @formbuild/react
```

## Quickstart

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
    return <p>Thank you for your message!</p>;
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
        {isLoading ? "Submitting..." : "Send Message"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
```

## Features
- **Zero Dependencies:** Built entirely with native React hooks and `fetch`.
- **Automatic State Management:** Handles `isLoading`, `isSuccess`, and `error` states for you.
- **FormData Support:** Pass a standard JavaScript object *or* a `FormData` object directly to the `submit()` function.
- **TypeScript Ready:** Fully typed and thoroughly documented.
