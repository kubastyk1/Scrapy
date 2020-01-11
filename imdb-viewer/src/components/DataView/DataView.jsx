import React, { memo, useCallback, useEffect, useState } from 'react';
import BarChart from './BarChart/BarChart';
import * as Styled from './DataView.styled.js';

const DataView = ({actors}) => {
    const [selectedFilter, setSelectedFilter] = useState('total');
    const [processedActors, setProcessedActors] = useState([]);
    const [chartLabels, setChartLabels] = useState([]);
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
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
        setProcessedActors(sortedActors);
    },[actors, selectedFilter])
    useEffect(() => {
        const labels = processedActors.map(actor => actor.name);
        const data = [
            ...selectedFilter !== 'movies'  ? [{
                name: "Series",
                color: "coral",
                data: processedActors.map(actor => actor.series.length),
                items: processedActors.map(actor => actor.series)
            }] : [],
            ...selectedFilter !== 'series'  ? [{
                name: "Movies",
                color: "deepSkyBlue",
                data: processedActors.map(actor => actor.movies.length),
                items: processedActors.map(actor => actor.movies)
            }] : []
        ];
        setChartLabels(labels);
        setChartData(data);
    }, [selectedFilter, processedActors])
    const onFilterChanged = useCallback(event => {
        setSelectedFilter(event.target.value);
    },[])
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
        <BarChart labels={chartLabels} data={chartData}/>
    </Styled.Container>;
}

export default memo(DataView);