import React, { useState } from 'react'
import { Input } from 'antd'

const { Search } = Input;

function SearchInput(props) {

    const [SearchTerms, setSearchTerms] = useState("")

    const onChangeSearch = (event) => {

        setSearchTerms(event.currentTarget.value)
        props.refreshFunction(event.currentTarget.value)
    }


    return (
        <div>
            <br />
                 <Search
                  placeholder="input search text" 
                  onChange={onChangeSearch} 
                  value={SearchTerms}
                  style={{ width: '100%', height:'50px', fontSize: '20px' }} />
            <br />
            <br/>
        </div>
    )
}

export default SearchInput
