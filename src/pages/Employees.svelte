<script lang="ts">
    import Chart from "../widgets/Chart.svelte";
    import trofeuImage from '$lib/images/trofeu.png'
    
    export let propsAmountUsers: any
    let firstUser: any = propsAmountUsers.first
    let amountUsers: any = propsAmountUsers.amount

</script>

<section class="grid gap-5">
    <div class="card card-side bg-base-100 shadow-xl">
        {#if (firstUser)}
            <figure class="max-w-64">
                <img class="h-full" src="{firstUser.avatar}" alt=""/>
            </figure>
            <div class="card-body">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <h2 class="card-title">{firstUser.name}</h2>
                        <p>{firstUser.location}</p>
                    </div>
                    <div class="flex justify-end">    
                        <div class="avatar">
                            <div class="w-24 rounded-full">
                                <img alt="Troféu" src="{trofeuImage}" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-actions justify-end">
                    <Chart propsChartValue={
                        { 
                            goal: firstUser.goal,
                            amount: firstUser.lifes,
                            invoicingPerc: firstUser.invoicingPerc
                        }
                    } />
                </div>
            </div>
        {:else}
            <figure class="max-w-64">
                <div class="w-64 skeleton"></div>
            </figure>
            <div class="card-body">
                <div class="grid grid-cols-2 gap-4">
                    <div >
                        <div class="skeleton mb-2 h-4 w-24"></div>
                        <div class="skeleton h-4 w-12"></div>
                    </div>
                    <div class="flex justify-end">    
                        <div class="avatar">
                            <div class="w-24 rounded-full">
                                <img alt="Troféu" src="{trofeuImage}" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-actions justify-end">
                    <div class="skeleton mt-10 h-10 w-full"></div>
                </div>
            </div>
        {/if}
    </div>
    
    <div class="card w-full bg-base-100 shadow-xl">
        <div class="card-body">
            <div class="overflow-x-auto">
                <table class="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nome</th>
                            <th>Meta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#if (amountUsers)}
                            {#each amountUsers as user, index}
                                <tr>
                                    <th>{index+2}</th>
                                    <td>
                                        <div class="flex items-center gap-3">
                                            <div class="avatar">
                                                <div class="mask mask-squircle w-12 h-12">
                                                    <img alt="Imagem Vendedor" src="{user.avatar}" />
                                                </div>
                                            </div>
                                            <div>
                                                <div class="font-bold">{user.name}</div>
                                                <div class="text-sm opacity-50">{user.location}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><Chart propsChartValue={
                                        { 
                                            goal: user.goal,
                                            amount: user.lifes,
                                            invoicingPerc: user.invoicingPerc
                                        } 
                                    }/>
                                    </td>
                                </tr>
                            {/each}
                        {:else}
                            <tr>
                                <th><div class="skeleton h-4 w-5"></div></th>
                                <td>
                                    <div class="flex items-center gap-3">
                                        <div class="avatar">
                                            <div class="mask mask-squircle w-12 h-12">
                                                <div class="mask mask-squircle w-12 h-12 skeleton "></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="skeleton mb-1 h-4 w-20"></div>
                                            <div class="skeleton h-4 w-10"></div>
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
                            <th>Nome</th>
                            <th>Meta</th>
                        </tr>
                    </tfoot>
                    
                </table>
            </div>
        </div>
    </div>
</section>