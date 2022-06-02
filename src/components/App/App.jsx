import React, { Component } from "react";
import axios from "axios";

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
  }

  showCarts = () => {
    this.setState({open: !this.state.open})
  }

  getData = async (raw) => {
    // try{
    //     const res = await axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Statistic/Controller.php', raw);
    //     if (res.statusText === "OK"){
    //         this.setState({ data: res.data })
    //     } else{
    //         this.setState({ requestError: true })
    //     }
    // } catch{
    //     this.setState({ requestError: true })
    // } finally{
    //     this.setState({ loading: false });
    // }
    this.setState({loading: false});
    this.setState({data: {
      "name": "Мищенко Иван",
      "office": "Отдел обучения и сопровождения проектов",
      "rights": "chief",
      "mode": "chief",
      "subordinated": [
          {
              "userId": 11,
              "name": "Аданаков Дмитрий"
          },
          {
              "userId": 2831,
              "name": "Василькова Ирина"
          },
          {
              "userId": 663,
              "name": "Савинцева Ольга"
          },
          {
              "userId": 1105,
              "name": "Османов Николай"
          },
          {
              "userId": 2921,
              "name": "Заинковский Антон"
          },
          {
              "userId": 3650,
              "name": "Черникова Мария"
          },
          {
              "userId": 2668,
              "name": "Денишева Лилия"
          }
      ],
      "statistic": [
          {
              "UID": 1,
              "name": "Численность риелторов",
              "unit": "чел.",
              "hasDailyStatistic": false,
              "month": {
                  "plan": 1672,
                  "fact": 1170,
                  "performance": 70
              }
          },
          {
              "UID": 2,
              "name": "Закрепляемость стажеров",
              "unit": "%",
              "hasDailyStatistic": false,
              "month": {
                  "plan": 4611,
                  "fact": 4012,
                  "performance": 87
              }
          },
          {
              "UID": 3,
              "name": "Заключенные СК",
              "unit": "шт.",
              "hasDailyStatistic": true,
              "month": {
                  "plan": 1755,
                  "fact": 369,
                  "performance": 21
              },
              "week": [
                  {
                      "UID": 17,
                      "plan": 293,
                      "fact": 62,
                      "performance": 21
                  },
                  {
                      "UID": 18,
                      "plan": 293,
                      "fact": 62,
                      "performance": 80
                  },
                  {
                      "UID": 19,
                      "plan": 293,
                      "fact": 62,
                      "performance": 98
                  },
                  {
                      "UID": 20,
                      "plan": 293,
                      "fact": 62,
                      "performance": 8
                  },
                  {
                      "UID": 21,
                      "plan": 293,
                      "fact": 62,
                      "performance": 82
                  },
                  {
                      "UID": 22,
                      "plan": 293,
                      "fact": 62,
                      "performance": 74
                  }
              ]
          },
          {
              "UID": 4,
              "name": "Рекламная полка",
              "unit": "шт.",
              "hasDailyStatistic": true,
              "month": {
                  "plan": 8252,
                  "fact": 5694,
                  "performance": 69
              },
              "week": [
                  {
                      "UID": 17,
                      "plan": 1375,
                      "fact": 949,
                      "performance": 14
                  },
                  {
                      "UID": 18,
                      "plan": 1375,
                      "fact": 949,
                      "performance": 66
                  },
                  {
                      "UID": 19,
                      "plan": 1375,
                      "fact": 949,
                      "performance": 91
                  },
                  {
                      "UID": 20,
                      "plan": 1375,
                      "fact": 949,
                      "performance": 46
                  },
                  {
                      "UID": 21,
                      "plan": 1375,
                      "fact": 949,
                      "performance": 1
                  },
                  {
                      "UID": 22,
                      "plan": 1375,
                      "fact": 949,
                      "performance": 88
                  }
              ]
          },
          {
              "UID": 5,
              "name": "Результативные риелторы",
              "unit": "%",
              "hasDailyStatistic": false,
              "month": {
                  "plan": 6177,
                  "fact": 4447,
                  "performance": 72
              },
              "week": [
                  {
                      "UID": 17,
                      "plan": 1030,
                      "fact": 741,
                      "performance": 50
                  },
                  {
                      "UID": 18,
                      "plan": 1030,
                      "fact": 741,
                      "performance": 71
                  },
                  {
                      "UID": 19,
                      "plan": 1030,
                      "fact": 741,
                      "performance": 15
                  },
                  {
                      "UID": 20,
                      "plan": 1030,
                      "fact": 741,
                      "performance": 68
                  },
                  {
                      "UID": 21,
                      "plan": 1030,
                      "fact": 741,
                      "performance": 69
                  },
                  {
                      "UID": 22,
                      "plan": 1030,
                      "fact": 741,
                      "performance": 41
                  }
              ]
          },
          {
              "UID": 6,
              "name": "Заявки от покупателей",
              "unit": "шт.",
              "hasDailyStatistic": true,
              "month": {
                  "plan": 8998,
                  "fact": 7288,
                  "performance": 81
              },
              "week": [
                  {
                      "UID": 17,
                      "plan": 1500,
                      "fact": 1215,
                      "performance": 91
                  },
                  {
                      "UID": 18,
                      "plan": 1500,
                      "fact": 1215,
                      "performance": 74
                  },
                  {
                      "UID": 19,
                      "plan": 1500,
                      "fact": 1215,
                      "performance": 24
                  },
                  {
                      "UID": 20,
                      "plan": 1500,
                      "fact": 1215,
                      "performance": 27
                  },
                  {
                      "UID": 21,
                      "plan": 1500,
                      "fact": 1215,
                      "performance": 25
                  },
                  {
                      "UID": 22,
                      "plan": 1500,
                      "fact": 1215,
                      "performance": 16
                  }
              ]
          }
      ],
      "curWeek": "21",
      "countWeeks": 6,
      "startDate": "2022-05-01",
      "stopDate": "2022-05-31"
  }})
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
                      office={this.state.data.office}
                      rights={this.state.data.rights}
                      subordinated={this.state.data.subordinated}
                      getData={this.getData}
                    />
                    <Statistics
                      statistic={this.state.data.statistic}
                      curWeek={this.state.data.curWeek}
                      onClose={this.showCarts}
                    />
                    <ModalWindow 
                        open={this.state.open}
                        onClose={this.showCarts}
                        children={<Charts/>}
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
      // userId: userId,
      // userId: 2198,
      month: "",
      year: ""
    })
  }
}