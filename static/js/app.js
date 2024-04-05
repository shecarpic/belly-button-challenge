function buildMetadata(sample){
let url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"
d3.json(url).then((data) => {
    let metadata = data.metadata
    let resultArray = metadata.filter(sampleObj => sampleObj.id== sample);
    let result = resultArray[0];
    let PANEL = d3.select("#sample-metadata");
    PANEL.html("");

    for (key in result){
        PANEL.append("h6").text(`${key}: ${result[key]}`);
    };
    //buildGauge(result.wfreq);
    
    });
}
function buildCharts(sample){
    let url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"
    d3.json(url).then((data) => {
      let samples = data.samples;
      let resultArray =samples.filter(sampleObj => sampleObj.id==sample)[0];
       console.log(resultArray) 
      let otu_ids = resultArray.otu_ids;
        let otu_labels = resultArray.otu_labels;
        let sample_values = resultArray.sample_values

        let bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            // margin: { t: 0},
            // hovermode : "closest",
            // xxaxis: { tile: "OTU ID"},
            // margin: { t: 30 }
        };
        let bubbleData = [
            {
                x: otu_ids,
                y:sample_values,
                text: otu_labels,
                mode: "markers",
                marker : {
                    size:sample_values,
                    color:otu_ids,
                    colorscale: "Earth"
                }
            }
        ];
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
         let yticks = otu_ids.slice(0,10).map(otu_ID => `OTU ${otu_ID}`).reverse();
        let barData = [
            {
                y: yticks,
                x: sample_values.slice(0,10).reverse(),
                text: otu_labels.slice(0,10).reverse(),
                type: "bar",
                orientation : "h",
            }
        ];
        let barLayout = {
            title: "Top 10 Bacteria cultures found",
            margin: { t:30, l: 150 }
        };
        Plotly.newPlot("bar", barData, barLayout); 
    });
}
function init(){
    let selector = d3.select("#selDataset");
    let url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"
      d3.json(url).then((data) => 
      {
        let sampleNames = data.names;
        for (let i = 0; i < sampleNames.length; i++){
            selector.append("option")
            .text(sampleNames[i])
            .property("value", sampleNames[i]);
        };
        let firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
      });
}
function optionChanged(newSample){
    buildCharts(newSample);
    buildMetadata(newSample);
}
init();