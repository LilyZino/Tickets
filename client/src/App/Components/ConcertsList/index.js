import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Concert from '../Concert';

export default (props) => {
    const { concerts, filter, editable } = props;
    const [filteredConcerts, setFilteredConcerts] = useState(concerts);

    useEffect(() => {
        const concertsToRender = filter ? concerts.filter((concert) => {
            if (concert.isDeleted) { return false; }

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

    const dateComperator = (a, b) => {
        return moment(a.time).isAfter(b.time) ? 1 : -1;
    };

    return (
        <div>
            {filteredConcerts.sort(dateComperator).map((concert) => (
                <Concert
                    key={concert._id}
                    id={concert._id}
                    artist={concert.artist}
                    location={concert.location}
                    time={concert.time}
                    genre={concert.genre}
                    editable={editable}
                />
            ))}
        </div>
    );
};