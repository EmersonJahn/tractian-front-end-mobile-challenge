import { useEffect, useRef, useState } from "react";

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

import './Charts.css'
import { Asset } from "../../models/Asset";

interface StatusChartProps {
    assets: Asset[];
}

export default (props: StatusChartProps) => {
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

    const [options, setOptions] = useState<Highcharts.Options>();

    useEffect(() => {       
        getChartOptions();
    }, [props.assets]);

    const getChartOptions = () => {
        const data = props.assets.map((asset: Asset) => {           
            return {
                name: asset.status.statusInPortuguese,
                y: getTotalAssetsByStatus(asset.status.status),
            }
        })

        const filteredData = data.filter((value, index, self) => // para remover os duplicados
            index === self.findIndex((data) => (
                data.name === value.name
            ))
        )
        
        const options: Highcharts.Options = {
            title: {
                text: 'Ativos por status'
            },
            series: [{
                type: 'pie',
                data: filteredData,
            }],
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}<br>{point.y}',
                        distance: -50,
                    }
                }
            },
            credits: {
                enabled: false
            }
        }
        
        setOptions(options);
    }

    const getTotalAssetsByStatus = (status: string) => {
        return props.assets.filter((asset: Asset) => asset.status.status === status).length;
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