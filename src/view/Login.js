import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {createForm} from 'rc-form';
import {Toast, NavBar, List, InputItem, Button} from 'antd-mobile';

import constant from '../util/constant';
import database from '../util/database';
import http from '../util/http';
import style from './style.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    handleSubmit() {
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                http({
                    url: '/student/login',
                    data: values,
                    success: function (json) {
                        Toast.success('登录成功');

                        database.setToken(json.data.token);
                        database.setName(json.data.student_name);
                        database.setClazz(json.data.clazz_name);

                        setTimeout(function () {
                            this.props.dispatch(routerRedux.push({
                                pathname: '/home',
                                query: {}
                            }));
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
                <NavBar className={style.header} mode="dark" iconName={false}>学生登录</NavBar>
                <div className={style.page}>
                    <form style={{margin: '50px 10px 0px 10px'}}>
                        <List>
                            <InputItem
                                {...getFieldProps('user_account', {
                                    rules: [{
                                        required: true,
                                        message: '请输入学号'
                                    }],
                                    initialValue: ''
                                })}
                                error={!!getFieldError('user_account')}
                                clear
                                placeholder="请输入学号"
                            >学号</InputItem>
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
                        </List>
                    </form>
                    <div style={{margin: '50px 10px 0px 10px'}}>
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
                    </div>
                    <div style={{
                        backgroundImage: 'url(' + require('../assets/image/logo.png') + ')',
                        margin: '40px 10px 50px 10px',
                        height: '100px',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain'
                    }}></div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {};

Login = createForm()(Login);

export default connect(({}) => ({}))(Login);
