import React from 'react'
import {
  SignupForm as SignUpController,
  useLanguage
} from 'ordering-components'
import {
  LoginContainer,
  FormSide,
  HeroSide,
  FormInput,
  SocialIcons,
  TitleHeroSide,
  SignUpWith,
  AlreadyRegistered
} from './styles'
// import triangle from '../../../template/triangle.svg'

import logoHeader from '../../../template/logo-header.svg'
import { Tabs, Tab } from '../../styles/Tabs'

import { Input } from '../../styles/Inputs'
import { Button } from '../../styles/Buttons'

import { AiOutlineGoogle, FaApple } from 'react-icons/all'
import { FacebookLoginButton } from '../FacebookLogin'

const SignUpFormUI = (props) => {
  const {
    hanldeChangeInput,
    handleButtonSignupClick,
    elementLinkToLogin,
    ordering
  } = props
  const [, t] = useLanguage()
  return (
    <LoginContainer>
      <HeroSide>
        <TitleHeroSide>
          <h1>Welcome!</h1>
          <p>Enter your personal details and start journey with us.</p>
        </TitleHeroSide>
        {/* <div style={{ position: "absolute" }}>
          <img
            src={triangle}
            style={{
              display: "inline-block",
              width: "1000px",
              height: "700px",
            }}
          />
        </div> */}
      </HeroSide>
      <FormSide>
        <img src={logoHeader} alt='Logo login' />
        {
          <AlreadyRegistered>
            {elementLinkToLogin && (
              <>
                {t('MOBILE_FRONT_ALREADY_HAVE_AN_ACCOUNT')} {elementLinkToLogin}
              </>
            )}
          </AlreadyRegistered>
        }
        {
          <SocialIcons>
            <FacebookLoginButton ordering={ordering} appId='' /> <FaApple />{' '}
            <AiOutlineGoogle />
          </SocialIcons>
        }
        {
          <SignUpWith>
            <Tabs variant='primary'>
              <Tab>Signup by Email</Tab>
              <Tab>Signup by Cellphone</Tab>
            </Tabs>
          </SignUpWith>
        }
        {
          <FormInput>
            <Input
              type='text'
              name='name'
              placeholder={t('LOGIN_CREATE_FIRST_NAME')}
              onChange={(e) => hanldeChangeInput(e)}
            />
            <Input
              type='email'
              name='email'
              placeholder={t('EMAIL')}
              onChange={(e) => hanldeChangeInput(e)}
            />
            <Input
              type='password'
              name='password'
              placeholder={t('PASSWORD')}
              onChange={(e) => hanldeChangeInput(e)}
            />
            <Button color='primary' onClick={() => handleButtonSignupClick()}>
              {t('SIGNUP')}
            </Button>
          </FormInput>
        }
      </FormSide>
    </LoginContainer>
  )
}

export const SignUpForm = (props) => {
  const loginControllerProps = {
    ...props,
    UIComponent: SignUpFormUI
  }
  return <SignUpController {...loginControllerProps} />
}