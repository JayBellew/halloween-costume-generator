import React from 'react';
import dynamic from 'next/dynamic';

// Import with error boundary
const HalloweenCostumeGenerator = dynamic(
  () => import('../components/HalloweenCostumeGenerator'),
  { 
    ssr: false,
    loading: () => <p>Loading...</p>
  }
);

export default function Home() {
  return (
    <div>
      <main>
        <ErrorBoundary>
          <HalloweenCostumeGenerator />
        </ErrorBoundary>
      </main>
    </div>
  );
}

// Add Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-center">
          <h1>Something went wrong.</h1>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
