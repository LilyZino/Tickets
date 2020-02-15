import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ConcertsList from '../ConcertsList';
import { registerSocketEvent, initSockets } from '../../_services/socketService';
import { authenticationService } from '../../_services';

export default function Recommendations() {
    const rec = 'Pop';
    const [concerts, setConcerts] = useState([]);
    const [filter, setFilter] = useState({});
    const GetRecs = async () => {
        if (authenticationService.currentUserValue) {
            const userId = authenticationService.currentUserValue.data
                ? authenticationService.currentUserValue.data._id : authenticationService.currentUserValue._id;
            console.log(userId);
            const response = await axios.get(`/api/concerts/recs/${userId}`);
        

            setConcerts(response.data);

            console.log('useEffect GetRecs:', response);
        }
    };
    useEffect(() => {
        initSockets();
        registerSocketEvent('concerts-updated', () => {
            console.log('concerts was updated');
            GetRecs();
        });

        GetRecs();
    }, []);

    return (
        <div>
            <ConcertsList filter={filter} concerts={concerts} />
        </div>
    );
}