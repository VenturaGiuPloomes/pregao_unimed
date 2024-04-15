<script>
	import logo from '$lib/images/unimed_logo.png';

	/**
	 * @type {string}
	 */
	 export let propValue

</script>

<div class='legendaGraficos'>
	<p id='tituloLegendaFaturamento'>R$ 50.00,00 (50%)</p>
	<p id='legendaMeta'>R$ 100.000,00 (100%)</p>
</div>
<div class='graficoHorizontal'>
	<div class='grafi bg-base-200' id='grafiMeta'>
		<div class='grafi bg-primary' id='grafiFaturamento'>
			<p id='legendaFaturamento'>{propValue}</p>
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
		transition: 0.5s;
	}
	
	#legendaFaturamento {
		position: relative;
		width: 99%;
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
		
		transition: 0.5s;
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
