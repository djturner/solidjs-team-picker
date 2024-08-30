import type { Component } from "solid-js";

import { Chart, Title, Tooltip, Legend, Colors } from "chart.js";
import { Pie } from "solid-chartjs";
import { createSignal, createEffect, onMount } from "solid-js";
import styles from "./App.module.css";

type TeamTableProps = {
  membersWithChances: Array<{
    id: number;
    name: string;
    loses: number;
    chance: number;
  }>;
};

const calcChartData = (
  membersWithChances: Array<{
    id: number;
    name: string;
    loses: number;
    chance: number;
  }>
) => {
  const labels: string[] = [];
  const data: number[] = [];
  membersWithChances.forEach((member) => {
    labels.push(member.name);
    data.push(member.chance);
  });

  return {
    labels,
    datasets: [
      {
        label: "Chance",
        data,
      },
    ],
  };
};

let input: HTMLInputElement | undefined;
const ChancesVisualisation: Component<TeamTableProps> = (props) => {
  onMount(() => {
    Chart.register(Title, Tooltip, Legend, Colors);
  });

  const [chartData, setChartData] = createSignal(
    calcChartData(props.membersWithChances)
  );

  createEffect(() => {
    setChartData(calcChartData(props.membersWithChances));
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { animateRotate: false, animateScale: true, duration: 400 },
    plugins: { legend: { position: "right" } },
  };

  return (
    <div class={styles.visualisation}>
      <Pie data={chartData()} options={chartOptions} width={400} height={250} />
    </div>
  );
};

export default ChancesVisualisation;
