import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {NavBar, WhiteSpace, List, Button} from 'antd-mobile';

import database from '../util/database';
import style from './style.css';

class Mine extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 0
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    handleCourse() {
        this.props.dispatch(routerRedux.push({
            pathname: '/apply',
            query: {}
        }));
    }

    handlePassword() {
        this.props.dispatch(routerRedux.push({
            pathname: '/password',
            query: {}
        }));
    }

    handleSubmit() {
        database.setToken('');

        this.props.dispatch({
            type: 'home/fetch',
            data: {
                list: []
            }
        });

        this.props.dispatch(routerRedux.push({
            pathname: '/login',
            query: {}
        }));
    }

    render() {
        const Item = List.Item;

        return (
            <div>
                <NavBar className={style.header} mode="dark" iconName={false}>个人中心</NavBar>
                <div className={style.page}>
                    <WhiteSpace size="lg"/>
                    <List>
                        <Item>
                            <div className={style.avatar}></div>
                            <div className={style.name}>{database.getName()}</div>
                            <div className={style.clazz}>{database.getClazz()}班级学生</div>
                        </Item>
                    </List>
                    <WhiteSpace size="lg"/>
                    <List>
                        <Item thumb={require('../assets/image/appreciate.png')} arrow="horizontal"
                              onClick={this.handleCourse.bind(this)}>
                            我的课程
                        </Item>
                        <Item thumb={require('../assets/image/settings.png')} arrow="horizontal"
                              onClick={this.handlePassword.bind(this)}>
                            修改密码
                        </Item>
                    </List>
                    <div style={{margin: '50px 10px 0px 10px'}}>
                        <Button style={{backgroundColor: '#dd514c', color: '#ffffff'}}
                                onClick={this.handleSubmit.bind(this)}>退出系统</Button>
                    </div>
                </div>
            </div>
        );
    }
}

Mine.propTypes = {};

export default connect(({home}) => ({home}))(Mine);
