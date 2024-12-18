import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const ggClientId = process.env.REACT_APP_API_GG_CLIENT_ID;
console.log("ggClientId", ggClientId);

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={ggClientId}>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <App />
                    </PersistGate>
                </Provider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </GoogleOAuthProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
