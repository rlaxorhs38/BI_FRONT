import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getMakeDataDate() {
    return axios.get(apiUrl() + "fin/getMakeDataDate").then(x => x.data)
  },
  getRecentBISL061Date() { 
    return axios.get(apiUrl() + "fin/getRecentBISL061Date").then(x => x.data)
  },
  getTotalSalesData(tabType, authCodeList, date, monthStartDate) { 
    return axios.get(apiUrl() + "fin/getTotalSalesData", {
      params : { 
        tabType : tabType,
        authCodeList : authCodeList,
        date : date,
        monthStartDate : monthStartDate
      }
    }).then(x => x.data)
  },
  getCumulativeData(tabType, authCodeList, date, monthStartDate) { 
    return axios.get(apiUrl() + "fin/getCumulativeData", {
      params : { 
        tabType : tabType,
        authCodeList : authCodeList,
        date : date,
        monthStartDate : monthStartDate
      }
    }).then(x => x.data)
  },
  getChartData2(tabType, code, lastYear30day, lastYearSelectDay) { 
    return axios.get(apiUrl() + "fin/getChartData2", {
      params : { 
        tabType : tabType,
        code : code,
        lastYear30day : lastYear30day,
        lastYearSelectDay : lastYearSelectDay
      }
    }).then(x => x.data)
  },
  getCurrentYearData(tabType, code, last30day, date) { 
    return axios.get(apiUrl() + "fin/getCurrentYearData", {
      params : { 
        tabType : tabType,
        code : code,
        last30day : last30day,
        date : date
      }
    }).then(x => x.data)
  },
  getStoreList(date, tabType, code) { 
    return axios.get(apiUrl() + "fin/getStoreList", {
      params : { 
        date : date,
        tabType : tabType,
        code : code
      }
    }).then(x => x.data)
  },
  getSalesChartCount(tabType, code, date) { 
    return axios.get(apiUrl() + "fin/getSalesChartCount", {
      params : { 
        tabType : tabType,
        code : code,
        date : date
      }
    }).then(x => x.data)
  },
  getSalesChartAMT(tabType, code, date) { 
    return axios.get(apiUrl() + "fin/getSalesChartAMT", {
      params : { 
        tabType : tabType,
        code : code,
        date : date
      }
    }).then(x => x.data)
  }
}
