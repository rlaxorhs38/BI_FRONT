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
        <!-- Title button -->
        <!-- <button type="button" class="btn_n btn_icon btn_prev" @click="prev">
          <i class="material-icons">arrow_back_ios</i>
        </button> -->
        <!-- Title -->
        <h2 class="layout_title">온라인 판매 현황</h2>
        <div class="layout_spacer"></div>
        <div style="margin-right: 10px;">
          <button type="button" class="btn_n" style="height:55px;"  @click="showYearly()">년도별로 조회</button>
        </div>
      </div>
    </header>
    <div class="container">
      <div class="content">
        <div class="row">
          <div class="col_md_12">
            <div class="cont_box">
              <div class="tit">
                <strong class="tit_txt">{{month}}월 {{toDay-1}}일 마감 기준 매출 실적</strong>
                <div class="layout_spacer"></div>
                <span class="txt">&lt; 단위: 천원 &gt;</span>
              </div>
              <div class="cont">
                <div class="tbl_sheet yellow np">
                  <table id="exceldown_tbody" class="tbl tbl_center tbl_scroll_horizontally">
                    <colgroup style="width: 1%">
                      <col />
                      <col />
                      <col />
                      <col />
                      <col />
                      <col />
                      <col />
                      <col />
                      <col />
                    </colgroup>
                    <thead>
                      <tr>
                        <th rowspan="2">구분</th>
                        <th colspan="4">당일 ({{month}}월 {{toDay-1}}일)</th>
                        <th colspan="4">당월({{ month }}월)</th>
                      </tr>
                      <tr>
                        <th>전체 매출</th>
                        <th>자사몰 매출</th>
                        <th>외부몰 매출</th>
                        <th>비율(%)</th>

                        <th>누적 매출</th>
                        <th>누적 자사몰 매출</th>
                        <th>누적 외부몰 매출</th>
                        <th>비율(%)</th>
                      </tr>
                    </thead>

                    <tbody id="sales_status" class="tbody_s">
                      <tr v-for="(data , index) in baseSaleList" v-bind:key="index" v-bind:class="totalClass(data.ITEM)">
                        <td style="font-weight: bold;">{{data.BRCD}}</td>

                        <td class="tr">{{ data.DAYTOT  | currency }}</td>
                        <td class="tr">{{ data.DAYJASA | currency }}</td>
                        <td class="tr">{{ data.DAYOUT | currency }}</td>
                        <td class="tr">{{ data.DAYRAT }}</td>
                        
                        <td class="tr">{{ data.MONTOT  | currency }}</td>
                        <td class="tr">{{ data.MONJASA | currency }}</td>
                        <td class="tr">{{ data.MONOUT | currency }}</td>
                        <td class="tr">{{ data.MONRAT }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col_md_12">
            <div class="cont_box">
              <div class="tit">
                <strong class="tit_txt">브랜드 별 월별 온라인 매출 추이</strong>
                <div class="layout_spacer"></div>
                <span class="txt">&lt; 단위: 백만원 &gt;</span>
              </div>
              <div class="cont">
                <div class="tbl_sheet yellow np">
                  <table id="exceldown_tbody" class="tbl tbl_center tbl_scroll_horizontally">
                    <colgroup style="width: 1%">
                      <col />
                      <col />
                      <col />
                      <col class="bg_point_col19" />
                      <col />
                      <col />
                      <col class="bg_point_col19" />
                      <col />
                      <col />
                      <col class="bg_point_col19" />
                      <col />
                      <col />
                      <col class="bg_point_col19" />
                      <col />
                      <col />
                      <col class="bg_point_col19" />
                      <col />
                      <col />
                      <col class="bg_point_col19" />
                      <col />
                      <col />
                      <col class="bg_point_col19" />
                      <col />
                      <col />
                      <col class="bg_point_col19" />
                      <col />
                      <col />
                      <col class="bg_point_col19" />
                      <col />
                      <col />
                      <col class="bg_point_col19" />
                      <col />
                      <col />
                      <col class="bg_point_col19" />
                      <col />
                      <col />
                      <col class="bg_point_col19" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>년도</th>
                        <th colspan="3" v-for="s in 12" v-bind:key="s">{{s}} 월</th>
                      </tr>
                      <tr>
                        <th>구분</th>

                        <th>자사</th>
                        <th>외부</th>
                        <th>합계</th>

                        <th>자사</th>
                        <th>외부</th>
                        <th>합계</th>

                        <th>자사</th>
                        <th>외부</th>
                        <th>합계</th>

                        <th>자사</th>
                        <th>외부</th>
                        <th>합계</th>

                        <th>자사</th>
                        <th>외부</th>
                        <th>합계</th>

                        <th>자사</th>
                        <th>외부</th>
                        <th>합계</th>

                        <th>자사</th>
                        <th>외부</th>
                        <th>합계</th>

                        <th>자사</th>
                        <th>외부</th>
                        <th>합계</th>

                        <th>자사</th>
                        <th>외부</th>
                        <th>합계</th>

                        <th>자사</th>
                        <th>외부</th>
                        <th>합계</th>

                        <th>자사</th>
                        <th>외부</th>
                        <th>합계</th>

                        <th>자사</th>
                        <th>외부</th>
                        <th>합계</th>
                      </tr>
                    </thead>

                    <tbody id="sales_status" class="tbody_s">
                      <tr v-for="(data , index) in brdSaleMslList" v-bind:key="index">
                        <td style="font-weight: bold;">{{data.MAINGU}}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{ data.JASASILAMT1 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.OUTSILAMT1 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.TOTSILAMT1 | currency }}</td>
                        
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{ data.JASASILAMT2 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.OUTSILAMT2 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.TOTSILAMT2 | currency }}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{ data.JASASILAMT3 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.OUTSILAMT3 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.TOTSILAMT3 | currency }}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{ data.JASASILAMT4 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.OUTSILAMT4 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.TOTSILAMT4 | currency }}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{ data.JASASILAMT5 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.OUTSILAMT5 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.TOTSILAMT5 | currency }}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{ data.JASASILAMT6 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.OUTSILAMT6 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.TOTSILAMT6 | currency }}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{ data.JASASILAMT7 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.OUTSILAMT7 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.TOTSILAMT7 | currency }}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{ data.JASASILAMT8 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.OUTSILAMT8 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.TOTSILAMT8 | currency }}</td>
                        
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{ data.JASASILAMT9 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.OUTSILAMT9 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.TOTSILAMT9 | currency }}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{ data.JASASILAMT10 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.OUTSILAMT10 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.TOTSILAMT10 | currency }}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{ data.JASASILAMT11 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.OUTSILAMT11 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.TOTSILAMT11 | currency }}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{ data.JASASILAMT12 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.OUTSILAMT12 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.TOTSILAMT12 | currency }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col_md_12">
            <div class="cont_box">
              <div class="tit">
                <strong class="tit_txt" >잇미샤 월별 온/오프 판매비중</strong>
                <div class="layout_spacer"></div>
                <span class="txt">&lt; 단위: 백만원 &gt;</span>
              </div>
              <div class="cont">
                <div class="tbl_sheet tbl_hover_none np">
                  <table class="tbl tbl_center">
                      <colgroup>
                        <col width="200px"/>
                        <col />
                        <col />
                        <col />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>구분</th>
                          <th v-for="(s, index) in 12" v-bind:key="index">{{s}} 월</th>
                        </tr>
                      </thead>

                      <tbody class="tbody_s">
                        <tr v-for="(data , index) in itOnffImptMslList" :key="index" v-bind:class="totalClass(data.ITEM)">
                          <!-- <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" @click="addRow(data, index)">{{ data.ITEMNM }}</td> -->
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" >{{ data.ITEMNM }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT1  | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT2  | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT3  | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT4  | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT5  | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT6  | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT7  | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT8  | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT9  | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT10 | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT11 | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT12 | currency }}</td>
                        </tr>
                      </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  </div>
