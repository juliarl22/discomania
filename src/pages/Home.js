import AppMenu from "../components/AppMenu";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import CategoryCardsList from "../components/CategoryCardsList";
import { MDBContainer } from "mdb-react-ui-kit";

function Home() {
    return (
        <>
            <AppMenu />
            <MDBContainer fluid>
                <Carousel />

                <CategoryCardsList />

                <Footer />
            </MDBContainer>
        </>
    );
}

export default Home;