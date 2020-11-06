import React from 'react'

interface IModal {
    text: string
}

function Modal({text}: IModal) {
    return (
        <div className="modal">
            <div className="modal-inner">
                {text}
            </div>
        </div>
    )
}

export {Modal}
