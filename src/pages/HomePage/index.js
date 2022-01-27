import React, { useState, useEffect } from 'react';
import TableComponent from '../../components/Table';

const HomePage = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((json) => {
                let changeUserId = json.map(user => ({ ...user, key: String(user.id) }))
                return setData(changeUserId)
            });
    }, [])

    return (
        <div>
            <TableComponent data={data} setData={setData} />
        </div>
    );
};

export default HomePage;