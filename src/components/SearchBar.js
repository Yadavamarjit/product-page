import React from 'react'

function SearchBar(props) {
    return (
        <div>
            <input type="text" className="search-box" placeholder="Search..." {...props} />
        </div>
    )
}

export default SearchBar
