import React from 'react'
import "./Task.css"
const Task = ({id,title,description,priority}) => {
  return (
    <div className='task-container'>
        <h1 className='class-title'>{title}</h1>
        <p className='task-description'>{description}</p>
       <span className='task-priority'>🎯 {priority}</span>
       <span className='task-delete'>🗑️</span>
      
    </div>
  )
}   

export default Task
