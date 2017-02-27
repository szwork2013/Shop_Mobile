import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Toast, NavBar, List, Popup} from 'antd-mobile';
import {Swipe, SwipeItem} from 'swipejs/react';

import constant from '../util/constant';
import http from '../util/http';

import style from './style.css';

class ProductDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {
                product_image: []
            }
        }
    }

    componentDidMount() {
        this.handleLoad();
    }

    componentWillUnmount() {
        this.refs.swipe.instance.stop();
    }

    handleLoad() {
        http({
            url: '/product/find',
            data: {
                product_id: this.props.params.product_id
            },
            success: function (json) {
                json.data.product_image = JSON.parse(json.data.product_image);

                this.setState({
                    product: json.data
                });
            }.bind(this),
            complete: function () {
                // this.refs.swipe.instance.setup({
                //     continuous: true
                // });
            }.bind(this)
        }).post();
    }

    handleLeftClick() {
        this.props.dispatch(routerRedux.goBack());
    }

    handleClick(e) {
        // Your own logic
    }

    handleSubmit() {
        Popup.hide();

        this.props.dispatch(routerRedux.push({
            pathname: '/check',
            query: {}
        }));
    }

    handleBuy() {
        Popup.show(<div>
            <div className={style.productPopupImage}>图</div>
            <div className={style.productPopupPrice}>￥{this.state.product.product_price}</div>
            <div className={style.productPopupStock}>库存：51</div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className={style.productPopupSubmit} onClick={this.handleSubmit.bind(this)}>确定</div>
        </div>, {animationType: 'slide-up', maskClosable: true});
    }

    render() {
        const Item = List.Item;

        return (
            <div>
                <NavBar className={style.header} mode="dark" leftContent="返回"
                        onLeftClick={this.handleLeftClick.bind(this)}>商品明细</NavBar>
                <div className={style.page}>
                    {
                        this.state.product.product_image.length == 0 ?
                            ''
                            :
                            <Swipe className='custom-swipe-container-class'
                                   ref='swipe'
                                   startSlide={0}
                                   speed={300}
                                   auto={3000}
                                   draggable={true}
                                   continuous={true}
                                   autoRestart={true}
                                   disableScroll={false}
                                   stopPropagation={false}>
                                {
                                    this.state.product.product_image.map(function (item, index) {
                                        return (
                                            <SwipeItem className={style.productImage}
                                                       onClick={this.handleClick.bind(this)} key={index}>
                                                <img className={style.productCardImage}
                                                     src={constant.host + item}/>
                                            </SwipeItem>
                                        )
                                    }.bind(this))
                                }
                            </Swipe>
                    }

                    <List>
                        <Item>
                            {this.state.product.product_name}
                            <br/>
                            <span style={{color: 'red'}}>￥{this.state.product.product_price}</span>
                        </Item>
                    </List>
                </div>
                <div className={style.footer}>
                    <div className={style.productHome}>
                        <img className={style.productIcon} src={require('../assets/image/home.png')}/>
                        <div className={style.productFont}>首页</div>
                    </div>
                    <div className={style.productFavor}>
                        <img className={style.productIcon} src={require('../assets/image/favor.png')}/>
                        <div className={style.productFont} onClick={this.handleBuy.bind(this)}>收藏</div>
                    </div>
                    <div className={style.productAddCart}>加入购物车</div>
                    <div className={style.productBuy} onClick={this.handleBuy.bind(this)}>立即购买</div>
                </div>
            </div>
        );
    }
}

ProductDetail.propTypes = {};

export default connect(({}) => ({}))(ProductDetail);
