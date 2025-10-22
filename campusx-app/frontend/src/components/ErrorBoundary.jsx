//this component handles cathcing error that may occur while the app runs
import React from "react";
import ErrorPage from "./ErrorPage";

class ErrorBoundary extends React.Component {
    
    state = { hasError: false};

    static getDerivedStateFromError(error) {
        return {hasError : true};
    }

    componentDidCatch(error, info) {
        console.log(error, info);
    }
    
    render() {
        if (this.state.hasError)
        return(<ErrorPage />);
        else return this.props.children;
    }
}

export default ErrorBoundary;