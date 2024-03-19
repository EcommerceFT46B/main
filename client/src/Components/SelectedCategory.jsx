import React from 'react'

function SelectedCategory(select) {
  return (
    <select>
        <option value="all">All Categories</option>
<option value="motherboard">motherboard</option>
<option value="computer">Computer</option>
<option value="gpu">gpu</option>
<option value="mouse">mouse</option>
<option value="keyboard">keyboard</option>
<option value="screen">screen</option>
    </select>
    )
}

export default SelectedCategory