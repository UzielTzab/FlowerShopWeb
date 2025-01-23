import { FooterComponent } from "../components/footer_component";
import { HeaderComponent } from "../components/header_component";
import { MainComponent } from "../components/main_component";

export function Home() {
    return (
        <div>
            <HeaderComponent />
            <MainComponent />
            <FooterComponent />
        </div>
    );
}