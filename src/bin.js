export default {
    url: "https://www.maps.north-ayrshire.gov.uk/arcgis/rest/services/AGOL/YourLocationLive/MapServer/8/query?f=json&outFields=*&returnDistinctValues=true&returnGeometry=false&spatialRel=esriSpatialRelIntersects&where=UPRN%20%3D%20%27126045657%27",
    async getData() {
        try {
            const response = await fetch(
                this.url,
                {
                    headers: {
                        "content-type": "application/json;charset=UTF-8",
                    },
                }
            );

            const data = await response.json();

            const attributes = data.features[0].attributes;
            const binCollectionData = {
                blue: new Date(attributes.BLUE_DATE).toDateString(),
                purple: new Date(attributes.PURPLE_DATE).toDateString(),
                grey: new Date(attributes.GREY_DATE).toDateString(),
            };

            let nextBinCollection = null;
            nextBinCollection = Object.keys(binCollectionData).sort((a, b) => a < b)[0]

            return {
                next: nextBinCollection,
                ...binCollectionData
            };
        } catch (error) {
            console.error("Failed to get data from API: ", error)
            return { "error": "failed to get data from API" }
        }
    }
}