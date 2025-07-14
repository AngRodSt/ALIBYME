import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  chidren: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    {
      this.state = { hasError: false };
    }
  }
  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log("HomePage Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="bg-[#111111] min-h-screen flex items-center justify-center">
            <div className="text-white text-center">
              <h2 className="text-2xl mb-4">Something went wrong</h2>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="bg-red-600 px-4 py-2 rounded"
              >
                Try again
              </button>
            </div>
          </div>
        )
      );
    }
    return this.props.chidren;
  }
}
