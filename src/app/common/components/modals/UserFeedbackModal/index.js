import React from 'react';
import { Modal, Icon, Button } from 'antd';

const UserFeedbackModal=({visible, onCancel})=>{
        return(
            <Modal
                title={"Tell us what you're thinking!"}
                visible={visible}
                onCancel={onCancel}
                closable={true}
                bodyStyle={{padding: 10}}
                footer={null}
                width={300}

            >
                <div>
                    <Icon type="bug"
                          theme="twoTone"
                          twoToneColor="#003478"/>

                    <a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=bgreene@brandeis.edu&su=saptours%20[Bug%20Report]&tf=1&body=Write%20your%20bug%20report%20here!%20Please%20include%20as%20much%20detail%20as%20possible%2C%20including%20screenshots%20if%20applicable.%20You%20may%20delete%20this%20text%20but%20please%20don%27t%20change%20the%20subject%20line!%20We%20will%20try%20to%20have%20it%20resolved%20as%20soon%20as%20possible.%20"
                        style={styles.linkStyle}>
                        Report a Bug!</a>
                </div>

                <div>
                    <Icon type="tool"
                          fill="#003478" />

                    <a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=bgreene@brandeis.edu&su=saptours%20[Suggested%20Feature]&tf=1&body=Write%20your%20suggested%20feature%20here!%20You%20may%20delete%20this%20text%20but%20please%20don%27t%20change%20the%20subject%20line!%20"
                       style={styles.linkStyle}>
                        Suggest new Features!</a>
                </div>
                <div>
                    <Icon type="mail"
                          theme="twoTone"
                          twoToneColor="#003478"/>

                    <a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=bgreene@brandeis.edu&to=mdodell@brandeis.edu&su=SAP%20Website&tf=1"
                       style={styles.linkStyle}>
                        Contact the Developers!</a>
                </div>
            </Modal>
        )
};

const styles = {
    linkStyle: {
        color: "#003478",
        marginLeft: '15px',
        textDecoration:'underline',
        marginBottom:'40px'
    }
};

export default UserFeedbackModal;