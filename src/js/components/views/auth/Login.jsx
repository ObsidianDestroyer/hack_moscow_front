import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';

import getValidationSchema from 'js/utils/getValidationSchema';
import createFormikField from 'js/components/common/hoc/createFormikField';

import * as AuthActions from 'js/actions/AuthActions';
import * as NotificationActions from 'js/actions/NotificationActions';

import Button from 'js/components/common/Button';
import TextBox from 'js/components/common/TextBox';
import Notification from 'js/components/common/Notification';


const FormikField = createFormikField(TextBox);

const mapStateToProps = ({ Notifications, App }) => ({
  notification: Notifications.get('login'),
  process: App.get('process'),
});

const mapDispatchToProps = dispatch => ({
  loginRequest(payload) {
    dispatch(AuthActions.loginRequest(payload));
  },
  clearNotification(payload) {
    dispatch(NotificationActions.clearNotification(payload));
  },
});

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class Login extends Component {
  componentWillUnmount() {
    this.handleClearNotification();
  }

  handleClearNotification = () => {
    const { notification, clearNotification } = this.props;

    if (Object.keys(notification).length !== 0) {
      clearNotification('login');
    }
  };

  handleLogin = (values) => {
    const { loginRequest, clearNotification } = this.props;
    const { username, password } = values;

    clearNotification('login');
    loginRequest({
      username,
      password,
    });
  };

  render() {
    const { notification, process } = this.props;

    const initialValues = {
      username: '',
      password: '',
    };

    return (
      <Wrapper>
        <Title>Authorization</Title>
        <Formik
          initialValues={initialValues}
          validationSchema={getValidationSchema('login')}
          onSubmit={this.handleLogin}
          validateOnChange={false}
          enableReinitialize
          render={({ touched, errors }) => (
            <Form onChange={this.handleClearNotification}>
              <InputSet>
                <InputWrapper>
                  <StyledFormikField
                    label="Username"
                    type="text"
                    name="username"
                    errors={errors}
                    touched={touched}
                  />
                </InputWrapper>
                <InputWrapper>
                  <StyledFormikField
                    label="Password"
                    type="password"
                    name="password"
                    errors={errors}
                    touched={touched}
                  />
                </InputWrapper>
              </InputSet>
              <NotificationWrapper>
                <Notification data={notification} />
              </NotificationWrapper>
              <ButtonWrapper>
                <StyledButton type="submit" disabled={process === 'login'} inverted>
                  Login
                </StyledButton>
              </ButtonWrapper>
            </Form>
          )}
        />
        <RegistrationWrapper>
          <Link to="/auth/register">Registration</Link>
        </RegistrationWrapper>
      </Wrapper>
    );
  }
}

export default Login;

const Wrapper = styled.div`
  width: 100%;
`;

const InputWrapper = styled.div`
  margin-bottom: 15px;
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const InputSet = styled.div``;

const ButtonWrapper = styled.div`
  height: 40px;
`;

const StyledFormikField = styled(FormikField)`
  div {
    font-size: 14px;
  }
  input {
    height: 40px;
  }
`;

const StyledButton = styled(Button)`
  font-size: 18px;
  height: 45px;
`;

const NotificationWrapper = styled.div`
  width: 100%;
  padding: 15px 0;
`;

const RegistrationWrapper = styled.div`
  margin-top: 30px;
  text-align: center;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: normal;
  border-bottom: 2px solid #d5dcef;
  margin-bottom: 25px;
  padding-bottom: 5px;
`;
