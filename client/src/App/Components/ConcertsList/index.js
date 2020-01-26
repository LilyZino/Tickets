import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Concert from '../Concert';

export default (props) => {
    const { concerts, filter } = props;
    const [filteredConcerts, setFilteredConcerts] = useState(concerts);

    useEffect(() => {
        const consertsToRender = concerts.filter((concrt) => {
            if (_.isEmpty(filter)) return concerts;

            if (filter.artist) {
                return concrt.artist.toLowerCase().includes(filter.artist);
            }

            return true;
        });

        setFilteredConcerts(consertsToRender);
    }, [concerts, filter, props]);


    return (
        <div>
            {filteredConcerts.map((concert) => (
                <Concert
                    key={concert._id}
                    id={concert._id}
                    artist={concert.artist}
                    location={concert.location}
                    time={concert.time}
                />
            ))}
        </div>
    );
};