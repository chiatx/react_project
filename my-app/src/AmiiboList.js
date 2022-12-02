import {useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function AmiiboList (props) {
    const navigate = useNavigate()

    const handleOpen = (tail) => {
        window.scrollTo(0, 0)
        navigate(`/List/${tail}`)
    }

    return <div>
    <Box sx={{ width: '100%', maxWidth: 860, bgcolor: 'background.paper', float:'left' }}>
    <Grid container>
  <Grid item><TextField
        id="search"
        label="Search Name"
        variant="outlined"
        size="small"
        value={props.query}
        onChange={props.onQueryChanged}
      ></TextField></Grid>                          
  <Grid item xs>                                 
    <Grid container direction="row-reverse">
        {props.showFavorite?      
      <Grid item><Button variant="contained" onClick={()=>props.setShowFavorite(true)}>My Favorite</Button></Grid>:
      <Grid item><Button variant="outlined" onClick={()=>props.setShowFavorite(true)}>My Favorite</Button></Grid>
        }
    </Grid>
  </Grid>
</Grid>
      <br/><br/>
      {props.displayAmiiboList!==null&&props.displayAmiiboList[props.selectedIndex]!==undefined?
    <Grid container spacing={{ xs: 5, md: 5 }} columns={{ xs: 4, sm: 8, md: 12 }} alignItems="center" justifyContent="center">
        {props.showFavorite?
        props.favoriteList.map((item) => (
            <Grid item xs={2} sm={4} md={3} key={item.tail} >
              <img
                  height="200px"
                  src={item.image}
                  // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.character}
                  loading="lazy"
                  onClick={()=>{handleOpen(item.tail)}}
              /><br/>
              <center><label>{item.name}</label></center>
            </Grid>
          ))
         :
        props.displayAmiiboList[props.selectedIndex].map((item) => (
          <Grid item xs={2} sm={4} md={3} key={item.tail} >
            <img
                height="200px"
                src={item.image}
                // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.character}
                loading="lazy"
                onClick={()=>{handleOpen(item.tail)}}
            /><br/>
            <center><label>{item.name}</label></center>
          </Grid>
        ))}
      </Grid>
      :""}
</Box>
    </div>
}

export default AmiiboList