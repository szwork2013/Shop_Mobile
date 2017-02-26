import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {NavBar, WhiteSpace, List} from 'antd-mobile';

import constant from '../util/constant';
import http from '../util/http';

import style from './style.css';

class Apply extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad() {
        http({
            url: '/course/apply/list',
            data: {
                page_index: 1,
                page_size: 10
            },
            success: function (json) {
                for (let i = 0; i < json.data.length; i++) {
                    for (let j = 0; j < constant.course_time.length; j++) {
                        if (json.data[i].course_time == constant.course_time[j].value) {
                            json.data[i].course_time = constant.course_time[j].text;

                            break
                        }
                    }
                }

                this.props.dispatch({
                    type: 'apply/fetch',
                    data: {
                        list: json.data
                    }
                });
            }.bind(this),
            complete: function () {

            }.bind(this)
        }).post();
    }

    handleClick(course_id) {
        this.props.dispatch(routerRedux.push({
            pathname: '/course/' + course_id,
            query: {}
        }));
    }

    handleLeftClick() {
        this.props.dispatch(routerRedux.goBack());
    }

    render() {
        const Item = List.Item;

        return (
            <div>
                <NavBar className={style.header} mode="dark" leftContent="返回"
                        onLeftClick={this.handleLeftClick.bind(this)}>我的课程</NavBar>
                <div className={style.page}>
                    <WhiteSpace size="lg"/>
                    <List>
                        {
                            this.props.apply.list.map(function (item) {
                                return (
                                    <Item key={item.course_id} className="apply" arrow="horizontal"
                                          onClick={this.handleClick.bind(this, item.course_id)}>
                                        <div style={{marginTop: '5px', height: '26px'}}><span
                                            style={{color: '#777777', marginRight: '10px'}}>课程:</span>{item.course_name}
                                        </div>
                                        <div style={{height: '26px'}}><span
                                            style={{color: '#777777', marginRight: '10px'}}>时间:</span>{item.course_time}
                                        </div>
                                        <div style={{marginBottom: '5px'}}><span style={{
                                            color: '#777777',
                                            marginRight: '10px'
                                        }}>人数:</span>{item.course_apply_limit}</div>
                                        <div style={{position: 'absolute', right: '39px', top: '37px', color: '#888'}}>
                                            已申请
                                        </div>
                                    </Item>
                                )
                            }.bind(this))
                        }
                    </List>
                </div>
            </div>
        );
    }
}

Apply.propTypes = {};

export default connect(({apply}) => ({apply}))(Apply);
