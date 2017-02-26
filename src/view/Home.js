import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {NavBar, WhiteSpace, List} from 'antd-mobile';

import constant from '../util/constant';
import http from '../util/http';

import style from './style.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  componentDidMount() {
    if (this.props.home.list.length == 0) {
      this.handleLoad();
    } else {
      document.body.scrollTop = this.props.home.scroll_top;
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'home/fetch',
      data: {
        scroll_top: document.body.scrollTop
      }
    });
  }

  handleLoad() {
    http({
      url: '/course/list',
      data: {},
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
          type: 'home/fetch',
          data: {
            list: json.data
          }
        });
      }.bind(this),
      complete: function () {
        document.body.scrollTop = this.props.home.scroll_top;
      }.bind(this)
    }).post();
  }

  handleClick(course_id) {
    this.props.dispatch(routerRedux.push({
      pathname: '/course/' + course_id,
      query: {}
    }));
  }

  render() {
    const Item = List.Item;

    return (
      <div>
        <NavBar className={style.header} mode="dark" iconName={false}>课程列表</NavBar>
        <div className={style.page}>
          <WhiteSpace size="lg"/>
          <List>
            {
              this.props.home.list.map(function (item) {
                return (
                  <Item key={item.course_id} className="home" arrow="horizontal"
                        onClick={this.handleClick.bind(this, item.course_id)}>
                    <div style={{marginTop: '5px', height: '26px'}}><span
                      style={{color: '#777777', marginRight: '10px'}}>课程:</span>{item.course_name}</div>
                    <div style={{height: '26px'}}><span
                      style={{color: '#777777', marginRight: '10px'}}>时间:</span>{item.course_time}</div>
                    <div style={{marginBottom: '5px'}}><span
                      style={{color: '#777777', marginRight: '10px'}}>人数:</span>{item.course_apply_limit}</div>
                    {
                      item.is_apply ?
                        <div style={{position: 'absolute', right: '39px', top: '37px', color: '#108ee9'}}>已申请</div>
                        :
                        ''
                    }
                  </Item>
                )
              }.bind(this))
            }
          </List>
          <div className={style.mainFooter}></div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {};

export default connect(({home}) => ({home}))(Home);
