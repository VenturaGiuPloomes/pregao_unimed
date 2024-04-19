<script lang="ts">
	import Employees from '../../../../pages/Employees.svelte';
    export let data: any;

    let amountUsers = {
        amount: data?.resp?.amountUsers?.medioporte?.pj,
        first: data?.resp?.amountUsers?.medioporte?.firstUser?.pj
    } 

</script>

<section>
    
    <Employees propsAmountUsers={ amountUsers } />
    
</section>