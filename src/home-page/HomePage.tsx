import React from 'react';
import CustomAppBar from '../app-bar/AppBar';
import {useApi} from "../api/ApiProvider";

function HomePage() {
    const apiClient = useApi();
    apiClient.getBooks().then((response) => {
        console.log(response);
    });
    return (
        <div>
            <CustomAppBar/>
        </div>
    );
}

export default HomePage;