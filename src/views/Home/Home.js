import React, { useEffect } from 'react'
import "./Home.css"
import Task from '../../component/Task/Task'
import { useState } from 'react'
import showToast from 'crunchy-toast';

import { saveListTOLocalStorage } from './../../util/LocalStorage';

const Home = () => {
    const [taskList, setTaskList] = useState([
        {
            id: 1,
            title: 'Submit assignment',
            description: 'otherwise do not allow in class',
            priority: 'high'
        },

        {
            id: 2,
            title: 'Build Project ',
            description: 'Build Project and Post it on LinkedIn',
            priority: ' Veryhigh'
        }

    ])
    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        const list = JSON.parse(localStorage.getItem('pinklist'));
        if (list && list.length >= 0) {
            setTaskList(list)
        }

    }, [])





    const clearInputField = () => {
        setTitle('');
        setDescription('');
        setPriority('');
    }
    const findTaskIndexById = (taskid) => {
        let index;
        taskList.forEach((task, i) => {
            if (task.id === taskid) {
                index = i
            }
        })
        return index;
    }
    const checkRequiredFields = () => {

        if (!title) {
            showToast('Title is required!', 'alert', 3000);
            return false;
        }
        if (!description) {
            showToast('Description is required!', 'alert', 3000);
            return false;
        }
        if (!priority) {
            showToast('Priority is required!', 'alert', 3000);
            return false;
        }
        return true;

    }


    const addTaskToList = () => {
        if (checkRequiredFields() === false) {
            return;
        }
        const randomId = Math.floor(Math.random() * 1000);
        const obj = {
            id: randomId,
            title: title,
            description: description,
            priority: priority

        }
        const newTaskList = [...taskList, obj]
        setTaskList(newTaskList)
        clearInputField();

        saveListTOLocalStorage(newTaskList)
        showToast('Task added successfully ', 'success', 3000);
    }
    const removeTaskFromList = (id) => {
        const index = findTaskIndexById(id);

        const tempArray = taskList;
        tempArray.splice(index, 1);
        setTaskList([...tempArray])
        saveListTOLocalStorage(tempArray)
        showToast('Task deleted  successfully ', 'alert', 3000);

    }
    const setTaskEditable = (id) => {
        setIsEdit(true);
        setId(id);

        const index = findTaskIndexById(id);
        const currentEditTask = taskList[index];
        setTitle(currentEditTask.title);
        setDescription(currentEditTask.description);
        setPriority(currentEditTask.priority)

    }
    const UpadateTask = () => {
        if (checkRequiredFields() === false) {
            return;
        }
        const indexToUpdate = findTaskIndexById(id);
        const tempArray = taskList;
        tempArray[indexToUpdate] = {
            id: id,
            title: title,
            description: description,
            priority: priority
        }
        setTaskList([...tempArray])
        saveListTOLocalStorage(tempArray)
        setId(0);
        clearInputField();
        setIsEdit(false);

        showToast('Task updated  successfully ', 'info', 3000);



    }
    return (
        <div className='container'>
            <h1 className='app-tittle'>Pinklist 📃</h1>
            <div className='todo-flex-container'>
                <div>
                    <h2 className='text-center'>Show List</h2>
                    <div className='task-container'>
                        {
                            taskList.map((taskItem, index) => {
                                const { id, title, description, priority } = taskItem;
                                return <Task id={id} title={title} description={description} priority={priority} key={index} removeTaskFromList={removeTaskFromList} setTaskEditable={setTaskEditable} />
                            })
                        }

                    </div>
                </div>
                <div>
                    <h2 className='text-center'>
                        {isEdit ? `'Upadate Task' ${id}` : 'Add Task'}</h2>
                    <div className='add-tas-form-container'>

                        <form>

                            <input type='text'
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                                placeholder='Enter Title '
                                className='task-input' />
                            <input type='text'
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                                placeholder='Enter Description  '
                                className='task-input' />

                            <input type='text'
                                value={priority}
                                onChange={(e) => {
                                    setPriority(e.target.value)
                                }}
                                placeholder='Enter Priority  '
                                className='task-input' />
                            <div className='btn-container' >
                                <button className='btn-add-task'
                                    type='button'
                                    onClick={() => {
                                        isEdit ? UpadateTask() : addTaskToList()
                                    }}> {isEdit ? 'update' : 'Add'}
                                </button>






                            </div>

                        </form>

                    </div>

                </div>
            </div>
        </div>
    )
}


export default Home