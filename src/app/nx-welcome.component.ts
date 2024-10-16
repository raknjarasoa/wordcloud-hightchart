import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import Wordcloud from 'highcharts/modules/wordcloud';

Wordcloud(Highcharts);

@Component({
  selector: 'app-nx-welcome',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  template: `
    <h3>
      <a
        href="https://www.highcharts.com/chat/gpt/"
        target="_blank"
        rel="noopener noreferrer"
        >Try GPT</a
      >
    </h3>
    <div class="wrapper">
      <div class="container">
        <!--  MIDDLE CONTENT  -->
        <div id="middle-content">
          <div id="middle-left-content">
            <div id="learning-materials" class="rounded shadow">
              <highcharts-chart
                [oneToOne]="true"
                [Highcharts]="Highcharts"
                [options]="options"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {
  Highcharts = Highcharts;

  options: Highcharts.Options = {
    colors: ['black', 'grey', 'brown', 'tomato', 'magenta'],
    accessibility: {
      screenReaderSection: {
        beforeChartFormat:
          '<h5>{chartTitle}</h5>' +
          '<div>{chartSubtitle}</div>' +
          '<div>{chartLongdesc}</div>' +
          '<div>{viewTableButton}</div>',
      },
    },
    series: [
      {
        type: 'wordcloud',
        data: getData(),
        name: 'Occurrences',
      },
    ],
    title: {
      text: 'AP',
      align: 'left',
    },
    subtitle: {
      text: 'Long text title',
      align: 'left',
    },
    plotOptions: {
      series: {
        cursor: 'pointer',
        point: {
          events: {
            click: function () {
              alert(this.options.name);
            },
          },
        },
      },
    },
    tooltip: {
      headerFormat:
        '<span style="font-size: 36px"><b>{point.key}</b>' + '</span><br>',
    },
  };
  // Highcharts: typeof Highcharts = Highcharts; // required
  // chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  // chartOptions: Highcharts.Options = { ... }; // required
  // chartCallback: Highcharts.ChartCallbackFunction = function (chart) { ... } // optional function, defaults to null
  // updateFlag: boolean = false; // optional boolean
  // oneToOneFlag: boolean = true; // optional boolean, defaults to false
  // runOutsideAngular: boolean = false;
}

function getData() {
  const text =
      'Chapter 1. Down the Rabbit-Hole ' +
      'Alice was beginning to get very tired of sitting by her sister on ' +
      'the bank, and of having nothing to do: ' +
      'once or twice she had peeped into the book her sister was reading, ' +
      'but it had no pictures or conversations ' +
      "in it, 'and what is the use of a book,' thought Alice " +
      "'without pictures or conversation?'" +
      'So she was considering in her own mind (as well as she could, for ' +
      'the hot day made her feel very sleepy ' +
      'and stupid), whether the pleasure of making a daisy-chain would be ' +
      'worth the trouble of getting up and picking ' +
      'the daisies, when suddenly a White Rabbit with pink eyes ran close ' +
      'by her.',
    lines = text.replace(/[():'?0-9]+/g, '').split(/[,\. ]+/g);
  return lines.reduce((arr, word) => {
    let obj: any = Highcharts.find(arr, (obj: any) => obj.name === word);
    if (obj) {
      obj.weight += 1;
    } else {
      obj = {
        name: word,
        weight: 1,
      };
      arr.push(obj);
    }
    return arr;
  }, [] as any[]);
}
