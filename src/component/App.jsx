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
                    edit : false,
                },
            ],
        },
        InProgress: {
            title: "InProgress",
            items: [
                {
                    title: "task 2",
                    comments: "Description of task 2",
                    edit : false,
                },
                {
                    title: "task 3",
                    comments: "Description of task 3",
                    edit : false,
                },
                {
                    title: "task 4",
                    comments: "Description of task 4",
                    edit : false,
                },
            ],
        },
        Done: {
            title: "Done",
            items: [
                {
                    title: "task 5",
                    comments: "Description of task 5",
                    edit : false,
                },
            ],
        },
    });

    const btn_c = (title, index) => {
        const copyLists = { ...lists };
        if (!copyLists[title].items[index].edit){
            copyLists[title].items[index].edit = true;
        }
        else{
            copyLists[title].items[index].edit = false;
        }
        setLists(copyLists);
    }

    const addTask = (title) => {
        const copyLists = { ...lists };
        const new_task = {
            title: "new task",
            comments: "Description of new task",
            edit : false,
        };
        copyLists[title].items.push(new_task);
        setLists(copyLists)
    };

    const delTask = (title, index) => {
        const copyLists = { ...lists };
        copyLists[title].items.splice(index,1);
        setLists(copyLists)
    };

    const updateComment = (evt) => {
        evt.preventDefault();
        const copyLists = { ...lists };
        let title = evt.target.getAttribute("data-title");
        let index = evt.target.getAttribute("data-index");
        copyLists[title].items[index].comments = evt.target.value;
        setLists(copyLists);

    }

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

                                {(() => {
                                    if(list[1].items[index].edit === false){
                                        return (
                                            <div>
                                                <p>{item.title}</p>
                                                <p>Comment: {item.comments}</p>
                                                <button className="btn_delTask" onClick={()=>{delTask(list[1].title,index)}}>Delete</button>
                                                <button type="submit" className="btn_comment" onClick={()=>{btn_c(list[1].title, index)}}>EDIT</button>
                                            </div>)
                                    }
                                    else{
                                        return (
                                            <div>
                                                <textarea name="title_textbox" cols="30" rows="1" className={`${list[1].title}_text`}>
                                                    {item.title}
                                                </textarea>
                                                <textarea name="comment_textbox" data-title={list[1].title} data-index={index}
                                                className={`${list[1].title}_text`} onChange={updateComment} cols="30" rows="2">
                                                    {item.comments}
                                                </textarea>
                                                <button type="submit" className="btn_comment" onClick={()=>{btn_c(list[1].title, index)}}>Submit</button>
                                            </div>)
                                    }
                                })()}
                            </div>
                        ))}
                        <button className="btn_addTask" onClick={()=>{addTask(list[1].title)}}>Add Task</button>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default App;
