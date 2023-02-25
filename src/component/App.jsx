import React, { useState, useRef, useEffect } from "react";
import "../App.css";

const App = () => {
    const dragItem = useRef();
    const dragToItem = useRef();

    const [lists, setLists] = useState({
        ToDo: {
            title: "ToDo",
            items: [
                {
                    title: "task 1",
                    comments: "Description of task 1",
                },
            ],
        },
        InProgress: {
            title: "InProgress",
            items: [
                {
                    title: "task 2",
                    comments: "Description of task 2",
                },
                {
                    title: "task 3",
                    comments: "Description of task 3",
                },
                {
                    title: "task 4",
                    comments: "Description of task 4",
                },
            ],
        },
        Done: {
            title: "Done",
            items: [
                {
                    title: "task 5",
                    comments: "Description of task 5",
                },
            ],
        },
    });

    const dragStart = (e, col, position) => {

        dragItem.id = position;
        dragItem.cat = col;
    };

    const dragEnter = (e, col, position) => {

        if (position === null) {
            if (lists[col].items.length < 1) {
                dragToItem.id = position;
                dragToItem.cat = col;
            }
        } else {
            dragToItem.id = position;
            dragToItem.cat = col;
        }
    };

    const drop = (e) => {
        const copyLists = { ...lists };
        const listRemove = { ...copyLists[dragItem.cat].items[dragItem.id] };
        copyLists[dragItem.cat].items.splice(dragItem.id, 1);
        if (copyLists[dragToItem.cat].items.length === dragToItem.id+1 && dragItem.cat !== dragToItem.cat){
            copyLists[dragToItem.cat].items.splice(dragToItem.id+1, 0, listRemove);
        }
        else{
            copyLists[dragToItem.cat].items.splice(dragToItem.id, 0, listRemove);
        }
        setLists(copyLists);
        dragItem.id = null;
        dragItem.cat = null;
        dragToItem.id = null;
        dragToItem.cat = null;
    };

    return (
        <div className="container">
            {Object.entries(lists).map((list) => (
                <div className={`${list[1].title}_wrapper`} key={list[1].title}>
                    <h2>{list[1].title}</h2>
                    <div
                        className={`${list[1].title}_container`}
                        onDragEnter={(e) => dragEnter(e, list[1].title, null)}
                    >
                        {list[1].items.map((item, index) => (
                            <div
                                className={`${list[1].title}_item`}
                                key={index}
                                onDragStart={(e) =>
                                    dragStart(e, list[1].title, index)
                                }
                                onDragEnter={(e) =>
                                    dragEnter(e, list[1].title, index)
                                }
                                onDragEnd={drop}
                                draggable
                            >
                                <p>{item.title}</p>
                                <p>Comment: {item.comments}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
export default App;
