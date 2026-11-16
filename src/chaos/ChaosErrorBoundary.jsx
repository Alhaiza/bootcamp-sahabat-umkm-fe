import React, { Component } from "react";

/**
 * @class ChaosErrorBoundary
 * @description React Error Boundary untuk mengisolasi kegagalan rendering atau runtime exception
 * akibat kesalahan komponen atau injeksi Chaos Engineering di sisi klien.
 *
 * Mencegah layar blank (White Screen of Death) dan menyediakan graceful fallback UI.
 */
export class ChaosErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("[CHAOS RESILIENCE] ErrorBoundary menangkap exception tak tertangani:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 text-center border border-gray-100">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Terjadi Gangguan Sementara</h2>
            <p className="text-sm text-gray-600 mb-6">
              Sistem mendeteksi anomali pada pemrosesan antarmuka. Kami menerapkan pemulihan otomatis agar pengalaman belajar Anda tetap terlindungi.
            </p>
            <button
              onClick={this.handleReload}
              className="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition duration-200"
            >
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ChaosErrorBoundary;
