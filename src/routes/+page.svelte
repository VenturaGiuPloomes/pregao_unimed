<script>
	import { _getData } from "./+page";
	import Chart from "./widgets/Chart.svelte";
	
	/**
	* @type {string}
	*/
	let response
	
	/**
	* @param {string} date
	*/
	async function getDeals(date) {
		return _getData(`Deals?$skip=15&$top=2000&$filter=PipelineId+eq+48715+and+StatusId+eq+2+and+FinishDate+ge+${date}T00:00:00-03:00+and+FinishDate+le+${date}T23:59:59-03:00&$select=Id&$expand=Contact%28$select=TypeId%29,Owner%28$select=Name,AvatarUrl;$expand=Teams%28$expand=Team%28$expand=OtherProperties%28$select=FieldKey,IntegerValue,StringValue,ObjectValueName%29%29%29%29,OtherProperties%28$filter=FieldKey+eq+%27deal_9897BB38-F5F1-4BD4-9490-7C1383747731%27;$select=IntegerValue%29`)
		.then(async (data) => {
			return response = data.value
		})
	}
	
	async function getGlobalGoals() {
		let globalGoal = 0
		let deals = await getDeals("2023-03-02")
		console.log(deals)
		
		for (const deal of deals) {
			globalGoal += deal?.OtherProperties[0]?.IntegerValue
		}
		
		console.log(globalGoal)
	}
	
	// getGlobalGoals()
	export let propValue = '20'
	
</script>

<svelte:head>
<title>Home</title>
<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	
	<div class="card w-full bg-base-100 shadow-xl">
		<div class="card-body">
			
			<div class="flex flex-col w-full">
				<div class="grid card  rounded-box place-items-center">
					<h1 class="text-3xl text-primary font-bold text-center">Meta Global</h1>
				</div> 
				<div class="divider"></div> 
				<div class="grid card  rounded-box place-items-center">
					<Chart propValue={propValue} />
				</div>

			</div>

		</div>
	</div>
	
</section>

<style>

</style>
