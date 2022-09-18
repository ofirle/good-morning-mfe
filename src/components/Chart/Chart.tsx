import React, {useRef} from "react";
import { SuperChart, ChartType} from "@supersonic-studios/ui-components";
import {chartOptions} from "./ChartOptions";
import {Report} from "../../types/report.enum";

const Chart = () => {
    const chartRef = useRef({} as any);

    return (
        <SuperChart
            type={ChartType.Line}
            ref={chartRef}
            data={{data: {}, legends :[]}}
            options={chartOptions(true, Report.TotalRevenue, undefined)}
        />);

};

export default Chart;