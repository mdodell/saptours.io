import React, {Fragment, useState} from 'react';
import {Icon} from "antd";
import UserFeedbackModal from "../../../modals/UserFeedbackModal";

 const FeedbackIcon=()=>{
    const [visible, toggleVisible]=useState(false)
     return(
        <Fragment>
            <Icon
                style={styles.feedbackIconStyles}
                type="question-circle"
                size="large"
                onClick={()=>toggleVisible(!visible)}
            />
            <UserFeedbackModal onOk={()=>{toggleVisible(!visible)}} onCancel={()=>{toggleVisible(!visible)}} visible={visible}/>
        </Fragment>
     )
}

const styles={
     feedbackIconStyles:{
         fontSize:'2em',
         marginRight:'.5em',
         color:'white'
     }

}

export default FeedbackIcon;