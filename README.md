# Документация API

## Запуск приложения

### `npm install`

Перед первым запуском Web-приложения нужно установить зависимость и пакеты.

### `npm start`

После установки запустить сервер. Сервер откроется по адресу: [http://localhost:3000](http://localhost:3000)

## Компоненты web-приложения

Приложение реализовано с помощью технологий React.js, Redux.js и состоит из 4 компонентов: App.jsx, Filter.jsx, Modal.jsx, Search.jsx.

## App.jsx

Этот компонент родительский в нем располагаются все остальные компоненты. Компонент отображает таблицу приложения и обрабатывает взаимодействие с ней.

##### Хуки и функции компоненты App.jsx

### Хуки

```javascript
    const [id, setId] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [showTable, setShowTable] = useState(true);
    const [createAppForm, setCreateAppForm] = useState(false)
    const [appFormNum, setAppFormNum] = useState(0);
    const [currentDate, setCurrentDate] = useState(0);
    const [searchInp, setSearchInp] = useState(0);
    const [searchArray, setSearchArray] = useState([]);
```

####  `const [id, setId]`

Используется для контроля id заявок.

####  `const [showModal, setShowModal]`

Используется для контроля отображения модального окна. False скрыто, True отображено.

####  `const [showTable, setShowTable]`

Используется для контроля отображения таблицы. False скрыто, True отображено.

####  `const [createAppForm, setCreateAppForm]`

Используется для контроля создания таблицы. False не создается, True создается.
**Модальное окно используется для создания и изменения заявок.

####  `const [appFormNum, setAppFormNum]`

Используется для установки номера изменяемой заявки.

####  `const [currentDate, setCurrentDate]`

Используется для установки даты создания заявки.

####  `const [searchInp, setSearchInp]`

Используется для считывания значения из поисковой строки.

####  `const [searchArray, setSearchArray]`

Массив для сохранения номеров найденных или отфильтрованных заявок, для из дальнейшего отображения.

### Функции

#### `createAppFrom()`

```javascript
 const createAppFrom = () => {
        document.body.style.overflow = "hidden";
        setShowModal(true);
        setCreateAppForm(true);
        setAppFormNum(state.store.length);
        getCurrentDate();
        localStorage.setItem('currentState', JSON.stringify(state.store));
        state.dispatch(createAppFormAction(id + 1));
    }
```

С помощью этой функции создается новая заявка. Запрещаем прокрутку страницы, открываем модальное окно, ставим значение создания заявки, устанавливаем номер новой заявки, генерируем время, сохраняем в localstorage стейт на случай отмены создания заявки, создаем заявку.

#### `changeAppForm()`

```javascript
 const changeAppForm = (event) => {
        document.body.style.overflow = "hidden";
        setShowModal(true);
        setAppFormNum(event.target.getAttribute('app-form-num'));
        setCurrentDate(state.store[event.target.getAttribute('app-form-num')].date);
        localStorage.setItem('currentState', JSON.stringify(state.store));
    }
```

С помощью этой функции изменяется заявка.  Запрещаем прокрутку страницы, открываем модальное окно, устанавливаем номер изменяемой заявки, устанавливаем время, сохраняем стейт на случай отмены изменений.

#### `modalClose()`

```javascript
 const modalClose = () => {
        document.body.style.overflow = "unset";
        setShowModal(false);
        setCreateAppForm(false);
        state.dispatch(setCurrentStoreAction(JSON.parse(localStorage.getItem('currentState'))));
    }
```

Функция закрытия модального окна. Разрешаем прокрутку страницы, закрываем окно, setCreateAppForm устанавливаем false, возвращаем сохраненный стейт.

#### `changeInputAppForm()`

```javascript
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
```

Функция для изменения заявок. У каждого input на его изменении срабатывает эта функция и в зависимости от сработанного input в стейт будет изменится свое поле.

#### `saveAppForm()`

```javascript
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
```

Функция сохранения заявки. Разрешаем прокрутку страницы, проверка на создание заявки, закрытие модального окна, setCreateAppForm устанавливаем false, записываем дату и время, сохраняем стейт чтобы после перезагрузки страницы все осталось.

#### `removeAppForm()`

```javascript
    const removeAppForm = () => {
        document.body.style.overflow = "unset";
        setShowModal(false);
        state.dispatch(removeAppFormAction(appFormNum));
        localStorage.setItem('saveStore', JSON.stringify(state.store));
    }
```

Функция удаления заявок. Разрешаем прокрутку страницы, закрываем модальное окно, удаляем заявку из стейта, сохраняем стейт чтобы после перезагрузки страницы все осталось.

#### `searchAppForm()`

```javascript
    const searchAppForm = () => {
        setShowTable(false);
        setSearchArray([]);
        state.store.forEach((appForm, index) => {
            if ((appForm.id + appForm.date + appForm.nameCompany + appForm.nameTransporter + appForm.numberTransporter + appForm.comments + appForm.ati).match(searchInp)) {
                setSearchArray(prevState => ([...prevState, index]));
            }
        });
    }
```

Функция для поиска совпадений во всей таблице. Скрываем таблицу, очищаем массив setSearchArray([]), перебираем каждую заявку, в каждой заявке складываем все поля в одну строку и сравниваем их с поисковым полем, если одно из слов совпадает записываем в массив, который отправляется в компонент Search.jsx там он отображается.

#### `getCurrentDate()`

```javascript
    const getCurrentDate = () => {
        let currentDate = new Date();
        let Year = currentDate.getFullYear();
        let Month = currentDate.getMonth() + 1;
        let Day = currentDate.getDate();
        let Hour = currentDate.getHours();
        let Minutes = currentDate.getMinutes();
        let Seconds = currentDate.getSeconds();
        setCurrentDate(addZeroToTime(Day) + "." + addZeroToTime(Month) + "." + addZeroToTime(Year) + "  " + addZeroToTime(Hour) + ":" + addZeroToTime(Minutes) + ":" + addZeroToTime(Seconds));
    }}
```

Функция для генерации времени создания заявки.

#### `addZeroToTime()`

```javascript
 const addZeroToTime = (time) => {
        if (parseInt(time) < 10) time = '0' + time;
        return time;
    }
```

Функция добавления ноля для времени.

## Modal.jsx

Дочерний компонент. Используется для отображения создаваемой или изменяемой заявки. Управление происходит из компоненты App.jsx. При нажатии на изменение заявки в Modal.jsx передается номер заявки. По номеру из стейта берется нужная заявка и изменяется.

## Search.jsx

Дочерний компонент. Используется для отображения найденных или отфильтрованных полей. Управление происходит из компоненты App.jsx. В поисковой строке вводится искомое слово, находится нужная заявка, создается массив номеров заявок и передается в Search.jsx. Далее по номерам из стейта берутся заявки и отображаются. 

## Filter.jsx

Дочерний компонент. Используется для фильтрации заявок.

##### Хуки и функции компоненты Filter.jsx

### Хуки 

```javascript
 const [inputValue, setInputValue] = useState({
        id: "",
        date: "",
        nameCompany: "",
        nameTransporter: "",
        numberTransporter: "",
        comments: "",
        ati: ""
    })
```

Объект со всеми полями заявки. При изменении input в компоненте Filter.jsx данные сохраняются в этот объект для дальнейшего сравнения с таблицей и фильтрации.

### Функции

#### `changeFilterInp()`

```javascript
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
```

У каждого input на его изменении срабатывает эта функция и в зависимости от сработанного input в объекте будут изменены свои свойства.

#### `applyFilter()`

```javascript
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
``` 

Функция фильтрации заявок. Скрывается таблица очищается массив state.setSearchArray([]). Фильтрация заявок происходит путем сравнения каждого поля каждой заявки с теми полями, которые мы заполняли в компоненте Filter.jsx. Номера найденных полей заполняются в массив передаются в компонент Search.jsx и там отображаются.
