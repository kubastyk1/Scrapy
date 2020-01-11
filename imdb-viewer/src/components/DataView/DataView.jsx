import React, { useCallback, useState } from 'react';
import cast from 'data/cast.json';
import BarChart from './BarChart/BarChart';
import * as Styled from './DataView.styled.js';

const actors = [
    {
        name: "Harry Potter",
        movies: ["The Philosopher's Stone",
            "The Chamber of Secrets",
            "The Prisoner of Azkaban",
            "The Goblet of Fire",
            "The Order of the Phoenix",
            "The Half-Blood Prince",
            "The Deathly Hallows"],
        series: ["Plebania"]
    },
    {
        name: "Arnold Shwarzenigger",
        movies: ["Terminator", "Terminator 2", "Shrek", "Black Power 2"],
        series: []
    },
    {
        name: "Antonio Banderas",
        movies: ["Lord of the Rings: Two Towers", "Pocahontas"],
        series: ["The Witcher", "Far from nosze", "Breaking Bad", "Ed, Edd & Eddy"]
    },
    {
        name: "Vladimir Putin",
        movies: ["Adidas"],
        series: ["Chernobyl", "Shameless", "American Horror Story"]
    },
    {
        name: "Sasha Grey",
        movies: ["I melt  with You", "Fuck slaves 3", "My evil sluts 2"],
        series: ["The Seduction", "Sporty Girls 2", "Fly girls", "Nylons 5", "Bitchcraft 4"]
    },
    
]

const DataView = () => {
    const [selectedFilter, setSelectedFilter] = useState('total')
    const filteredActors = actors.filter(actor => {
        if(selectedFilter === 'movies' && actor.movies.length === 0) return false;
        if(selectedFilter === 'series' && actor.series.length === 0) return false;
        return true;
    })
    const sortedActors = filteredActors.sort((a,b) => {
        if(selectedFilter === 'movies') return b.movies.length - a.movies.length;
        if(selectedFilter === 'series') return b.series.length - a.series.length;
        return (b.movies.length + b.series.length) - (a.movies.length + a.series.length)
    });
    const labels = sortedActors.map(actor => actor.name);
    const data = [
    ...selectedFilter !== 'movies'  ? [{
        name: "Series",
        color: "coral",
        data: sortedActors.map(actor => actor.series.length),
        items: sortedActors.map(actor => actor.series)
    }] : [],
    ...selectedFilter !== 'series'  ? [{
        name: "Movies",
        color: "deepSkyBlue",
        data: sortedActors.map(actor => actor.movies.length),
        items: sortedActors.map(actor => actor.movies)
    }] : []
    ]
    const onFilterChanged = useCallback(event => {
        setSelectedFilter(event.target.value);
    })
    return <Styled.Container>
        <Styled.Filter>
            <Styled.FilterItem checked={selectedFilter==='movies'}>
                <input type="radio" id="movies" value="movies" checked={selectedFilter==='movies'} onChange={onFilterChanged}/>
                <label htmlFor="movies">Movies</label>
            </Styled.FilterItem>
            <Styled.FilterItem checked={selectedFilter==='series'}>
                <input type="radio" id="series" value="series" checked={selectedFilter==='series'} onChange={onFilterChanged}/>
                <label htmlFor="series">Series</label>
            </Styled.FilterItem>
            <Styled.FilterItem checked={selectedFilter==='total'}>
                <input type="radio" id="total" value="total" checked={selectedFilter==='total'} onChange={onFilterChanged}/>
                <label htmlFor="total">Total</label>
            </Styled.FilterItem>
        </Styled.Filter>
        <BarChart labels={labels} data={data}/>
    </Styled.Container>;
}

export default DataView;