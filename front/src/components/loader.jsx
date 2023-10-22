import React from "react";
import styles from './css/loader.module.css';

const Loader = () => {
    return (
        <>
            <div className={styles.divLoader}>
                <h1 className={styles.labelLoader}>Carregando...</h1>
            </div>
        </>
    )
}

export default Loader;