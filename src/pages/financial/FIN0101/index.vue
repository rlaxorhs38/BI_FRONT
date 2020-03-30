<template>
  <div class="wrap">
    <!-- side menu -->
    <div class="layout_drawer" :class="{on: drawer}">
      <h1 class="tit_drawer teamSelector" @click="toMain">
        <img src="@/assets/images/img_logo.png" alt="sisun">
      </h1>
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
        <!-- Title button -->
        <!-- <button type="button" class="btn_n btn_icon btn_prev" @click="prev">
          <i class="material-icons">arrow_back_ios</i>
        </button> -->
        <!-- Title -->
        <h2 class="layout_title">
          Daily Report
          <small class="txt_date">
            <span v-show="headerDate == today" class="chip chip_m">
              <span class="chip_text">TODAY</span>
            </span>
            <strong class="point_col1">{{ headerDate }}</strong>
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
              <template v-for="data in dr_H">
              <li :class="{'list_card_maxWidth': dr_H.length != CODECardsList.length}" :key="data.MCODE" v-if="data.TEXT != 'CO'">
                <!-- card_MI 사업부 -->
                <div
                  class="card card_mini"
                  @click="changeBusiness(data.MCODE)"
                  :class="{on : selectedCODE == data.MCODE}"
                >
                  <div class="card_title">
                    <h4 class="card_title_text">{{ data.TEXT }} 사업부</h4>
                  </div>
                  <div class="card_content">
                    <strong class="em_obj" v-if="data.SALE_TOT">
                      {{ Math.round(data.SALE_TOT/1000) | currency }}<small class="txt">천원</small>
                    </strong>
                    <strong class="em_obj" v-else>
                      0<small class="txt">천원</small>
                    </strong>
                    <strong class="em_obj fs30" v-if="data.AMT" >
                      <small class="txt">( </small>{{ Math.round(data.AMT/1000) | currency }}<small class="txt fs14">천원</small><small class="txt"> )</small>
                    </strong>
                    <strong class="em_obj fs30" v-else >
                      <small class="txt">( </small>0<small class="txt fs14">천원</small><small class="txt"> )</small>
                    </strong>
                    <dl class="list_obj">
                      <dt class="tit">일 누적매출 달성률</dt>
                      <dd class="txt" v-if="data.SALE_TOT">
                        {{ Math.round(rate(data.SALE_TOT, data.AMT)) | nanToDot }} %
                      </dd>
                      <dd class="txt" v-else>
                        0 %
                      </dd>
                      <!-- 초과-->
                      <span
                        class="chip round_chip success"
                        v-if="Math.round(rate(data.SALE_TOT, data.AMT)) >= 100"
                      >
                        <span class="chip_text">초과</span>
                      </span>
                      <!-- 정상-->
                      <span
                        class="chip round_chip warning"
                        v-else-if="Math.round(rate(data.SALE_TOT, data.AMT)) >= 95 && Math.round(rate(data.SALE_TOT, data.AMT)) <= 99"
                      >
                        <span class="chip_text">정상</span>
                      </span>
                      <!-- 주의-->
                      <span
                        class="chip round_chip danger"
                        v-else-if="Math.round(rate(data.SALE_TOT, data.AMT)) < 95"
                      >
                        <span class="chip_text">주의</span>
                      </span>
                      <!-- 달성중 -->
                      <span class="chip round_chip primary" v-else>
                        <span class="chip_text">달성중</span>
                      </span>
                    </dl>
                    <!-- <dl class="list_obj">
                      <dt class="tit">일일 매출 달성률</dt>
                      <dd class="txt" v-if="data.SALE_TOT">
                        {{ Math.round(rate(data.SALE_TOT, data.AMT)) | nanToDot }} %
                      </dd>
                      <dd class="txt" v-else>
                        0 %
                      </dd>
                    </dl> -->
                  </div>
                </div>
              </li>
              </template>
            </ul>
          </div>
        </div>
        <!-- //scrolling card -->
        <div class="list_box">
          <ul class="list_card">
            <li>
              <!-- card_당월 현금 증감 -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text">월 누적매출</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj" v-if="dr_C.length > 0">
                    {{ Math.round(current_dr_C.SALE_MONTH_TOT/1000) | currency }}<small class="txt">천원</small>
                  </strong>
                </div>
              </div>
            </li>
            <li>
              <!-- card_월 누적매출 -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text">월 누적매출 목표</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj" v-if="dr_C.length > 0">
                    {{ Math.round(current_dr_C.MONTH_AMT/1000) | currency }}<small class="txt">천원</small>
                  </strong>
                </div>
              </div>
            </li>
            <li>
              <!-- card_월 누적매출 달성률 -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text">월 매출 달성률</h4>
                </div>
                <div class="card_title">
                  <small class="txt_box">(당월 매출/당월 매출 목표) * 100</small>
                </div>
                <div class="card_content" >
                  <strong class="em_obj" v-if="dr_C.length > 0">
                    {{ Math.round(rate(current_dr_C.SALE_MONTH_TOT, current_dr_C.MONTH_AMT)) | nanToDot }}
                    <small
                      class="txt2"
                    >%</small>
                    <!-- 초과-->
                    <span
                      class="chip round_chip success"
                      v-if="Math.round(rate(current_dr_C.SALE_MONTH_TOT, current_dr_C.MONTH_AMT)) >= 100"
                    >
                      <span class="chip_text">초과</span>
                    </span>
                    <!-- 정상-->
                    <span
                      class="chip round_chip warning"
                      v-else-if="Math.round(rate(current_dr_C.SALE_MONTH_TOT, current_dr_C.MONTH_AMT)) >= 95 && Math.round(rate(current_dr_C.SALE_MONTH_TOT, current_dr_C.MONTH_AMT)) <= 99"
                    >
                      <span class="chip_text">정상</span>
                    </span>
                    <!-- 주의-->
                    <span
                      class="chip round_chip danger"
                      v-else-if="Math.round(rate(current_dr_C.SALE_MONTH_TOT, current_dr_C.MONTH_AMT)) < 95"
                    >
                      <span class="chip_text">주의</span>
                    </span>
                    <!-- 달성중 -->
                    <span class="chip round_chip primary" v-else>
                      <span class="chip_text">달성중</span>
                    </span>
                  </strong>
                </div>
              </div>
            </li>
            <li>
              <!-- card_당년 현금 증감 -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text">연 누적매출</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj" v-if="dr_C.length > 0">
                    {{ Math.round(current_dr_C.SALE_YEAR_TOT/1000000) | currency }}<small class="txt">백만원</small>
                  </strong>
                </div>
              </div>
            </li>
            <li>
              <!-- card_월 누적매출 -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text">연 누적매출 목표</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj" v-if="dr_C.length > 0">
                    {{ Math.round(current_dr_C.YEAR_AMT/1000000) | currency }}<small class="txt">백만원</small>
                  </strong>
                </div>
              </div>
            </li>
            <li>
              <!-- card_월 누적매출 달성률 -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text">연 매출 달성률</h4>
                </div>
                <div class="card_title">
                  <small class="txt_box">(올해 매출/올해 매출 목표) * 100</small>
                </div>
                <div class="card_content" >
                  <strong class="em_obj" v-if="dr_C.length > 0">
                    {{ Math.round(rate(current_dr_C.SALE_YEAR_TOT, current_dr_C.YEAR_AMT)) | nanToDot }}
                    <small
                      class="txt2"
                    >%</small>
                    <!-- 초과-->
                    <span
                      class="chip round_chip success"
                      v-if="Math.round(rate(current_dr_C.SALE_YEAR_TOT, current_dr_C.YEAR_AMT)) >= 100"
                    >
                      <span class="chip_text">초과</span>
                    </span>
                    <!-- 정상-->
                    <span
                      class="chip round_chip warning"
                      v-else-if="Math.round(rate(current_dr_C.SALE_YEAR_TOT, current_dr_C.YEAR_AMT)) >= 95 && Math.round(rate(current_dr_C.SALE_YEAR_TOT, current_dr_C.YEAR_AMT)) <= 99"
                    >
                      <span class="chip_text">정상</span>
                    </span>
                    <!-- 주의-->
                    <span
                      class="chip round_chip danger"
                      v-else-if="Math.round(rate(current_dr_C.SALE_YEAR_TOT, current_dr_C.YEAR_AMT)) < 95"
                    >
                      <span class="chip_text">주의</span>
                    </span>
                    <!-- 달성중 -->
                    <span class="chip round_chip primary" v-else>
                      <span class="chip_text">달성중</span>
                    </span>
                  </strong>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="row">
          <div class="col_md_7">
            <div class="cont_box h100">
              <div class="tit">
                <div class="tab">
                  <ul>
                    <li :class="{'on': gubun == 2}">
                      <a href="javascript:void(0);" @click="tabVal('2')">매출추이</a>
                    </li>
                    <li :class="{'on': gubun == 1}">
                      <a href="javascript:void(0);" @click="tabVal('1')">매출유형</a>
                    </li>
                  </ul>
                </div>
                <div class="layout_spacer"></div>
                <div class="groups">
                  <div class="toggle_group tg_sty01">
                    <label class="tg_btn" :class="{'is-checked': choice === 1}">
                      <input type="radio" id="option-d" class="tg_radio" name="select" :value="1" v-model="choice" style="display:none" @click="chageType(1)" />
                      <span class="btn_n txt_label" >일간</span>
                    </label>
                    <label class="tg_btn" :class="{'is-checked': choice === 2}">
                      <input type="radio" id="option-m" class="tg_radio" name="select" :value="2" v-model="choice" style="display:none" @click="chageType(2)" />
                      <span class="btn_n txt_label" >월간</span>
                    </label>
                    <label class="tg_btn" :class="{'is-checked': choice === 3}">
                      <input type="radio" id="option-a" class="tg_radio" name="select" :value="3" v-model="choice" style="display:none" @click="chageType(3)" />
                      <span class="btn_n txt_label" >누적</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="cont">
                <div class="graph_area" v-show="gubun == 2">
                  <div class="graph_view">
                    <div class="graph" style="position:relative; width:100%; height:270px;">
                      <div id="chartdiv4" style="position:relative; width:100%; height:100%; float:left;"></div>
                    </div>
                  </div>
                </div>
                <div class="graph_area" v-show="gubun == 1">
                  <!-- 그래프 1 -->
                  <div class="graph_view graph_md" style="width:50%;">
                    <!-- 텍스트 값 -->
                    <div class="graph_result">
                      <dl>
                        <dt class="tit">수량 (개)</dt>
                        <dd class="txt_result txt_s">{{ dr_S_TOT_TY | currency }}</dd>
                        <dd class="txt_etc" v-if="(selectedCODE == '1') || (selectedCODE == 'MI')">
                          <em>&nbsp;</em>
                        </dd>
                      </dl>
                    </div>
                    <!-- 그래프 -->
                    <div class="graph">
                      <div style="position:relative; width:100%; height:115px; float:left;">
                        <div id="chartdiv1" style="position:relative; width:100%; height:100%;"></div>
                      </div>
                    </div>
                  </div>
                  <!-- 그래프 2 -->
                  <div class="graph_view graph_md" style="width:50%;">
                    <!-- 텍스트 값 -->
                    <div class="graph_result">
                      <dl>
                        <dt class="tit">금액 (천원)</dt>
                        <dd class="txt_result txt_s">{{ dr_S_SALE_TOT + dr_S_ADVDEPAMT | currency }}</dd>
                        <dd class="txt_etc" v-if="(selectedCODE == '1') || (selectedCODE == 'MI')">
                          <span class="chip chip_m box_chip chip_sty01">
                            <span class="chip_text">선수금</span>
                          </span>
                          <em :class="{point_col5: dr_S_ADVDEPAMT < 0, point_col1: dr_S_ADVDEPAMT >= 0}">{{ dr_S_ADVDEPAMT | currency }}</em>
                        </dd>
                      </dl>
                    </div>
                    <!-- 그래프 -->
                    <div class="graph">
                      <div style="position:relative; width:100%; height:115px; float:left;">
                        <div id="chartdiv2" style="position:relative; width:100%; height:100%;"></div>
                      </div>
                    </div>
                  </div>
                  <!-- 카테고리 -->
                  <div class="graph_category">
                    <ul>
                      <li><span class="ico_dot" style="background-color:#3f93f5;"></span>정상매출</li>
                      <li><span class="ico_dot" style="background-color:#ff7f92;"></span>할인</li>
                      <li><span class="ico_dot" style="background-color:#ffb83c;"></span>균일</li>
                    </ul>
                  </div>
                </div> 
              </div>
            </div>
          </div>
          <div class="col_md_5">
            <div class="cont_box">
              <div class="tit">
                <strong class="tit_txt">당일 매출 TOP 3</strong>
                <div class="layout_spacer"></div>
                <button class="btn_icon btn_s btn_edge_sty01" @click="showStoreList('desc')">
                  <i class="material-icons">add</i>
                </button>
              </div>
              <div class="cont">
                <div class="list_num list_h list_sty01">
                  <ul class="list">
                    <li v-for="(data, index) in dr_B" :key="index" style="width:30%;pointer-events:none">
                      <div class="num_box">{{ index+1 }}</div>
                      <strong class="txt_name">
                        {{ data.VDSNM }}
                        <em
                          class="txt_result"
                        >({{ Math.round(data.SALE_TOT/1000) | currency }} 천원)</em>
                      </strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="cont_box">
              <div class="tit">
                <strong class="tit_txt">당일 매출 WORST 3</strong>
                <div class="layout_spacer"></div>
                <button class="btn_icon btn_s btn_edge_sty01" @click="showStoreList('asc')">
                  <i class="material-icons">add</i>
                </button>
              </div>
              <div class="cont"> 
                <div class="list_num list_h">
                  <ul class="list">
                    <li v-for="(data, index) in dr_W" :key="index" style="width:30%;">
                      <div class="num_box">{{ index+1 }}</div>
                      <strong class="txt_name">
                        {{ data.VDSNM }}
                        <em
                          class="txt_result"
                        >({{ Math.round(data.SALE_TOT/1000) | currency }} 천원)</em>
                      </strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <store-list-popup
        v-if="isStoreListVisible"
        @close="closeStoreList"
        :dr_H="current_dr_H"
        :dr_L="dr_L"
        :orderType="storeListOrderType"
        :currentDate="selectDate"
      />
  </div>
