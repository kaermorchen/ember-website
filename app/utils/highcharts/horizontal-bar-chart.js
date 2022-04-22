/*
  https://api.highcharts.com/highcharts/plotOptions.bar
*/
import { tracked } from '@glimmer/tracking';

export default class HorizontalBarChart {
  @tracked chart;
  @tracked rawData;

  constructor({ chart, rawData }) {
    this.chart = chart;
    this.rawData = rawData;
  }

  get highchartsOptions() {
    const { chart, isLegendEnabled, series } = this;

    return {
      chart: {
        backgroundColor: 'transparent',
        type: 'bar',
      },

      legend: {
        enabled: isLegendEnabled,
      },

      series,

      subtitle: {
        text: chart.subtitle,
      },

      title: {
        text: chart.title,
      },

      tooltip: {
        pointFormat: '{series.name}: {point.y:.1f}%',
      },

      xAxis: {
        categories: chart.categories,
        type: 'category',
      },

      yAxis: {
        labels: {
          format: '{value} %',
        },
        min: 0,
        title: {
          text: 'Percent of responses',
        },
      },
    };
  }

  get isLegendEnabled() {
    const { series } = this;

    return series.length > 1;
  }

  get series() {
    return createSeries(this.rawData);
  }
}

function createSeries(rawData = []) {
  const data = [];

  rawData.forEach((datum) => {
    const { color, label, values } = datum;

    data.push({
      color,
      data: values,
      name: label,
    });
  });

  return data;
}
