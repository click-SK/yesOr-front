import React from 'react';
import '../../../styles/modalWindow.scss'

const UserHistoryDonat = ({setIsOpen, isUser}) => {

    const historyArr = [
        {
            name: 'Prontorize File',
            amount: 1000
        },
        {
            name: 'Prontorize',
            amount: 3000
        },
        {
            name: 'AAXR',
            amount: 500
        },
    ]

    return (
        <div className='modal_wrap'>
            <div className='item_body pad'>
                <h2>History</h2>
                <div className='content_modal'>
                    <div className='title_wrap'>
                        {isUser ? 
                        <p>Project name</p> :
                        <p>User name</p>
                        }
                        <p>Donation amount</p>
                        {!isUser &&
                        <p>Coment</p>
                        }
                    </div>
                        {historyArr.map((item,idx) => (
                        <div kay={idx} className='info_wrap'>
                            <p>{item.name}</p>
                            <p>{item.amount}$</p>
                            {!isUser &&
                            <p>Coment</p>
                            }
                         </div>
                        ))}
                </div>
                <button
                onClick={() => setIsOpen(state => !state)}
                >Close</button>
            </div>
        </div>
    );
};

export default UserHistoryDonat;