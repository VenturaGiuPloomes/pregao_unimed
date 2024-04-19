<script lang="ts">
    import { _getData } from "../+page";
    import Chart from '../../widgets/Chart.svelte';

    export let data: any;

    const amountTeams = data?.resp?.amountTeams
</script>

<section>
    
    <div class="card w-full bg-base-100 shadow-xl">
        <div class="card-body">
            <div class="overflow-x-auto">
                <table class="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Equipe</th>
                            <th>Meta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#if (amountTeams)}
                            {#each amountTeams as team}
                                <tr>
                                    <th>1</th>
                                    <td>
                                        <div class="flex items-center gap-3">
                                            <div>
                                                <div class="font-bold">{team.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="grid card rounded-box place-items-center">
                                            <Chart propsChartValue={
                                                { 
                                                    goal: team.goal,
                                                    amount: team.lifes,
                                                    invoicingPerc: team.invoicingPerc
                                                }
                                            } />
                                        </div>
                                    </td>
                                </tr>
                            {/each}
                        {:else}
                            <tr>
                                <th><div class="skeleton h-4 w-5"></div></th>
                                <td>
                                    <div class="flex items-center gap-3">
                                        <div>
                                            <div class="skeleton h-4 w-20"></div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="grid card rounded-box place-items-center">
                                        <div class="skeleton h-10 w-80"></div>
                                    </div>
                                </td>
                            </tr>
                        {/if}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Equipe</th>
                            <th>Meta</th>
                        </tr>
                    </tfoot>
                    
                </table>
            </div>
        </div>
    </div>
</section>