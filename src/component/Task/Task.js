import React from 'react'
import "./Task.css"
const Task = ({ id, title, description, priority, removeTaskFromList, setTaskEditable }) => {
  return (
    <div className='task-container'>
      <h1 className='class-title'>{title}</h1>
      <p className='task-description'>{description}</p>
      <span className='task-priority'>🎯 {priority}</span>
      <span className='task-delete' onClick={() => {
        removeTaskFromList(id);
      }}>🗑️</span>
      <span className='task-edit-icon' onClick={() => {
        setTaskEditable(id);
      }}>🖊️</span>


    </div>
  )
}

export default Task
