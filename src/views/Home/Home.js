import React from 'react'
import "./Home.css"
import Task from '../../component/Task/Task'
import { useState } from 'react'


const Home = () => {
    const [taskList, setTaskList] = useState([
        {
            id: 1,
            title: 'Submit assignment',
            description: 'otherwise do not allow in class',
            priority: 'high'
        },
        
        {
            id: 3,
            title: 'Build Project ',
            description: 'Build Project and Post it on LinkedIn',
            priority: ' Veryhigh'
        },
        {
            id: 4,
            title: 'Good Night',
            description: 'Go To Sleep',
            priority: 'high'
        }
    ])
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const addTaskToList = () =>{
        const randomId = Math.floor(Math.random()*1000);
        const obj = {
            id: '',
            title:title,
            description: description,
            priority:priority
            
        }
        setTaskList([...taskList,obj])
        setTitle('');
        setDescription('');
        setPriority('')
    }
    return (
        <div className='container'>
            <h1 className='app-tittle'>Pinklist 📃</h1>
            <div className='todo-flex-container'>
                <div>
                    <h2 className='text-center'>Show List</h2>
                    {
                        taskList.map((taskItem, index) => {
                            const { id, title, description, priority } = taskItem;
                            return <Task id={id} title={title} description={description} priority={priority} />
                        })
                    }


                </div>
                <div>
                    <h2 className='text-center'>Add List</h2>
                    <div className='add-tas-form-container'>

                        <form>

                            <input type='text'
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }} 
                             placeholder='Enter Title '
                             className='task-input'/>
                            <input type='text'
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                                placeholder='Enter Description  '
                                className='task-input' />
                            priority:
                            <input type='text'
                                value={priority}
                                onChange={(e) => {
                                    setPriority(e.target.value)
                                }} 
                                placeholder='Enter Priority  '
                                className='task-input'/>
                               <button type='button
                               'className='btn-add-task'
                                onClick={addTaskToList}>
                                    Add Task to List
                                    </button>
                        </form>

                    </div>

                </div>
            </div>
        </div>
    )
}


export default Home