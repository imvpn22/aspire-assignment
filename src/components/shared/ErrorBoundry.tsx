import React, { Component, type ReactNode } from "react";

import ErrorInfo from "./ErrorInfo";

type TErrorBoundaryProps = {
  fallback?: boolean;
  children: ReactNode;
  message?: string;
  onCatch?: () => void;
};
class ErrorBoundary extends Component<
  TErrorBoundaryProps,
  {
    errorInfo: unknown;
  }
> {
  constructor(props: TErrorBoundaryProps) {
    super(props);
    this.state = { errorInfo: null };
  }

  componentDidCatch(errorInfo: unknown): void {
    this.setState({
      errorInfo,
    });
    this.props?.onCatch?.();
  }

  render(): React.ReactNode {
    const { errorInfo } = this.state;
    const { children, fallback = true, message } = this.props;
    if (errorInfo) {
      return fallback && <ErrorInfo message={message} />;
    }

    return <>{children}</>;
  }
}

export default ErrorBoundary;
