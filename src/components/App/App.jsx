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
    this.setState({ startOffice: this.state.data.office[0].NAME })
    this.setState({ startEmploee: this.state.data.rights !== 'chief' ? this.state.data.name : 'all' }, () => {
      this.setState({ loading: false })
    })
  }

  getData = async (raw, mount) => {
    try {
      const res = await axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Statistic/Controller.php', raw);
      if (res.statusText === "OK") {
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
    }
    //   this.setState({ loading: false });
    //   this.setState({data:{
    //     "name": "Мищенко Иван",
    //     "office": [
    //         {
    //             "NAME": "Отдел обучения и сопровождения проектов",
    //             "ID": "262"
    //         },
    //         {
    //           "NAME": "Отдел обучения",
    //           "ID": "2621"
    //       }
    //     ],
    //     "viewedOfficeId": null,
    //     "rights": "chief",
    //     "mode": "chief",
    //     "subordinated": [
    //         {
    //             "officeId": 262,
    //             "userId": 11,
    //             "name": "Аданаков Дмитрий"
    //         },
    //         {
    //             "officeId": 262,
    //             "userId": 2831,
    //             "name": "Василькова Ирина"
    //         },
    //         {
    //             "officeId": 262,
    //             "userId": 663,
    //             "name": "Савинцева Ольга"
    //         },
    //         {
    //             "officeId": 262,
    //             "userId": 1105,
    //             "name": "Османов Николай"
    //         },
    //         {
    //             "officeId": 262,
    //             "userId": 2921,
    //             "name": "Заинковский Антон"
    //         },
    //         {
    //             "officeId": 262,
    //             "userId": 3650,
    //             "name": "Черникова Мария"
    //         },
    //         {
    //             "officeId": 262,
    //             "userId": 2668,
    //             "name": "Денишева Лилия"
    //         },
    //         {
    //             "officeId": 262,
    //             "userId": 2198,
    //             "name": "Мищенко Иван"
    //         }
    //     ],
    //     "statistic": [
    //         {
    //             "UID": 4,
    //             "name": "Рекламная полка",
    //             "unit": "шт.",
    //             "hasDailyStatistic": true,
    //             "week": [
    //                 {
    //                     "UID": 22,
    //                     "plan": 15,
    //                     "fact": 0,
    //                     "performance": 2.86
    //                 },
    //                 {
    //                     "UID": 23,
    //                     "plan": 15,
    //                     "fact": 0,
    //                     "performance": 0
    //                 },
    //                 {
    //                     "UID": 24,
    //                     "plan": 15,
    //                     "fact": 0,
    //                     "performance": 0
    //                 },
    //                 {
    //                     "UID": 25,
    //                     "plan": 15,
    //                     "fact": 0,
    //                     "performance": 0
    //                 },
    //                 {
    //                     "UID": 26,
    //                     "plan": 15,
    //                     "fact": 0,
    //                     "performance": 0
    //                 }
    //             ],
    //             "month": {
    //                 "plan": 15,
    //                 "fact": 1,
    //                 "performance": 7
    //             }
    //         }
    //     ],
    //     "curWeek": "22",
    //     "countWeeks": 5,
    //     "startDate": "2022-06-01",
    //     "stopDate": "2022-06-30"
    // }})
  }

  getDealyStatitistic = async (UID) => {
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
      this.setState({ loading: false });
    }
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
                    />
                    <Statistics
                      statistic={this.state.data.statistic}
                      curWeek={this.state.data.curWeek}
                      getDealyStatitistic={this.getDealyStatitistic}
                    />
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