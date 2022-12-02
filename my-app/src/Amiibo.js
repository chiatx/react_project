import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Amiibo(props)
{
    const params = useParams()
    const [amiibo, setAmiibo] = useState(null)
    const [favorite, setFavorite] = useState(false)

    useEffect(() => {
        if (props.amiiboList !==null)
        {
            setAmiibo(props.amiiboList.find(amiibo=>amiibo.tail===params.amiibo))
            if(props.favoriteList.some(a=>a.tail===params.amiibo))
            {
                setFavorite(true)
            }
        }
    }, [params.amiibo, props.amiiboList, props.favoriteList])

    const addFav = () => {
        setFavorite(true)
        const newFavList = [...props.favoriteList, amiibo]
        props.setFavoriteList(newFavList)
    };

    const removeFav = () => {
        setFavorite(false)
        const newFavList = props.favoriteList.filter(item => item !== amiibo)
        props.setFavoriteList(newFavList)        
    };

    return (
        amiibo !== null?
        <div>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                }}
            >
        <Grid container spacing={2}>
            <Grid item xs={5}>
            <img style={{maxWidth: 450}}
                    src={amiibo.image}
                    alt={amiibo.character}
                />
            </Grid>
            <Grid item xs={6}>
            <Card>
                <CardContent>
                {favorite?
                <Fab  color="primary" onClick={()=>removeFav()}>
                <FavoriteIcon />
                </Fab>:
                <Fab  color="default" onClick={()=>addFav()}>
                <FavoriteIcon />
                </Fab>}
                <br/><br/>
                <Typography variant="h5">{amiibo.name}</Typography><br/>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="body1">Amiibo Series:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1">{amiibo.amiiboSeries}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1">Game Series:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1">{amiibo.gameSeries}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1">Release:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1">AU: {amiibo.release.au}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1"></Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1">EU: {amiibo.release.eu}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1"></Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1">JP: {amiibo.release.jp}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1"></Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1">NA: {amiibo.release.na}</Typography>
                    </Grid>
                </Grid>
                </CardContent>
            </Card>
            </Grid>
        </Grid>
            </Box>
        </div>
        :""
    )
}

export default Amiibo