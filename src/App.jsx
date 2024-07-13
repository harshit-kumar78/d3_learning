import { useEffect, useRef, useState } from 'react'
import './App.css'
import * as d3 from 'd3';

function App() {

  const [data, setData] = useState([{ color: "red", value: 10 }, { color: "blue", value: 30 }, { color: "green", value: 50 }, { color: "yellow", value: 70 }, { color: "purple", value: 80 }]);

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
      .attr('stroke', 'black')
      .attr('stroke-width', 2)



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
