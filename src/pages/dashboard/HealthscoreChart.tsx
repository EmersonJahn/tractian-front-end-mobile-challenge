import { useEffect, useRef, useState } from "react";

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

import './Charts.css'
import { Asset } from "../../models/Asset";

interface HealthscoreChartProps {
    assets: Asset[];
}

export default (props: HealthscoreChartProps) => {
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

    const [options, setOptions] = useState<Highcharts.Options>();

    const data = props.assets.map((asset: Asset) => {           
        return {
            name: asset.name,
            y: asset.healthscore,
        }
    })

    useEffect(() => {       
        getChartOptions();
    }, [props.assets]);

    const getChartOptions = () => {
        const options: Highcharts.Options = {
            title: {
                text: 'Níveis de Saúde'
            },
            series: [{
                type: 'line',
                data: data,
                name: 'Nível de saúde'
            }],
            credits: {
                enabled: false
            },
            yAxis: {
                title: {
                    text: ''
                }
            }
        }
        
        setOptions(options);
    }

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartComponentRef} 
            immutable={true}
        />
    )
}