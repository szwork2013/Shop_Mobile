import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {Toast, NavBar, WhiteSpace, List} from 'antd-mobile';

import constant from '../util/constant';
import http from '../util/http';

import style from './style.css';

class Course extends Component {
  constructor(props) {
    super(props);

    this.state = {
      course: {}
    }
  }

  componentDidMount() {
    this.handleLoad();
  }

  componentWillUnmount() {

  }

  handleLoad() {
    http({
      url: '/course/find',
      data: {
        course_id: this.props.params.course_id
      },
      success: function (json) {
        for (let i = 0; i < constant.course_time.length; i++) {
          if (json.data.course_time == constant.course_time[i].value) {
            json.data.course_time = constant.course_time[i].text;

            break
          }
        }

        this.setState({
          course: json.data
        });
      }.bind(this),
      complete: function () {

      }.bind(this)
    }).post();
  }

  handleApply() {
    http({
      url: '/course/apply/save',
      data: {
        course_id: this.props.params.course_id
      },
      success: function (json) {
        Toast.success('申请成功');

        let list = this.props.home.list;
        for (let i = 0; i < list.length; i++) {
          if (list[i].course_id == this.props.params.course_id) {
            list[i].is_apply = true;
          }
        }

        this.props.dispatch({
          type: 'home/fetch',
          data: {
            list: list
          }
        });

        setTimeout(function () {
          this.handleLeftClick();
        }.bind(this), constant.timeout * 300);
      }.bind(this),
      complete: function () {

      }.bind(this)
    }).post();
  }

  handleCancel() {
    http({
      url: '/course/apply/delete',
      data: {
        course_id: this.props.params.course_id
      },
      success: function (json) {
        Toast.success('取消成功');

        let list = this.props.home.list;
        for (let i = 0; i < list.length; i++) {
          if (list[i].course_id == this.props.params.course_id) {
            list[i].is_apply = false;
          }
        }

        this.props.dispatch({
          type: 'home/fetch',
          data: {
            list: list
          }
        });

        setTimeout(function () {
          this.handleLeftClick();
        }.bind(this), constant.timeout * 300);
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

    let status = 0;

    if (this.state.course.is_limit) {
      status = 0;
    } else {
      if (this.state.course.is_apply) {
        status = 1;
      } else {
        status = 2;
      }
    }

    return (
      <div>
        <NavBar className={style.header} mode="dark" leftContent="返回" onLeftClick={this.handleLeftClick.bind(this)}>课程明细</NavBar>
        <div className={style.page}>
          <WhiteSpace size="lg"/>
          <List>
            <Item className="course" extra={this.state.course.course_name}>
              <span style={{color: '#888888'}}>名称：</span>
            </Item>
            <Item className="course" extra={this.state.course.course_time}>
              <span style={{color: '#888888'}}>时间：</span>
            </Item>
            <Item className="course" extra={this.state.course.course_apply_limit}>
              <span style={{color: '#888888'}}>人数：</span>
            </Item>
            <Item className="course address" extra={this.state.course.course_address}>
              <span style={{color: '#888888'}}>地点：</span>
            </Item>
            <Item className="course content">
              <span style={{color: '#888888'}}>介绍：</span>
              <div style={{
                color: '#000000',
                marginTop: '5px',
                marginBottom: '5px',
                whiteSpace: 'normal'
              }}>{this.state.course.course_content}</div>
            </Item>
          </List>
        </div>
        <div className={style.footer}>
          {
            status == 0 ?
              <div className={style.limit}>该课程已经没有名额</div>
              :
              ''
          }
          {
            status == 1 ?
              <div className={style.cancel} onClick={this.handleCancel.bind(this)}>取消申请</div>
              :
              ''
          }
          {
            status == 2 ?
              <div className={style.apply} onClick={this.handleApply.bind(this)}>立即申请</div>
              :
              ''
          }
        </div>
      </div>
    );
  }
}

Course.propTypes = {};

export default connect(({home}) => ({home}))(Course);
