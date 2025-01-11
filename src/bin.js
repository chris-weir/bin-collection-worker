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
                Blue: new Date(attributes.BLUE_DATE),
                Purple: new Date(attributes.PURPLE_DATE),
                Grey: new Date(attributes.GREY_DATE),
            };

            let sortedArray = []
            Object.keys(binCollectionData).forEach(item => sortedArray.push(item))
            sortedArray = sortedArray.sort(function(a,b) {
                console.log(a,b, a>b)
                a > b
            })

            console.log(sortedArray)

            let nextBinCollection = null;
            nextBinCollection = Object.values(binCollectionData).sort()[0];

            let next = Object.keys(binCollectionData).filter(key => binCollectionData[key] === nextBinCollection)[0];            

            return {
                Next: next,
                ...binCollectionData
            };
        } catch (error) {
            console.error("Failed to get data from API: ", error)
            return { "error": "failed to get data from API" }
        }
    }
}