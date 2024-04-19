<script lang="ts">
	import Employees from '../../../../pages/Employees.svelte';
    export let data: any;

    let amountUsers = {
        amount: data?.resp?.amountUsers?.medioporte?.pf,
        first: data?.resp?.amountUsers?.medioporte?.firstUser?.pf
    } 

</script>

<section>
    
    <Employees propsAmountUsers={ amountUsers } />
    
</section>