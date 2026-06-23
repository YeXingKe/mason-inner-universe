import {
  FacebookOutlined,
  GoogleOutlined,
  LinkedinOutlined,
  LockOutlined,
  MailOutlined,
  TwitterOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'

export default function Login() {
  const navigate = useNavigate()
  const [signUpMode, setSignUpMode] = useState(false)

  const handleSignIn = (e: FormEvent) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  const handleSignUp = (e: FormEvent) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className={`login${signUpMode ? ' login--sign-up' : ''}`}>
      <div className="login__forms">
        <div className="login__forms-inner">
          <form className="login__form login__form--sign-in" onSubmit={handleSignIn}>
            <h2 className="login__title">登录</h2>
            <div className="login__field">
              <UserOutlined className="login__field-icon" />
              <input type="text" placeholder="用户名" />
            </div>
            <div className="login__field">
              <LockOutlined className="login__field-icon" />
              <input type="password" placeholder="密码" />
            </div>
            <input type="submit" value="Login" className="login__button login__button--solid" />
            <p className="login__social-text">或者使用第三方账号登录</p>
            <div className="login__social">
              <a href="#" className="login__social-link" onClick={(e) => e.preventDefault()}>
                <FacebookOutlined />
              </a>
              <a href="#" className="login__social-link" onClick={(e) => e.preventDefault()}>
                <TwitterOutlined />
              </a>
              <a href="#" className="login__social-link" onClick={(e) => e.preventDefault()}>
                <GoogleOutlined />
              </a>
              <a href="#" className="login__social-link" onClick={(e) => e.preventDefault()}>
                <LinkedinOutlined />
              </a>
            </div>
          </form>

          <form className="login__form login__form--sign-up" onSubmit={handleSignUp}>
            <h2 className="login__title">注册</h2>
            <div className="login__field">
              <UserOutlined className="login__field-icon" />
              <input type="text" placeholder="用户名" />
            </div>
            <div className="login__field">
              <MailOutlined className="login__field-icon" />
              <input type="email" placeholder="Email" />
            </div>
            <div className="login__field">
              <LockOutlined className="login__field-icon" />
              <input type="password" placeholder="密码" />
            </div>
            <input type="submit" className="login__button" value="注册" />
            <p className="login__social-text">或者使用第三方账号登录</p>
            <div className="login__social">
              <a href="#" className="login__social-link" onClick={(e) => e.preventDefault()}>
                <FacebookOutlined />
              </a>
              <a href="#" className="login__social-link" onClick={(e) => e.preventDefault()}>
                <TwitterOutlined />
              </a>
              <a href="#" className="login__social-link" onClick={(e) => e.preventDefault()}>
                <GoogleOutlined />
              </a>
              <a href="#" className="login__social-link" onClick={(e) => e.preventDefault()}>
                <LinkedinOutlined />
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="login__panels">
        <div className="login__panel login__panel--left">
          <div className="login__panel-body">
            <h3>New here ?</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, ex ratione. Aliquid!</p>
            <button type="button" className="login__button login__button--ghost" onClick={() => setSignUpMode(true)}>
              注册
            </button>
          </div>
        </div>
        <div className="login__panel login__panel--right">
          <div className="login__panel-body">
            <h3>One of us ?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laboriosam ad deleniti.</p>
            <button type="button" className="login__button login__button--ghost" onClick={() => setSignUpMode(false)}>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
