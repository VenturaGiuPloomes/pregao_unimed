<script lang="ts">
	import Employees from '../../../../pages/Employees.svelte';
    export let data: any;

    let amountUsers = {
        amount: data?.resp?.amountUsers?.grandeporte?.pf,
        first: data?.resp?.amountUsers?.grandeporte?.firstUser?.pf
    } 

</script>

<section>
    
    <Employees propsAmountUsers={ amountUsers } />
    
</section>