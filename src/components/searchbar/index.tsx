import { count } from "console";
import { useNavigate } from "react-router-dom";


interface Props {
    searchClass: string;
    placeHolder: string,
    handleSearchSubmit : any;
    viewAllBundle?:string;
    navigate?:string
}

const SearchBar = ({ searchClass, placeHolder, handleSearchSubmit, viewAllBundle}: Props) => {
    const navigate = useNavigate();
    return (
        <div className={searchClass}>
            <input type="text" name="searchInput" placeholder={placeHolder} onChange={handleSearchSubmit}/>
            {viewAllBundle && <button onClick={() => navigate(`/esim?viewall=${viewAllBundle}`)}>View All</button> }
        </div>
    )
}

export default SearchBar;