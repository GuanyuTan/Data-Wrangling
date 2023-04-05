import { TextField, InputAdornment } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = (props) => {
    const {setSearch,height, ...others } = props;
    const handleSearch = (e) =>{
        const string  = e.target.value;
        setSearch([string]);
        console.log(height)
    }
    return (
        <>
            <TextField
            onChange={handleSearch}
                InputProps={{
                    style: {
                        height: height,
                      },
                    endAdornment: (
                        <InputAdornment position='start'>
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            >

            </TextField>
        </>
    )
}