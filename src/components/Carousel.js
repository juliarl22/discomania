import Divider from '@mui/material/Divider';
import {
    MDBCarousel,
    MDBCarouselItem,
    MDBContainer
} from 'mdb-react-ui-kit';
import React from 'react';
import imagen2 from "../assets/images/concert-carousel1.jpg";
import imagen3 from "../assets/images/concert-carousel2.jpg";
import imagen1 from "../assets/images/vinyl-carousel3.jpg";
import '../styles/commonStyles.css';

export default function Carousel() {
    return (
        <>
            <MDBContainer className='mb-1'>
                <MDBCarousel showControls="true" showIndicators="true" delay={2500} >
                    <MDBCarouselItem
                        className='w-100 d-block color-texto-carrusel'
                        itemId={1}
                        src={imagen1}
                        alt='...'
                    >
                        <h2 className="texto-carrusel">Tu música, tu vinilo</h2>
                        <h5 className="texto-carrusel">Tus álbumes favoritos en el formato más vintage</h5>
                    </MDBCarouselItem>

                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={2}
                        src={imagen2}
                        alt='...'
                    >
                        <h2 className="texto-carrusel">En solo dos días</h2>
                        <h5 className="texto-carrusel">Realiza tu pedido, en dos días fabricaremos y enviaremos tu vinilo directamente a tu puerta.</h5>
                    </MDBCarouselItem>
                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={3}
                        src={imagen3}
                        alt='...'
                    >
                        <h2 className="texto-carrusel">Pago seguro y garantía de devolución</h2>
                        <h5 className="texto-carrusel">Pagos domiciliados. Y si tu disco llega defectuoso te lo enviamos de nuevo sin gastos.</h5>
                    </MDBCarouselItem>
                </MDBCarousel>

            </MDBContainer>
            <Divider variant="middle" sx={{ my: 4 }} />
        </>

    );
}
