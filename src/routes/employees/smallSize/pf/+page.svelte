<script lang="ts">
	import Employees from '../../../../pages/Employees.svelte';
    export let data: any;

    let amountUsers = {
        amount: data?.resp?.amountUsers?.pequenoporte?.pf,
        first: data?.resp?.amountUsers?.pequenoporte?.firstUser?.pf
    } 

</script>

<section>
    
    <Employees propsAmountUsers={ amountUsers } />
    
</section>