<template>
  <transition name="modal">
    <!-- 팝업용 레이아웃 클래스 : popup_layout -->
    <div class="wrap popup_layout">
      <!-- popup close button -->
      <div class="btn_pop_close" role="button" @click="close()">
        <i class="material-icons">close</i>
      </div>
      <!-- header -->
      <header class="header">
        <div class="header_inner">
          <h2 class="layout_title">{{dr_H.SUNM}}
            <span v-if="orderType == 'desc'">매출 TOP</span>
            <span v-else>매출 WORST</span>
            <small class="txt_date">
              <span v-show="headerDate == today" class="chip chip_m">
                <span class="chip_text">TODAY</span>
              </span>
              <strong :class="{point_col1: headerDate == today}">{{headerDate}}</strong>
            </small>
          </h2>
          <div class="layout_spacer"></div>
          <div style="margin-right: 10px;"><small class="txt_s">데이터 기준일 : {{ makeDataDate }}</small></div>
          <!-- groups -->
          <div class="groups">
            <!-- date -->
            <div class="input_group input_icon_group" style="width:210px;">
              <form action="#">
                <label class="btn_icon_nl" for="date">
                  <i class="material-icons">calendar_today</i>
                </label>
                <div class="input_text" type="text" id="date">
                  <date-pick
                    v-model="selectDate"
                    @input="getStoreList"
                    startWeekOnSunday
                    :inputAttributes="{readonly: true}"
                  ></date-pick>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>
      <div class="container">
        <div class="content">
          <!-- 테이블 -->
          <div class="tbl_sheet sheet_scroll tbl_right sheet_scroll_sty01" style="height:100%;">
            <div class="thead_wrap">
              <table class="tbl">
                <colgroup>
                  <col style="width:10%;"/>
                  <col style="width:5%;"/>
                  <col style="width:4%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col v-if="(dr_H.MCODE == '1') || (dr_H.MCODE == 'MI')" style="width:4%;"/>
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col" rowspan="2">매장 매출순위</th>
                    <th scope="col" rowspan="2">매출합계<br>(천원)</th>
                    <th scope="col" rowspan="2">수량합계<br>(개)</th>
                    <th scope="col" colspan="6">정상</th>
                    <th scope="col" colspan="6">할인</th>
                    <th scope="col" colspan="6">균일</th>
                    <th scope="col" rowspan="2" v-if="(dr_H.MCODE == '1') || (dr_H.MCODE == 'MI')">선수금</th>
                  </tr>
                  <tr>
                    <th class="tc">판매액</th>
                    <th class="tc">수량</th>
                    <th class="tc">반품액</th>
                    <th class="tc">수량</th>
                    <th class="tc">매출액</th>
                    <th class="tc">수량</th>
                    <th class="tc">판매액</th>
                    <th class="tc">수량</th>
                    <th class="tc">반품액</th>
                    <th class="tc">수량</th>
                    <th class="tc">매출액</th>
                    <th class="tc">수량</th>
                    <th class="tc">판매액</th>
                    <th class="tc">수량</th>
                    <th class="tc">반품액</th>
                    <th class="tc">수량</th>
                    <th class="tc">매출액</th>
                    <th class="tc">수량</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div class="tfoot_wrap">
              <table class="tbl">
                <colgroup>
                  <col style="width:10%;"/>
                  <col style="width:5%;"/>
                  <col style="width:4%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col v-if="(dr_H.MCODE == '1') || (dr_H.MCODE == 'MI')" style="width:4%;"/>
                </colgroup>
                <tfoot>
                  <tr>
                    <th scope="col"><strong>합계</strong></th>
                    <td><strong>{{ Math.round(totalData.SALE_TOT/1000) | currency}}</strong></td>
                    <td><small class="point_col1">{{totalData.QTY_TOT | currency}}</small></td>
                    <!-- 정상(판매) -->
                    <td><strong>{{ Math.round(totalData.JAMT/1000) | currency}}</strong></td>
                    <td><small class="txt_num point_col1">{{totalData.JQTY | currency}}</small></td>
                    <!-- 정상(반품) -->
                    <td><strong>{{ Math.round(totalData.R_JAMT/1000) | currency}}</strong></td>
                    <td><small class="txt_num point_col1">{{totalData.R_JQTY | currency}}</small></td>
                    <!-- 정상(매출) -->
                    <td><strong>{{ Math.round((totalData.JAMT+totalData.R_JAMT)/1000) | currency}}</strong></td>
                    <td><small class="txt_num point_col1">{{totalData.JQTY+totalData.R_JQTY | currency}}</small></td>
                    <!-- 할인(판매) -->
                    <td><strong>{{ Math.round(totalData.DCAMT/1000) | currency}}</strong></td>
                    <td><small class="txt_num point_col1">{{totalData.DCQTY | currency}}</small></td>
                    <!-- 할인(반품) -->
                    <td><strong>{{ Math.round(totalData.R_DCAMT/1000) | currency}}</strong></td>
                    <td><small class="txt_num point_col1">{{totalData.R_DCQTY | currency}}</small></td>
                    <!-- 할인(매출) -->
                    <td><strong>{{ Math.round((totalData.DCAMT+totalData.R_DCAMT)/1000) | currency}}</strong></td>
                    <td><small class="txt_num point_col1">{{totalData.DCQTY+totalData.R_DCQTY | currency}}</small></td>
                    <!-- 균일(판매) -->
                    <td><strong>{{ Math.round(totalData.GAMT/1000) | currency}}</strong>
                    <td><small class="txt_num point_col1">{{totalData.GQTY | currency}}</small></td>
                    <!-- 균일(반품) -->
                    <td><strong>{{ Math.round(totalData.R_GAMT/1000) | currency}}</strong></td>
                    <td><small class="txt_num point_col1">{{totalData.R_GQTY | currency}}</small></td>
                    <!-- 균일(매출) -->
                    <td><strong>{{ Math.round((totalData.GAMT+totalData.R_GAMT)/1000) | currency}}</strong></td>
                    <td><small class="txt_num point_col1">{{totalData.GQTY+totalData.R_GQTY | currency}}</small></td>
                    <!-- 선수금 -->
                    <td v-if="(dr_H.MCODE == '1') || (dr_H.MCODE == 'MI')"><strong>{{ Math.round(totalData.ADVDEPAMT/1000) | currency}}</strong></td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div class="tbody_wrap">
              <table class="tbl">
                <colgroup>
                  <col style="width:10%;"/>
                  <col style="width:5%;"/>
                  <col style="width:4%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col v-if="(dr_H.MCODE == '1') || (dr_H.MCODE == 'MI')" style="width:4%;"/>
                </colgroup>
                <tbody>
                  <tr v-for="(data, index) in storeList" :key="index">
                    <th scope="row">
                      <span class="num_box">
                        <strong>{{index+1}}</strong>
                      </span>
                      {{data.VDSNM}}
                    </th>
                    <!-- 합계 -->
                    <td>{{ Math.round(data.SALE_TOT/1000) | currency}}</td>
                    <td>
                      <span class="point_col1">{{data.QTY_TOT | currency}}</span>
                    </td>
                    <!-- 정상(판매) -->
                    <td>{{ Math.round(data.JAMT/1000) | currency}}</td>
                    <td><span class="txt_num point_col1">{{data.JQTY | currency}}</span></td>
                    <!-- 정상(반품) -->
                    <td>{{ Math.round(data.R_JAMT/1000) | currency}}</td>
                    <td><span class="txt_num point_col1">{{data.R_JQTY | currency}}</span></td>
                    <!-- 정상(매출) -->
                    <td>{{ Math.round((Number(data.JAMT)+Number(data.R_JAMT))/1000) | currency}}</td>
                    <td><span class="txt_num point_col1">{{Number(data.JQTY)+Number(data.R_JQTY) | currency}}</span></td>
                    <!-- 할인(판매) -->
                    <td>{{ Math.round(data.DCAMT/1000) | currency}}</td>
                    <td><span class="txt_num point_col1">{{data.DCQTY | currency}}</span></td>
                    <!-- 할인(반품) -->
                    <td>{{ Math.round(data.R_DCAMT/1000) | currency}}</td>
                    <td><span class="txt_num point_col1">{{data.R_DCQTY | currency}}</span></td>
                    <!-- 할인(매출) -->
                    <td>{{ Math.round((Number(data.DCAMT)+Number(data.R_DCAMT))/1000) | currency}}</td>
                    <td><span class="txt_num point_col1">{{Number(data.DCQTY)+Number(data.R_DCQTY) | currency}}</span></td>
                    <!-- 균일(판매) -->
                    <td>{{ Math.round(data.GAMT/1000) | currency}}</td>
                    <td><span class="txt_num point_col1">{{data.GQTY | currency}}</span></td>
                    <!-- 균일(반품) -->
                    <td>{{ Math.round(data.R_GAMT/1000) | currency}}</td>
                    <td><span class="txt_num point_col1">{{data.R_GQTY | currency}}</span></td>
                    <!-- 균일(매출) -->
                    <td>{{ Math.round((Number(data.GAMT)+Number(data.R_GAMT))/1000) | currency}}</td>
                    <td><span class="txt_num point_col1">{{Number(data.GQTY)+Number(data.R_GQTY) | currency}}</span></td>
                    <td v-if="(dr_H.MCODE == '1') || (dr_H.MCODE == 'MI')">{{ Math.round(data.ADVDEPAMT/1000) | currency}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import moment from "moment"
import req2svr from "./req2svr"
import datePick from "vue-date-pick"

export default {
  name: "FIN0102",
  components: {
    datePick
  },
  props: {
    dr_H: {
      type: Object,
      default: null
    },
    dr_L: {
      type: Array,
      default: []
    },
    orderType: {
      type: String,
      default: 'desc'
    },
    currentDate: {
      type: String,
      default: moment().format("YYYY-MM-DD")
    }
  },
  created() {
    let i;
    // this.listData = _.cloneDeep(this.dr_L)
    this.selectDate = moment(this.currentDate).format("YYYY-MM-DD");
    let cuerrentYear = Number(moment(this.currentDate).format("YYYY"));
    for (i = 0; i < 3; i++) {
      this.yearList.push(String(cuerrentYear - i));
    }
    this.selectYear = this.yearList[0];
    let cuerrentMonth = Number(moment(this.currentDate).format("MM"));
    for (i = 0; i < 12; i++) {
      if (cuerrentMonth - i < 1) {
        break;
      }
      this.monthList.push(String(cuerrentMonth - i));
    }
    this.selectMonth = this.monthList[0];

    this.getMakeDataDate()
    this.getStoreList()
  },
  computed: {
    req2svr: () => req2svr,
    headerDate() {
      return moment(this.selectDate).format("YYYY.MM.DD (ddd)");
    },
    minDate() {
      return moment().subtract(2, 'year').startOf('year').format("YYYY-MM-DD");
    },
    maxDate() {
      return moment().format("YYYY-MM-DD");
    },
    today() {
      return moment().format("YYYY.MM.DD (ddd)");
    },
    totalData() {
      return {
        SALE_TOT: _.sumBy(this.listData, function(o) { return Number(o.SALE_TOT); }),
        QTY_TOT: _.sumBy(this.listData, function(o) { return Number(o.QTY_TOT); }),
        JAMT: _.sumBy(this.listData, function(o) { return Number(o.JAMT); }),
        R_JAMT: _.sumBy(this.listData, function(o) { return Number(o.R_JAMT); }),
        JQTY: _.sumBy(this.listData, function(o) { return Number(o.JQTY); }),
        R_JQTY: _.sumBy(this.listData, function(o) { return Number(o.R_JQTY); }),
        DCAMT: _.sumBy(this.listData, function(o) { return Number(o.DCAMT); }),
        R_DCAMT: _.sumBy(this.listData, function(o) { return Number(o.R_DCAMT); }),
        DCQTY: _.sumBy(this.listData, function(o) { return Number(o.DCQTY); }),
        R_DCQTY: _.sumBy(this.listData, function(o) { return Number(o.R_DCQTY); }),
        GAMT: _.sumBy(this.listData, function(o) { return Number(o.GAMT); }),
        R_GAMT: _.sumBy(this.listData, function(o) { return Number(o.R_GAMT); }),
        GQTY: _.sumBy(this.listData, function(o) { return Number(o.GQTY); }),
        R_GQTY: _.sumBy(this.listData, function(o) { return Number(o.R_GQTY); }),
        ADVDEPAMT: _.sumBy(this.listData, function(o) { return Number(o.ADVDEPAMT) })
      }
    },
    storeList() {
      if (this.orderType == 'asc') {
        return _.orderBy(this.listData, function(o) { return Number(o.SALE_TOT) }, 'asc')
      } else {
        return _.orderBy(this.listData, function(o) { return Number(o.SALE_TOT) }, 'desc')
      }
    },
    tabType() {
      return this.$store.getters.getFDRList[0].GBNCD == "S" ? "SUCD" : "BRCD"
    },
  },
  data() {
    return {
      selectDate: null,
      selectYear: null,
      selectMonth: null,
      yearList: [],
      monthList: [],
      listData: [],
      makeDataDate: null
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    getMakeDataDate(){
      let sql = "SELECT TO_CHAR(MAX(CREATEDATE), 'YY.MM.DD HH24:MI') CREATEDATE FROM BISL060";

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.makeDataDate = res.CREATEDATE;
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getStoreList() {
      // 매장 매출순위 팝업 리스트 개수
      // 당일매출 순위
      let sql = "SELECT ROWNUM() RN, VDCD, VDSNM, SALE_TOT, QTY_TOT, "
      sql += "JAMT, JQTY, DCAMT, DCQTY, GAMT, GQTY, "
      sql += "R_JAMT, R_JQTY, R_DCAMT, R_DCQTY, R_GAMT, R_GQTY, "
      sql += "ADVDEPAMT FROM ( "
      sql += "SELECT VDCD, VDSNM, SUM(JAMT+DCAMT+GAMT+ADVDEPAMT) AS SALE_TOT, SUM(JQTY+DCQTY+GQTY) AS QTY_TOT, "
      sql += "SUM(JSAMT) JAMT, SUM(JSQTY) JQTY, SUM(DCSAMT) DCAMT, SUM(DCSQTY) DCQTY, SUM(GSAMT) GAMT, SUM(GSQTY) GQTY, "
      sql += "SUM(JRAMT) R_JAMT, SUM(JRQTY) R_JQTY, SUM(DCRAMT) R_DCAMT, SUM(DCRQTY) R_DCQTY, SUM(GRAMT) R_GAMT, SUM(GRQTY) R_GQTY, "
      sql += "SUM(ADVDEPAMT) ADVDEPAMT "
      sql += "FROM BISL060 "
      // sql += "WHERE " + this.tabType + " = '" + this.dr_H.MCODE + "' "
      sql += "WHERE SALEDT = '"+ moment(this.selectDate).format("YYYYMMDD") +"' "
      sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BISL060) ";
      sql += "GROUP BY VDCD, VDSNM, SUCD "
      sql += "HAVING " + this.tabType + " = '" + this.dr_H.MCODE + "' "
      sql += "ORDER BY SALE_TOT DESC "
      sql += ")"

      this.req2svr.getData(sql).then(
        res => {
          this.listData = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.listData.push(res);
            } else {
              this.listData = JSON.parse("[" + res + "]");
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    }
  },
  filters: {
    currency: function(value) {
      var x
      if (value) {
        x = value.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
      } else {
        x = 0
      }
      if (x == Number.POSITIVE_INFINITY || x == Number.NEGATIVE_INFINITY || x == "NaN") {
        x = 0
      }
      return x;
    },
    nanToDot: function(value) {
      let x = value ? value : 0;
      if (x == Number.POSITIVE_INFINITY || x == Number.NEGATIVE_INFINITY || x == "NaN") {
        x = 0
      }
      return x
    }
  }
};
</script>