import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import SignIn from "./SignIn";


const root = createRoot(document.getElementById('root'));
root.render(
        <SignIn />
);