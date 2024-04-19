import { variables } from "../configs/variables";

export async function _getData(url: string = '', data: object = {}): Promise<any> {
    const response = await fetch(variables["BASE-URL"] + url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'User-Key': variables["TOKEN-UK"],
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    
    return response.json();
    
}

async function getDeals() {
    return _getData(`Deals?
    $skip=15&$top=2000
    &$filter=(StatusId+eq+1)+and+StageId+eq+80001225
    &$select=Id
    &$expand=Contact($select=TypeId),Owner($select=Id),OtherProperties($filter=FieldId+eq+149159;$select=IntegerValue)`)
    .then(async (data) => {
        return data.value
    })
}

async function getUsers() {
    return _getData(`Users?$filter=(((Suspended+eq+false)))+and+((((OtherProperties/any(o:+o/FieldId+eq+80003092+and+(o/IntegerValue+eq+800020337))))))
    &$count=true&$select=Name,AvatarUrl,Id
    &$expand=OtherProperties($filter=FieldId+eq+80003092+or+FieldId+eq+211628+or+FieldId+eq+149085+or+FieldId+eq+211629+or+FieldId+eq+211843+or+FieldId+eq+211844;$select=FieldKey,StringValue,BigStringValue,IntegerValue,DecimalValue,BoolValue,DateTimeValue,ObjectValueName),
    Teams%28$expand=Team%28$select=Name;$expand=OtherProperties%29%29&$orderby=Name+asc`)
    .then(async (data) => {
        return data.value
    })
}

async function getGlobalGoals(deals: any[]) {
    let globalGoal = 0
    let goal = 8000
    for (const deal of deals) {
        globalGoal += deal?.OtherProperties[0]?.IntegerValue
    }

    let invoicingPerc: number = 100 - (((goal - globalGoal) / goal) * 100);
	if (globalGoal >= goal) invoicingPerc = 100;

    return { globalGoal, goal, invoicingPerc }
}

// CORRIGIR: precisa corrigir o tipo do array
async function getDataTeams(teams: Array<any>) {
    const newTeam:any = []
    for (const team of teams) {
        newTeam.push({
            name: team?.Team?.Name,
            nameTeam: getProperty(team?.Team?.OtherProperties, "team_63E48CD1-9A4C-4FD5-8DE7-09802DF78F41"),
            size: getProperty(team?.Team?.OtherProperties, "team_FA89C02E-0DFB-43F0-A9EE-4326AD8CAA3F"),
            goal: getProperty(team?.Team?.OtherProperties, "team_8E074C51-9F32-458F-BDCE-45974849EF9B"),
        })
    }
    return newTeam
}

async function formatData() {
    const responsesDeals = await getDeals()
    const responsesUsers: any = await getUsers()
    const dataUsers = []
    let amountTeams: any = {}
    const amountLocations: any = {}
    const amountUsers: any = {}

    for (const user of responsesUsers) {
        dataUsers.push({
            id: user?.Id,
            name: user?.Name,
            avatarUrl: user?.AvatarUrl,
            goalPf: getProperty(user?.OtherProperties, "user_E51BBE87-9D06-4E69-90E0-6579C26B3638"),
            goalPj: getProperty(user?.OtherProperties, "user_798727C7-5C03-443D-BC57-B3FA631A4750"),
            size: getProperty(user?.OtherProperties, "user_62C43243-FB3B-45B1-8C4F-E8C18C72D1D3"),
            location: getProperty(user?.OtherProperties, "user_AFD3F7D8-147D-4793-A31B-1AB5FEF2664E"),
            teams: await getDataTeams(user?.Teams)  
        })
    }
    
    for (const user of dataUsers) {
        let userDealDatas: any[] = []
        
        responsesDeals.forEach((deal: { Owner: any; }) => {
            if(deal?.Owner?.Id === user.id) userDealDatas.push(deal) 
        });
        
        if (userDealDatas.length > 0){
            for (const userDeal of userDealDatas) {
                const lifes = userDeal?.OtherProperties[0]?.IntegerValue | 0

                if ('teams' in user && user.teams.length > 0) {
                    for (const team of user.teams) {
                        if(team.name.includes("Pregão") && team.size !== "" && team.nameTeam !== ""){
                            let infoTeamPregao = user.teams.filter((t: { name: string; }) => { return t.name === team.nameTeam })
                            if (formatStringToKey(team.nameTeam) in amountTeams && "lifes" in amountTeams[formatStringToKey(team.nameTeam)]) {
                                amountTeams[formatStringToKey(team.nameTeam)].lifes += lifes
                            } else {
                                amountTeams[formatStringToKey(team.nameTeam)] = { lifes, goal: infoTeamPregao[0]?.goal, name: team.nameTeam }
                            }
                            if (formatStringToKey(team.size) in amountLocations 
                            && formatStringToKey(team.name) in amountLocations[formatStringToKey(team.size)]
                            ){
                                if ("lifes" in amountLocations[formatStringToKey(team.size)][formatStringToKey(team.name)]){
                                    amountLocations[formatStringToKey(team.size)][formatStringToKey(team.name)].lifes += lifes
                                } else {
                                    let obj = { lifes: 0, size: team.size, name: team.name.replace(" - Pregão", ""), goal: team.goal }
                                    Object.assign(amountLocations[formatStringToKey(team.size)][formatStringToKey(team.name)], obj) 
                                }
                            } else {
                                let obj: any = {}
                                obj[formatStringToKey(team.name)] = { lifes: 0, size: team.size, name: team.name.replace(" - Pregão", ""), goal: team.goal }
                                amountLocations[formatStringToKey(team.size)][formatStringToKey(team.name)] = obj
                            }
                        }
                    }
                }

                if (user.size !== "") {
                    if (formatStringToKey(user.size) in amountUsers) {
                        if (user.goalPf !== "" && user.goalPf !== 0){ 
                            if(user.id in amountUsers[formatStringToKey(user.size)].pf
                            && 'lifes' in amountUsers[formatStringToKey(user.size)]["pf"][user.id]) {
                                    amountUsers[formatStringToKey(user.size)]["pf"][user.id].lifes += lifes
                            } else {
                                amountUsers[formatStringToKey(user.size)]["pf"][user.id] = {
                                    lifes: lifes, 
                                    goal: user.goalPf, 
                                    name: user.name, 
                                    avatar: user.avatarUrl, 
                                    location: user.location
                                }
                            }
                        }
                        if (user.goalPj !== "" && user.goalPj !== 0) { 
                            if(user.id in amountUsers[formatStringToKey(user.size)].pj
                            && 'lifes' in amountUsers[formatStringToKey(user.size)]["pj"][user.id]) {
                                    amountUsers[formatStringToKey(user.size)]["pj"][user.id].lifes += lifes
                            } else {
                                amountUsers[formatStringToKey(user.size)]["pj"][user.id] = {
                                    lifes: lifes, 
                                    goal: user.goalPj, 
                                    name: user.name, 
                                    avatar: user.avatarUrl, 
                                    location: user.location
                                }
                            }
                        }
                    }
                }
            }
        } else {
            if ('teams' in user && user.teams.length > 0) {
                for (const team of user.teams) {
                    if (team.name.includes("Pregão") && team.size !== "" && team.nameTeam !== "") {
                        let infoTeamPregao = user.teams.filter((t: { name: string; }) => { return t.name === team.nameTeam })
                        if(!(formatStringToKey(infoTeamPregao[0]?.name) in amountTeams)) {
                            amountTeams[formatStringToKey(team.nameTeam)] = { lifes: 0, goal: infoTeamPregao[0]?.goal, name: team.nameTeam }
                        }
                        if(formatStringToKey(team.size) in amountLocations 
                        && formatStringToKey(team.name) in amountLocations[formatStringToKey(team.size)]
                        ){
                            if(!("lifes" in amountLocations[formatStringToKey(team.size)][formatStringToKey(team.name)])){
                                let obj = { lifes: 0, size: team.size, name: team.name.replace(" - Pregão", ""), goal: team.goal }
                                Object.assign(amountLocations[formatStringToKey(team.size)][formatStringToKey(team.name)], obj) 
                            }
                        } else {
                            let obj: any = {}
                            obj[formatStringToKey(team.name)] = { lifes: 0, size: team.size, name: team.name.replace(" - Pregão", ""), goal: team.goal }
                            amountLocations[formatStringToKey(team.size)] = obj
                        }
                    }
                }
            }

            if (user.size !== "") {
                let objPf: any = {}
                let objPj: any = {}

                if (user.goalPf !== "" && user.goalPf !== 0) { 
                    objPf[user.id] = { 
                        lifes: 0, 
                        goal: user.goalPf,
                        name: user.name, 
                        avatar: user.avatarUrl, 
                        location: user.location
                    }
                }
                if (user.goalPj !== "" && user.goalPj !== 0) {
                    objPj[user.id] = { 
                        lifes: 0, 
                        goal: user.goalPj,
                        name: user.name, 
                        avatar: user.avatarUrl, 
                        location: user.location
                    }
                }

                if (formatStringToKey(user.size) in amountUsers) {
                    Object.assign(amountUsers[formatStringToKey(user.size)].pf, objPf)
                    Object.assign(amountUsers[formatStringToKey(user.size)].pj, objPj)
                } else {
                    amountUsers[formatStringToKey(user.size)] = { pf: objPf, pj: objPj }
                }
            }
           
        }
    }

    let sizes = Object.keys(amountUsers)
    for (const size of sizes) {
        if (size in amountUsers) {
            let types = Object.keys(amountUsers[size])
            let firstUser: any = {} 
            for (const type of types) {
                amountUsers[size][type] = orderBy_Object2Array(amountUsers[size][type])
                for (const user of amountUsers[size][type]) {
                    let invoicingPerc: number = 100 - (((user?.goal - user?.lifes) / user?.goal) * 100);
                    if (user?.lifes >= user?.goal) invoicingPerc = 100;
                    Object.assign(user, { invoicingPerc })
                }
                firstUser[type] = amountUsers[size][type].shift()
            }
            Object.assign(amountUsers[size], { firstUser })
        }
        if (size in amountLocations){
            amountLocations[size] = orderBy_Object2Array(amountLocations[size])
            for (const location of amountLocations[size]) {
                let invoicingPerc: number = 100 - (((location?.goal - location?.lifes) / location?.goal) * 100);
                if (location?.lifes >= location?.goal) invoicingPerc = 100;
                Object.assign(location, { invoicingPerc })
            }
        }
    }
    amountTeams = orderBy_Object2Array(amountTeams)

    for (const team of amountTeams) {
        let invoicingPerc: number = 100 - (((team?.goal - team?.lifes) / team?.goal) * 100);
        if (team?.lifes >= team?.goal) invoicingPerc = 100;
        Object.assign(team, { invoicingPerc })
    }
    
    return {
        amountTeams,
        amountLocations,
        amountUsers,
        amountGlobal: await getGlobalGoals(responsesDeals)
    }
}

formatData()

function formatStringToKey(text:string) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/-/g, "").replace(/ /g, "").toLowerCase()
}

