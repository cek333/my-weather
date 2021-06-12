import {
  ApolloClient,
  InMemoryCache,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

async function refreshWeatherData(city) {
  const query = gql`
    query {
      getCityByName(name: "${city}", config: { units: metric }) {
        name
        weather {
          summary {
            description
            icon
          }
          temperature {
            actual
          }
          wind {
            speed
          }
        }
      }
    }
  `;
  const response = await client.query({ query });
  return response.data.getCityByName;
}

const API = { refreshWeatherData };
export default API;
