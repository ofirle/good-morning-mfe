import {useEffect, useMemo, useState} from "react";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import {GqlRowFilter, RowFilter} from "../../types/interfaces";

const client = new ApolloClient({
    uri: 'https://rms-dev.graphql.kalarasho.com/query',
    cache: new InMemoryCache(),
});

const getItemOption = (options: Array<GqlRowFilter>):Array<RowFilter> => {
    return options.map((value) => {
        return { value: value.key, label: value.name, img: value.icon_url };
    });
};

const useFilterData = () => {
    const [filtersData, setFiltersData] = useState({});
    useEffect(() => {
        client.query({
            query: gql`
            query RmsCampaignsFilterList {
              RmsCampaignsFilterList {
                data {
                  titles {
                    icon_url
                    key
                    name
                  }
                  social_managers {
                    icon_url
                    key
                    name
                  }
                  os {
                    icon_url
                    key
                    name
                  }
                  operation_managers {
                    icon_url
                    name
                    key
                  }
                  media_sources {
                    icon_url
                    key
                    name
                  }
                  growth_managers {
                    icon_url
                    key
                    name
                  }
                  countries {
                    icon_url
                    key
                    name
                  }
                }
              }
            }`,

        }).then((result) => {
            const {data} = result.data['RmsCampaignsFilterList'][0];
            const titlesData = getItemOption(data.titles);
            const mediaSourcesData = getItemOption(data.media_sources);
            const growthManagersData = getItemOption(data.growth_managers);
            const socialManagersData = getItemOption(data.social_managers);
            const countriesData = getItemOption(data.countries);

            setFiltersData({
                published_id: titlesData,
                media_source: mediaSourcesData,
                growth_manager: growthManagersData,
                social_manager: socialManagersData,
                country_code: countriesData
            });
        });

    }, []);

    return filtersData;
};

export default useFilterData;