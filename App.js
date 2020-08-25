function Header() {
    return (
        <div className="header">
            To-do list
        </div>
    );
};

function Footer() {
    return (
        <p className="attribution">
            <img src="./img/GitHub-Mark-64px.png" width="64" height="64" />
            Coded by <a href="https://github.com/carlospgraciano">Carlos Polanco</a>.
        </p>
    );
};

function handleTaskAddition(e, setTask) {
    setTask({ description: e.target.value, isDone: false });
};

function ToDoItem({ item: [task, setTask], index, items, setItems }) {
    const inputValue = (task.description || "");
    const handleCheckTask = () => {
        const doneItem = [{ ...task, isDone: true }, setTask];
        setItems(items.map((item, idx) => {
            if (index === idx) {
                item = doneItem;
            }
            return item;
        }));
    };
    const handleRemoveTask = () => setItems(items.filter((item, idx) => (idx !== index)));

    if (task.isDone) {
        return (
            <div className="item">
                <input
                    className="item-input checked"
                    placeholder="Create new task"
                    value={inputValue}
                    disabled
                />
                <button
                    className="btn item-done-btn checked"
                    type="button"
                    disabled
                >
                    &#10004;
            </button>
                <button
                    className="btn item-remove-btn checked"
                    type="button"
                    disabled
                >
                    &#x1F5D1;
            </button>
            </div>
        );
    } else {
        return (
            <div className="item animate__animated animate__slideInDown animate__faster">
                <input
                    className="item-input"
                    placeholder="Create new task"
                    value={inputValue}
                    onChange={(e) => handleTaskAddition(e, setTask)}
                />
                <button
                    className="btn item-done-btn"
                    type="button"
                    onClick={handleCheckTask}
                >
                    &#10004;
            </button>
                <button
                    className="btn item-remove-btn"
                    type="button"
                    onClick={handleRemoveTask}
                >
                    &#x1F5D1;
            </button>
            </div>
        );
    }
};

function ToDoForm({ items, setItems }) {
    const inputEl = React.useRef(null);
    const [task, setTask] = React.useState('');

    const handleItemAddition = (e) => {
        setItems([...items, [task, setTask]]);
        inputEl.current.value = "";
    }

    return (
        <div className="form">
            <input
                ref={inputEl}
                className="input"
                placeholder="Create new task"
                onChange={(e) => handleTaskAddition(e, setTask)}
            />
            <button
                className="btn add-todo"
                type="button"
                onClick={handleItemAddition}
            >
                &#43;
            </button>
        </div>
    );
};

function ToDo() {
    const [items, setItems] = React.useState([]);

    return (
        <div className="to-do">
            <ToDoForm items={items} setItems={setItems} />
            {items.map((item, idx) => {
                return (
                    <ToDoItem
                        item={item}
                        key={idx}
                        index={idx}
                        items={items}
                        setItems={setItems}
                    />
                );
            })}
        </div>
    )
};

function App() {
    return (
        <div className="app">
            <Header />
            <ToDo />
            <Footer />
        </div>
    );
};

ReactDOM.render(<App />, document.querySelector("#root"));