</template>

<script>
import moment from "moment"
import req2svr from "./req2svr"
import sideMenu from '@/components/sideMenu'

// import DetailMslyPopup from '@/pages/online/ONL0104_1'
import YearlyPopup from '@/pages/online/ONL0103_1'

export default {
  name: "ONL0103",
  components: {
    sideMenu,
    // DetailMslyPopup,
    YearlyPopup
  },
  props: {
    data: Object
  },
  mounted() {
    this.setLoadData();
  },
  created() {

    // this.loadData()
  },
  computed: {
    req2svr: () => req2svr,
  },
  data() {
    return {
      drawer: null,
      brand: 1,
      year: new Date().getFullYear(),
      month: new Date().getMonth()+1,
      toDay: new Date().getDate(),
      msg: 'This is OnLineSale page',
      // brandSaleList: [
      //   {"BRCD": "MI", "SUCD": "1",  "JASASILAMT4": "0", "OUTSILAMT4": "0", "TOTSILAMT4": "0", "JASASILAMT3": "301", "OUTSILAMT3": "0", "TOTSILAMT3": "301", "JASASILAMT2": "422", "OUTSILAMT2": "0", "TOTSILAMT2": "422", "JASASILAMT1": "776", "OUTSILAMT1": "0", "TOTSILAMT1": "776", "JASASILAMT": "0", "OUTSILAMT": "0", "TOTSILAMT": "0"},
      //   {"BRCD": "MO", "SUCD": "12", "JASASILAMT4": "0", "OUTSILAMT4": "0", "TOTSILAMT4": "0", "JASASILAMT3": "1357", "OUTSILAMT3": "0", "TOTSILAMT3": "1357", "JASASILAMT2": "2126", "OUTSILAMT2": "0", "TOTSILAMT2": "2126", "JASASILAMT1": "2675", "OUTSILAMT1": "0", "TOTSILAMT1": "2675", "JASASILAMT": "0", "OUTSILAMT": "0", "TOTSILAMT": "0"},
      //   {"BRCD": "IT", "SUCD": "14", "JASASILAMT4": "264", "OUTSILAMT4": "1482", "TOTSILAMT4": "1746", "JASASILAMT3": "1127", "OUTSILAMT3": "1932", "TOTSILAMT3": "3059", "JASASILAMT2": "2665", "OUTSILAMT2": "1985", "TOTSILAMT2": "4650", "JASASILAMT1": "4519", "OUTSILAMT1": "3503", "TOTSILAMT1": "8022", "JASASILAMT": "0", "OUTSILAMT": "0", "TOTSILAMT": "0"},
      //   {"BRCD": "IN", "SUCD": "23", "JASASILAMT4": "671", "OUTSILAMT4": "2760", "TOTSILAMT4": "3431", "JASASILAMT3": "1400", "OUTSILAMT3": "593", "TOTSILAMT3": "1993", "JASASILAMT2": "846", "OUTSILAMT2": "73", "TOTSILAMT2": "919", "JASASILAMT1": "1441", "OUTSILAMT1": "682", "TOTSILAMT1": "2123", "JASASILAMT": "0", "OUTSILAMT": "0", "TOTSILAMT": "0"},
      //   {"BRCD": "SO", "SUCD": "3",  "JASASILAMT4": "29", "OUTSILAMT4": "662", "TOTSILAMT4": "691", "JASASILAMT3": "129", "OUTSILAMT3": "956", "TOTSILAMT3": "1085", "JASASILAMT2": "", "OUTSILAMT2": "", "TOTSILAMT2": "", "JASASILAMT1": "", "OUTSILAMT1": "", "TOTSILAMT1": "", "JASASILAMT": "0", "OUTSILAMT": "0", "TOTSILAMT": "0"},
      // ],
      // itOnffImptList: [
      //   {ITEM: "00", ITEMNM: "매출합계", AMT_17: "44148980", AMT_18: "47417298", AMT_19: "58089170", AMT: ""},
      //   //{ITEM: "11", ITEMNM: "네이버(스타일윈도)", AMT_17: "3570534", AMT_18: "5888477", AMT_19: "9932276", AMT: ""},
      //   {ITEM: "22", ITEMNM: "백화점몰", AMT_17: "1932000", AMT_18: "1985000", AMT_19: "3503000", AMT: ""},
      //   {ITEM: "33", ITEMNM: "잇미샤몰", AMT_17: "1127000", AMT_18: "2665000", AMT_19: "4519000", AMT: ""},
      //   //{ITEM: "OFFLIN", ITEMNM: "오프라인", AMT_17: "37519446", AMT_18: "36878821", AMT_19: "40134894", AMT: ""}
      // ],
      month: 1,
      brdSaleMslList: [],
      itOnffImptMslList: [],
      // isDetailMslVisible: false,
      isYearlyVisible: false,
      baseSaleList: [],
    }
  },
  methods: {
    toMain: function () {
      this.$router.replace("/");
    },
    setLoadData: function () {
      this.getSaleByBrdDetailData();
      this.getITOnOffDetailData();
      this.getBaseSaleList();
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
            for(var i in this.itOnffImptList) {
              for(var j in itYearData) {
                if(this.itOnffImptList[i].ITEM == itYearData[j].ITEM) {
                  this.itOnffImptList[i].AMT = itYearData[j].AMT;
                }
              }
            }

            let offDataObj = {
              ITEM: "44", ITEMNM: "오프라인", 
              AMT_17: Number(_.find(this.itOnffImptList, {'ITEM': '00'}).AMT_17), 
              AMT_18: Number(_.find(this.itOnffImptList, {'ITEM': '00'}).AMT_18), 
              AMT_19: Number(_.find(this.itOnffImptList, {'ITEM': '00'}).AMT_19), 
              AMT:    Number(_.find(this.itOnffImptList, {'ITEM': '00'}).AMT)
            };
            for(var i in this.itOnffImptList) {
              if(this.itOnffImptList[i].ITEM != "00") {
                offDataObj["AMT_17"]  -= Number(this.itOnffImptList[i]["AMT_17"]);
                offDataObj["AMT_18"]  -= Number(this.itOnffImptList[i]["AMT_18"]);
                offDataObj["AMT_19"]  -= Number(this.itOnffImptList[i]["AMT_19"]);
                offDataObj["AMT"]     -= Number(this.itOnffImptList[i]["AMT"]);
              }
            }
            
            this.itOnffImptList.push(offDataObj);
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getBaseSaleList: function () { 
      this.req2svr.getBaseSaleList().then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            console.log("getBaseSaleList >>> ", JSON.parse("[" + res + "]"));
            this.baseSaleList = JSON.parse("[" + res + "]");

            let totObj = {
              "BRCD": "합계",
              "SORT": "999",
              "ITEM": "00",
              "DAYTOT": _.sumBy(this.baseSaleList, function(o) { return Number(o.DAYTOT); }),
              "DAYJASA": _.sumBy(this.baseSaleList, function(o) { return Number(o.DAYJASA); }),
              "DAYOUT": _.sumBy(this.baseSaleList, function(o) { return Number(o.DAYOUT); }),
              "DAYRAT": _.meanBy(this.baseSaleList, function(o) { return Number(o.DAYRAT); }),
              "MONTOT": _.sumBy(this.baseSaleList, function(o) { return Number(o.MONTOT); }),
              "MONJASA": _.sumBy(this.baseSaleList, function(o) { return Number(o.MONJASA); }),
              "MONOUT": _.sumBy(this.baseSaleList, function(o) { return Number(o.MONOUT); }),
              "MONRAT": _.meanBy(this.baseSaleList, function(o) { return Number(o.MONRAT); })
            }

            this.baseSaleList.push(totObj);
            
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
              MAINGU : "TOTAL", "SUCD": ""
            };

            for(var i=0; i < 12; i++) {
              totObj["JASASILAMT"+(i+1)] = this.brdSaleMslList.map(x => Number(x["JASASILAMT"+(i+1)])).reduce(function (pre, value) { return pre + value; });
              totObj["OUTSILAMT"+(i+1)] = this.brdSaleMslList.map(x => Number(x["OUTSILAMT"+(i+1)])).reduce(function (pre, value) { return pre + value; });
              totObj["TOTSILAMT"+(i+1)] = this.brdSaleMslList.map(x => Number(x["TOTSILAMT"+(i+1)])).reduce(function (pre, value) { return pre + value; });
            }
            this.brdSaleMslList.push(totObj);
          }
        },
        rej => {
          console.log("rej", rej);
          let ItYearData = JSON.parse("[" + res + "]");
        }
      )
    },
    getITOnOffDetailData: function () {
      this.req2svr.getITOnOffDetailData(this.year).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.itOnffImptMslList = JSON.parse("[" + res + "]");
            for(var i in this.itOnffImptMslList) {
              this.itOnffImptMslList[i]["ITEMNM"] = this.getItemNm(this.itOnffImptMslList[i]["ITEM"]);
            }

            let offDataObj = {
              ITEM: "44", ITEMNM: "오프라인"
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
    // showDetailMsl(year) {
    //   this.year = year
    //   this.isDetailMslVisible = true;
    // },
    // closeDetailMsl() {
    //   this.isDetailMslVisible = false;
    // },
    showYearly() {
      this.isYearlyVisible = true;
    },
    closeYearly() {
      this.isYearlyVisible = false;
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
    }
  }
}
</script>