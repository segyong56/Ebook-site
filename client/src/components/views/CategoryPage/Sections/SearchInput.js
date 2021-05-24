import React, { useState } from 'react'
import { Input } from 'antd'

const { Search } = Input

function SearchInput(props) {

    const [SearchTerm, setSearchTerm] = useState("")

    const onChangeSearch = (event) => {
        setSearchTerm(event.currentTarget.value)
        props.refreshFunction (event.currentTarget.value)
    }
    


    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto'}}>
            <br />
                 <Search 
                 placeholder="input search text" 
                 onChange={onChangeSearch}
                 value={SearchTerm}
                 style={{ width: '250px', height:'40px', fontSize: '15px' }} />
            <br />
            <br/>
        </div>
    )
}

export default SearchInput
