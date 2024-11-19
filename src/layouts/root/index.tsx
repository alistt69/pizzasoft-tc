import { Outlet } from "react-router-dom";
import ContentContainer from "@/components/content";

const RootLayout = () => {

    return(
        <ContentContainer>
            <Outlet/>
        </ContentContainer>
    )
}

export default RootLayout;
