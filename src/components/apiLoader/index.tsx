import  apiLoader  from "../../assets/images/apiLoader.svg"
import  Styles from "./style.module.css"

const ApiLoader = () => {
  return (
    <div className={Styles.mainLoader}> 
        <div className="innerLoader">
            <img src={apiLoader} alt="filter" />
        </div>        
    </div>
  )
}

export default ApiLoader