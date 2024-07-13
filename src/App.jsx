import { useEffect, useRef, useState } from 'react'
import './App.css'
import * as d3 from 'd3';

function App() {

  const [data, setData] = useState([{ color: "red", value: 10, name: "name0" }, { color: "blue", value: 30, name: "name1" }, { color: "green", value: 50, name: "name2" }, { color: "yellow", value: 70, name: "name3" }, { color: "purple", value: 80, name: "name4" }]);

  const svgRef = useRef();


  const maxValue = d3.max(data, (d) => d.value);
  const svgHeight = maxValue + 30; //extra padding 50 added
  const svgWidth = 50;
  const margin = {
    top: 20,
    right: 90,
    bottom: 100,
    left: 40
  }


  useEffect(() => {
    //selecting svg element
    const svg = d3.select(svgRef.current);
    //selecting all rect
    const allRect = svg.selectAll('rect');

    //binding data and creating dom elements with data
    //creating the bar graph

    allRect.data(data).enter().append('rect')
      .attr('x', (d, i) => i * svgWidth + margin.left) //40 90 140 190 240
      .attr('y', (d, i) => svgHeight - d.value + margin.top)  // 120
      .attr('height', (d, i) => d.value)
      .attr('fill', (d, i) => d.color)
      .attr('width', svgWidth)
      .attr('stroke', () => {
        return data[Math.floor(Math.random() * data.length)].color;
      })
      .attr('stroke-width', 2)


    //drawing x axis

    svg.append('line')
      .attr('x1', margin.left)
      .attr('y1', margin.top + svgHeight)
      .attr('x2', svgWidth * data.length + margin.left + 30)
      .attr('y2', margin.top + svgHeight)
      .attr('stroke', 'orange')
      .attr('stroke-width', 2)

    svg.append('line')
      .attr('x1', margin.left)
      .attr('y1', margin.top)
      .attr('x2', margin.left)
      .attr('y2', svgHeight + margin.top)
      .attr('stroke', 'orange')
      .attr('stroke-width', 2)

    //labelling x-axis

    svg.selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .text(d => d.name)
      .attr('class', 'label')
      .attr('x', (d, i) => i * svgWidth + margin.left + 10)
      .attr('y', (d, i) => margin.top + svgHeight)
      .attr('transform', (d, i) => `rotate(90 ${i * svgWidth + margin.left + 10} ${margin.top + svgHeight + 20})`)
      .attr('fill', 'grey')



  }, [])



  return (
    <>
      <svg ref={svgRef} height={svgHeight + margin.top + margin.bottom} style={{ border: "1px solid red" }}>
        {/* <rect></rect>
        <rect></rect>
        <rect></rect>
        <rect></rect>
        <rect></rect> */}
      </svg >
      <div class="container">
        <div class="box">Box 1</div>
        <div class="box">Box 2</div>
        <div class="box">Box 3</div>
      </div>



    </>
  )
}

export default App
