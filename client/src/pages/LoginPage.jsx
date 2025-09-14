// src/pages/LoginPage.js
import LoginForm from "../components/LoginForm"; // Adjust the import path based on your file structure

export default function LoginPage() {
  return (
    <main
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden antialiased"
      style={{
        background: `
          radial-gradient(circle at 70% 30%, rgba(155, 135, 245, 0.15) 0%, rgba(13, 10, 25, 0) 60%),
          linear-gradient(135deg, #0a0613 0%, #150d27 100%)
        `,
      }}
    >
      {/* The LoginForm component is placed inside the container with the background */}
      <LoginForm />
    </main>
  );
}