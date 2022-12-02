import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

function AmiiboPanel(props)
{
    const [amiiboSeriesButton, setAmiiboSeriesButton] = useState("contained");
    const [gameSeriesButton, setGameSeriesButton] = useState("outlined");
    const navigate = useNavigate()

    const button1OnClick = () => {
        setAmiiboSeriesButton("contained");
        setGameSeriesButton("outlined");
        props.setButtonSelect("amiiboSeries")
    };

    const button2OnClick = () => {
        setAmiiboSeriesButton("outlined");
        setGameSeriesButton("contained");
        props.setButtonSelect("gameSeries")
    };

    const handleListItemClick = (event, index) => {
        navigate("/")
        props.setSelectedIndex(index);
        props.setShowFavorite(false)
        window.scrollTo(0, 0)
    };

    return <div>
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', float:'left'  }}>
            <Button variant={amiiboSeriesButton} onClick={button1OnClick}>Amiibo Series</Button>
            <Button variant={gameSeriesButton} onClick={button2OnClick}>Game Series</Button>
            <List component="nav" aria-label="main mailbox folders">
                {props.seriList.map((item) => (
                <ListItemButton
                selected={props.selectedIndex === item}
                onClick={(event) => handleListItemClick(event, item)}
                >
                <ListItemText primary={item} />
                </ListItemButton>
                ))}
            </List>
        </Box>
    </div>
}

export default AmiiboPanel