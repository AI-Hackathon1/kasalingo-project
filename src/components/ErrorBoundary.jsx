import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#5e1b55]">
          <div className="text-white text-center p-8">
            <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong</h1>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-[#FBCFE8] text-[#210F37] px-6 py-2 rounded-full hover:scale-95 transition-transform"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;