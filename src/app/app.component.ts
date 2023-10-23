import { Component, TemplateRef, ViewChild } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  @ViewChild("chart") componentRef;
  highcharts = Highcharts;
  chartRef;
  modelChange1;
  updateFlag;
  modelChange2;
  cadernosVendidos = [];
  canetasVendidas = [];
  itensFilter = [];
  disabledCampoCaneta = false;
  disabledCampoCaderno = false;
  placeholder1 = "Acima de .. canetas";
  placeholder2 = "Acima de ... cadernos";
  qtdCanetas;
  qtdCadernos;

  itensOriginal = [
    {
      qtdCadVendido: 7,
      qtdCanVendido: 22
    },
    {
      qtdCadVendido: 10,
      qtdCanVendido: 17
    },
    {
      qtdCadVendido: 6,
      qtdCanVendido: 8
    },
    {
      qtdCadVendido: 22,
      qtdCanVendido: 13
    },
    {
      qtdCadVendido: 4,
      qtdCanVendido: 9
    },
  ]
  disabledCanetas = false;
  disabledCadernos = false;
  
  constructor(
     private router: Router,
    private _router: ActivatedRoute
  ) { }

  Highcharts: typeof Highcharts = Highcharts;

  public chartOptions1: any = {   
    chart: {
      type: "bar",
      events: {
        load: function() {
          let categoryHeight = 25;
          this.update({
            chart: {
              height: categoryHeight * this.pointCount + (this.chartHeight - this.plotHeight)
            }
          })
        }
      },
    },
    legend: {
      align: 'right',
      verticalAlign: 'top',
      layout: 'vertical',
      x: 0,
      y: 0
    },
    credits: {
      enabled: false
    },
    title: {
      text: "Vendas"
    },
    xAxis:{
      categories: []
    },
    yAxis: [{
      title: {
          text: 'Qtd Itens Vendidos'
          },
          ShowEmpty: true
      },
      ],
      plotOptions: {
        series: {
            stacking: 'normal',
        }
      },  
      series: [],
  };

  chartOptions = this.chartOptions1;
  chartOptions2 = this.chartOptions1;
  
  ngOnInit() {
    this.montarDadosGrafico();
  };

  chartCallback: Highcharts.ChartCallbackFunction = chart => {
    this.chartRef = chart;
  };

  montarDadosGrafico(){
      this.cadernosVendidos = this.itensOriginal.map((data) => data.qtdCadVendido);
      this.canetasVendidas = this.itensOriginal.map((data) => data.qtdCanVendido);
      this.chartOptions1.xAxis.categories = ['19/08', '20/08', '21/08', '22/08','23/08', '24/08'];
      this.chartOptions1.series[0] = {
        name: 'Canetas Vendidas',
        data: this.canetasVendidas,
        color: '#0000ff'
      },
      this.chartOptions1.series[1] = {
        name: 'Cadernos Vendidos',
        data:  this.cadernosVendidos,
        color: '#008000'
      }
      this.componentRef.chart = null;
      this.chartOptions = this.chartOptions1
      this.updateFlag = true;
      this.disabledCampoCaneta= true;
      this.disabledCampoCaderno = true;
  }

  searchFilterCanetas(event){
    if(event.target.value.length ==  0){
      this.disabledCampoCaderno = true;
      this.cadernosVendidos = this.itensOriginal.map((data) => data.qtdCadVendido);
      this.canetasVendidas = this.itensOriginal.map((data) => data.qtdCanVendido);
      this.chartOptions1.series[0] = {
        name: 'Canetas Vendidas',
        data: this.canetasVendidas,
        color: '#0000ff'
      },
      this.chartOptions1.series[1] = {
        name: 'Cadernos Vendidos',
        data:  this.cadernosVendidos,
        color: '#008000'
      }
        this.chartRef.destroy();
        this.componentRef.chart = null;
        this.chartOptions = this.chartOptions2;
        this.updateFlag = true;
    }else{
      this.disabledCampoCaderno = false;
    }
  }

  searchFilterCadernos(event){
    if(event.target.value.length ==  0){
      this.disabledCampoCaneta = true;
      this.cadernosVendidos = this.itensOriginal.map((data) => data.qtdCadVendido);
      this.canetasVendidas = this.itensOriginal.map((data) => data.qtdCanVendido);
      this.chartOptions1.series[0] = {
        name: 'Canetas Vendidas',
        data: this.canetasVendidas,
        color: '#0000ff'
      },
      this.chartOptions1.series[1] = {
        name: 'Cadernos Vendidos',
        data:  this.cadernosVendidos,
        color: '#008000'
      }
        this.chartRef.destroy();
        this.componentRef.chart = null;
        this.chartOptions = this.chartOptions2;
        this.updateFlag = true;
    }else{
      this.disabledCampoCaneta = false;
    }
  }

  filtrarDados(){
    if((this.qtdCanetas == null || this.qtdCanetas == "") && (this.qtdCadernos == null || this.qtdCadernos == "")){
      return;
    }
    if(this.qtdCanetas != null && this.qtdCanetas != ""){
      this.disabledCadernos = false;
      this.itensFilter = this.itensOriginal;
      let filtro = this.itensFilter.filter((item) => item.qtdCanVendido > this.qtdCanetas);
      this.cadernosVendidos =  filtro.map((data) => data.qtdCadVendido);
      this.canetasVendidas = filtro.map((data) => data.qtdCanVendido);
      this.chartOptions1.series[0] = {
        name: 'Canetas Vendidas',
        data: this.canetasVendidas,
        color: '#0000ff'
      },
      this.chartOptions1.series[1] = {
        name: 'Cadernos Vendidos',
        data:  this.cadernosVendidos,
        color: '#008000'
      }
      this.chartRef.destroy();
      this.componentRef.chart = null;
      this.chartOptions = this.chartOptions2
      this.updateFlag = true;
    }else if(this.qtdCadernos != null && this.qtdCadernos != ""){
      this.disabledCanetas = false;
      this.itensFilter = this.itensOriginal;
      let filtro = this.itensOriginal.filter((item) => item.qtdCadVendido > this.qtdCadernos)
      this.cadernosVendidos =  filtro.map((data) => data.qtdCadVendido);
      this.canetasVendidas = filtro.map((data) => data.qtdCanVendido);
      this.chartOptions1.series[0] = {
        name: 'Canetas Vendidas',
        data: this.canetasVendidas,
        color: '#0000ff'
      },
      this.chartOptions1.series[1] = {
        name: 'Cadernos Vendidos',
        data:  this.cadernosVendidos,
        color: '#008000'
      }
      this.chartRef.destroy();
      this.componentRef.chart = null;
      this.chartOptions = this.chartOptions2
      this.updateFlag = true;
    }
  }

}
