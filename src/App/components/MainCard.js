import React, { Component } from 'react';
import { Card, Collapse } from 'react-bootstrap';
import windowSize from 'react-window-size';
import { Typography } from 'antd';
import { withTranslation } from "react-i18next"; 

import Aux from "../../hoc/_Aux";
// import DEMO from "../../store/constant";

const { Title, Text } = Typography;

class MainCard extends Component {
  
  state = {
    isOption: this.props.isOption,
    fullCard: false, 
    collapseCard: false,
    loadCard: false,
    cardRemove: false,
  };
 

  cardReloadHandler = () => {
    this.setState({ loadCard: true });
    setInterval(() => {
      this.setState({ loadCard: false });
    }, 3000);
  };

  cardRemoveHandler = () => {
    this.setState({ cardRemove: true });
  };

  render() {
    // console.log(this.props);
    const { t } = this.props;
    let fullScreenStyle, loader, cardHeaderRight, cardHeader;
    let card = '';
    let cardClass = [];

    if (this.state.isOption) {
      // this.props.spinning
      cardHeaderRight = (
        <div className="card-header-right">
          <Text
            // mark
            strong
            underline
            className='highlighted-text'
            type="primary"
           style={{ height:25, margin:15}}
          >     
            {t('Minimal Salary')}: {new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(this.props.minimalSalary.data)}
          </Text>

          <Text
            // mark
            strong
            underline
            className='highlighted-text'
            type="primary"
           style={{ height:25, marginTop:50}}
          >          
            {t('Salary')}: {new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(this.props.EmployeeEnrolment.Salary)}
          </Text>
          {/* <h1>Hello</h1> */}
          {/* <Dropdown alignRight={true} className="btn-group card-option">
            <Dropdown.Toggle id="dropdown-basic" className="btn-icon">
              <i className="feather icon-more-horizontal" />
            </Dropdown.Toggle>
            <Dropdown.Menu as='ul' className="list-unstyled card-option">
              <Dropdown.Item as='li' className="dropdown-item" onClick={() => { this.setState(prevState => { return { fullCard: !prevState.fullCard } }) }}>
                <i className={this.state.fullCard ? 'feather icon-minimize' : 'feather icon-maximize'} />
                <a href={DEMO.BLANK_LINK}> {this.state.fullCard ? 'Restore' : 'Maximize'} </a>
              </Dropdown.Item>
              <Dropdown.Item as='li' className="dropdown-item" onClick={() => { this.setState(prevState => { return { collapseCard: !prevState.collapseCard } }) }}>
                <i className={this.state.collapseCard ? 'feather icon-plus' : 'feather icon-minus'} />
                <a href={DEMO.BLANK_LINK}> {this.state.collapseCard ? 'Expand' : 'Collapse'} </a>
              </Dropdown.Item>
              <Dropdown.Item as='li' className="dropdown-item" onClick={this.cardReloadHandler}>
                <i className='feather icon-refresh-cw' />
                <a href={DEMO.BLANK_LINK}> Reload </a>
              </Dropdown.Item>
              <Dropdown.Item as='li' className="dropdown-item" onClick={this.cardRemoveHandler}>
                <i className='feather icon-trash' />
                <a href={DEMO.BLANK_LINK}> Remove </a>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
        </div>
      );
    }

    cardHeader = (
      <Card.Header>
        <Title level={5}>{this.props.title}</Title>
        {/* <Card.Title as='h5'>{cardHeaderRight}</Card.Title> */}
        {cardHeaderRight}

      </Card.Header>
    );

    if (this.state.fullCard) {
      cardClass = [...cardClass, 'full-card'];
      fullScreenStyle = { position: 'fixed', top: 0, left: 0, right: 0, width: this.props.windowWidth, height: this.props.windowHeight };
    }

    if (this.state.loadCard) {
      cardClass = [...cardClass, 'card-load'];
      loader = (
        <div className="card-loader">
          <i className="pct-loader1 anim-rotate" />
        </div>
      );
    }

    if (this.state.cardRemove) {
      cardClass = [...cardClass, 'd-none'];
    }

    if (this.props.cardClass) {
      cardClass = [...cardClass, this.props.cardClass];
    }

    card = (
      <Card className={cardClass.join(' ')} style={fullScreenStyle}>
        {cardHeader}
        <Collapse in={!this.state.collapseCard}>
          <div>
            <Card.Body>
              {this.props.children}
            </Card.Body>
          </div>
        </Collapse>
        {loader}
      </Card>
    );

    return (
      <Aux>
        {card}
      </Aux>
    );
  }
}

export default withTranslation()(windowSize(MainCard));
