import React, {Fragment, useState} from 'react';
import {Icon} from "antd";
import UserSearchModal from "../../../../common/components/modals/UserSearchModal";

const SearchIcon=()=>{
    const [visible, toggleVisible]=useState(false)
    return(
        <Fragment>
            <Icon
                style={styles.SearchIconStyles}
                type="search"
                size="large"
                onClick={()=>toggleVisible(!visible)}
                color={"#003478"}
            />
            <UserSearchModal onOk={()=>{toggleVisible(!visible)}} onCancel={()=>{toggleVisible(!visible)}} visible={visible}/>
        </Fragment>
    )
}

const styles={
    SearchIconStyles:{
        fontSize:'2em',
        marginRight:'.5em',
        color:"#003478"
    }

}

export default SearchIcon;