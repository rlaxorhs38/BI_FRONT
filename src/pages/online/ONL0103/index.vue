<template>
  <div class="wrap">
    <!-- drawer_열리는 클래스 : on -->
    <div class="layout_drawer" :class="{on: drawer}">
      <h1 class="tit_drawer teamSelector" @click="toMain"><img src="@/assets/images/img_logo.png" alt="sisun" /></h1>
      <side-menu @click="drawer = !drawer"></side-menu>
    </div>
    <!-- drawer button -->
    <div role="button" class="btn_drawer" @click.stop="drawer = !drawer">
      <i v-show="!drawer" class="material-icons">menu</i>
      <i v-show="drawer" class="material-icons">arrow_back_ios</i>
    </div>
    <div class="layout_obfuscator"></div>
    <!-- header -->
    <header class="header">
        <div class="header_inner">
        <!-- Title -->
        <h2 class="layout_title">온라인 매출
          <small class="txt_date">
            <span v-show="headerDate == today" class="chip chip_m">
              <span class="chip_text">TODAY</span>
            </span>
            <strong class="point_col1">{{ headerDate }}</strong>
          </small>
        </h2>
        <div class="layout_spacer"></div>
        <!--
        <div style="margin-right: 10px;">
          <button type="button" class="btn_n" style="height:55px;"  @click="showYearly()">년도별 매출 현황</button>
        </div>
        <div style="margin-left: 10px; margin-right: 10px;">
          <button type="button" class="btn_n" style="height:55px;"  @click="showDaily()"><label>일별 매출 현황</label></button>
        </div>
        -->
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
                    @input="changeDate"
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
        <!-- scrolling card -->
        <div class="list_box lb_sty01">
          <div class="inner">
            <ul class="list_card">
              <template v-for="data in baseSaleList">
              <li :key="data.ITEM">
                <!-- card_MI 사업부 -->
                <div
                  class="card card_mini"
                  @click="changeBusiness(data.ITEM)"
                  :class="{on : selectedCODE == data.ITEM}"
                >
                  <div class="card_title">
                    <h4 class="card_title_text">{{ data.BRCD }}</h4>
                  </div>
                  <div class="card_content">
                    <strong class="em_obj" v-if="data.DAYTOT">
                      {{ Number(data.DAYJASA) + Number(data.DAYOUT) | currency }}<small class="txt">천원</small>
                    </strong>
                    <strong class="em_obj" v-else>
                      0<small class="txt">천원</small>
                    </strong>
                    <dl class="list_obj">
                      <dt class="tit">비율</dt>
                      <dd class="txt" v-if="data.DAYRAT">
                        {{ Math.round((Number(data.DAYJASA) + Number(data.DAYOUT))/data.DAYTOT*100) | nanToDot }} %
                      </dd>
                      <dd class="txt" v-else>
                        0 %
                      </dd>
                    </dl>
                  </div>
                </div>
              </li>
              </template>
            </ul>
          </div>
        </div>
        <!-- //scrolling card -->
        <div class="row">
          <div class="col_md_6">
            <div class="list_box">
              <ul class="list_card">
                <li>
                  <!-- card_당일 전체 매출 -->
                  <div class="card card_mini">
                    <div class="card_title">
                      <h4 class="card_title_text">당일 전체 매출</h4>
                    </div>
                    <div class="card_content">
                      <strong class="em_obj" style="font-size: 36px;color: #6b6e77;" v-if="baseSaleList.length > 0">
                        {{ current_BS.DAYTOT | currency }}<small class="txt">천원</small>
                      </strong>
                    </div>
                  </div>
                </li>
                <li>
                  <!-- card_당일 온라인 매출 -->
                  <div class="card card_mini">
                    <div class="card_title">
                      <h4 class="card_title_text">당일 온라인 매출</h4>
                    </div>
                    <div class="card_content">
                      <strong class="em_obj" v-if="baseSaleList.length > 0">
                        {{ Number(current_BS.DAYJASA) + Number(current_BS.DAYOUT) | currency }}<small class="txt">천원</small>
                      </strong>
                    </div>
                  </div>
                </li>
                <li>
                  <!-- card_당일 온라인 매출 달성률 -->
                  <div class="card card_mini">
                    <div class="card_title">
                      <h4 class="card_title_text">당일 온라인 매출 비율</h4>
                    </div>
                    <div class="card_title">
                      <small class="txt_box">(당일 온라인 매출/당일 전체 매출) * 100</small>
                    </div>
                    <div class="card_content" >
                      <strong class="em_obj" v-if="baseSaleList.length > 0">
                        {{ Math.round((Number(current_BS.DAYJASA) + Number(current_BS.DAYOUT))/current_BS.DAYTOT*100) | nanToDot }}
                        <small
                          class="txt2"
                        >%</small>
                      </strong>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="col_md_6 npl">
            <div class="list_box">
              <ul class="list_card">
                <li>
                  <!-- card_당월 전체 매출 -->
                  <div class="card card_mini">
                    <div class="card_title">
                      <h4 class="card_title_text">당월 전체 매출</h4>
                    </div>
                    <div class="card_content">
                      <strong class="em_obj" style="font-size: 36px;color: #6b6e77;" v-if="baseSaleList.length > 0">
                        {{ Math.round(current_BS.MONTOT/1000) | nanToDot }}<small class="txt">백만원</small>
                      </strong>
                    </div>
                  </div>
                </li>
                <li>
                  <!-- card_당월 온라인 매출 -->
                  <div class="card card_mini">
                    <div class="card_title">
                      <h4 class="card_title_text">당월 온라인 매출</h4>
                    </div>
                    <div class="card_content">
                      <strong class="em_obj" v-if="baseSaleList.length > 0">
                        {{ Math.round((Number(current_BS.MONJASA) + (Number(current_BS.MONOUT)))/1000) | currency }}<small class="txt">백만원</small>
                      </strong>
                    </div>
                  </div>
                </li>
                <li>
                  <!-- card_당월 온라인 매출 달성률 -->
                  <div class="card card_mini">
                    <div class="card_title">
                      <h4 class="card_title_text">당월 온라인 매출 비율</h4>
                    </div>
                    <div class="card_title">
                      <small class="txt_box">(당월 온라인 매출/당월 온라인 전체 매출) * 100</small>
                    </div>
                    <div class="card_content" >
                      <strong class="em_obj" v-if="baseSaleList.length > 0">
                        {{ Math.round(((Number(current_BS.MONJASA) + (Number(current_BS.MONOUT)))/1000)/(current_BS.MONTOT/1000)*100) | nanToDot }}
                        <small
                          class="txt2"
                        >%</small>
                      </strong>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col_md_6" id="salesDailyDiv">
            <div class="cont_box h100">
              <div class="tit">
                <div class="tab">
                  <ul>
                    <li class="on">
                      <a href="javascript:void(0);">온라인 일간 매출추이</a>
                    </li>
                  </ul>
                </div>
                <div class="layout_spacer"></div>
                  <button class="btn_icon btn_s btn_edge_sty01 mr10" @click="showDaily()">
                    <i class="material-icons">add</i>
                  </button>
                  <button class="btn_icon btn_s btn_edge_sty01" @click="hideSalesTop()">
                    <i class="material-icons" v-if="hide_sales == 0" style="font-size:30px;">arrow_right</i>
                    <i class="material-icons" v-if="hide_sales == 1" style="font-size:30px;">arrow_left</i>
                  </button>
              </div>
              <div class="cont">
                <div class="tr pr10 mt10"> 단위: 천원 </div>
                <div class="graph_area" style="height: auto;">
                  <div class="graph_view npt">
                    <div class="graph" style="position:relative; width:100%; height:270px;">
                      <div id="chartdiv1" style="position:relative; width:100%; height:100%; float:left;"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col_md_6 npl" id="salesMonthlyDiv">
            <div class="cont_box h100">
              <div class="tit">
                <div class="tab">
                  <ul>
                    <li :class="{'on': gubun == 1}">
                      <a href="javascript:void(0);" @click="tabVal('1')">온라인 월간 매출추이</a>
                    </li>
                    <li :class="{'on': gubun == 2}" style="display:none;">
                      <a href="javascript:void(0);" @click="tabVal('2')">온라인 월간 매출_막대</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="cont">
                <div class="tr pr10 mt10"> 단위: 백만원 </div>
                <div class="graph_area" style="height: auto;" v-show="gubun == 1">
                  <div class="graph_view npt">
                    <div class="graph" style="position:relative; width:100%; height:270px;">
                      <div id="chartdiv2" style="position:relative; width:100%; height:100%; float:left;"></div>
                    </div>
                  </div>
                </div>
                <div class="graph_area" style="height: auto;" v-show="gubun == 2">
                  <div class="graph_view npt">
                    <div class="graph" style="position:relative; width:100%; height:270px;">
                      <div id="chartdiv3" style="position:relative; width:100%; height:100%; float:left;"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="row">
          <div class="container">
            <div class="cont_box h100">
              <div class="tit">
                <div class="tab">
                  <ul>
                    <li :class="{'on': gubun == 3}">
                      <a href="javascript:void(0);" @click="tabVal(3)">온라인 일간 매출추이</a>
                    </li>
                    <li :class="{'on': gubun == 1}">
                      <a href="javascript:void(0);" @click="tabVal(1)">온라인 월간 매출추이</a>
                    </li>
                    <li :class="{'on': gubun == 2}">
                      <a href="javascript:void(0);" @click="tabVal(2)">온라인 월간 매출_막대</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="cont">
                <div class="tr pr10 mt10"> 단위: 백만원 </div>
                <div class="graph_area" style="height: auto;" v-show="gubun == 3">
                  <div class="graph_view npt">
                    <div class="graph" style="position:relative; width:100%; height:270px;">
                      <div id="chartdiv1" style="position:relative; width:100%; height:100%; float:left;"></div>
                    </div>
                  </div>
                </div>
                <div class="graph_area" style="height: auto;" v-show="gubun == 1">
                  <div class="graph_view npt">
                    <div class="graph" style="position:relative; width:100%; height:270px;">
                      <div id="chartdiv2" style="position:relative; width:100%; height:100%; float:left;"></div>
                    </div>
                  </div>
                </div>
                <div class="graph_area" style="height: auto;" v-show="gubun == 2">
                  <div class="graph_view npt">
                    <div class="graph" style="position:relative; width:100%; height:270px;">
                      <div id="chartdiv3" style="position:relative; width:100%; height:100%; float:left;"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <!-- <detail-msly-popup
        v-if="isDetailMslVisible"
        @close="closeDetailMsl"
        :year="year"
      /> -->
    <yearly-popup
        v-if="isYearlyVisible"
        @close="closeYearly"
        :year="year"
     />
    <daily-popup
        v-if="isDailyVisible"
        @close="closeDaily"
        :selectedCODE="selectedCODE"
        :currentDate="selectDate"
        :codeText="codeText"
    />
  </div>
