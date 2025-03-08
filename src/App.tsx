import React, { ChangeEvent, useState } from "react";
import { ITodo } from "./types.tsx"
import "./app.css"
export default function App() {
    const [todos, setTodos] = useState<ITodo[]>([
        {
            id: "1",
            title: "title 1",
            description: "description 1",
            complete: false,
        },
        {
            id: "2",
            title: "title 2",
            description: "description 2",
            complete: true,
        },
        {
            id: "3",
            title: "title 3",
            description: "description 3",
            complete: false,
        },
    ]);
    const [search, setSearch] = useState<string>("");
    const [addTitle, setAddTitle] = useState<string>("");
    const [addDescription, setAddDescription] = useState<string>("");
    const [addModal, setAddModal] = useState<boolean>(false);
    const [editTitle, setEditTitle] = useState<string>("");
    const [editDescription, setEditDescription] = useState<string>("");
    const [editModal, setEditModal] = useState<boolean>(false);
    const [idx, setIdx] = useState<number | null | string>(null);

    function add(): void {
        setTodos([...todos, { title: addTitle, description: addDescription, id: Date.now(), complete: false }]);
        setAddModal(false);
        setAddTitle("");
        setAddDescription("");
    }

    function handleEdit(todo: ITodo): void {
        setIdx(todo.id);
        setEditTitle(todo.title);
        setEditDescription(todo.description);
        setEditModal(true);
    }

    function edit(): void {
        setTodos(
            todos.map((todo) => (todo.id === idx ? { ...todo, title: editTitle, description: editDescription } : todo))
        );
        setEditModal(false);
    }

    function removeTodo(id: number | string) {
        setTodos(todos.filter((todo: ITodo) => todo.id != id));
    }

    function checkTodo(id: number | string) {
        setTodos(todos.map((todo: ITodo) => {
            if (todo.id == id) {
                todo.complete = !todo.complete
            }
            return todo
        }))
    }

    let data = <>
        {todos.filter((todo: ITodo) =>
            JSON.stringify(todo)
                .toLowerCase()
                .trim()
                .includes(search.toLowerCase().trim())
        ).map((todo: ITodo) => (
            <li
                style={{
                    textDecoration: todo.complete ? "line-through" : "",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                }}
                key={todo.id}
            >
                <p>{todo.id}</p>
                <p>{todo.title}</p>
                <p>{todo.description}</p>
                <input
                    placeholder="complete"
                    type="checkbox"
                    onChange={() => checkTodo(todo.id)}
                    checked={todo.complete}
                />
                <div className="todo_actions">
                    <button onClick={() => removeTodo(todo.id)}>Delete</button>
                    <button onClick={() => handleEdit(todo)}>Edit</button>
                </div>
            </li>
        ))}
    </>

    return (
        <ul>
            <button onClick={() => setAddModal(true)}>Add</button>
            <input
                type="search"
                placeholder="search..."
                value={search}
                className="search"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSearch(e.target.value)
                }
            />
            {(addModal || editModal) && (
                <div >
                    <div>
                        <input
                            type="text"
                            value={addModal ? addTitle : editTitle}
                            onChange={(e) => (addModal ? setAddTitle(e.target.value) : setEditTitle(e.target.value))}
                            placeholder="Title"
                        />
                        <input
                            type="text"
                            value={addModal ? addDescription : editDescription}
                            onChange={(e) => (addModal ? setAddDescription(e.target.value) : setEditDescription(e.target.value))}
                            placeholder="Description"
                        />
                        <div>
                            <button onClick={() => (addModal ? setAddModal(false) : setEditModal(false))}>Cancel</button>
                            <button onClick={addModal ? add : edit}>Save</button>
                        </div>
                    </div>
                </div>
            )}
            {data}
            <p>{data.props.children.length == 0 && "404"}</p>
        </ul>
    );
}
