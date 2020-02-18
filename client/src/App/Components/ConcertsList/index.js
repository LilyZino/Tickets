import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Concert from '../Concert';

export default (props) => {
    const { concerts, filter } = props;
    const [filteredConcerts, setFilteredConcerts] = useState(concerts);

    useEffect(() => {
        const concertsToRender = filter ? concerts.filter((concert) => {
            console.log(concert);

            if (filter.artist && filter.artist !== '' && !concert.artist.toLowerCase().includes(filter.artist.toLowerCase())) {
                return false;
            }

            if (filter.location && filter.location !== '' && !concert.location.toLowerCase().includes(filter.location.toLowerCase())) {
                return false;
            }

            const concertDate = moment(concert.time);
            const filterDate = filter.date ? moment(filter.date) : null;

            if (filterDate && !concertDate.isSame(filterDate, 'day')) {
                return false;
            }

            return true;
        }) : concerts;

        setFilteredConcerts(concertsToRender);
    }, [concerts, filter, props]);


    return (
        <div>
            {filteredConcerts.sort((a, b) => moment(a.time).isAfter(b.time)).map((concert) => (
                <Concert
                    key={concert._id}
                    id={concert._id}
                    artist={concert.artist}
                    location={concert.location}
                    time={concert.time}
                    genre={concert.genre}
                />
            ))}
        </div>
    );
};