</template>

<script>
import moment from "moment"
import req2svr from "./req2svr"
import sideMenu from '@/components/sideMenu'
import datePick from "vue-date-pick"

// import DetailMslyPopup from '@/pages/online/ONL0104_1'
import YearlyPopup from '@/pages/online/ONL0103_1'
import DailyPopup from '@/pages/online/ONL0103_2'

export default {
  name: "ONL0103",
  components: {
    sideMenu,
    datePick,
    // DetailMslyPopup,
    YearlyPopup,
    DailyPopup
  },
  props: {
    data: Object
  },
  mounted() {
    this.setLoadData();
  },
  created() {
    this.getMakeDataDate();
    this.selectDate = moment().subtract(1, "days").format("YYYY-MM-DD");
    // this.loadData()
  },
  computed: {
    req2svr: () => req2svr,
    headerDate() {
      return moment(this.selectDate).format("YYYY.MM.DD (ddd)");
    },
    today() {
      return moment().format("YYYY.MM.DD (ddd)");
    },
    current_BS() {
      let list = _.find(this.baseSaleList, {ITEM: this.selectedCODE})
      return list
    },
  },
  data() {
    return {
      drawer: null,
      brand: 1,
      year: Number(moment(this.selectDate).format("YYYY")),
      month: Number(moment(this.selectDate).format("MM")),
      toDay: Number(moment(this.selectDate).format("DD")),
      msg: 'This is OnLineSale page',
      itOnffImptList: [],
      brdSaleMslList: [],
      itOnffImptMslList: [],
      // isDetailMslVisible: false,
      isYearlyVisible: false,
      isDailyVisible: false,
      baseSaleList: [],
      dailySaleList: [],
      monthlySaleList: [],
      selectDate: null,
      rootYear: 1904,
      rootDayOfWeekIndex: 4, // 2000년 1월 1일은 토요일
      currentMonthStartWeekIndex: null,
      currentCalendarMatrix: [],
      endOfDay: null,
      clickedMonth: Number(moment(this.selectDate).format("MM")),
      monthList: [],
      makeDataDate: null,
      selectedCODE: '00',
      choice: 1,
      chart1: null,
      chart2: null,
      gubun: 1,
      hide_sales: 0,
      codeText: '전체'
    }
  },
  methods: {
    getMakeDataDate(){
      this.req2svr.getMakeDataDate().then(
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
    toMain: function () {
      this.$router.replace("/");
    },
    changeDate() {
      this.year = Number(moment(this.selectDate).format("YYYY"));
      this.month = Number(moment(this.selectDate).format("MM"));
      this.toDay = Number(moment(this.selectDate).format("DD"));
      this.setLoadData()
    },
    setLoadData: function () {
      for(var i=0; i<this.month; i++) {
        this.monthList.push(i+1)
      }

      this.currentMonthStartWeekIndex = this.getStartWeek(this.year, this.month);
      this.endOfDay = this.getEndOfDay(this.year, this.month);
      this.initCalendar();

      this.getSaleByBrdDetailData()
      this.getITOnOffSaleList()
      //this.getITOnOffDetailData()
      this.getBaseSaleList()
      this.setChartData(this.month)
    },
    getSaleByBrandList: function () {
      this.req2svr.getSaleByBrandList(this.year).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            //console.log("getSaleByBrandList", res);
            let thisYearData = JSON.parse("[" + res + "]");
            for(var i in this.brandSaleList) {
              for(var j in thisYearData) {
                if(this.brandSaleList[i].BRCD == thisYearData[j].MAINGU) {
                  this.brandSaleList[i]["JASASILAMT"] = thisYearData[j]["JASASILAMT"];
                  this.brandSaleList[i]["OUTSILAMT"] = thisYearData[j]["OUTSILAMT"];
                  this.brandSaleList[i]["TOTSILAMT"] = thisYearData[j]["TOTSILAMT"];
                }
              }
            }
            let totObj = {
              BRCD : "TOTAL", "SUCD": "",
              "JASASILAMT" : _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT); }), 
              "OUTSILAMT"  : _.sumBy(this.brandSaleList, function(o) { return Number(o.OUTSILAMT); }), 
              "TOTSILAMT"  : _.sumBy(this.brandSaleList, function(o) { return Number(o.TOTSILAMT); }),
              "JASASILAMT1": _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT1); }), 
              "OUTSILAMT1" : _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT1); }), 
              "TOTSILAMT1" : _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT1); }),
              "JASASILAMT2": _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT2); }), 
              "OUTSILAMT2" : _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT2); }), 
              "TOTSILAMT2" : _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT2); }),
              "JASASILAMT3": _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT3); }), 
              "OUTSILAMT3" : _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT3); }), 
              "TOTSILAMT3" : _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT3); }),
              "JASASILAMT4": _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT4); }), 
              "OUTSILAMT4" : _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT4); }), 
              "TOTSILAMT4" : _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT4); }),
            };
            this.brandSaleList.push(totObj);
            //console.log(this.brandSaleList);
          }
        },
        rej => {
          console.log("rej", rej);
          let ItYearData = JSON.parse("[" + res + "]");
        }
      )
    },
    getITOnOffSaleList: function () {
      this.req2svr.getITOnOffSaleList(this.year).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            //console.log(res);
            let itYearData = JSON.parse("[" + res + "]");
            console.log("itYearData >>> ", itYearData);
            this.getITOnOffDetailData(itYearData)
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getBaseSaleList: function () { 
      let selectDate = Number(moment(this.selectDate).format("YYYYMMDD"));
      this.req2svr.getBaseSaleList(selectDate).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.baseSaleList = JSON.parse("[" + res + "]");

            for(var i in this.baseSaleList) {
              this.baseSaleList[i].ITEM = this.baseSaleList[i].BRCD
            }

            let totObj = {
              "BRCD": "전체",
              "SORT": "0",
              "ITEM": "00",
              "DAYTOT": _.sumBy(this.baseSaleList, function(o) { return Number(o.DAYTOT); }),
              "DAYJASA": _.sumBy(this.baseSaleList, function(o) { return Number(o.DAYJASA); }),
              "DAYOUT": _.sumBy(this.baseSaleList, function(o) { return Number(o.DAYOUT); }),
              "DAYRAT": _.meanBy(this.baseSaleList, function(o) { return Number(o.DAYRAT); }),
              "MONTOT": _.sumBy(this.baseSaleList, function(o) { return Number(o.MONTOT); }),
              "MONJASA": _.sumBy(this.baseSaleList, function(o) { return Number(o.MONJASA); }),
              "MONOUT": _.sumBy(this.baseSaleList, function(o) { return Number(o.MONOUT); }),
              "MONRAT": _.meanBy(this.baseSaleList, function(o) { return Number(o.MONRAT); }),
              "YEARTOT": _.sumBy(this.baseSaleList, function(o) { return Number(o.YEARTOT); }),
              "YEARJASA": _.sumBy(this.baseSaleList, function(o) { return Number(o.YEARJASA); }),
              "YEAROUT": _.sumBy(this.baseSaleList, function(o) { return Number(o.YEAROUT); }),
              "YEARRAT": _.meanBy(this.baseSaleList, function(o) { return Number(o.YEARRAT); })
            }

            this.baseSaleList.unshift(totObj);
            console.log("baseSaleList >>> ", this.baseSaleList);
            
            //console.log(this.brandSaleList);
          }
        },
        rej => {
          console.log("rej", rej);
          let ItYearData = JSON.parse("[" + res + "]");
        }
      )
    },
    getSaleByBrdDetailData: function () {
      this.req2svr.getSaleByBrdDetailData(this.year).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.brdSaleMslList = JSON.parse("[" + res + "]");
            let totObj = {
              BRCD : "TOTAL", "SUCD": ""
            };

            for(var i=0; i < 12; i++) {
              totObj["JASASILAMT"+(i+1)] = this.brdSaleMslList.map(x => Number(x["JASASILAMT"+(i+1)])).reduce(function (pre, value) { return pre + value; });
              totObj["OUTSILAMT"+(i+1)] = this.brdSaleMslList.map(x => Number(x["OUTSILAMT"+(i+1)])).reduce(function (pre, value) { return pre + value; });
              totObj["TOTSILAMT"+(i+1)] = this.brdSaleMslList.map(x => Number(x["TOTSILAMT"+(i+1)])).reduce(function (pre, value) { return pre + value; });
            }
            this.brdSaleMslList.push(totObj);
            console.log("this.brdSaleMslList >>> ", this.brdSaleMslList);
          }
        },
        rej => {
          console.log("rej", rej);
          let ItYearData = JSON.parse("[" + res + "]");
        }
      )
    },
    getITOnOffDetailData: function (itYearData) {
      this.req2svr.getITOnOffDetailData(this.year).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.itOnffImptMslList = JSON.parse("[" + res + "]");
            for(var i in this.itOnffImptMslList) {
              for(var j in itYearData) {
                if(this.itOnffImptMslList[i]["ITEM"] == itYearData[j]["ITEM"]) {
                  this.itOnffImptMslList[i]["AMT_TOT"] = itYearData[j]["AMT"]
                }
              }
              this.itOnffImptMslList[i]["ITEMNM"] = this.getItemNm(this.itOnffImptMslList[i]["ITEM"]);
            }

            let offDataObj = {
              ITEM: "44", ITEMNM: "오프라인",
              "AMT_TOT": this.itOnffImptMslList.map(x => Number(x["AMT_TOT"])).reduce(function (pre, value) { return pre - value; })
            };

            for(var i=0; i < 12; i++) {
              offDataObj["AMT"+(i+1)] = this.itOnffImptMslList.map(x => Number(x["AMT"+(i+1)])).reduce(function (pre, value) { return pre - value; });
            }
            this.itOnffImptMslList.push(offDataObj);
            console.log("getITOnOffDetailData >> ", this.itOnffImptMslList);
          }
        },
        rej => {
          console.log("rej", rej);
          let ItYearData = JSON.parse("[" + res + "]");
        }
      )
    },
    setChartData: function (mon) {
      if(mon <= this.month) {
        this.clickedMonth = mon
        this.getMonthlySaleList(mon)
        this.getDailySaleList(mon)
        this.getCalendarData(mon)
      }
    },
    getMonthlySaleList: function (mon) {
      // let startDate = this.year.toString() + "0101"
      let startDate = (this.year-1).toString() + this.twinNum(mon) + "01"
      let endDate = this.year.toString() + this.twinNum(mon) + ( new Date(this.year, mon, 0) ).getDate().toString();
      console.log("!!MonthlyDate >>> ", startDate, " / ", endDate);
      this.req2svr.getMonthlySaleList(startDate, endDate).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.monthlySaleList = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count == 1) {
              this.monthlySaleList.push(res);
            } else if(count > 1) {
              this.monthlySaleList = JSON.parse("[" + res + "]")
            }
            this.makeMonthlyChart(this.monthlySaleList)
            this.makeMonthlyBarChart(this.monthlySaleList)
            console.log("monthlySaleList >>> ", this.monthlySaleList);
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    makeMonthlyChart: function (source) {
      
      this.chart2 = AmCharts.makeChart("chartdiv2", {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "SALEDT",
        colors: ["#dc67ce","#67B7DC", "#A367DC", "#6771DC", "#DC6788"],
        sequencedAnimation: false,
        startEffect: "easeInSine",
        categoryAxis: {
          axisAlpha: 0.1,
          gridPosition: "start",
          gridAlpha: 0.05,
          tickLength: 0,
          startOnAxis: false,
          fontSize: 12
        },
        chartCursor: {
          enabled: true,
          zoomable: false,
          cursorPosition: "mouse"
        },
        trendLines: [],
        graphs: [
          {
            balloonText: "전체(백만원) : [[value]]",
            id: "AmGraph-TOT",
            valueField: "TOTSILAMT",
            fillAlphas: 0,
            lineAlpha: 0.99,
            title: "전체(백만원)",
            bulletSize: 1,
            bullet: "diamond",
            markerType: "diamond",
            fontSize: 10
          },
          {
            balloonText: "MI(백만원) : [[value]]",
            id: "AmGraph-MI",
            valueField: "MISILAMT",
            fillAlphas: 0,
            lineAlpha: 0.99,
            title: "MI(백만원)",
            bulletSize: 1,
            bullet: "diamond",
            markerType: "diamond"
          },
          {
            balloonText: "IT(백만원) : [[value]]",
            id: "AmGraph-IT",
            valueField: "ITSILAMT",
            fillAlphas: 0,
            lineAlpha: 0.99,
            title: "IT(백만원)",
            bulletSize: 1,
            bullet: "round",
            markerType: "round"
          },
          {
            balloonText: "MO(백만원) : [[value]]",
            id: "AmGraph-MO",
            valueField: "MOSILAMT",
            fillAlphas: 0,
            lineAlpha: 0.99,
            title: "MO(백만원)",
            bulletSize: 1,
            bullet: "triangleUp",
            markerType: "triangleUp"
          },
          {
            balloonText: "IN(백만원) : [[value]]",
            id: "AmGraph-IN",
            valueField: "INSILAMT",
            fillAlphas: 0,
            lineAlpha: 0.99,
            title: "IN(백만원)",
            bulletSize: 1,
            bullet: "square",
            markerType: "square"
          }
        ],
        guides: [],
        valueAxes: [
          {
            axisAlpha: 0.1,
            id: "ValueAxis-1",
            gridColor: "#FFFFFF",
            tickLength: 0,
            showFirstLabel: true,
            title: "",
            fontSize: 13
          }
        ],
        allLabels: [],
        balloon: {},
        legend: {
          enabled: true,
          align: "center",
          fontSize: 13,
          position: "bottom"
        },
        titles: [],
        dataProvider: source
      });
    },
    makeMonthlyBarChart: function (source) {
      let alpha = [1, 0.85, 0.70, 0.55, 0.40]

      AmCharts.makeChart("chartdiv3", {
        type: "serial",
        theme: "none",
        colors: ["#9879E8", "#B7D7E2", "#97BDD6", "#566F94", "#1D3373"],
        legend: {
          horizontalGap: 10,
          useGraphSettings: true,
          markerSize: 10
        },
        dataProvider: source,
        valueAxes: [ {
          stackType: "regular",
          axisAlpha: 0,
          gridAlpha: 0
        } ],
        graphs: [ {
          balloonText: "<b>[[title]]</b><br><span style='font-size:14px'><b>[[value]]</b></span>",
          fillAlphas: 0.8,
          labelText: "[[title]]",
          "title": "전체",
          "type": "column",
          "color": "#000000",
          "valueField": "TOTSILAMT"
        }, {
          "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'><b>[[value]]</b></span>",
          "fillAlphas": 0.8,
          "labelText": "[[title]]",
          "title": "MI",
          "type": "column",
          "color": "#000000",
          "newStack": true,
          "valueField": "MISILAMT"
        }, {
          "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'><b>[[value]]</b></span>",
          "fillAlphas": 0.8,
          "labelText": "[[title]]",
          "title": "IT",
          "type": "column",
          "color": "#000000",
          "valueField": "ITSILAMT"
        }, {
          "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'><b>[[value]]</b></span>",
          "fillAlphas": 0.8,
          "labelText": "[[title]]",
          "title": "MO",
          "type": "column",
          "color": "#000000",
          "valueField": "MOSILAMT"
        }, {
          "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'><b>[[value]]</b></span>",
          "fillAlphas": 0.8,
          "labelText": "[[title]]",
          "title": "IN",
          "type": "column",
          "color": "#000000",
          "valueField": "INSILAMT"
        } ],
        "categoryField": "SALEDT",
        "categoryAxis": {
          "gridPosition": "start",
          "axisAlpha": 0,
          "gridAlpha": 0,
          "position": "left"
        },
        "export": {
          "enabled": true
        }

      });
    },
    getDailySaleList: function (mon) {
      //let startDate = this.year.toString() + this.twinNum(mon) + "01"
      let startDate = moment(this.selectDate).format("YYYYMM") + "01"
      let endDate = moment(this.selectDate).format("YYYYMMDD");
      console.log("!!DailyDate >>> ", startDate, " / ", endDate);
      this.req2svr.getDailySaleList(startDate, endDate).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.dailySaleList = [];
            let list = [];
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count == 1) {
              this.dailySaleList.push(res);
            } else if(count > 1) {
              this.dailySaleList = JSON.parse("[" + res + "]");
              let entMonthDay = Number(moment(this.selectDate).endOf('month').format('DD'));
              for(let i = Number(moment(this.selectDate).format('DD')); i < entMonthDay; i++) {
                this.dailySaleList.push({
                  SALEDT: this.month + "/" + this.twinNum(i+1),
                  TOTSILAMT: 0, MISILAMT: 0, MOSILAMT: 0, INSILAMT: 0, ITSILAMT: 0
                })
              }

            }
            this.makeDailyChart(mon, this.dailySaleList)
            console.log("dailySaleList >>> ", this.dailySaleList);
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    makeDailyChart: function (mon, source) {
      //let data = source

      this.chart1 = AmCharts.makeChart("chartdiv1", {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "SALEDT",
        colors: ["#FFEB3B","#0336FF", "#6A1B9A", "#2E7D32", "#FF0266"],
        sequencedAnimation: false,
        categoryAxis: {
          axisAlpha: 0.1,
          gridPosition: "start",
          gridAlpha: 0.05,
          tickLength: 0,
          startOnAxis: false,
          fontSize: 12
        },
        chartCursor: {
          enabled: true,
          zoomable: false,
          cursorPosition: "mouse"
        },
        trendLines: [],
        graphs: [
          {
            balloonText: "전체(백만원) : [[value]]",
            id: "AmGraph-TOT",
            valueField: "TOTSILAMT",
            fillAlphas: 0.7,
            lineAlpha: 0,
            title: "전체(백만원)",
            type: "column",
            //bulletSize: 1,
            //bullet: "diamond",
            //markerType: "diamond"
          },
          {
            balloonText: "MI(백만원) : [[value]]",
            id: "AmGraph-MI",
            valueField: "MISILAMT",
            fillAlphas: 0,
            lineAlpha: 1,
            title: "MI(백만원)",
            bulletSize: 1,
            bullet: "diamond",
            markerType: "diamond"
          },
          {
            balloonText: "IT(백만원) : [[value]]",
            id: "AmGraph-IT",
            valueField: "ITSILAMT",
            fillAlphas: 0,
            lineAlpha: 1,
            title: "IT(백만원)",
            bulletSize: 1,
            bullet: "round",
            markerType: "round"
          },
          {
            balloonText: "MO(백만원) : [[value]]",
            id: "AmGraph-MO",
            valueField: "MOSILAMT",
            fillAlphas: 0,
            lineAlpha: 1,
            title: "MO(백만원)",
            bulletSize: 1,
            bullet: "triangleUp",
            markerType: "triangleUp"
          },
          {
            balloonText: "IN(백만원) : [[value]]",
            id: "AmGraph-IN",
            valueField: "INSILAMT",
            fillAlphas: 0,
            lineAlpha: 1,
            title: "IN(백만원)",
            bulletSize: 1,
            bullet: "square",
            markerType: "square"
          }
        ],
        guides: [],
        valueAxes: [
          {
            axisAlpha: 0.1,
            id: "ValueAxis-1",
            gridColor: "#FFFFFF",
            tickLength: 0,
            title: "",
            fontSize: 13
          }
        ],
        allLabels: [],
        balloon: {},
        legend: {
          enabled: true,
          align: "center",
          fontSize: 13,
          position: "bottom"
        },
        titles: [],
        dataProvider: source
      });
      
    },
    getItemNm: function (item) {
      let returnNm = '';
      switch(item) {
        case '00': {
          returnNm = '매출합계';
          break;
        }
        case '11': {
          returnNm = '네이버(스타일윈도)';
          break;
        }
        case '22': {
          returnNm = '백화점몰';
          break;
        }
        case '33': {
          returnNm = '잇미샤몰';
          break;
        }
        case '44': {
          returnNm = '오프라인';
          break;
        }
      }
      return returnNm;
    },
    toDetail: function (value) {
      this.$router.push({
          name: 'ONL0104',
          params: {
            data: { 
              year: value
            }
          }
      })
    },
    totalClass: function (ITEM) {      
      return {
        'bg_point_col20': ITEM === '00'
      }
    },
    monthClass: function (mon) {      
      return {
        'teamSelector': mon <= this.month
      }
    },
    addRow: function (row, idx) {
      if(row.ITEM != "TOTAL") {
        if(this.itOnffImptList[idx+1] != null && this.itOnffImptList[idx+1].ITEM == row.ITEM) {
          let arr = new Array();
          this.itOnffImptList.forEach((value, index) => {
            if(value.ITEM == row.ITEM && value.ITEMNM.indexOf(">>") == 0) {
              arr.push(index);
            }
          });
          this.itOnffImptList.splice(arr[0], arr.length);
        } else {
          this.itOnffImptList.splice(idx+1, 0, {ITEM: row.ITEM, ITEMNM: ">> " + row.ITEMNM + " 1", AMT_17: "1234", AMT_18: "5678", AMT_19: "91011", AMT: ""}, {ITEM: row.ITEM, ITEMNM: ">> " + row.ITEMNM + " 2", AMT_17: "1234", AMT_18: "5678", AMT_19: "91011", AMT: ""})
        }
      }
    },
    showYearly() {
      this.isYearlyVisible = true;
    },
    closeYearly() {
      this.isYearlyVisible = false;
    },
    showDaily() {
      this.isDailyVisible = true;
    },
    closeDaily() {
      this.isDailyVisible = false;
    },
    twinNum: function (num) {
      if(num.toString().length == 1) {
        return "0"+num.toString();
      } else {
        return num.toString();
      }
    },
    getRandomArbitrary: function (min, max) {
      return Number(Math.random() * (max - min) + min).toFixed(0);
    },
    initCalendar:function(){
      this.currentCalendarMatrix = [];
      let day=1;
      let currDay = new Date(this.year, this.month, this.toDay)
      for(let i=0; i<6; i++){
        let calendarRow = [];
        for(let j=0; j<7; j++){
          let tempObj = new Object();
          if(i==0 && j<this.currentMonthStartWeekIndex){
            tempObj.day = ""
            tempObj.JASASILAMT = ""
            tempObj.OUTSILAMT = ""
            tempObj.TOTSILAMT = ""
          }
          else if(day<=this.endOfDay){
            tempObj.day = day
            let compDay = new Date(this.year, this.clickedMonth, day)
            if(compDay > currDay) {
              tempObj.JASASILAMT = ""
              tempObj.OUTSILAMT = ""
              tempObj.TOTSILAMT = ""
            } else {
              tempObj.JASASILAMT = Number(this.getRandomArbitrary(150000, 300000))
              tempObj.OUTSILAMT = Number(this.getRandomArbitrary(50000, 100000))
              tempObj.TOTSILAMT = tempObj.JASASILAMT + tempObj.OUTSILAMT
            }
            day++;
          }
          else{
            tempObj.day = ""
            tempObj.JASASILAMT = ""
            tempObj.OUTSILAMT = ""
            tempObj.TOTSILAMT = ""
          }
          if(i==5 && tempObj.day == "" && day > this.endOfDay) {
          } else {
            calendarRow.push(tempObj);
          }
        }
        this.currentCalendarMatrix.push(calendarRow);
      }

      let lastIndex = this.currentCalendarMatrix.length-1
      if(this.currentCalendarMatrix[0].length > this.currentCalendarMatrix[lastIndex].length && this.currentCalendarMatrix[lastIndex].length != 0) {
        let tempCount = this.currentCalendarMatrix[0].length - this.currentCalendarMatrix[lastIndex].length
        for(let i=0; i < tempCount; i++) {
          let tempObj = new Object();
          tempObj.day = ""
          tempObj.JASASILAMT = ""
          tempObj.OUTSILAMT = ""
          tempObj.TOTSILAMT = ""
          this.currentCalendarMatrix[lastIndex].push(tempObj)
        }
      }
      console.log("!!!!!!????? >>>> ", this.currentCalendarMatrix)
    },
    getEndOfDay: function(year, month){
        switch(month){
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
              return 31;
              break;
            case 4:
            case 6:
            case 9:
            case 11:
              return 30;
              break;
            case 2:
              if( (year%4 == 0) && (year%100 != 0) || (year%400 == 0) ){
              return 29;   
              }
              else{
                  return 28;
              }
              break;
            default:
              console.log("unknown month " + month);
              return 0;
              break;
        }
    },
    getStartWeek: function(targetYear, targetMonth){
      let year = this.rootYear;
      let month = 1;
      let sumOfDay = this.rootDayOfWeekIndex;
      while(true){
        if(targetYear > year){
          for(let i=0; i<12; i++){
            sumOfDay += this.getEndOfDay(year, month+i);
          }
          year++;
        }
        else if(targetYear == year){
          if(targetMonth > month){
            sumOfDay += this.getEndOfDay(year, month);
            month++;
          }
          else if(targetMonth == month){
            return (sumOfDay)%7;
          }
        }
      }
    },
    onClickPrev: function(month){
      month--;
      if(month<=0){
        this.month = 12;
        this.year -= 1;
      }
      else{
        this.month -= 1;
      }
      this.init();
    },
    onClickNext: function(month){
      month++;
      if(month>12){
        this.month = 1;
        this.year += 1;
      }
      else{
        this.month += 1;
      }
      this.init();
    },
    isToday: function(year, month, day){
      let date = new Date();
      return year == date.getFullYear() && month == date.getMonth()+1 && day == date.getDate(); 
    },
    getCalendarData: function(mon) {
      this.currentMonthStartWeekIndex = this.getStartWeek(this.year, mon);
      this.endOfDay = this.getEndOfDay(this.year, mon);
      this.clickedMonth = mon
      this.initCalendar();
    },
    changeBusiness: function(code) {
      console.log("code >>> " + code, " / ", this.chart1.graphs);
      if(code == '00') {
        this.codeText = '전체'
      } else {
        this.codeText = code
      }
      this.changeGraph(code);
      this.selectedCODE = code;
    },
    changeGraph: function(code) {
      if(code == "00") {
        for(var i in this.chart1.graphs) {
          if(this.chart1.graphs[i].hidden) this.chart1.showGraph(this.chart1.graphs[i])
        }
        for(var i in this.chart2.graphs) {
          if(this.chart2.graphs[i].hidden) this.chart2.showGraph(this.chart2.graphs[i])
        }
      } else {
        for(var i in this.chart1.graphs) {
          if(this.chart1.graphs[i].hidden) this.chart1.showGraph(this.chart1.graphs[i])
          if(this.chart2.graphs[i].hidden) this.chart2.showGraph(this.chart2.graphs[i])
          if(this.chart1.graphs[i].id != "AmGraph-TOT" && this.chart1.graphs[i].id.indexOf(code) != 8) {
            console.log(this.chart1.graphs[i].hidden)
            this.chart1.hideGraph(this.chart1.graphs[i])
            this.chart2.hideGraph(this.chart2.graphs[i])
          }
        }
      }
    },
    chageType: function(type) {
      this.choice = type;
      let source = [];
      if(type == 1 || type == '1') {
        source = this.dailySaleList
      } else if(type == 2 || type == '2'){
        source = this.monthlySaleList
      } else {
        let this_year = moment(this.selectDate).format("YYYY");
        let PRE_MISILAMT=0, PRE_MOSILAMT=0, PRE_ITSILAMT=0, PRE_INSILAMT=0;
        for(var i in this.monthlySaleList) {
          let compare_year = moment(this.monthlySaleList[i].SALEDT, "YYYY/MM").format("YYYY");
          if(this_year == compare_year) {
            if(moment(this.monthlySaleList[i-1].SALEDT, "YYYY/MM").format("YYYY") != this_year) {
              PRE_MISILAMT = 0;
              PRE_MOSILAMT = 0;
              PRE_ITSILAMT = 0;
              PRE_INSILAMT = 0;
            } else {
              PRE_MISILAMT = PRE_MISILAMT+Number(this.monthlySaleList[i-1].MISILAMT);
              PRE_MOSILAMT = PRE_MOSILAMT+Number(this.monthlySaleList[i-1].MOSILAMT);
              PRE_ITSILAMT = PRE_ITSILAMT+Number(this.monthlySaleList[i-1].ITSILAMT);
              PRE_INSILAMT = PRE_INSILAMT+Number(this.monthlySaleList[i-1].INSILAMT);
            }
            
            source.push({
              SALEDT: this.monthlySaleList[i].SALEDT,
              MISILAMT : PRE_MISILAMT + Number(this.monthlySaleList[i].MISILAMT),
              MOSILAMT : PRE_MOSILAMT + Number(this.monthlySaleList[i].MOSILAMT),
              ITSILAMT : PRE_ITSILAMT + Number(this.monthlySaleList[i].ITSILAMT),
              INSILAMT : PRE_INSILAMT + Number(this.monthlySaleList[i].INSILAMT)
            })
          }
        }
        console.log("!!!!source >>> ",source)
      }
      this.makeDailyChart(this.month, source)
    },
    tabVal: function(gbn) {
      this.gubun = Number(gbn);
    },
    hideSalesTop() {
      if(this.hide_sales == 0) {
        this.hide_sales = 1;
        document.getElementById("salesMonthlyDiv").style.display = "none";
        document.getElementById("salesDailyDiv").setAttribute('class', 'col_md_12')
      } else {
        this.hide_sales = 0;
        document.getElementById("salesMonthlyDiv").style.display = "block";
        document.getElementById("salesDailyDiv").setAttribute('class', 'col_md_6')
      }
      this.makeDailyChart(this.month, this.dailySaleList);
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
    comma: function(num) {
      let str
      if(num != "" && num != null && num != "undefined") {
        str = num.toString();
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
      } else {
        return "";
      }
      
    },
    nanToDot: function(value) {
      let x = value ? value : 0;
      if (x == Number.POSITIVE_INFINITY || x == Number.NEGATIVE_INFINITY || x == "NaN") {
        x = 0
      }
      return x
    }
  }
}
</script>