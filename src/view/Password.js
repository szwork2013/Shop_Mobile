import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {createForm} from 'rc-form';
import {Toast, NavBar, WhiteSpace, List, InputItem} from 'antd-mobile';

import constant from '../util/constant';
import http from '../util/http';

import style from './style.css';

class Password extends Component {
  constructor(props) {
    super(props);

    this.state = {
      course: {}
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  handleLeftClick() {
    this.props.dispatch(routerRedux.goBack());
  }

  handleSubmit() {
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        if(values.user_password != values.user_password_2) {
          Toast.fail('两个密码不一致');

          return
        }

        http({
          url: '/student/password/update',
          data: values,
          success: function (json) {
            Toast.success('修改成功');

            setTimeout(function () {
              this.handleLeftClick();
            }.bind(this), constant.timeout * 300);
          }.bind(this),
          complete: function () {

          }.bind(this)
        }).post();
      }
    });
  }

  render() {
    const {getFieldProps, getFieldError} = this.props.form;

    return (
      <div>
        <NavBar className={style.header} mode="dark" leftContent="返回" onLeftClick={this.handleLeftClick.bind(this)}>修改密码</NavBar>
        <div className={style.page}>
          <WhiteSpace size="lg"/>
          <List>
            <InputItem
              {...getFieldProps('user_password', {
                rules: [{
                  required: true,
                  message: '请输入密码'
                }],
                initialValue: ''
              })}
              error={!!getFieldError('user_password')}
              clear
              placeholder="请输入密码"
              type="password"
            >密码</InputItem>
            <InputItem
              {...getFieldProps('user_password_2', {
                rules: [{
                  required: true,
                  message: '请输入确认密码'
                }],
                initialValue: ''
              })}
              error={!!getFieldError('user_password_2')}
              clear
              placeholder="请输入确认密码"
              type="password"
            >确认密码</InputItem>
          </List>
        </div>
        <div className={style.footer}>
          <div className={style.apply} onClick={this.handleSubmit.bind(this)}>立即修改</div>
        </div>
      </div>
    );
  }
}

Password.propTypes = {};

Password = createForm()(Password);

export default connect(({}) => ({}))(Password);
