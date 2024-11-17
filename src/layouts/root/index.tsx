import { Outlet } from "react-router-dom";
import ContentContainer from "@/components/content";

const RootLayout = () => {

    return(
        <ContentContainer>
            <p>root</p>
            <Outlet/>
        </ContentContainer>
    )
}

export default RootLayout;