</template>

<script>
import moment from "moment";
import req2svr from "./req2svr";
import sideMenu from '@/components/sideMenu'
import datePick from "vue-date-pick"

import storeListPopup from '@/pages/financial/FIN0102'

export default {
  name: "FIN0101",
  components: {
    datePick,
    storeListPopup,
    sideMenu
  },
  mounted() {
    this.makeChart1()
    this.makeChart2()
  },
  created: function() {
    this.recentDate = moment().subtract(1, "days").format("YYYY-MM-DD")
    this.getRecentDate()
    this.getMakeDataDate()
    this.selectDate = moment().subtract(1, "days").format("YYYY-MM-DD")
    this.loadData()
  },
  data() {
    return {
      drawer: null,
      selectDate: null,
      recentDate: null,
      gubun: 2,
      selectedCODE: "",
      // 사업부별 일매출
      dr_H: [],
      // 당일 매출, 월 누적매출, 월 누적매출 목표, 월 누적매출 달성률
      dr_C: [],
      // 매출유형
      dr_S: {
        JQTY: 0, DCQTY: 0, GQTY: 0, JAMT: 0, DCAMT: 0, GAMT: 0,
        R_JQTY: 0, R_DCQTY: 0, R_GQTY: 0, R_JAMT: 0, R_DCAMT: 0, R_GAMT: 0,
        ADVDEPAMT: 0
      },
      // 매출추이
      dr_P: [{ SUNM: 0, MCODE: 0, LY_SALE_TOT: 0, AMT: 0, SALE_TOT: 0 }],
      dr_LYP: [],
      // 당일 매장별 매출
      dr_L: [],
      isStoreListVisible: false,
      storeListOrderType: 'desc',
      makeDataDate: null,
      sucdCodeList:[],
      SU_TOT_AMT: 0,
      SU_TOT_SALE_TOT: 0,
      choice: 1,
    };
  },
  computed: {
    req2svr: () => req2svr,
    headerDate() {
      return moment(this.selectDate).format("YYYY.MM.DD (ddd)");
    },
    today() {
      return moment().format("YYYY.MM.DD (ddd)");
    },
    current_dr_C() {
      let list = _.find(this.dr_C, {MCODE: this.selectedCODE})
      console.log("current_dr_C >>> ", list)
      return list
    },
    current_dr_H() {
      let list = _.find(this.dr_H, {MCODE: this.selectedCODE})
      return list
    },
    dr_B() {
      return (_.orderBy(this.dr_L, function(o) { return Number(o.SALE_TOT); }, 'desc')).slice(0, 3)
    },
    dr_W() {
      if (this.dr_L.length < 3) {
        return []
      }
      return (_.orderBy(this.dr_L, function(o) { return Number(o.SALE_TOT); }, 'asc')).slice(0, 3)
    },
    dr_S_TOT_TY() {
      return this.dr_S.JQTY+this.dr_S.DCQTY+this.dr_S.GQTY+this.dr_S.R_JQTY+this.dr_S.R_DCQTY+this.dr_S.R_GQTY
    },
    dr_S_SALE_TOT() {
      return Math.round((this.dr_S.JAMT+this.dr_S.DCAMT+this.dr_S.GAMT+this.dr_S.R_JAMT+this.dr_S.R_DCAMT+this.dr_S.R_GAMT)/1000)
    },
    dr_S_ADVDEPAMT() {
      return Math.round((this.dr_S.ADVDEPAMT)/1000)
    },
    CODECardsList() {
      let FDRList = this.$store.getters.getFDRList
      for(var i=0; i<FDRList.length; i++){
        let data = _.find(this.authCodeList, {MCODE:FDRList[i].MCODE})
        if (data) {
          FDRList[i].VISIBLE = true
        } else {
          FDRList[i].VISIBLE = false
        }
      }
      return FDRList
    },
    isTabTypeSU() {
      return this.$store.getters.getFDRList[0].GBNCD == "S" ? true : false
    },
    tabType() {
      return this.$store.getters.getFDRList[0].GBNCD == "S" ? "SUCD" : "BRCD"
    },
    authCodeList() {
      if (this.isTabTypeSU) {
        return this.$store.getters.getAuthSUCDCode[0]
      }
      return this.$store.getters.getAuthBRCDCode[0]
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
    getRecentDate(){
      this.req2svr.getRecentBISL061Date().then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.recentDate = res.SALEDT
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    showStoreList(orderType) {
      if (moment(this.selectDate).diff(moment(this.recentDate)) > 0) {
        return
      }
      this.storeListOrderType = orderType
      this.isStoreListVisible = true;
    },
    closeStoreList() {
      this.isStoreListVisible = false;
    },
    currency(value) {
      if (Number.isNaN(value)) {
          return 0
      }
      var x = value.toString();
      var pattern = /(-?\d+)(\d{3})/;
      while (pattern.test(x)) x = x.replace(pattern, "$1,$2");

      if (x == Number.POSITIVE_INFINITY || x == Number.NEGATIVE_INFINITY || x == "NaN") {
        x = 0
      }
      return x;
    },
    getData() {
      // this.getTotalSalesData()
      this.getDailySalesData()
      this.getCumulativeData()
    },
    getTotalSalesData() {
      let i
      let date = moment(this.selectDate).format("YYYYMMDD");
      let monthStartDate = moment(date).startOf('month').format("YYYYMMDD")

      this.dr_H = []
      for (i=0;i<this.authCodeList.length;i++) {
        let data = _.find(this.CODECardsList, {MCODE: this.authCodeList[i].MCODE})
        if (data) {
          this.dr_H.push({ TEXT: this.authCodeList[i].CODNM, MCODE: this.authCodeList[i].MCODE, SUNM: "", SALE_TOT: 0, AMT: 0 })
        }
      }

      this.sucdCodeList = _.map(this.authCodeList, 'MCODE')

      this.req2svr.getTotalSalesData(this.tabType, this.sucdCodeList.toString(), date, monthStartDate).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let list = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              list.push(res);
            } else {
              list = JSON.parse("[" + res + "]")
            }
            for (i=0;i<this.authCodeList.length;i++) {
              let data = _.find(this.CODECardsList, {MCODE: this.authCodeList[i].MCODE})
              if (data) {
                this.dr_H[i] = _.assign(this.dr_H[i], _.find(list, { MCODE: this.authCodeList[i].MCODE }))
              }
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );

      console.log("여기는 안 쓰임 dr_H >>> ", this.dr_H)

    },
    getDailySalesData() {
      let i
      let date = moment().subtract(1, "days").format("YYYYMMDD");
      this.dr_H = []
      for (i=0;i<this.authCodeList.length;i++) {
        let data = _.find(this.CODECardsList, {MCODE: this.authCodeList[i].MCODE})
        if (data) {
          this.dr_H.push({ TEXT: this.authCodeList[i].CODNM, MCODE: this.authCodeList[i].MCODE, SUNM: "", SALE_TOT: 0, AMT: 0 })
        }
      }
      let authMCodeList = _.map(this.authCodeList, 'MCODE')

      this.req2svr.getDailySalesData(this.tabType, date, authMCodeList.toString()).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let list = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              list.push(res);
            } else {
              list = JSON.parse("[" + res + "]")
            }
            for (i=0;i<this.authCodeList.length;i++) {
              let data = _.find(this.CODECardsList, {MCODE: this.authCodeList[i].MCODE})
              if (data) {
                this.dr_H[i] = _.assign(this.dr_H[i], _.find(list, { MCODE: this.authCodeList[i].MCODE }));
              }
            }

            let tot_obj = {
              TEXT: "전체", MCODE: "A",
              SUNM: "전체",
              SALE_TOT: _.sumBy(this.dr_H, function(o) { return Number(o.SALE_TOT); }),
              AMT: _.sumBy(this.dr_H, function(o) { return Number(o.AMT); }),
            }

            this.dr_H.unshift(tot_obj)
            console.log("1. dr_H >>> " , this.dr_H);

            this.SU_TOT_AMT = _.sumBy(this.dr_H, function(o) { return Number(o.AMT); })
            this.SU_TOT_SALE_TOT = _.sumBy(this.dr_H, function(o) { return Number(o.SALE_TOT); })
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getCumulativeData() {
      this.dr_C = []
      for (i=0;i<this.authCodeList.length;i++) {
        let data = _.find(this.CODECardsList, {MCODE: this.authCodeList[i].MCODE})
        if (data) {
          this.dr_C.push({ MCODE: this.authCodeList[i].MCODE, SUNM: "", SALE_TOT: 0, SALE_MONTH_TOT: 0, AMT: 0 })
        }
      }
      let i
      // let date = moment(this.selectDate).format("YYYYMMDD")
      // let monthStartDate = moment(date).startOf('month').format("YYYYMMDD")

      this.sucdCodeList = _.map(this.authCodeList, 'MCODE')

      this.req2svr.getCumulativeData(this.tabType, this.sucdCodeList.toString()).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let list = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              list.push(res);
            } else {
              list = JSON.parse("[" + res + "]")
            }
            for (i=0;i<this.authCodeList.length;i++) {
              let data = _.find(this.CODECardsList, {MCODE: this.authCodeList[i].MCODE})
              if (data) {
                this.dr_C[i] = _.assign(this.dr_C[i], _.find(list, { MCODE: this.authCodeList[i].MCODE }));
              }
            }

            var tot_obj = {
              MCODE: "A", SUNM: "전체",
              SALE_TOT: _.sumBy(this.dr_C, function(o) { return Number(o.SALE_TOT); }),
              SALE_MONTH_TOT: _.sumBy(this.dr_C, function(o) { return Number(o.SALE_MONTH_TOT); }),
              AMT: _.sumBy(this.dr_C, function(o) { return Number(o.AMT); }),
              SALE_YEAR_TOT: _.sumBy(this.dr_C, function(o) { return o.MCODE != "10"? Number(o.SALE_YEAR_TOT):0; }),
              YEAR_AMT: _.sumBy(this.dr_C, function(o) { return o.MCODE != "10"? Number(o.YEAR_AMT):0; }),
              MONTH_AMT: _.sumBy(this.dr_C, function(o) { return o.MCODE != "10"? Number(o.MONTH_AMT):0; })
            }

            this.dr_C.unshift(tot_obj)
            console.log("dr_C >>> ", this.dr_C)
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    changeDate() {
      this.loadData()
    },
    loadData() {
      if (moment(this.selectDate).diff(moment(this.recentDate)) > 0) {
        this.dr_H = []
        for (let i=0;i<this.authCodeList.length;i++) {
          let data = _.find(this.CODECardsList, {MCODE: this.authCodeList[i].MCODE})
          if (data) {
            this.dr_H.push({ TEXT: this.authCodeList[i].CODNM, MCODE: this.authCodeList[i].MCODE, SUNM: "", SALE_TOT: 0, AMT: 0 })
          }
        }
        // 당일 매출, 월 누적매출, 월 누적매출 목표, 월 누적매출 달성률
        this.dr_C = []
        for (let i=0;i<this.authCodeList.length;i++) {
          let data = _.find(this.CODECardsList, {MCODE: this.authCodeList[i].MCODE})
          if (data) {
            this.dr_C.push({ MCODE: this.authCodeList[i].MCODE, SUNM: "", SALE_TOT: 0, SALE_MONTH_TOT: 0, AMT: 0 })
          }
        }
        // 매출유형
        this.dr_S = {
          JQTY: 0, DCQTY: 0, GQTY: 0, JAMT: 0, DCAMT: 0, GAMT: 0,
          R_JQTY: 0, R_DCQTY: 0, R_GQTY: 0, R_JAMT: 0, R_DCAMT: 0, R_GAMT: 0,
          ADVDEPAMT: 0
        }
        // 매출추이
        this.dr_P = [{ SUNM: 0, MCODE: 0, LY_SALE_TOT: 0, AMT: 0, SALE_TOT: 0 }]
        // 당일 매장별 매출
        this.dr_L = []

        this.gubun = 2

        this.makeChart1()
        this.makeChart2()
        this.makeChart4()
        
        return
      }

      this.getData()

      if (this.authCodeList.length > 0) {
        this.changeBusiness(this.authCodeList[0].MCODE);
      }
    },
    changeBusiness(code) {
      if (moment(this.selectDate).diff(moment(this.recentDate)) > 0) {
        return
      }
      this.choice = '1'
      this.selectedCODE = code
      let date = moment(this.selectDate).format("YYYYMMDD");
      this.getChartData1(code, date)
      this.getChartData2(code, date)
      this.getStoreList(code, date)
    },
    getChartData1(code, date) {
      // 초기화
      this.dr_S = {
        JQTY: 0, DCQTY: 0, GQTY: 0, JAMT: 0, DCAMT: 0, GAMT: 0,
        R_JQTY: 0, R_DCQTY: 0, R_GQTY: 0, R_JAMT: 0, R_DCAMT: 0, R_GAMT: 0,
        ADVDEPAMT: 0
      }
      this.makeChart1()
      this.makeChart2()

      this.getSalesChartCount(code, date)
      this.getSalesChartAMT(code, date)
    },
    getChartData2(code, date) {
      // 매출추이
      this.dr_LYP = []
      this.dr_P = [{ SUNM: 0, MCODE: 0, LY_SALE_TOT: 0, AMT: 0, SALE_TOT: 0, SALEDT: "" }]
      this.makeChart4()

      let lastYear30day = moment(date).subtract(30, 'days').subtract(1, 'year').format("YYYYMMDD")
      let lastYearSelectDay = moment(date).subtract(1, 'year').format("YYYYMMDD")

      this.req2svr.getChartData2(this.tabType, code, lastYear30day, lastYearSelectDay, this.choice).then(
        res => {
          this.dr_LYP = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.dr_LYP.push({
                AMT: 0,
                LY_SALE_TOT: Number(res.LY_SALE_TOT),
                SALEDT: res.SALEDT,
                SALE_TOT: 0,
                SUNM: res.SUNM
              })
            } else {
              let list = JSON.parse("[" + res + "]")
              for (let i=0;i<list.length;i++) {
                this.dr_LYP.push({
                  AMT: 0,
                  LY_SALE_TOT: Number(list[i].LY_SALE_TOT),
                  SALEDT: list[i].SALEDT,
                  SALE_TOT: 0,
                  SUNM: list[i].SUNM
                })
              }
            }
          }
          this.getCurrentYearData(code, date)
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getCurrentYearData(code, date) {
      let last30day = moment(date).subtract(30, 'days').format("YYYYMMDD")

      this.req2svr.getCurrentYearData(this.tabType, code, last30day, date, this.choice).then(
        res => {
          this.dr_P = [{ SUNM: 0, MCODE: 0, LY_SALE_TOT: 0, AMT: 0, SALE_TOT: 0 }]
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.dr_P = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              let data = _.find(this.dr_LYP, function(o) { return o.SALEDT.slice(4, 8) == res.SALEDT.slice(4, 8)})
              this.dr_P.push({
                AMT: Number(res.AMT),
                LY_SALE_TOT: data ? data.LY_SALE_TOT : 0,
                SALEDT: Number(res.SALEDT.slice(4, 6)) + "/" + Number(res.SALEDT.slice(6, 8)),
                SALE_TOT: Number(res.SALE_TOT),
                SUNM: res.SUNM
              })
            } else {
              let currentlist = JSON.parse("[" + res + "]")
              let list = []
              for (let i=0;i<currentlist.length;i++) {
                list.push({
                  AMT: currentlist[i].AMT,
                  LY_SALE_TOT: 0,
                  SALEDT: currentlist[i].SALEDT,
                  SALE_TOT: currentlist[i].SALE_TOT,
                  SUNM: currentlist[i].SUNM
                })
              }
              if(this.choice == 1) {
                let count = Math.max(list.length, this.dr_LYP.length)
                let l1 = list.length > this.dr_LYP.length ? list : this.dr_LYP
                let l2 = list.length > this.dr_LYP.length ? this.dr_LYP : list
                for (let i=0;i<count;i++) {
                  let data = _.find(l2, function(o) { return o.SALEDT.slice(4, 8) == l1[i].SALEDT.slice(4, 8)})
                  let AMT2 = data ? Number(data.AMT) : 0
                  let LY_SALE_TOT2 = data ? Number(data.LY_SALE_TOT) : 0
                  let SALE_TOT2 = data ? Number(data.SALE_TOT) : 0
  
                  let _AMT = Number(l1[i].AMT) != 0 ? Number(l1[i].AMT) : AMT2
                  let _LY_SALE_TOT = Number(l1[i].LY_SALE_TOT) != 0 ? Number(l1[i].LY_SALE_TOT) : LY_SALE_TOT2
                  let _SALE_TOT = Number(l1[i].SALE_TOT) != 0 ? Number(l1[i].SALE_TOT) : SALE_TOT2
  
                  this.dr_P.push({
                    AMT: Math.round(_AMT/1000),
                    LY_SALE_TOT: Math.round(_LY_SALE_TOT/1000),
                    SALE_TOT: Math.round(_SALE_TOT/1000),
                    SALEDT: Number(l1[i].SALEDT.slice(4, 6)) + "/" + Number(l1[i].SALEDT.slice(6, 8)),
                    SUNM: l1[i].SUNM
                  })
                }
              } else {
                this.dr_P = list;
              }
              console.log("dr_P >>> ", this.dr_P)
            }
          }
          this.makeChart4();
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getCumulativeSales(code, date) {
      this.req2svr.getCumulativeSales(this.tabType, code, date, this.choice).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.dr_P = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.dr_P.push(res);
            } else {
              let list = JSON.parse("[" + res + "]")
              if(this.choice == "2") {
                this.dr_P = list
              } else {
                for(var i in list) {
                  let PRE_LY_SALE_TOT, PRE_SALE_TOT, PRE_AMT
                  if(i-1 < 0) {
                    PRE_LY_SALE_TOT = 0;
                    PRE_SALE_TOT = 0;
                    PRE_AMT = 0;
                  } else {
                    PRE_LY_SALE_TOT = Number(this.dr_P[i-1].LY_SALE_TOT);
                    PRE_SALE_TOT = Number(this.dr_P[i-1].SALE_TOT);
                    PRE_AMT = Number(this.dr_P[i-1].AMT);
                  }
                  this.dr_P.push({
                    AMT: PRE_AMT + Number(list[i].AMT),
                    LY_SALE_TOT: PRE_LY_SALE_TOT + Number(list[i].LY_SALE_TOT),
                    SALE_TOT: PRE_SALE_TOT + Number(list[i].SALE_TOT),
                    SALEDT: list[i].SALEDT,
                    SUNM: list[i].SUNM
                  })
                }
              }
              console.log("dr_P >>> ", this.dr_P)
            }
          }
          this.makeChart4();
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getStoreList(code, date) {
      this.req2svr.getStoreList(date, this.tabType, code).then(
        res => {
          this.dr_L = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.dr_L = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.dr_L.push(res);
            } else {
              this.dr_L = JSON.parse("[" + res + "]");
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getSalesChartCount(code, date) {
      this.req2svr.getSalesChartCount(this.tabType, code, date, this.choice).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else {
              this.dr_S.JQTY = Number(res.JQTY)
              this.dr_S.DCQTY = Number(res.DCQTY)
              this.dr_S.GQTY = Number(res.GQTY)
              this.dr_S.R_JQTY = Number(res.R_JQTY)
              this.dr_S.R_DCQTY = Number(res.R_DCQTY)
              this.dr_S.R_GQTY = Number(res.R_GQTY)
            }
            this.makeChart1()
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getSalesChartAMT(code, date) {
      this.req2svr.getSalesChartAMT(this.tabType, code, date).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else {
              this.dr_S.JAMT = Number(res.JAMT)
              this.dr_S.DCAMT = Number(res.DCAMT)
              this.dr_S.GAMT = Number(res.GAMT)
              this.dr_S.R_JAMT = Number(res.R_JAMT)
              this.dr_S.R_DCAMT = Number(res.R_DCAMT)
              this.dr_S.R_GAMT = Number(res.R_GAMT)
              this.dr_S.ADVDEPAMT = Number(res.ADVDEPAMT)
            }
            this.makeChart2()
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    prev(val) {
      this.$router.replace("/NewDailyReport");
    },
    tabVal(val) {
      if (moment(this.selectDate).diff(moment(this.recentDate)) > 0) {
        this.gubun = 1
        return
      }
      if (val == "1") {
        this.gubun = 1
      } else if (val == "2") {
        this.gubun = 2
        this.makeChart4();
      } 
    },
    makeChart1() {
      let txt = '당일'
      if(this.choice == 1) { txt = '당일'; } else if(this.choice == 2) { txt = '당월'; } else { txt = '당년'; }
      let title = ["정상", "할인", "균일"]
      let data = [
        { category: txt + "판매", 
          JQTY_T: "정상", JQTY: this.dr_S.JQTY, 
          DCQTY_T: "할인", DCQTY: this.dr_S.DCQTY, 
          GQTY_T: "균일", GQTY: this.dr_S.GQTY
        },
        { category: txt + "반품", 
          JQTY_T: "정상", JQTY: Math.abs(this.dr_S.R_JQTY),
          DCQTY_T: "할인", DCQTY: Math.abs(this.dr_S.R_DCQTY),
          GQTY_T: "균일", GQTY: Math.abs(this.dr_S.R_GQTY)
        },
      ];

      AmCharts.makeChart("chartdiv1", {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "category",
        rotate: true,
        colors: [ "#3f93f5", "#ff7f92", "#ffb83c", "#a3e326" ],
        startDuration: 1,
        fontSize: 18,
        marginRight: 100,
        categoryAxis: {
          gridPosition: "start",
          axisAlpha: 0,
          gridAlpha: 0,
          tickLength: 0
        },
        trendLines: [],
        graphs: [
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: 1,
            id: "AmGraph-1",
            labelText: "[[value]]",
            title: title[0],
            type: "column",
            valueField: "JQTY"
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: 1,
            id: "AmGraph-2",
            labelText: "[[value]]",
            title: title[1],
            type: "column",
            valueField: "DCQTY"
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: 1,
            id: "AmGraph-3",
            labelText: "[[value]]",
            title: title[2],
            type: "column",
            valueField: "GQTY"
          }
        ],
        guides: [],
        valueAxes: [
          {
            id: "ValueAxis-1",
            stackType: "regular",
            autoGridCount: false,
            axisAlpha: 0,
            axisThickness: 0,
            gridColor: "#AAB3B3",
            gridAlpha: 0.3,
            gridThickness: 0,
            labelsEnabled: false,
            titleRotation: 0,
            totalText: "[[total]]"
          }
        ],
        allLabels: [],
        balloon: {},
        dataProvider: data
      })
    },
    makeChart2() {
      let txt = '당일'
      if(this.choice == 1) { txt = '당일'; } else if(this.choice == 2) { txt = '당월'; } else { txt = '당년'; }
      let title = ["정상", "할인", "균일"]
      let data = [
        { category: txt + "판매", 
          JAMT_T: "정상", JAMT: Math.round(this.dr_S.JAMT/1000),
          DCAMT_T: "할인", DCAMT: Math.round(this.dr_S.DCAMT/1000),
          GAMT_T: "균일", GAMT: Math.round(this.dr_S.GAMT/1000)
        },
        { category: txt + "반품", 
          JAMT_T: "정상", JAMT: Math.round(Math.abs(this.dr_S.R_JAMT/1000)),
          DCAMT_T: "할인", DCAMT: Math.round(Math.abs(this.dr_S.R_DCAMT/1000)),
          GAMT_T: "균일", GAMT: Math.round(Math.abs(this.dr_S.R_GAMT/1000))
        },
      ];

      AmCharts.makeChart("chartdiv2", {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "category",
        marginRight: 100,
        rotate: true,
        colors: [ "#3F93F5", "#FF7F92", "#FFB83C", "#A3E326" ],
        startDuration: 1,
        fontSize: 18,
        categoryAxis: {
          gridPosition: "start",
          axisAlpha: 0,
          gridAlpha: 0,
          tickLength: 0
        },
        trendLines: [],
        graphs: [
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: 1,
            id: "AmGraph-1",
            labelText: "[[value]]",
            title: title[0],
            type: "column",
            valueField: "JAMT"
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: 1,
            id: "AmGraph-2",
            labelText: "[[value]]",
            title: title[1],
            type: "column",
            valueField: "DCAMT"
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: 1,
            id: "AmGraph-3",
            labelText: "[[value]]",
            title: title[2],
            type: "column",
            valueField: "GAMT"
          }
        ],
        guides: [],
        valueAxes: [
          {
            id: "ValueAxis-1",
            stackType: "regular",
            autoGridCount: false,
            axisAlpha: 0,
            axisThickness: 0,
            gridColor: "#e0f6fd",
            gridAlpha: 0.3,
            gridThickness: 0,
            labelsEnabled: false,
            showFirstLabel: true,
            titleRotation: 0,
            totalText: "[[total]]"
          }
        ],
        allLabels: [],
        balloon: {},
        dataProvider: data
      })
    },
    makeChart4() {
      let data = this.dr_P
      let colors = ["#E56464", "#FFB83C", "#3F93F5"];
      var txt = "";
      if(this.choice == 1) { txt = "일별"; }
      else if(this.choice == 2) { txt = "월별" }
      else { txt = "월별누적" }
      let graphs = [
        {
          balloonText: "작년동기매출(천원) : [[value]]",
          fillAlphas: 0,
          id: "AmGraph-1",
          lineAlpha: 1,
          lineThickness: 2,
          title: "작년동기매출",
          valueField: "LY_SALE_TOT",
          markerType: "diamond",
          bullet: "diamond",
          bulletSize: 5,
          //type: "column",
        },
        {
          balloonText: txt+"매출목표(천원) : [[value]]",
          fillAlphas: 0.5,
          lineAlpha: 0,
          fontSize: 0,
          id: "AmGraph-2",
          title: txt+"매출목표",
          valueField: "AMT",
          //markerType: "circle"
          type: "column"
        },
        {
          balloonText: txt+"매출실적(천원) : [[value]]",
          fillAlphas: 0,
          lineAlpha: 1,
          lineThickness: 2,
          id: "AmGraph-3",
          title: txt+"매출실적",
          valueField: "SALE_TOT",
          markerType: "circle",
          bullet: "round",
          bulletSize: 5,
        }
      ];
      AmCharts.makeChart("chartdiv4", {
        type: "serial",
        //startEffect: "easeOutSine",
        categoryField: "SALEDT",
        colors: colors,
        sequencedAnimation: false,
        //startEffect: "easeInSine",
        categoryAxis: {
          axisAlpha: 0.1,
          gridPosition: "start",
          gridAlpha: 0.05,
          tickLength: 0,
          startOnAxis: false,
          fontSize: 13
        },
        chartCursor: {
          enabled: true,
          zoomable: false,
          cursorPosition: "mouse"
        },
        trendLines: [],
        graphs: graphs,
        guides: [],
        valueAxes: [
          {
            id: "ValueAxis-1",
            gridColor: "#FFFFFF",
            tickLength: 0,
            showFirstLabel: false,
            title: "",
            fontSize: 13,
            autoGridCount: false,
          }
        ],
        allLabels: [],
        balloon: {},
        legend: {
          enabled: true,
          align: "left",
          fontSize: 12,
          position: "right",
          //equalWidths: false,
          valueWidth: 0,
          //labelWidth: 50
          //width: 120
        },
        titles: [],
        dataProvider: data
      });
    },
    toMain() {
      this.$router.replace("/")
    },
    rate(value, target) {
      let v = Number(value)
      let t = Number(target)
      if (t < 0) {
        return (1 + ((v-t)/Math.abs(t)))*100
      } else {
        return (v/t)*100
      }
    },
    chageType(value) {
      this.choice = value
      let date = moment(this.selectDate).format("YYYYMMDD");
      let code = this.selectedCODE;
      this.getChartData1(code, date)
      if(value == 1) {
        this.getChartData2(code, date)
      } else {
        this.getCumulativeSales(code, date)
      }
    },
  }
};
</script>