import Divider from '@mui/material/Divider';
import {
    MDBCol, MDBContainer, MDBFooter, MDBRow
} from 'mdb-react-ui-kit';
import React from 'react';
import config from '../config.js';


export default function Footer() {
    return (

        <MDBFooter  >
            <Divider variant="middle" />
            <MDBContainer className='py-4'>
                <MDBRow>
                    <MDBCol className='p-4 mb-md-0 text-lg-left'>
                        <h5 className='mb-3'>Contáctanos</h5>

                        <ul className='list-unstyled mt-1'>
                            <li className='mb-2'>

                                contacto@discomania.com

                            </li>
                            <li className='mb-2'>

                                {config.telefono}

                            </li>
                            <li className='mb-2'>

                                {config.direccion}, {config.codpost}

                            </li>
                            <li className='mb-2'>

                                {config.ciudad}

                            </li>
                        </ul>
                    </MDBCol>

                    <MDBCol className='p-4 mb-md-0 text-lg-left'>
                        <h5 className='mb-3 '>Información</h5>

                        <ul className='list-unstyled'>
                            <li className='mb-2'>
                                <a href='#!' >
                                    Novedades
                                </a>
                            </li>
                            <li className='mb-2'>
                                <a href='#!' >
                                    Quiénes somos
                                </a>
                            </li>
                            <li className='mb-2'>
                                <a href='#!' >
                                    Blog
                                </a>
                            </li>
                            <li className='mb-2'>
                                <a href='#!' >
                                    Contactar
                                </a>
                            </li>

                        </ul>
                    </MDBCol>

                    <MDBCol lg='6' md='6' className='mb-4 mb-md-0 text-center'>
                        <h5>Ven a visitarnos a nuestra tienda física</h5>

                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3169.946331079352!2d-5.997751724369085!3d37.39110147208448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126c0fdfe96b63%3A0x75a6cd305c677edb!2sC.%20Rioja%2C%2010%2C%2041004%20Sevilla!5e0!3m2!1ses!2ses!4v1685035350792!5m2!1ses!2ses" width={400} height={200} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title='ubicacion' />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <Divider variant="middle" />
            <div className="text-center p-3" style={{ backgroundColor: '#121212' }}>
                &copy; {new Date().getFullYear()}
                <a className="text-white" href={config.home}> Discomanía - </a>
                Made by: Julia Rodríguez
            </div>
        </MDBFooter >
    );
}
