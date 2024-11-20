import classes from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { paths } from "@/routes/routes.ts";

const ErrorPage = () => {

    return(
        <div className={classes.error}>
            <div className={classes.error_container}>
                <div className={classes.number}>404</div>
                <div className={classes.description}>
                    <div className={classes.heading}>
                        Page not found
                    </div>
                    <div className={classes.subheading}>
                        <p className={classes.reasons}>Something went wrong: </p>

                        <div>
                            <p>&middot;</p>
                            <p>
                                the page you're looking for was deleted
                            </p>
                        </div>

                        <div>
                            <p>&middot;</p>
                            <p>
                                the page you're looking for doesn't exist
                            </p>
                        </div>

                        <div>Please check the URL and try again.</div>

                    </div>
                    <NavLink to={paths.ROOT}>Main</NavLink>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage;
