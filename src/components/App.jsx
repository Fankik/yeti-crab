import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { changeAtiCodeAction, changeCommentsAction, changeNameCompanyAction, changeNameTransporterAction, changeNumberTransporterAction, createAppFormAction, removeAppFormAction, saveDateAction, setCurrentStoreAction } from '../redux/actons'
import Modal from './Modal';
import Search from './Search';
import Filter from './Filter';

const App = (state) => {

    const [id, setId] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [showTable, setShowTable] = useState(true);
    const [createAppForm, setCreateAppForm] = useState(false)
    const [appFormNum, setAppFormNum] = useState(0);
    const [currentDate, setCurrentDate] = useState(0);
    const [searchInp, setSearchInp] = useState(0);
    const [searchArray, setSearchArray] = useState([]);

    useEffect(() => {
        //localStorage.clear();
        let appId = localStorage.getItem('appId');
        appId === null ? setId(-1) : setId(parseInt(appId));
    }, []);

    const createAppFrom = () => {
        document.body.style.overflow = "hidden";
        setShowModal(true);
        setCreateAppForm(true);
        setAppFormNum(state.store.length);
        getCurrentDate();
        localStorage.setItem('currentState', JSON.stringify(state.store));
        state.dispatch(createAppFormAction(id + 1));
    }

    const changeAppForm = (event) => {
        document.body.style.overflow = "hidden";
        setShowModal(true);
        setAppFormNum(event.target.getAttribute('app-form-num'));
        setCurrentDate(state.store[event.target.getAttribute('app-form-num')].date);
        localStorage.setItem('currentState', JSON.stringify(state.store));
    }

    const modalClose = () => {
        document.body.style.overflow = "unset";
        setShowModal(false);
        setCreateAppForm(false);
        state.dispatch(setCurrentStoreAction(JSON.parse(localStorage.getItem('currentState'))));
    }

    const changeInputAppForm = (event) => {
        let targetValue = event.target.value;

        switch (event.target.className) {
            case "name-company":
                state.dispatch(changeNameCompanyAction(appFormNum, targetValue));
                break;
            case "name-transporter":
                state.dispatch(changeNameTransporterAction(appFormNum, targetValue));
                break;
            case "number-transporter":
                state.dispatch(changeNumberTransporterAction(appFormNum, targetValue));
                break;
            case "comments":
                state.dispatch(changeCommentsAction(appFormNum, targetValue));
                break;
            case "ati-code":
                state.dispatch(changeAtiCodeAction(appFormNum, targetValue));
                break;
            default:
        }
    }

    const saveAppForm = () => {
        document.body.style.overflow = "unset";
        if(createAppForm === true){
            setId(id + 1);
            localStorage.setItem('appId', id + 1);
        }
        setShowModal(false);
        setCreateAppForm(false);
        state.dispatch(saveDateAction(appFormNum, currentDate));
        localStorage.setItem('saveStore', JSON.stringify(state.store));
    }

    const removeAppForm = () => {
        document.body.style.overflow = "unset";
        setShowModal(false);
        state.dispatch(removeAppFormAction(appFormNum));
        localStorage.setItem('saveStore', JSON.stringify(state.store));
    }

    const searchAppForm = () => {
        setShowTable(false);
        setSearchArray([]);
        state.store.forEach((appForm, index) => {
            if ((appForm.id + appForm.date + appForm.nameCompany + appForm.nameTransporter + appForm.numberTransporter + appForm.comments + appForm.ati).match(searchInp)) {
                setSearchArray(prevState => ([...prevState, index]));
            }
        });
    }

    const getCurrentDate = () => {
        let currentDate = new Date();
        let Year = currentDate.getFullYear();
        let Month = currentDate.getMonth() + 1;
        let Day = currentDate.getDate();
        let Hour = currentDate.getHours();
        let Minutes = currentDate.getMinutes();
        let Seconds = currentDate.getSeconds();
        setCurrentDate(addZeroToTime(Day) + "." + addZeroToTime(Month) + "." + addZeroToTime(Year) + "  " + addZeroToTime(Hour) + ":" + addZeroToTime(Minutes) + ":" + addZeroToTime(Seconds));
    }

    const addZeroToTime = (time) => {
        if (parseInt(time) < 10) time = '0' + time;
        return time;
    }

    return (
        <>
            <div className="center-container">
                <div className="search-block">
                    <input className="search-input" type="text" onChange={(event)=>{setSearchInp(event.target.value);}} placeholder="Поиск..."/>
                    <button className="search-button" onClick={searchAppForm}>Найти</button>
                    <button className="create-app-form" onClick={createAppFrom}>Создать заявку</button>
                </div>
                <div className="main-table">
                    {showTable &&
                        <table>
                            <tbody>
                                <tr>
                                    <td><p>id</p></td>
                                    <td><p>Дата и время</p></td>
                                    <td><p>Название фирмы</p></td>
                                    <td><p>ФИО перевозчика</p></td>
                                    <td><p>Контактный телефон перевозчик</p></td>
                                    <td><p>Комментарий</p></td>
                                    <td><p>ATI код</p></td>
                                </tr>
                            </tbody>
                            {state.store.map((item, index) => (
                                <tbody className="app-form" key={index}>
                                    <tr>
                                        <td className="table-id"><p>{item.id}</p></td>
                                        <td className="table-date"><p>{item.date}</p></td>
                                        <td className="table-name-company"><p>{item.nameCompany}</p></td>
                                        <td className="table-name-transporter"><p>{item.nameTransporter}</p></td>
                                        <td className="table-number-transporter"><p>{item.numberTransporter}</p></td>
                                        <td className="table-comments"><p>{item.comments}</p></td>
                                        <td className="table-ati"><a href={"https://ati.su/firms/"+(item.ati)+"/info"} target="_blank"  rel="noreferrer">{item.ati}</a></td>
                                        <td className="table-button"><button className="change-app-form" onClick={changeAppForm} app-form-num={index}>Изменить</button></td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>}
                    {!showTable && <Search {...{ setShowTable, searchArray, changeAppForm }} />}
                </div>
                <Modal {...{ showModal, appFormNum, modalClose, currentDate, changeInputAppForm, saveAppForm, removeAppForm, createAppForm }} />
            </div>
            <Filter {...{searchArray, setSearchArray, setShowTable}} />
        </>
    );
}

export default connect(
    state => ({ store: state })
)(App);
