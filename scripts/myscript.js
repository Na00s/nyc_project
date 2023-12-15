    let currentYear = 2018;
    let currentData = {
      nydata: [20, 52, 232, 90, 34],
      cadata: [303, 23, 122, 33, 45],
      natdata: [51.96, 10, 10, 10, 123.850],
    };

    const occupations = ["All Occupations", "Data Scientist", "Software Developer", "Statistician", "Information Research"];

    const svg = d3.select("div#plot")
      .append("svg")
        .attr("width", "1250")
        .attr("height", "640"); // Adjust height to accommodate the key and year

    const xScale = d3.scaleBand()
      .domain([...Array(currentData.nydata.length).keys()])
      .range([0, 1200]) // Adjust the range based on your needs

    const yScale = d3.scaleLinear()
      .domain([0, d3.max([...currentData.nydata, ...currentData.cadata, ...currentData.natdata])])
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
      .text("Average Salary Over Time");

    const bars = svg.selectAll(".ny-bars").data(currentData.nydata);

    bars.enter()
      .append("rect")
        .attr("class", "ny-bars")
        .attr("x", (d, i) => xScale(i) + 50)
        .attr("y", d => yScale(d))
        .attr("width", xScale.bandwidth() / 3)
        .attr("height", d => 400 - yScale(d))
        .attr("fill", "steelblue");

    const bars2 = svg.selectAll(".ca-bars").data(currentData.cadata);

    bars2.enter()
      .append("rect")
        .attr("class", "ca-bars")
        .attr("x", (d, i) => xScale(i) + 50 + xScale.bandwidth() / 3)
        .attr("y", d => yScale(d))
        .attr("width", xScale.bandwidth() / 3)
        .attr("height", d => 400 - yScale(d))
        .attr("fill", "red");

    const barsNat = svg.selectAll(".nat-bars").data(currentData.natdata);

    barsNat.enter()
      .append("rect")
        .attr("class", "nat-bars")
        .attr("x", (d, i) => xScale(i) + 50 + (2 * xScale.bandwidth() / 3))
        .attr("y", d => yScale(d))
        .attr("width", xScale.bandwidth() / 3)
        .attr("height", d => 400 - yScale(d))
        .attr("fill", "purple");

    const key = svg.append("g")
      .attr("transform", "translate(50, 520)");

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
      .text("New York City");

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
      .text("San Francisco");

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
      .attr("y", "490") // Adjust the y-position based on your needs
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text(`Year: ${currentYear}`);

    function updateData(newYear, newData) {
      currentYear = newYear;
      currentData = newData;

      xScale.domain([...Array(currentData.nydata.length).keys()]);
      yScale.domain([0, d3.max([...currentData.nydata, ...currentData.cadata, ...currentData.natdata])]);

      svg.select(".x-axis")
        .transition()
        .duration(500)
        .call(xAxis);

      svg.select(".y-axis")
        .transition()
        .duration(500)
        .call(yAxis);

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

      svg.select("#year-label")
        .text(`Year: ${currentYear}`);
    }

    setTimeout(() => {
      updateData(2019, {
        cadata: [280, 33, 112, 43, 55],
        nydata: [80, 42, 212, 100, 44],
        natdata: [15, 15, 15, 15, 15],
      });
    }, 2000);

    setTimeout(() => {
      updateData(2020, {
        nydata: [25, 50, 200, 80, 38],
        cadata: [320, 20, 130, 28, 50],
        natdata: [12, 12, 12, 12, 12],
      });
    }, 4000);

    setTimeout(() => {
      updateData(2021, {
        nydata: [25, 50, 250, 80, 38],
        cadata: [320, 20, 130, 28, 50],
        natdata: [12, 12, 12, 12, 12],
      });
    }, 6000);

    setTimeout(() => {
      updateData(2022, {
        nydata: [205, 50, 150, 80, 38],
        cadata: [20, 20, 130, 28, 50],
        natdata: [12, 12, 12, 12, 12],
      });
    }, 8000);
