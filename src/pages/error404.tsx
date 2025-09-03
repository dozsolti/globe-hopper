export default function Error404Page() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="font-bold text-4xl">404 Not Found :(</h1>
      <p className="mt-2">The page you are looking for does not exist.</p>
      <a href="/" className="mt-4 text-primary hover:underline">
        Go back to home
      </a>
    </div>
  );
}
