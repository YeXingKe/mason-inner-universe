import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import { useEffect, useRef } from 'react'

interface EChartBoxProps {
  option: EChartsOption
  className?: string
  height?: number
}

export default function EChartBox({ option, className, height }: EChartBoxProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const chart = echarts.init(containerRef.current)
    chartRef.current = chart
    chart.setOption(option)

    const onResize = () => chart.resize()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      chart.dispose()
      chartRef.current = null
    }
  }, [option])

  useEffect(() => {
    chartRef.current?.setOption(option, true)
    chartRef.current?.resize()
  }, [option])

  return <div ref={containerRef} className={className} style={height ? { height } : undefined} />
}
