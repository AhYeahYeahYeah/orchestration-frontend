import { Component } from 'react';

import * as echarts from 'echarts';

class Echarts extends Component {
    componentDidMount() {
        const chartDom = document.getElementById('main');
        const myChart = echarts.init(chartDom);
        let option;

        // eslint-disable-next-line prefer-const
        option = {
            graphic: {
                elements: [
                    {
                        type: 'text',
                        left: '9%',
                        top: '32%',
                        style: {
                            text: 'Orchestration Helper',
                            fontSize: 60,
                            fontWeight: 'bold',
                            lineDash: [0, 200],
                            lineDashOffset: 0,
                            fill: 'transparent',
                            stroke: '#000',
                            lineWidth: 1
                        },
                        keyframeAnimation: {
                            duration: 3000,
                            loop: true,
                            keyframes: [
                                {
                                    percent: 0.7,
                                    style: {
                                        fill: 'transparent',
                                        lineDashOffset: 200,
                                        lineDash: [200, 0]
                                    }
                                },
                                {
                                    // Stop for a while.
                                    percent: 0.8,
                                    style: {
                                        fill: 'transparent'
                                    }
                                },
                                {
                                    percent: 1,
                                    style: {
                                        fill: 'black'
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        };
        // eslint-disable-next-line no-unused-expressions
        option && myChart.setOption(option);
    }

    render() {
        return <div id="main" style={{ position: 'fixed', width: '100%', height: '100%' }} />;
    }
}

export default Echarts;
