import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ConcertsList from '../ConcertsList';
import { registerSocketEvent, initSockets } from '../../_services/socketService';

export default function Recommendations() {
    const rec = 'Pop';
    const [concerts, setConcerts] = useState([]);
    const [filter, setFilter] = useState({});
    const GetRecs = async () => {
        const response = await axios.get(`/api/concerts/recs/${rec}`);
        

        setConcerts(response.data);

        console.log('useEffect GetRecs:', response);
    };
    GetRecs();
    /*useEffect(() => {
        initSockets();
        registerSocketEvent('concerts-updated', () => {
            console.log('concerts was updated');
            GetRecs();
        });

        GetRecs();
    }, []);*/

    return (
        <div>
            <ConcertsList filter={filter} concerts={concerts} />
        </div>
    );
}