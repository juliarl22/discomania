import * as React from 'react';
import { useEffect, useState } from 'react';
import config from '../config.js';

import ListItemButton from '@mui/material/ListItemButton';
import { Link } from 'react-router-dom';
import { Stack, Divider } from '@mui/material';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function CategoriesFilter({ selectCatIndex }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch(config.apiUrl + 'get-categorias.php');

                if (response.ok) {
                    let data = await response.json();

                    if (data.ok) {
                        setMenuItems(data.datos);
                    } else {
                        alert('Error al recuperar las categorías.'); // datos del error en consola
                        console.error(data.mensaje);
                    }

                } else {
                    alert('Error al recuperar las categorías.');
                }
            } catch (error) {
                alert('Error al recuperar las categorías.');
                console.error('Error al obtener los elementos del menú:', error);
            }
        };

        fetchMenuItems();
        setSelectedIndex(selectCatIndex);

    }, [selectCatIndex]);

    const handleListItemClick = (
        event,
        index,
    ) => {
        setSelectedIndex(index);
    };

    return (

        <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={1}
            justifyContent="flex-start"
            useFlexGap
            flexWrap="wrap"
            sx={{ my: 2, ml: 3 }}

        >
            <Item key={0} >
                <ListItemButton
                    role="menuitem"
                    // component="a"
                    // href='/productcardlist/0'
                    component={Link}
                    to='/productcardlist/0'

                    aria-label="Todas"
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}
                >
                    Todas las categorías
                </ListItemButton>
            </Item>

            {
                menuItems.map((item, i) => (

                    <Item key={item.idcategoria}>
                        <ListItemButton
                            role="menuitem"
                            // component="a"
                            // href={'/productcardlist/' + item.idcategoria}
                            component={Link}
                            to={'/productcardlist/' + item.idcategoria}
                            aria-label={item.nombre}
                            selected={selectedIndex === item.idcategoria}
                            onClick={(event) => handleListItemClick(event, item.idcategoria)}
                        >
                            {item.nombre}
                            {/* <Link to={'/productcardlist/' + item.idcategoria}>{item.nombre}</Link> */}
                        </ListItemButton>
                    </Item>
                ))
            }
        </Stack >



    );

}


export default CategoriesFilter;
