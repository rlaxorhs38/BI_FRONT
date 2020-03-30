import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getData(sql) {
    return axios.get(apiUrl(sql)).then(x => x.data)
  },
  getsalesRanking(orderType, tabType, code, searchType, date) {
    return axios.get(apiUrl() + "fin/getsalesRanking", {
      params : { 
        tabType : tabType,
        orderType : orderType,
        searchType : searchType,
        code : code,
        date : date
      }
    }).then(x => x.data)
  }
}
