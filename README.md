# Plot.ly Homework - Belly Button Biodiversity
## JS, D3
### Challenge: build an interactive dashboard to explore the dataset from [http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/](http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/)

* Use D3 library to read in samples.json
```
 d3.json("samples.json").then((data)=> {
        console.log(data)
        var wfreq = data.metadata.map(d => d.wfreq)
        console.log(`Washing Freq: ${wfreq}`)
        // filter by id
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
  ```
  

* Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs
```
// top 10
        var sampleValues = samples.sample_values.slice(0, 10).reverse();

        var idValues = (samples.otu_ids.slice(0, 10)).reverse();
        
        // reformat
        var idOtu = idValues.map(d => "OTU " + d)

        console.log(`OTU IDS: ${idOtu}`)

        // top 10
        var labels = samples.otu_labels.slice(0, 10);
        
        //  bar pplot
        var trace = {
            x: sampleValues,
            y: idOtu,
            text: labels,
            type:"bar",
            orientation: "h",
        };

        var data = [trace];

        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 30,
                b: 20
            }
        };

        Plotly.newPlot("bar", data, layout);
   ```

* Create a bubble chart that displays each sample
```
        // bubble
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels

        };

        var layout = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1300
        };

        var data1 = [trace1];

        Plotly.newPlot("bubble", data1, layout); 
```
* Display gauge
```

        // pie
        var tracePie = {
            labels: idOtu,
            values:sampleValues,
            type:"pie",
        }

        var data = [tracePie]
        
        
        Plotly.newPlot("gauge", data)
```
* Display the sample metadata
```
// display metadata
//function
function getInfo(id) {
    //get data
      d3.json("samples.json").then((data)=> {
          
          // get the metadata info for the demographic panel
          var metadata = data.metadata;
  
          console.log(metadata)
  
          // filter
          var result = metadata.filter(meta => meta.id.toString() === id)[0];
  
          // demos
          var demographicInfo = d3.select("#sample-metadata");
          

```

* Display each key-value pair from the metadata JSON object
```
          // clear table
          demographicInfo.html("");
  
          // append
          Object.entries(result).forEach((key) => {   
                  demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
          });
```

* Update all plots when new sample selected
```
  // function for change data
  function optionChanged(id) {
      getPlot(id);
      getInfo(id);
  }
  
  // get data
  function init() {
      // select dropdown menu 
      var dropdown = d3.select("#selDataset");
   
      d3.json("samples.json").then((data)=> {
          console.log(data)
  
          // id
          data.names.forEach(function(name) {
              dropdown.append("option").text(name).property("value");
          });
  
          getPlot(data.names[0]);
          getInfo(data.names[0]);
      });
```
