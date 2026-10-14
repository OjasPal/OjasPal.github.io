import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught application error:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B0C10] px-6 py-12 text-[#F2F4F8]">
          <div className="max-w-md w-full rounded-2xl bg-[#12141C] border border-[#1E2430] p-8 text-center space-y-6 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center mx-auto text-[#38BDF8]">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold font-display tracking-tight text-[#F2F4F8]">
                Something unexpected occurred
              </h2>
              <p className="text-sm text-[#8A90A0] leading-relaxed">
                An issue interrupted the display of this portfolio. Please reload to restore the interface.
              </p>
            </div>

            <button
              onClick={this.handleReload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#38BDF8] text-[#0B0C10] font-semibold text-sm hover:bg-[#38BDF8]/90 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Reload Portfolio
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
