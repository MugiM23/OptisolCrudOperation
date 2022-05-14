import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { newUserValidation } from './validations/newUserValidation'
import UserManagementModal from './Modal/UserManagementModal'
import TextInput from './common/TextInput'

export const client = axios.create({ baseURL: 'http://54.202.218.249:9501/api' })

export default function FormComponent() {
  const [name, setName] = useState({ firstName: '', lastName: '' })
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState({ column1: '', column2: '', column3: '' })
  const [address, setAddress] = useState({ line1: '', line2: '', city: '', state: '', zipcode: '', country: '' })
  const [comments, setComments] = useState('')
  const [qualification, setQualification] = useState('')
  const [errorFieldName, setErrorFieldName] = useState('')
  const [usersList, setUsersList] = useState([])
  const [isCommentValidation, setIsCommentValidation] = useState(false)
  const [showModal, setShowModal] = useState('')
  const [selectedUserId, setSelectedUserId] = useState('')

  useEffect(() => {
    getUsersList()
  }, [])

  const getUsersList = () => {
    client.get('/users')
      .then((response) => {
        if (response.status === 200) {
          setUsersList(response.data)
        }
      })
      .catch((err) => {
        console.log('err', err)
      })
  }
  const updateStateOnChange = ({ updateStateName, value }) => {
    updateStateName(value)
  }
  const onSubmitForm = (e) => {
    let userObj = {
      "firstName": name.firstName,
      "lastName": name.lastName,
      "email": email,
      "phoneNumber": `${phone.column1}${phone.column2}${phone.column3}`,
      "address1": address.line1,
      "address2": address.line2,
      "city": address.city,
      "state": address.state,
      "zipCode": address.zipcode,
      "country": address.country,
      "qualification": qualification,
      "comments": comments
    }

    const { isValid, fieldName } = newUserValidation(userObj)
    if (isValid) {
      client.post('/users', { ...userObj })
        .then((response) => {
          getUsersList()
        })
    } else {
      setErrorFieldName(fieldName)
    }
  }
  const onPressEditUser = (selectedUserId) => {
    setSelectedUserId(selectedUserId)
    setShowModal('Edit User')

  }
  const onPressDeleteUser = (selectedUserId) => {
    client.delete(`/users/${selectedUserId}`)
      .then((response) => {
        getUsersList()
      }).catch((err) => {
        console.log('delete User error', err)
      })
  }
  const onPressViewUser = (selectedUserId) => {
    setSelectedUserId(selectedUserId)
    setShowModal('View User')
  }
  const onBlurCommentArea = () => {
    if (!comments) {
      setIsCommentValidation(true)
    }
  }

  const handleClose = () => {
    setShowModal(false)
  }
  const handleSuccess = (updatedUserDetails) => {
    setShowModal(false)
    if (showModal === 'Edit User') {
      client.put(`/users/${selectedUserId}`, { ...updatedUserDetails })
        .then((response) => {
          if (response.status === 200) {
            getUsersList()
          }
        })
        .catch((err) => {
          console.log('updateUserError', err)
        })
    }
  }
  return (
    <div className="container">
      <UserManagementModal
        show={showModal}
        title=''
        handleClose={handleClose}
        handleSuccess={handleSuccess}
        selectedUserId={selectedUserId}
      />
      <div className="register col-md-5 col-sm-6">
        <h1 className="title"><strong>Bio Data</strong></h1>
        <form >
          <div className="form-group">
            <label className="reg_txt">Name <span>*</span></label>
            <div className="controls form-inline d-flex justify-content-between">
              <TextInput
                errorFieldName={errorFieldName}
                errorMessage={'First name required'}
                name='firstName'
                placeholder="First"
                value={name.firstName}
                required
                onChange={(e) => setName({ ...name, firstName: e.target.value })} />
              <TextInput
                errorFieldName={errorFieldName}
                errorMessage={'Last name required'}
                type="text"
                name='lastName'
                placeholder="Last"
                value={name.lastName}
                required
                onChange={(e) => setName({ ...name, lastName: e.target.value })}
              />
            </div>
          </div>
          <div className="clearfix"></div>

          <div className="form-group">
            <label className="reg_txt">Email  <span>*</span></label>
            <TextInput
              errorFieldName={errorFieldName}
              errorMessage={'Email required'}
              type="text"
              className="form-register text w-100"
              id=""
              placeholder="E-mail"
              value={email}
              name='email'
              required
              onChange={(e) => updateStateOnChange({ updateStateName: setEmail, value: e.target.value })}
            />
          </div>
          <div className="clearfix"></div>

          <div className="form-group" style={{ height: 70 }}>
            <label className="reg_txt">Phone Number  <span>*</span></label>
            <div className="clearfix"></div>
            <div className="wsite-form">
              <TextInput
                errorFieldName={errorFieldName}
                errorMessage={'Phone number column1 required'}
                type="text"
                className="text input-name1 w-100"
                maxLength={3}
                value={phone.column1}
                name='phoneColumn1'
                required
                onChange={(e) => setPhone({ ...phone, column1: e.target.value })}

              />
            </div>
            <div className="line">-</div>
            <div className="wsite-form">
              <TextInput
                errorFieldName={errorFieldName}
                errorMessage={'Phone number column2 required'}
                type="text"
                className="text input-name1 w-100"
                maxLength={3}
                value={phone.column2}
                name='phoneColumn2'
                required
                onChange={(e) => setPhone({ ...phone, column2: e.target.value })}
              />
            </div>
            <div className="line">-</div>
            <div className="wsite-form">
              <TextInput
                errorFieldName={errorFieldName}
                errorMessage={'Phone number column3 required'}
                type="text"
                className="text input-name1 w-100"
                maxLength={10}
                value={phone.column3}
                name='phoneColumn3'
                required
                onChange={(e) => setPhone({ ...phone, column3: e.target.value })}
              />
            </div>
          </div>
          <div className="clearfix py-3"></div>
          <div className="form-group">
            <label className="reg_txt">Address<span>*</span></label>
            <TextInput
              errorFieldName={errorFieldName}
              errorMessage={'Address line1 required'}
              type="text"
              className="form-register text w-100"
              id=""
              placeholder="Line 1"
              style={{ marginBottom: 15 }}
              value={address.line1}
              name='addressLine1'
              required
              onChange={(e) => setAddress({ ...address, line1: e.target.value })}
            />
            <TextInput
              errorFieldName={errorFieldName}
              errorMessage={'Address line2 required'}
              type="text"
              className="form-register text w-100"
              id=""
              placeholder="Line 2"
              value={address.line2}
              name='addressLine2'
              required
              onChange={(e) => setAddress({ ...address, line2: e.target.value })}
            />
          </div>

          <div className="form-group">
            <div className="controls form-inline">
              <TextInput
                errorFieldName={errorFieldName}
                errorMessage={'city required'}
                type="text"
                className="input-name w-100"
                placeholder="City"
                value={address.city}
                name='city'
                required
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
              />
              <TextInput
                errorFieldName={errorFieldName}
                errorMessage={'state required'}
                type="text"
                className="input-name w-100"
                placeholder="State"
                value={address.state}
                name='state'
                required
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="controls form-inline">
              <TextInput
                errorFieldName={errorFieldName}
                errorMessage={'zipcode required'}
                type="text"
                className="input-name w-100"
                placeholder="Zip Code"
                value={address.zipcode}
                name='zipcode'
                required
                onChange={(e) => setAddress({ ...address, zipcode: e.target.value })}
              />
              <TextInput
                errorFieldName={errorFieldName}
                errorMessage={'Country required'}
                type="text"
                className="input-name w-100"
                placeholder="Country"
                value={address.country}
                name='country'
                required
                onChange={(e) => setAddress({ ...address, country: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="reg_txt">Write Your qualification <span>*</span></label>
            <TextInput
              errorFieldName={errorFieldName}
              errorMessage={'Qualification required'}
              type="text"
              className="form-register text w-100"
              id=""
              name='qualification'
              value={qualification}
              placeholder=""
              onChange={(e) => setQualification(e.target.value)}
              style={{ marginBottom: 15 }} />
          </div>
          <div className="clearfix"></div>
          <div className="form-group">
            <label className="reg_txt">Comment  <span>*</span></label>
            <div>
              <textarea
                className="form-register text w-100"
                value={comments}
                name='comments'
                required
                onBlur={onBlurCommentArea}
                onChange={(e) => updateStateOnChange({ updateStateName: setComments, value: e.target.value })}>
              </textarea>
              <div className='p-1'>
                {isCommentValidation && <span className='text-danger'>{'Comment required'}</span>}
              </div>
            </div>
          </div>
          <div className="form-group">
            <button type="button" onClick={onSubmitForm} className="btn btn-success" style={{ width: '97%' }}>Submit</button>
          </div>
        </form>
      </div>
      <div className="col-md-6 tabt">
        <table className="table">
          <tbody>
            <tr className="ztxt">
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>View</th>
            </tr>
            {
              usersList.length ?
                usersList.map((item) => {
                  return <tr key={item._id}>
                    <td>
                      {item.firstName}
                    </td>
                    <td>
                      {item.email}
                    </td>
                    <td>
                      {item.phoneNumber}
                    </td>
                    <td><button className="ed" onClick={() => onPressEditUser(item._id)}>Edit</button></td>
                    <td><button className="ed" onClick={() => onPressDeleteUser(item._id)} style={{ backgroundColor: "#f00" }}>Delete</button></td>
                    <td><button className="ed" onClick={() => onPressViewUser(item._id)} style={{ backgroundColor: "#000" }}>View</button></td>
                  </tr>
                })
                : <div>
                  <label>Oops! No records found</label>
                </div>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
