import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {NavBar, WhiteSpace, List, Button} from 'antd-mobile';

import database from '../util/database';
import http from '../util/http';
import style from './style.css';

class DeliveryIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad() {
        http({
            url: '/delivery/list',
            data: {
                page_index: 1,
                page_size: 10
            },
            success: function (json) {
                console.log(json);
            }.bind(this),
            complete: function () {

            }.bind(this)
        }).post();
    }

    handleLeftClick() {
        this.props.dispatch(routerRedux.goBack());
    }

    render() {
        const Item = List.Item;

        return (
            <div>
                <NavBar className={style.header} mode="dark" leftContent="返回"
                        onLeftClick={this.handleLeftClick.bind(this)}>快递地址</NavBar>
                <div className={style.page}>
                    <WhiteSpace size="lg"/>
                    <List>
                        <Item extra="￥100.00">
                            商品金额
                        </Item>
                        <Item extra="-￥1.00">
                            订单运费
                        </Item>
                    </List>
                </div>
            </div>
        );
    }
}

DeliveryIndex.propTypes = {};

export default connect(({delivery}) => ({delivery}))(DeliveryIndex);
