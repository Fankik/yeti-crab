import React from 'react';
import { connect } from 'react-redux';

const Search = (state) => {
    return (
        <>
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
                {state.store.map((appForm, index) => (
                    state.searchArray.map((numAppForm) => (
                        index === numAppForm &&
                        <tbody className="app-form" key={numAppForm}>
                            <tr>
                                <td><p>{appForm.id}</p></td>
                                <td><p>{appForm.date}</p></td>
                                <td><p>{appForm.nameCompany}</p></td>
                                <td><p>{appForm.nameTransporter}</p></td>
                                <td><p>{appForm.numberTransporter}</p></td>
                                <td><p>{appForm.comments}</p></td>
                                <td><a href={"https://ati.su/firms/"+(appForm.ati)+"/info"} target="_blank"  rel="noreferrer">{appForm.ati}</a></td>
                                <td><button className="change-app-form" onClick={state.changeAppForm} app-form-num={numAppForm}>Изменить</button></td>
                            </tr>
                        </tbody>
                    ))
                ))}
            </table>
            <button className="close-search-block"onClick={() => (state.setShowTable(true))}>Закрыть</button>
        </>
    );
}

export default connect(
    state => ({ store: state })
)(Search);