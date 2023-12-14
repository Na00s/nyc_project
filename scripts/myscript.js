// add your JavaScript/D3 to this file

const bardata = [20, 52, 232, 90, 34, 12, 189, 110];
const svg = d3.select("div#plot")
  .append("svg")
    .attr("width", "1250")
    .attr("height", "560");

const bars = svg.selectAll("rect").data(bardata);

svg.append("rect")
  .attr("x", "240")
  .attr("y", "100")
  .attr("width", "60%")
  .attr("height", "60%")
  .attr("fill", "lightgrey");

bars.enter()
  .append("rect")
    .attr("x", (d, i) => i * 80 + 300)
    .attr("y", d => 400 - d)
    .attr("width", "60")
    .attr("height", d => d)
    .attr("fill", "steelblue");


svg.selectAll("text").data(bardata).enter()
  .append("text")
    .attr("x", (d, i) => i * 80 + 320)
    .attr("y", d => 400 - d - 5)
    .text(d => d);
