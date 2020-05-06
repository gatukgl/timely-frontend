import React from 'react'

export const Categories = ({ selectedCategory, onChange }) => (
  <div className='form-group'>
    <select
      className='form-control form-control-lg custom-select'
      id='category'
      style={{ height: '45px' }}
      onChange={onChange}
      defaultValue='Category'
    >
      <option disabled>Category</option>
      <option selected={selectedCategory.category === 'Study'}>Study</option>
      <option selected={selectedCategory.category === 'Workout'}>Workout</option>
      <option selected={selectedCategory.category === 'Housekeeping'}>Housekeeping</option>
    </select>
  </div>
)
