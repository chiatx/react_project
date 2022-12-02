import {useState, useEffect} from 'react'
import {Routes,Route} from 'react-router-dom'
import AmiiboList from './AmiiboList';
import Amiibo from './Amiibo';
import AmiiboPanel from './AmiiboPanel';


function AmiiboMain () {
    const [amiiboList, setAmiiboList] = useState(null)
    const [filterAmiiboList, setFilterAmiiboList] = useState(null)
    const [displayAmiiboList, setDisplayAmiiboList] = useState(null)
    const [favoriteList, setFavoriteList] = useState([])
    const [seriList, setSeriList] = useState([])
    const [selectedIndex, setSelectedIndex] = useState("Super Smash Bros.");
    const [query, setQuery] = useState("");
    const [showFavorite, setShowFavorite] = useState(false)
    const [buttonSelect, setButtonSelect] = useState("amiiboSeries");

    function groupBy(objectArray, property) {
        return objectArray.reduce((acc, obj) => {
           const key = obj[property];
           if (!acc[key]) {
              acc[key] = [];
           }
           // Add object to list for given key's value
           acc[key].push(obj);
           return acc;
        }, {});
     }

     useEffect(()=>{
        if(filterAmiiboList!==null)
        {
            const temp = groupBy(filterAmiiboList, buttonSelect)
            console.log(temp)
            setDisplayAmiiboList(temp)
            setSeriList(Object.keys(temp).sort())
        }
     }, [filterAmiiboList, buttonSelect])

    useEffect(() => {
        const apiURL = "https://amiiboapi.com/api/amiibo/"
        fetch(apiURL).then(response=>{
            response.json().then(result=>{
                setAmiiboList(result.amiibo)
                setFilterAmiiboList(result.amiibo)
            })
          })
    }, [])

    const onQueryChanged = (event) => {
        setQuery(event.target.value)
        const newList = amiiboList.filter(a=>a.name.toLowerCase().includes(event.target.value.toLowerCase()))
        console.log(newList)
        setFilterAmiiboList(newList)
      }

    return <div>
    <AmiiboPanel seriList={seriList} selectedIndex={selectedIndex} setButtonSelect={setButtonSelect} setSelectedIndex={setSelectedIndex} setShowFavorite={setShowFavorite}/>
    <Routes>
        <Route path="/" element={<AmiiboList query={query} onQueryChanged={onQueryChanged} displayAmiiboList={displayAmiiboList} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} favoriteList={favoriteList} showFavorite={showFavorite} setShowFavorite={setShowFavorite}/>}/>
        <Route path="/List/:amiibo" element={<Amiibo amiiboList={amiiboList} setFavoriteList={setFavoriteList} favoriteList={favoriteList}/>}/>
        <Route path="*" element={<p>Page not found</p>}/>
    </Routes>
    </div>
}

export default AmiiboMain