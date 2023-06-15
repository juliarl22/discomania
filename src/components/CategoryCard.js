import *as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import config from '../config.js';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/commonStyles.css';


export default function CategoryCard({ nombre, descripcion, imagen }) {
    const [imageError, setImageError] = useState(false);


    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <Card sx={{ width: 360 }} className="category-card">
            <CardHeader
                title={nombre}
            />
            <Link to={"/productcardlist/" + imagen}>
                {imageError ? (
                    // Renderizar algo alternativo si la imagen no se pudo cargar
                    <CardMedia
                        component="img"
                        style={{ objectFit: 'contain', height: '250px' }}
                        src={config.imageFolder + 'sin-imagen'}
                        onError={handleImageError}
                        alt={nombre}
                    />
                ) : (
                    <CardMedia
                        component="img"
                        style={{ objectFit: 'contain', height: '250px' }}
                        src={config.imageFolder + "cat-" + imagen}
                        onError={handleImageError}
                        alt={nombre}
                    />
                )}
            </Link>
            <CardContent sx={{ height: 70 }}>
                <Typography variant="body2" color="text.secondary">
                    {descripcion}
                </Typography>
            </CardContent>
        </Card>
    );
}
