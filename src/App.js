import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { ButtonToolbar, DropdownButton, Dropdown } from 'react-bootstrap';
import NoData from './components/NoData';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bandsTmpObj: [],
      product: {},
      bands: {},
      subBands: {},
      result: [],
      error: false,
      dataLoding: true
    };
    this.productsEvent = this.productsEvent.bind();
    this.bandsDropdown = this.bandsDropdown.bind();
    this.subBandsDropdown = this.subBandsDropdown.bind();
  }

  componentDidMount() {
    fetch(
      'http://s3.ap-south-1.amazonaws.com/ypui-resources/InterviewQns/Products.json'
    )
      .then(response => response.json())
      .then(result => {
        const tmpObj = {};
        result.forEach(element => {
          try {
            tmpObj[element.Productid.name] = element.Productid.name;
          } catch (e) {}
        });

        this.setState({
          product: tmpObj,
          result: result,
          dataLoding: false
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          error: true,
          dataLoding: false
        });
      });
  }
  productsEvent = name => {
    const tmpObj1 = {};
    const tmpArr = [];
    const { result } = this.state;

    result.forEach(element => {
      if (name === element.Productid.name) {
        tmpArr.push(element);
        try {
          tmpObj1[element.Band.val] = element.Band.val;
        } catch (e) {}
      }
    });
    this.setState({
      bandsTmpObj: tmpArr,
      bands: tmpObj1
    });
  };

  bandsDropdown = name => {
    const tmpObj2 = {};
    const { bandsTmpObj } = this.state;
    bandsTmpObj.forEach(element => {
      if (name === element.Band.val) {
        try {
          tmpObj2[element.Subband.val] = element.Subband.val;
        } catch (e) {}
      }
    });
    this.setState({
      subBands: tmpObj2
    });
  };

  subBandsDropdown = name => {
    console.log('SubBands', name);
  };

  render() {
    const { dataLoding, result, product, bands, subBands } = this.state;
    const bandsDisable = Object.keys(bands).length ? false : true;
    const subBandsDisable = Object.keys(subBands).length ? false : true;
    return (
      <div className="box">
        <div className="container items-container">
          {dataLoding ? (
            <NoData msg={'Loding...'} />
          ) : result.length === 0 ? (
            <NoData msg={'Data Not Found.'} />
          ) : (
            <div className="row">
              <div className="col sm">
                <div className="container-table">
                  <div className="vertical-center-row">
                    <ButtonToolbar>
                      <DropdownButton
                        variant="secondary"
                        title={'Products'}
                        onSelect={this.productsEvent}
                      >
                        {Object.keys(product).map(item => {
                          return (
                            <Dropdown.Item key={item} eventKey={item}>
                              {item}
                            </Dropdown.Item>
                          );
                        })}
                      </DropdownButton>
                    </ButtonToolbar>
                  </div>
                </div>
              </div>
              <div className="col sm">
                <ButtonToolbar>
                  <DropdownButton
                    disabled={bandsDisable}
                    variant="secondary"
                    title={bandsDisable ? 'Nodata' : 'Bands'}
                    onSelect={this.bandsDropdown}
                  >
                    {Object.keys(bands).map(item => {
                      return (
                        <Dropdown.Item key={item} eventKey={item}>
                          {item}
                        </Dropdown.Item>
                      );
                    })}
                  </DropdownButton>
                </ButtonToolbar>
              </div>
              <div className="col sm">
                <ButtonToolbar>
                  <DropdownButton
                    disabled={subBandsDisable}
                    variant="secondary"
                    title={subBandsDisable ? 'Nodata' : 'SubBands'}
                    onSelect={this.subBandsDropdown}
                  >
                    {Object.keys(subBands).map(item => {
                      return (
                        <Dropdown.Item key={item} eventKey={item}>
                          {item}
                        </Dropdown.Item>
                      );
                    })}
                  </DropdownButton>
                </ButtonToolbar>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
