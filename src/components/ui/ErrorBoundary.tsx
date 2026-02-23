import { Component, type ReactNode, type ErrorInfo } from "react";

type Props = {
    children: ReactNode;
    fallback?: ReactNode;
};

type State = {
    hasError: boolean;
    error: Error | null;
};

/**
 * Error Boundary para capturar erros de renderização e falhas de chunk (React.lazy).
 * Sem isso, um erro numa section derruba toda a árvore React e exibe tela branca.
 */
export class ErrorBoundary extends Component<Props, State> {
    // Inicialização direta sem `override` para evitar conflito com tsconfig
    state: State = { hasError: false, error: null };

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        // Substituir por Sentry/DataDog em produção
        console.error("[ErrorBoundary] Uncaught error:", error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback;

            return (
                <div
                    role="alert"
                    className="min-h-screen flex items-center justify-center bg-fiuza-cream text-fiuza-dark px-4"
                >
                    <div className="text-center max-w-md">
                        <p className="text-6xl mb-6" aria-hidden="true">⚠️</p>
                        <h2 className="font-display text-3xl font-bold mb-4">Algo deu errado</h2>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            Ocorreu um erro inesperado. Por favor, recarregue a página.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="inline-flex items-center gap-2 bg-fiuza-blue text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-fiuza-dark transition-colors"
                        >
                            Recarregar Página
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