// CORRIGIR: precisa corrigir o tipo do array
function getProperty(otherProperties: Array<any>, fieldKey:string) {
    if(otherProperties == null) return '';
    
    for (let property of otherProperties) {
        if (property.FieldKey == fieldKey) {
            if (property.ObjectValueName != null) {
                return property.ObjectValueName;
            }
            else if (property.IntegerValue != null) {
                return property.IntegerValue;
            }
            else if (property.StringValue != null) {
                return property.StringValue;
            }
            else if (property.BigStringValue != null) {
                return property.BigStringValue;
            }
            else if (property.DecimalValue != null) {
                return property.DecimalValue;
            }
            else if (property.DateTimeValue != null) {
                let date = property.DateTimeValue;
                let formattedDate = formatDate(date);
                return formattedDate;
            }
            else if (property.BoolValue != null) {
                return property.BoolValue;
            }
            else {
                return '';
            }
        }
        continue;
    }
    return '';
}

function formatDate(date: string) {
    return date.split('T')[0].split('-')[2] + '/' + date.split('-')[1] + '/' + date.split('-')[0];
}

function compareAmountValues(a: any, b: any) {
    return a.lifes < b.lifes ? 1 : a.lifes > b.lifes ? -1 : 0;
}

function orderBy_Object2Array(obj:object) {
    return Object.values(obj).sort(compareAmountValues);
}

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	return { resp: await formatData() };
}