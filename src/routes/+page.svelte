<script lang="ts">
	import "./styles.css";
	import { _getData } from "./+page";
	import Chart from "../widgets/Chart.svelte";
	import type { ChartProps } from "../interfaces/interfaces";
		
	export let data: any;

	let propsChartValue: ChartProps = {
		goal: data?.resp?.amountGlobal?.globalGoal,
		amount: data?.resp?.amountGlobal?.goal,
		invoicingPerc: data?.resp?.amountGlobal?.invoicingPerc,
	}
</script>

<svelte:head>
<title>Home</title>
<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div class="card w-full bg-base-100 shadow-xl">
		<div class="card-body">
			<div class="flex flex-col w-full">
				<div class="grid card rounded-box place-items-center">
					<h1 class="text-3xl text-primary font-bold text-center">Meta Global</h1>
				</div> 
				<div class="divider"></div> 
				{#if (propsChartValue)}
					<div class="grid card rounded-box place-items-center">
						<Chart propsChartValue={propsChartValue} />
					</div>
				{:else}
					<div class="card-body skeleton"></div>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	
</style>
