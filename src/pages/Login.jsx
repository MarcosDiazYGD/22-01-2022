import React, { useState } from 'react';
import LoginData from '../data/loginData.json'
import ModalMessage from '../hooks/ModalMessage'


const Login = () => {
  const [userPass, setUserPass] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [passVisibility, setPassVisibility] = useState(false);
  const [status, setStatus] = useState(false);
  const [renderModal, setRenderModal] = useState(false);
  const [protect, setProtect] = useState(false);

  const getLogIn = () => {
    setIsVisible(true);
    setIsDisabled(true)
  };

  const getHome = () => {
    setIsVisible(false);
    setIsDisabled(false)
  }

  const changeVisivility = () => {
    setPassVisibility(!passVisibility)
  }

  const sendData = (e) => {
    e.preventDefault()

    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const isValidEmail = emailRegex.test(userEmail);

    if (!isValidEmail | userEmail.length === 0) {
      setIsInvalidEmail(true)

      setTimeout(() => {
        setIsInvalidEmail(false)
      }, 3000);
    }
    if (userPass.length === 0) {

      setIsInvalidPassword(true)

      setTimeout(() => {
        setIsInvalidPassword(false)
      }, 3000);
    }
    if( isValidEmail && userPass.length > 0 ) {
      validatingCredentials()
    }
  }

  const validatingCredentials = () => {
    try {
      if (LoginData.validCredentials.email === userEmail && LoginData.validCredentials.password === userPass) {
        setStatus(true)

        setRenderModal(true)

        setTimeout(() => {
          setRenderModal(false)
          setProtect(false)
        }, 3000);
        
      } else {
        throw new Error(LoginData.responses.error)
      }
    } catch (error) {
      setStatus(false)

      setRenderModal(true)

      setTimeout(() => {
        setRenderModal(false)
        setProtect(false)
      }, 3000);
    }
    setRenderModal(true)

    setTimeout(() => {
      setRenderModal(false)
      setProtect(false)
    }, 3000);

    setUserEmail('')
    setUserPass('')
  }

  
  const sendResponse = () => {
    return (
      <ModalMessage
        status={status}
        message={status ? LoginData.responses.success.message : LoginData.responses.error.message} />
    )
  }



  return (
    <>
      {/* renderModal abajo */}
      {renderModal ? sendResponse() : null}
      <div className="ScreenWelcome">
        <div className="container--texts">
          <h1>
            Milenium<span className="ScreenW--title-span">Group</span>
          </h1>
          <p>AGENCIA DE RELACIONES PUBLICAS</p>
          <button className="ScreenW--button-logIn" onClick={getLogIn} disabled={isDisabled} >
            Log in
          </button>
        </div>
        <div className={isVisible ? "loginOpen" : "loginClose"} >

          <form className="form--logIn">
            <i className="fa-sharp fa-solid fa-xmark" onClick={getHome}></i>
            <label className="label" htmlFor="email">
              <div>
                <p>Email</p>
                <input
                  disabled={protect}
                  className="input input--email"
                  type="email"
                  id="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>
            </label>

            <label className="label" htmlFor="password">
              <div>
                <p>Password</p>
                <input
                  disabled={protect}

                  className="input input--pass"
                  type={passVisibility ? "text" : "password"}
                  id="password"
                  value={userPass}
                  onChange={(e) => setUserPass(e.target.value)}
                />
                <label htmlFor="password-v" className='pasword--visibility'>

                  <input
                    disabled={protect}
                    type="checkbox"
                    onClick={changeVisivility}
                    id='password-v'
                  />
                  <p>view password</p>

                </label>
              </div>
            </label>

            <button className="send-button " onClick={sendData} disabled={protect} >Log in</button>
            <div className="container-errors">
              {isInvalidEmail ? (<div className="container-isInvalid"><p>the <span className="isInvalid-span">email</span> is invalid</p></div>) : ''}
              {isInvalidPassword ? (<div className="container-isInvalid"><p>the <span className="isInvalid-span">password</span> is invalid</p></div>) : ''}
            </div>
          </form>
        </div>
      </div >
    </>
  );
};

export default Login;