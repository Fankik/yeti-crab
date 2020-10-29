import React from 'react';
import { connect } from 'react-redux';

const Modal = (state) => {

    const appForm = state.store[state.appFormNum];

    return (
        state.showModal &&
        <div className="modal-container">
            <div className="modal-block">
                <h2>id: {appForm.id}</h2>
                <button className="modal-close" onClick={state.modalClose}><span></span></button>
                <div className="modal-app-form">
                    <ul className="app-form-list">
                        <li><p>Дата и время: {state.currentDate}</p></li>
                        <li><p>Название фирмы:</p><input className="name-company" value={appForm.nameCompany} onChange={state.changeInputAppForm} /></li>
                        <li><p>ФИО перевозчика:</p><input className="name-transporter" value={appForm.nameTransporter} onChange={state.changeInputAppForm} /></li>
                        <li><p>Контактный телефон перевозчика:</p><input className="number-transporter" value={appForm.numberTransporter} onChange={state.changeInputAppForm} /></li>
                        <li><p>Комментарий:</p><textarea className="comments" value={appForm.comments} onChange={state.changeInputAppForm} /></li>
                        <li><p>ATI код:</p><input className="ati-code" value={appForm.ati} onChange={state.changeInputAppForm} /></li>
                    </ul>
                </div>
                <button className="save-app-form" onClick={state.saveAppForm}>Сохранить</button>
                {!(state.createAppForm) && <button className="remove-app-form" onClick={state.removeAppForm}>Удалить</button>}
            </div>
        </div>
    );
}


export default connect(
    state => ({ store: state })
)(Modal);