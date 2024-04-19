<script lang="ts">
	import Employees from '../../../../pages/Employees.svelte';
    export let data: any;

    let amountUsers = {
        amount: data?.resp?.amountUsers?.pequenoporte?.pj,
        first: data?.resp?.amountUsers?.pequenoporte?.firstUser?.pj
    } 

</script>

<section>
    
    <Employees propsAmountUsers={ amountUsers } />
    
</section>