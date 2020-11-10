// create a function
function getPlot(id) {
    
    // get data
    d3.json("data/samples.json").then((data)=> {
        console.log(data)
        var wfreq = data.metadata.map(d => d.wfreq)
        console.log(`Washing Freq: ${wfreq}`)
        // filter by id
        var samples = data.samples.filter(s => s.id.toString() === id)[0];

        console.log(samples);

        // top 10
        var sampleValues = samples.sample_values.slice(0, 10).reverse();

        var idValues = (samples.otu_ids.slice(0, 10)).reverse();
        
        // reformat
        var idOtu = idValues.map(d => "OTU " + d)

        console.log(`OTU IDS: ${idOtu}`)

        // top 10
        var labels = samples.otu_labels.slice(0, 10);

        console.log(`Sample Values: ${sampleValues}`)
        console.log(`Id Values: ${idValues}`)

        
        
        
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

        // pie
        var tracePie = {
            labels: idOtu,
            values:sampleValues,
            type:"pie",
        }

        var data = [tracePie]
        
        
        Plotly.newPlot("gauge", data)

    });    
}
    
// display metadata
//function
  //get data
        
        // get the metadata info for the demographic panel

        // filter

        // demos
        
        // clear table

        // append
}

// function for change data
}

// get data
    // select dropdown menu 

        // id

init();