<template>
  <div id="tab-costs">
    <Modal v-if="showModal" @close="showModal = false"></Modal>
    <!-- "Desktop Table"
    <table class="table">
      <thead>
        <tr>
          <th scope="row" v-for="head in headArr" v-bind:key="head.id">{{ head }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-for="data in dataArr" v-bind:key="data.id">{{ data }}</td>
          chiamare funzione con click che formatta anche dati detailsRes prima di showModal
          <td><button type="button" class="btn btn-info" id="show-modal" @click="showModal = true">Dettagli</button></td>
        </tr>
      </tbody>
    </table> -->
    <table class="table table-striped border-bottom">
      <tbody>
        <tr v-for="i in dataArr.length" v-bind:key="i">
          <td>{{ headArr[i-1] }}</td>
          <td>{{ dataArr[i-1] }}</td>
          <!-- chiamare funzione con click che formatta anche dati detailsRes prima di showModal -->
        </tr>
      </tbody>
    </table>
    <div id="details">
      <div id="div-container">
        <button type="button" class="btn btn-info" id="show-modal" @click="showModal = true">Dettagli</button>
        <div class="badges">
          <div v-for="name in names" v-bind:key="name.id">
            <h5><span class="badge" id="in-badge" v-bind:style="{background : colors[name] }">
              {{name}}
            </span></h5>
          </div>
        </div>
      </div>
      <JqxBarGauge ref="barGaugeReference" class="svg"
        :width="450" :height="450" 
        :values="values" :formatFunction="formatFunction" 
        :tooltip='tooltip'
        v-if="$mq !== 'sm'"
      />
      <JqxBarGauge ref="barGaugeReference" class="svg"
        :width="350" :height="350" 
        :values="values" :formatFunction="formatFunction" 
        :tooltip='tooltip'
        :labels='labels'
        v-if="$mq === 'sm'"
      />
      
    </div>
  </div>
</template>

<script>
import Modal from '../Modal';
import JqxBarGauge from 'jqwidgets-scripts/jqwidgets-vue/vue_jqxbargauge.vue';
import VueMq from 'vue-mq'
import Vue from 'vue'
//import JqxButton from 'jqwidgets-scripts/jqwidgets-vue/vue_jqxbuttons.vue';

Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    sm: 450,
    md: 1250,
    lg: Infinity,
  },
  defaultBreakpoint: 'sm' // customize this for SSR
})

export default {
  name:'tab-costs',
  components:{
    Modal,
    JqxBarGauge
  },
  data(){
    return{
      infoResource: this.$store.state.infoResource,
      showModal: false,
      dataArr:[],
      headArr:[],
      values: [],
      labels: {
        visible: false
      },
      tooltip: {
        visible: true,
        formatFunction: (value, index) => {
          return (this.$store.state.detailsRes[index].tipoContributo + ': ' + Number(this.$store.state.detailsRes[index].totale).toFixed(2) + '€' );
        }
      },
      colors:{'Ordinario' : 'cadetblue', 'Straordinario' : 'burlywood', 'Aggiuntivi' : 'grey', 'Ferie' : 'orange', 'TFR' : 'indianred'},
      names:['Ordinario','Straordinario','Aggiuntivi','Ferie','TFR']
    }
  },
  beforeMount(){
    for(var i in this.infoResource.data.propertie){
      this.headArr.push(i);
    }

    for(var j in this.infoResource.data.propertie){
      this.dataArr.push(this.infoResource.data.propertie[j]);
    }

    this.$store.state.detailsRes = this.dataArr.pop();

    for(var d in this.$store.state.detailsRes){
      this.values.push( (Number(this.$store.state.detailsRes[d].totale) / Number(this.dataArr[3])) *100 );//calcolo %
    }
  
  },
  methods: {
    formatFunction: function (value, index) {
      value;
      return this.colors[this.names[index]];
    }
  }
}
</script>

<style scoped>
  .badges{
    background: rgba(224,224,224,0.67);
    padding: 10%;
    margin-top: 20%;
    display: table-cell;
  }
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .2s ease;
  }
  .component-fade-enter, .component-fade-leave-to {
    opacity: 0;
  }
  .btn-info{
    column-width: auto;
  }
  div#details {
    display: -webkit-inline-box;
  }
  #div-container{
    display: inline-grid;
    margin-left: 10%;
    width: 130%;
  }
  #in-badge{
    display: flow-root;
    width: initial;
  }
  .svg{
    background-color: transparent;
  }
  #tab-costs{
    overflow:auto;
    height:1000px;
  }
  .jqx-widget-content {
    padding-left: 8%;
  }
  @media(max-width: 450px){
    #tab-costs{
      overflow:auto;
      height:700px;
    }
    div#details{
      display: inline-table;
      margin-bottom: 250px;
    }
    .jqx-widget-content {
      padding-left: 0%;
    }
  }
</style>