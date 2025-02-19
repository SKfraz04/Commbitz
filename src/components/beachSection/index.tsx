import SearchBar from "../searchbar";
import styles from './style.module.css';

const BeachSectionLeft = () => {
    return (
        <section className={styles.beachSeaction}>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'></div>
                    <div className='col-md-6'>
                        <div className={styles.beachSeactionleft}>
                            <h5>Straight from our desk,<br /> to your Inbox.</h5>
                            <p>Subscribe to our newsletter</p>
                            <SearchBar searchClass={styles.formGoup} placeHolder={"Your email"} handleSearchSubmit={""}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BeachSectionLeft