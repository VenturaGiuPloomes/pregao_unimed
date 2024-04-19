<script lang="ts">
	import type { ChartProps } from "../interfaces/interfaces";
	
	export let propsChartValue: ChartProps

</script>

<div class='legendaGraficos'>
	<p id='tituloLegendaFaturamento'>{propsChartValue?.amount} vidas ({propsChartValue?.invoicingPerc.toFixed(1)}%)</p>
	<p id='legendaMeta'>{propsChartValue?.goal} vidas (100%)</p>
</div>
<div class='graficoHorizontal'>
	<div class='grafi bg-base-300' id='grafiMeta'>
		<div class='grafi bg-primary' id='grafiFaturamento' style="width: {propsChartValue?.invoicingPerc}%;" >
			<p id='legendaFaturamento'>{propsChartValue?.invoicingPerc.toFixed(1)}%</p>
		</div>
	</div>
</div>

<style>
	.graficoHorizontal {
		width: 100%;
		margin-top: 0%;
	}
	
	.grafi {
		height: 40px;
		border-radius: 20px;
	}
	
	#grafiMeta {
		position: relative;
	}
	
	#grafiFaturamento {
		position: absolute;
		width: 0%;
		z-index: 9;
		transition: 2s;
	}
	
	#legendaFaturamento {
		position: relative;
		width: 90%;
		height: auto;
		font-weight: bold;
		color: white;
		letter-spacing: 3px;
		font-size: 100%;
		margin-top: 0;
		margin-left: 5px;
		
		text-align: right;
		top: 50%;
		transform: translateY(-50%);
		
		transition: 2s;
	}
	
	.legendaGraficos{
		width: 100%;
		height: 30px;
	}
	
	#legendaMeta {
		width: 50%;
		float: left;
		text-align: right;
		margin-top: 0;
	}
	
	#tituloLegendaFaturamento {
		width: 50%;
		float: left;
		text-align: left;
		margin-top: 0;
	}
</style>
