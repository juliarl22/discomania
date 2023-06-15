import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import {
    MDBBtn, MDBCollapse, MDBContainer, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBIcon, MDBNavbar,
    MDBNavbarBrand, MDBNavbarItem,
    MDBNavbarLink, MDBNavbarNav, MDBNavbarToggler
} from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import imagenLogo from "../assets/images/logo";
import { calcularUnidades, isAdmin, isLogin, logout, userEmail, userNombre } from '../js/Utils.js';
import '../styles/commonStyles.css';



export default function AppMenu({ badgeProp }) {
    const [showBasic, setShowBasic] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (

        <MDBNavbar sticky expand='lg' className='navbar-custom'>
            <MDBContainer fluid >
                <MDBNavbarBrand href='/' className='navbar-custom gap-2'>
                    <img src={imagenLogo} height="40" width="40" alt="logo"></img>
                    Discomanía
                </MDBNavbarBrand>

                <MDBNavbarToggler
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowBasic(!showBasic)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>

                <MDBCollapse navbar show={showBasic}>
                    <MDBNavbarNav className='mr-auto mb-2 mb-lg-0 gap-2' style={{ justifyContent: 'flex-start', }}>
                        {isAdmin() ? (
                            <>
                                <MDBNavbarItem >
                                    <MDBDropdown>
                                        <MDBDropdownToggle tag='a' className='nav-link navbar-custom' role='button' >
                                            Gestión de discos
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu >

                                            <MDBDropdownItem link href="/product" >Alta de Discos</MDBDropdownItem>
                                            <MDBDropdownItem link href="/productslist" >Listado de discos</MDBDropdownItem>
                                            <MDBDropdownItem link href="/productcardlist/0">Ver Discos</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                </MDBNavbarItem>

                                <MDBNavbarItem>
                                    <MDBDropdown>
                                        <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                                            Gestión de categorías
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu>
                                            <MDBDropdownItem link href="/category">Alta de categorías</MDBDropdownItem>
                                            <MDBDropdownItem link href="/categorieslist">Listado de categorías</MDBDropdownItem>
                                            <MDBDropdownItem link href="/categorycardlist">Ver categorías</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                </MDBNavbarItem>

                                <MDBNavbarItem>
                                    <MDBNavbarLink aria-current='page' href='/userslist'>
                                        Usuarios
                                    </MDBNavbarLink>
                                </MDBNavbarItem>

                                <MDBNavbarItem>
                                    <MDBNavbarLink aria-current='page' href='/ticketslist/todos@correo.com'>
                                        Tickets
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            </>
                        ) : (
                            <>
                                <MDBNavbarItem>
                                    <MDBNavbarLink aria-current='page' href="/productcardlist/0">
                                        Discos
                                    </MDBNavbarLink>
                                </MDBNavbarItem>

                                <MDBNavbarItem>
                                    <MDBNavbarLink aria-current='page' href="/categorycardlist">
                                        Categorías
                                    </MDBNavbarLink>
                                </MDBNavbarItem>


                                {isLogin() && (
                                    <>
                                        <MDBNavbarItem>
                                            <MDBNavbarLink aria-current='page' href={'/ticketslist/' + userEmail()}>
                                                Mis compras
                                            </MDBNavbarLink>
                                        </MDBNavbarItem>
                                        <MDBNavbarItem>
                                            <MDBNavbarLink aria-current='page' href={'/edituser/' + userEmail()}>
                                                Mis datos
                                            </MDBNavbarLink>
                                        </MDBNavbarItem>


                                    </>
                                )}
                            </>
                        )}
                    </MDBNavbarNav>
                    <MDBNavbarNav className='mb-2 mb-lg-0 gap-2' style={{ justifyContent: 'flex-end', }} >
                        {isLogin() && (
                            <>
                                <MDBNavbarItem >
                                    <MDBNavbarLink aria-current='page' href='#'>
                                        Bienvenido, <em>{userNombre()}</em>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>

                            </>
                        )}

                        {!isAdmin() && (
                            <MDBNavbarItem >
                                <MDBNavbarLink aria-current='page' href='/shoppinglist'>
                                    <Badge badgeContent={badgeProp || calcularUnidades()} color="primary">
                                        <ShoppingCartIcon fontSize='medium' />
                                    </Badge>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        )}




                        {!isLogin() ? (
                            <>
                                <MDBNavbarItem >
                                    <Link to='/login'>
                                        <MDBBtn size="md" className='btn-color-secondary' type='button'>
                                            <LoginIcon sx={{ mr: 1 }} fontSize="small" />
                                            Login

                                        </MDBBtn>
                                    </Link>
                                </MDBNavbarItem>

                                <MDBNavbarItem >
                                    <Link to='/register'>
                                        <MDBBtn size="md" className='btn-color-secondary' type='button'>
                                            <PersonAddIcon sx={{ mr: 1 }} fontSize="small" />
                                            Regístrate

                                        </MDBBtn>
                                    </Link>
                                </MDBNavbarItem>
                            </>) : (
                            <>

                                <MDBNavbarItem >
                                    <MDBBtn onClick={() => handleLogout()} size="md" className='btn-color-primary' type='button' >
                                        Logout
                                    </MDBBtn>
                                </MDBNavbarItem>

                            </>
                        )}


                    </MDBNavbarNav>


                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar >

    );
}