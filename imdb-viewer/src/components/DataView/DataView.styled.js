import styled from 'styled-components';

export const Container = styled.div`
`

export const Filter = styled.div`
    display: flex;
    justify-content: center;
    
`;

export const FilterItem = styled.div`
    margin: 1em 2em;
    input {
        visibility: hidden;
    }
    label {
        cursor: pointer;
        font-size: 1.6em;
        margin-left: 0.25em;
    }
    label:before {
        width: 15px;
        height: 15px;
        border-radius: 15px;
        top: 0;
        left: -8px;
        position: relative;
        background-color: #d1d3d1;
        content: '';
        display: inline-block;
        visibility: visible;
        border: 2px solid white;

    }
    ${props => props.checked && `label:before {
        background-color: #ffa500;
        content: '';
        border: 2px solid white;
    }`}
`;