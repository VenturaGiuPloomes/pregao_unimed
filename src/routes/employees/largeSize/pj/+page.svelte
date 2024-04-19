<script lang="ts">
	import Employees from '../../../../pages/Employees.svelte';
    export let data: any;

    let amountUsers = {
        amount: data?.resp?.amountUsers?.grandeporte?.pj,
        first: data?.resp?.amountUsers?.grandeporte?.firstUser?.pj
    } 

</script>

<section>
    
    <Employees propsAmountUsers={ amountUsers } />
    
</section>