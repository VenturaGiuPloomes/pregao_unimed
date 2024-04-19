<script lang="ts">
    import Unimeds from '../../../pages/Unimeds.svelte';
    export let data: any;

    let amountLocations = data?.resp?.amountLocations?.medioporte
</script>

<section>
    
    <Unimeds propsAmountLocation={amountLocations} />
    
</section>