    let currentYear = 2018;
    let currentData = {
      nydata: [64.55, 0, 120.20, 109.82, 134.21],
      cadata: [72.40, 0, 140.655, 118.57, 140.66],
      natdata: [51.96, 0, 104.48, 92.60, 123.850],
    };

    const occupations = ["All Occupations", "Data Scientists", "Software Developers", "Statisticians", "Computer and Information Research Scientists"];

    const svg = d3.select("div#plot")
      .append("svg")
        .attr("width", "1250")
        .attr("height", "580");

    const xScale = d3.scaleBand()
      .domain([...Array(currentData.nydata.length).keys()])
      .range([0, 1200])

    const yScale = d3.scaleLinear()
      .domain([0, 280])
      .range([400, 0]);

    const xAxis = d3.axisBottom(xScale)
      .tickValues([...Array(currentData.nydata.length).keys()])
      .tickFormat(d => occupations[d]);

    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
      .attr("transform", "translate(50, 400)")
      .call(xAxis)
      .selectAll("text")
        .attr("transform", "rotate(0)")
        .style("text-anchor", "middle");

    svg.append("g")
      .attr("transform", "translate(50, 0)")
      .call(yAxis);

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -250)
      .attr("y", 20)
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Average Yearly Salary in Thousands ($)");

    svg.append("text")
      .attr("x", "50%")
      .attr("y", "30")
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .text("Average Yearly Salary Over Time");

    const bars = svg.selectAll(".ny-bars").data(currentData.nydata);

    bars.enter()
      .append("rect")
        .attr("class", "ny-bars")
        .attr("x", (d, i) => xScale(i)+ 50)
        .attr("y", d => yScale(d))
        .attr("width", xScale.bandwidth() / 3)
        .attr("height", d => 400 - yScale(d))
        .attr("fill", "steelblue");

    svg.selectAll(".ny-bars-label")
      .data(currentData.nydata)
      .enter()
      .append("text")
        .attr("class", "ny-bars-label")
        .attr("x", (d, i) => xScale(i) + 50 + xScale.bandwidth() / 6)
        .attr("y", d => yScale(d) - 5)
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .text(d => d.toFixed(2));

    const barsca = svg.selectAll(".ca-bars").data(currentData.cadata);

    barsca.enter()
      .append("rect")
        .attr("class", "ca-bars")
        .attr("x", (d, i) => xScale(i) + 50 + xScale.bandwidth() / 3)
        .attr("y", d => yScale(d))
        .attr("width", xScale.bandwidth() / 3)
        .attr("height", d => 400 - yScale(d))
        .attr("fill", "red");

    svg.selectAll(".ca-bars-label")
      .data(currentData.cadata)
      .enter()
      .append("text")
        .attr("class", "ca-bars-label")
        .attr("x", (d, i) => xScale(i) + 90 + xScale.bandwidth() / 3)
        .attr("y", d => yScale(d) - 5)
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .text(d => d.toFixed(2));

    const barsNat = svg.selectAll(".nat-bars").data(currentData.natdata);

    barsNat.enter()
      .append("rect")
        .attr("class", "nat-bars")
        .attr("x", (d, i) => xScale(i) + 50 + (2 * xScale.bandwidth() / 3))
        .attr("y", d => yScale(d))
        .attr("width", xScale.bandwidth() / 3)
        .attr("height", d => 400 - yScale(d))
        .attr("fill", "purple");

    svg.selectAll(".nat-bars-label")
      .data(currentData.natdata)
      .enter()
      .append("text")
        .attr("class", "nat-bars-label")
        .attr("x", (d, i) => xScale(i) + 168 + xScale.bandwidth() / 3)
        .attr("y", d => yScale(d) - 5)
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .text(d => d.toFixed(2));

    const key = svg.append("g")
      .attr("transform", "translate(50, 500)");

    key.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", "red");

    key.append("text")
      .attr("x", 30)
      .attr("y", 15)
      .style("font-size", "12px")
      .text("San Francisco");

    key.append("rect")
      .attr("x", 120)
      .attr("y", 0)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", "steelblue");

    key.append("text")
      .attr("x", 150)
      .attr("y", 15)
      .style("font-size", "12px")
      .text("New York City");

    key.append("rect")
      .attr("x", 240)
      .attr("y", 0)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", "purple");

    key.append("text")
      .attr("x", 270)
      .attr("y", 15)
      .style("font-size", "12px")
      .text("National");

    svg.append("text")
      .attr("id", "year-label")
      .attr("x", "50%")
      .attr("y", "490")
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text(`Year: ${currentYear}`);

    svg.append("text")
      .attr("x", "50%")
      .attr("y", "450")
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Potential Occupations");

    svg.append("text")
      .attr("x", "50%")
      .attr("y", "570")
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("This is an animated graph. The year will change every 5 seconds. Refresh to restart.");

    function updateData(newYear, newData) {
      currentYear = newYear;
      currentData = newData;

      svg.selectAll(".ny-bars")
        .data(currentData.nydata)
        .transition()
        .duration(500)
        .attr("y", d => yScale(d))
        .attr("height", d => 400 - yScale(d));

      svg.selectAll(".ca-bars")
        .data(currentData.cadata)
        .transition()
        .duration(500)
        .attr("y", d => yScale(d))
        .attr("height", d => 400 - yScale(d));

      svg.selectAll(".nat-bars")
        .data(currentData.natdata)
        .transition()
        .duration(500)
        .attr("y", d => yScale(d))
        .attr("height", d => 400 - yScale(d));

      svg.selectAll(".ny-bars-label")
        .data(currentData.nydata)
        .transition()
        .duration(500)
        .attr("y", d => yScale(d) - 5)
        .text(d => d.toFixed(2));

      svg.selectAll(".ca-bars-label")
        .data(currentData.cadata)
        .transition()
        .duration(500)
        .attr("y", d => yScale(d) - 5)
        .text(d => d.toFixed(2));

      svg.selectAll(".nat-bars-label")
        .data(currentData.natdata)
        .transition()
        .duration(500)
        .attr("y", d => yScale(d) - 5)
        .text(d => d.toFixed(2));

      svg.select("#year-label")
        .text(`Year: ${currentYear}`);
    }

    setTimeout(() => {
      updateData(2019, {
        nydata: [66.79, 125.03, 122.23, 107.150, 137.190],
        cadata: [75.890, 140.08, 145.250, 125.97, 142.15],
        natdata: [53.49, 100.56, 111.620, 95.680, 127.460],
      });
    }, 5000);

    setTimeout(() => {
      updateData(2020, {
        nydata: [71.05, 129.25, 123.60, 112.10, 139.34],
        cadata: [81.84, 148.68, 144.74, 127.08, 163.33],
        natdata: [56.31, 103.93, 114.27, 97.17, 130.89],
      });
    }, 10000);

    setTimeout(() => {
      updateData(2021, {
        nydata: [74.15, 128.25, 133.62, 125.86, 139.17],
        cadata: [86.59, 153.18, 158.32, 129.62, 209.89],
        natdata: [58.26, 108.66, 120.99, 99.45, 142.65],
      });
    }, 15000);

    setTimeout(() => {
      updateData(2022, {
        nydata: [78.56, 136.04, 142.83, 136.53, 128.57],
        cadata: [94.370, 152.08, 181.620, 154.95, 259.96],
        natdata: [61.90, 115.24, 132.93, 105.51, 155.88],
      });
    }, 20000);
