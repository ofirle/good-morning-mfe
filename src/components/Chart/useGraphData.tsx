import {useEffect, useMemo, useState} from "react";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://rms-dev.graphql.kalarasho.com/query',
    cache: new InMemoryCache(),
});

// const eventDate = {
//     from: "2022-08-22T00:00:00.000Z",
//     to: "2022-09-05T00:00:00.000Z"
// };

const oneDay = 1000 * 60 * 60 * 24;
const zeroPad = (num, places) => String(num).padStart(places, '0');
const getDiffDays = (startDate: Date, endDate: Date) => {
    const diffInTime = endDate.getTime() - startDate.getTime();
    return Math.round(diffInTime / oneDay) + 1;
};


const useGraphData = (type, breakdown, filters, setIsLoading, filtersData, eventDate) => {
    console.log(eventDate);
    console.log(filters);
    console.log(filtersData);
    const [data, setData] = useState(null);
    // const [graphData, setGraphData] = useState(null);
    // const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        setIsLoading(true);
        client.query({
            query: gql`
            query Query($filters: [RmsCampaignInsightsFilters!]!, $metrics: [RmsCampaignInsightsMetrics!]!, $pageNumber: Int!, $resultsBulkSize: Int!, $granularity: RmsGranularity, $breakdowns: [RmsCampaignInsightsBreakdowns!]) {
                RmsCampaignInsights(filters: $filters, metrics: $metrics, pageNumber: $pageNumber, resultsBulkSize: $resultsBulkSize, granularity: $granularity, breakdowns: $breakdowns)  {
                  data {
                      ${type}
                      ${breakdown}
                      daily
                  }
              }
            }`,
            variables: {
                metrics: [
                    type,
                ],
                filters: {
                    event_date: eventDate,
                    ...filters
                },
                pageNumber: 1,
                resultsBulkSize: 20000,
                granularity: "daily",
                breakdowns: breakdown
            }
        }).then((result) => {
            setData(result.data.RmsCampaignInsights.data);
            setIsLoading(false);
        });
    }, [type, breakdown, filters, eventDate]);

    return useMemo(() => {
        if(data === null || !filtersData) {
            return { data: {}, legends: [] };
        }
        const allBreakdownItems = {};
        data.forEach((item) => {
            if(!allBreakdownItems.hasOwnProperty(item[breakdown])) allBreakdownItems[item[breakdown]] = 0;
            allBreakdownItems[item[breakdown]] += item[type] || 0;
        });
        const sortedBreakdownItems = Object.entries(allBreakdownItems).sort((item1, item2) => {
            return item2[1] - item1[1];
        }).map((breakdownItem) => breakdownItem[0]);
        const startDate = new Date(eventDate.from);
        const endDate = new Date(eventDate.to);
        const currentDate = new Date(eventDate.from);
        const diffInDays = getDiffDays(startDate, endDate);
        const dateKeys = [];
        const datesDisplay = [];
        const dataBreakdown = {};
        const graphDataTmp = { data: {}, legends: [] };
        const dataDates = {};

        while (currentDate.getTime() <= endDate.getTime()) {
            dataDates[`${zeroPad(currentDate.getDate(), 2)}.${zeroPad((currentDate.getMonth() + 1), 2)}`] = 0;
            dateKeys.push(`${zeroPad(currentDate.getDate(), 2)}.${zeroPad((currentDate.getMonth() + 1), 2)}`);
            datesDisplay.push(currentDate.toISOString());
            graphDataTmp.data[currentDate.toISOString()] = [];
            currentDate.setTime(currentDate.getTime() + oneDay);
        }

            console.log(filtersData);
        sortedBreakdownItems.forEach((breakdownItem) => {
            dataBreakdown[breakdownItem] = { ...dataDates };
            graphDataTmp.legends.push({
                id: breakdownItem,
                displayName: filtersData.find((item) => item.value === breakdownItem)?.label || breakdownItem,
                hidden: sortedBreakdownItems.indexOf(breakdownItem) >= 5
            });
        });

        data.forEach((item) => {
            dataBreakdown[item[breakdown]][item.daily] = item[type];
        });

        sortedBreakdownItems.forEach((ms) => {
            for (let i = 0; i < diffInDays; i++) {
                graphDataTmp.data[datesDisplay[i]].push(dataBreakdown[ms][dateKeys[i]]);
            }
        });

        return graphDataTmp;
    },[ data, filtersData, eventDate ]);
};

export default useGraphData;