import React, { Component } from "react";
import axios from "axios";
import moment from 'moment';

import { Header } from 'components/Header'
import { Linear } from 'components/Linear';
import { Statistics } from 'components/Statistics';
import { ModalWindow } from 'components/ModalWindow';
import { Charts } from 'components/Charts';

import './App.scss';

export class App extends Component {
  state = {
    data: '',
    loading: true,
    requestLoading: false,
    error: false,
    open: false,
    mounth: moment().format('M'),
    year: moment().format('YYYY'),
    currentStatistic: null,
    startOffice: '',
    startEmploee: ''
  }

  showCarts = () => {
    this.setState({ open: !this.state.open }, () => {
      if (!this.state.open) {
        this.setState({ currentStatistic: null })
      };
    })
  }
  startValue = () => {
    this.setState({ startOffice: this.state.data?.office?.length ? this.state.data.office[0].NAME : this.state.data.office.NAME })
    this.setState({ startEmploee: this.state.data.rights !== 'chief' ? this.state.data.name : 'all' }, () => {
      this.setState({ loading: false })
    })
  }

  getData = async (raw, mount) => {
    !mount && this.setState({ requestLoading: true });
    try {
      const res = await axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Statistic/Controller.php', raw);
      if (res.statusText === "OK" && res?.data) {
        this.setState({ data: res.data }, () => {
          mount && this.startValue();
        })
      } else {
        this.setState({ requestError: true })
      }
    } catch {
      this.setState({ requestError: true })
    } finally {
      !mount && this.setState({ loading: false });
      !mount && this.setState({ requestLoading: false });
    }
  }

  getDealyStatitistic = async (UID) => {
    this.setState({ requestLoading: true });
    try {
      const res = await axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Statistic/Controller.php', {
        "action": "getDealy",
        "userId": userId,
        "month": this.state.mounth,
        "year": this.state.year,
        "indicatorId": UID
      });
      if (res?.data && res?.statusText === "OK") {
        this.setState({ currentStatistic: res.data })
        this.showCarts();
      } else {
        this.setState({ requestError: true })
      }
    } catch {
      this.setState({ requestError: true })
    } finally {
      this.setState({ requestLoading: false });
    }
    this.showCarts();
  }

  setStateMount = (value) => {
    this.setState({ mounth: value });
  }
  setStateYear = (value) => {
    this.setState({ year: value });
  }

  render() {
    return (
      <>
        {
          this.state.loading ?
            <Linear /> :
            <>
              {
                this.state.error ?
                  <p className="text error">Ошибка при загрузки</p> :
                  <>
                    <Header
                      name={this.state.data.name}
                      officeList={this.state.data.office}
                      rights={this.state.data.rights}
                      subordinated={this.state.data.subordinated}
                      getData={this.getData}
                      startEmploee={this.state.startEmploee}
                      startOffice={this.state.startOffice}
                      setStateMount={this.setStateMount}
                      setStateYear={this.setStateYear}
                      request={ this.state.requestLoading }
                    />
                    {
                      this.state.requestLoading ?
                        <Linear /> :
                        <Statistics
                          statistic={this.state.data.statistic}
                          curWeek={this.state.data.curWeek}
                          getDealyStatitistic={this.getDealyStatitistic}
                        />
                    }
                    <ModalWindow
                      open={this.state.open}
                      onClose={this.showCarts}
                      children={<Charts currentStatistic={this.state.currentStatistic} />}
                    />
                  </>
              }
            </>
        }
      </>
    )
  }
  componentDidMount() {
    this.getData({
      action: "get",
      userId: userId,
      // userId: 2198,
      month: "",
      year: ""
    }, true)
  }
}