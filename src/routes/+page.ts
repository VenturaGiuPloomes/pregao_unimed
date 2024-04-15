import { variables } from "../configs/variables";

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

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

export function _activeItemMenu(){
    
    if (typeof document !== 'undefined') {
        
        // let lis = document.getElementsByTagName('a');
        // for (const li of lis) { 
        //     li.addEventListener("click", function() {
        //         let current = document.getElementsByClassName("bg-primary");
        //         current[0].className = current[0].className.replace("bg-primary", "").replace("text-white", "text-base");
        //         li.className += " bg-primary text-white";
        //     });
        // }
    }
}