import React, { useCallback, useState } from 'react';
import cast from 'data/cast.json';
import BarChart from './BarChart/BarChart';
import * as Styled from './DataView.styled.js';

const actors = [
    {
        id: 6533,
        name: "Harry Potter",
        movies: 7,
        series: 2,
    },
    {
        id: 21234,
        name: "Arnold Shwarzenigger",
        movies: 5,
        series: 0
    },
    {
        id: 527,
        name: "Antonio Banderas",
        movies: 2,
        series: 3
    },
    {
        id: 881345,
        name: "Vladimir Putin",
        movies: 2,
        series: 0
    },
    {
        id: 56535,
        name: "Ted Bundy",
        movies: 1,
        series: 7
    },
    
]

const DataView = () => {
    const [selectedFilter, setSelectedFilter] = useState('total')
    const filteredActors = actors.filter(actor => {
        if(selectedFilter === 'movies' && actor.movies === 0) return false;
        if(selectedFilter === 'series' && actor.series === 0) return false;
        return true;
    })
    const sortedActors = filteredActors.sort((a,b) => {
        if(selectedFilter === 'movies') return b.movies - a.movies;
        if(selectedFilter === 'series') return b.series - a.series;
        return (b.movies + b.series) - (a.movies + a.series)
    });
    const labels = sortedActors.map(actor => actor.name);
    const data = [
    ...selectedFilter !== 'movies'  ? [{
        name: "Series",
        data: sortedActors.map(actor => actor.series)
    }] : [],
    ...selectedFilter !== 'series'  ? [{
        name: "Movies",
        data: sortedActors.map(actor => actor.movies)
    }] : []
    ]
    const onFilterChanged = useCallback(event => {
        setSelectedFilter(event.target.value);
    })
    return <Styled.Container>
        <Styled.Filter>
            <input type="radio" value="movies" checked={selectedFilter==='movies'} onChange={onFilterChanged}/>
            <label>Movies</label>
            <input type="radio" value="series" checked={selectedFilter==='series'} onChange={onFilterChanged}/>
            <label>Series</label>
            <input type="radio" value="total" checked={selectedFilter==='total'} onChange={onFilterChanged}/>
            <label>Total</label>
        </Styled.Filter>
        <BarChart labels={labels} data={data}/>
    </Styled.Container>;
}

export default DataView;