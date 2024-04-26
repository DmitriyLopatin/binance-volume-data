"use client"
import Charts from "@/components/Charts";
import Pagination from "@/components/Pagination";
import React from "react";

export default function Home() {
  const [render, setRender] = React.useState(false)
  const [data, setData] = React.useState([{ coin: "", data: [{ time: new Date().getMinutes(), vol: 0 }] }])
  const [currentPage, setCurrentPage] = React.useState(1)
  const [totalPages, setTotalPages] = React.useState(1)
  const handleTime = (currTime: string) => {
    const date = new Date(Number(currTime))
    return `${date.getHours()}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`
  }
  React.useEffect(() => {
    setRender(true)
    const ws = new WebSocket('ws://localhost:8000');
    ws.onopen = function () {
      console.log('WebSocket connected');
      ws.send(`${currentPage}`)
    }
    ws.onmessage = function (event) {
      const responseTotalPages = JSON.parse(event.data)
      setTotalPages(responseTotalPages.totalPages)
      const responseData = JSON.parse(event.data)
      const finalArr = responseData.data.map((item: any) => {
        return {
          coin: item.coin, data: item.volums.map((el: { time: string; vol: number; }) => {
            return { vol: Math.round(el.vol), time: handleTime(el.time) }
          })
        }
      })
      setData(finalArr)
    }
    ws.onclose = function () {
      console.log('WebSocket disconnected');
    };
    ws.onerror = function (event) {
      console.error(event);
    };
    return () => {
      if (ws.readyState === 1) { // <-- This is important
        ws.close();
      }
    }
  }, [currentPage])

  if (render) return (
    <>
      <div className='charts-pool'>
        {data.map((item) =>
          <div className='charts-container' key={item.coin}>
            <h2 className='text-center mb-3 mt-10 text-[25px] font-semibold'>{item.coin}</h2>
            <Charts chartData={item.data} />
          </div>)}
      </div>
      <div className='pagination'>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      </div>
    </>
  )
}
