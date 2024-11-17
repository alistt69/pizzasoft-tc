import React from "react";
import { ReactNode } from "react";
import classes from "./classes.module.scss"

const ContentContainer: React.FC<{ children: ReactNode}> = ({ children }) => {

    return(
        <main className={classes.container}>
            {children}
        </main>
    )
}

export default ContentContainer;
