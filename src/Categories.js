import React, { useContext } from 'react'

import { TaskContext } from './TaskContext'

export const Categories = () => {
  const { selectedCategory, setSelectedCategory } = useContext(TaskContext)

  const onCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
  }
  return (
    <div className='form-group'>
      <select
        className='form-control form-control-lg custom-select'
        id='category'
        style={{ height: '45px' }}
        onChange={onCategoryChange}
        defaultValue='Category'
      >
        <option disabled>Category</option>
        <option selected={selectedCategory.category === 'Study'}>Study</option>
        <option selected={selectedCategory.category === 'Workout'}>Workout</option>
        <option selected={selectedCategory.category === 'Housekeeping'}>Housekeeping</option>
      </select>
    </div>
  )
}
