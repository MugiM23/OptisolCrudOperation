import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import _isEmpty from 'lodash/isEmpty'

import TextInput from '../common/TextInput'
import { client } from '../FormComponent'

export default function UserManagementModal({
    show = '',
    handleClose,
    title = '',
    handleSuccess,
    selectedUserId = ''
}) {
    const [userDetail, setUserDetail] = useState({})
    const isReadOnly = (show === 'View User') ? true : false

    useEffect(() => {
        if (!_isEmpty(selectedUserId)) {
            client.get(`users/${selectedUserId}`)
                .then((response) => {
                    if (response.status === 200) {
                        setUserDetail(response.data)
                    }
                })
        }
    }, [selectedUserId, show])

    const onCloseModal = () => {
        setUserDetail({})
        handleClose()
    }
    return (
        <Modal show={show} onHide={onCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex flex-column'>
                    <div className="controls form-inline d-flex flex-column justify-content-between">
                        <div className='d-flex flex-column'>
                            <label>First Name</label>
                            <TextInput
                                readOnly={isReadOnly}
                                errorMessage={'First name required'}
                                name='firstName'
                                placeholder="First"
                                value={userDetail?.firstName}
                                required
                                onChange={(e) => setUserDetail({ ...userDetail, firstName: e.target.value })}
                            />
                        </div>
                        <div className='d-flex flex-column'>
                            <label>Email</label>
                            <TextInput
                                readOnly={isReadOnly}
                                errorMessage={'Email required'}
                                type="text"
                                className="form-register text w-100"
                                id=""
                                placeholder="E-mail"
                                value={userDetail?.email}
                                name='email'
                                required
                                onChange={(e) => setUserDetail({ ...userDetail, email: e.target.value })}
                            />
                        </div>
                        <div className='d-flex flex-column'>
                            <label>Phone</label>
                            <TextInput
                                readOnly={isReadOnly}
                                errorMessage={'Phone number required'}
                                type="text"
                                className="form-register text w-100"
                                id=""
                                placeholder="E-mail"
                                value={userDetail?.phoneNumber}
                                name='email'
                                required
                                onChange={(e) => setUserDetail({ ...userDetail, phoneNumber: e.target.value })}
                                maxLength={10}
                            />
                        </div>
                    </div>
                    {
                        show === 'View User' ? <div className='d-flex flex-column'>
                            <div className='d-flex p-2'>
                                <span className='col font-weight-bold'>Qualification</span>
                                <span className='col'>{userDetail?.qualification}</span>
                            </div>
                            <div className='d-flex p-2'>
                                <span className='col font-weight-bold'>Country</span>
                                <span className='col'>{userDetail?.country}</span>
                            </div>
                            <div className='d-flex p-2'>
                                <span className='col font-weight-bold'>State</span>
                                <span className='col'>{userDetail?.state}</span>
                            </div>
                            <div className='d-flex p-2'>
                                <span className='col font-weight-bold'>Zip code</span>
                                <span className='col'>{userDetail?.zipCode}</span>
                            </div>
                        </div>
                            : null
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCloseModal}>
                    Close
                </Button>
                {
                    (show === 'View User') ? null : <Button variant="primary" onClick={()=>handleSuccess(userDetail)}>
                        Save Changes
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    )
}
