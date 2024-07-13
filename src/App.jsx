import { useEffect, useRef, useState } from 'react'
import './App.css'
import * as d3 from 'd3';

function App() {

  const [data, setData] = useState([{ color: "red", value: 10 }, { color: "blue", value: 30 }, { color: "green", value: 50 }, { color: "yellow", value: 70 }, { color: "purple", value: 80 }]);

  const svgRef = useRef();

  const svgHeight = 100;
  const svgWidth = 50;


  useEffect(() => {
    //selecting svg element
    const svg = d3.select(svgRef.current);
    //selecting all rect
    const allRect = svg.selectAll('rect');

    const maxValue = d3.max(data, (d) => d.value);
    //binding data and creating dom elements with data
    //creating the bar graph
    allRect.data(data).enter().append('rect')
      .attr('x', (d, i) => i * svgWidth)
      .attr('y', (d, i) => svgHeight - d.value)
      .attr('height', (d, i) => d.value)
      .attr('fill', (d, i) => d.color)
      .attr('width', svgWidth)
      .attr('stroke', 'black')
      .attr('stroke-width', 2)



  }, [])



  return (
    <>
      <svg ref={svgRef} height={svgHeight} width={svgWidth * data.length} style={{ border: "1px solid red" }}>
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
