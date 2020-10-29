import React, { useState } from 'react';
import { connect } from 'react-redux';

const Filter = (state) => {

    const [inputValue, setInputValue] = useState({
        id: "",
        date: "",
        nameCompany: "",
        nameTransporter: "",
        numberTransporter: "",
        comments: "",
        ati: ""
    })

    const changeFilterInp = (event) => {
        let targetValue = event.target.value;
    
        switch (event.target.className) {
            case "id-input":
                setInputValue(prevState=>({...prevState, id: targetValue}));
                break; 
            case "date-input":
                setInputValue(prevState=>({...prevState, date: targetValue}));
                break;
            case "name-company":
                setInputValue(prevState=>({...prevState, nameCompany: targetValue}));
                break;
            case "name-transporter":
                setInputValue(prevState=>({...prevState, nameTransporter: targetValue}));
                break;
            case "number-transporter":
                setInputValue(prevState=>({...prevState, numberTransporter: targetValue}));
                break;
            case "comments":
                setInputValue(prevState=>({...prevState, comments: targetValue}));
                break;
            case "ati-code":
                setInputValue(prevState=>({...prevState, ati: targetValue}));
                break;
            default:
        }
    }

    const applyFilter = () =>{
        state.setShowTable(false);
        state.setSearchArray([]);

        state.store.forEach((appForm, index) => {
            Object.keys(appForm).forEach((keys, indexKey)=>{
                if(String(appForm[keys]).match(inputValue[Object.keys(inputValue)[indexKey]]) && String(appForm[keys])!=="" && inputValue[Object.keys(inputValue)[indexKey]] !==""){
                    state.setSearchArray(prevState => ([...prevState, index]));
                }
            });
        });
    }


    return (
        <div className="filter-container">
            <ul>
                <li><p>id</p><input className="id-input" type="text" onChange={changeFilterInp} /></li>
                <li><p>Дата и время</p><input className="date-input" type="text" onChange={changeFilterInp} /></li>
                <li><p>Название фирмы</p><input className="name-company" type="text" onChange={changeFilterInp} /></li>
                <li><p>ФИО перевозчика</p><input className="name-transporter" type="text" onChange={changeFilterInp} /></li>
                <li><p>Контактный телефон перевозчик</p><input className="number-transporter" type="text" onChange={changeFilterInp} /></li>
                <li><p>Комментарий</p><input className="comments" type="text" onChange={changeFilterInp} /></li>
                <li><p>ATI код</p><input className="ati-code" type="text" onChange={changeFilterInp} /></li>
            </ul>
            <button className="filter-button" onClick={applyFilter}>Фильтровать</button>
        </div>
    );
}

export default connect(
    state => ({
        store: state
    })
)(Filter);