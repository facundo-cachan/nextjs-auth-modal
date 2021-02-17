import useSWR from 'swr'

const { REACT_APP_ENDPOINT } = process.env;

export function useFetch<Data = any, Error = any>(url: string, vars?: object, method?: string) {
    const endPoint = REACT_APP_ENDPOINT + url,
        { data } = useSWR<Data, Error>(url, async () => {
            /*
            if (method) {
                const response = await fetch(endPoint, {
                    method,
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: "follow",
                    referrerPolicy: "no-referrer",
                    body: JSON.stringify(vars),
                }).then((resp) => {
                    if (resp.status === 404) {
                        alert("El servidor no responde");
                        return [];
                    } else {
                        return resp.json();
                    }
                })
            }
            */
            const response = await fetch(endPoint)
                .then((resp) => {
                    if (resp.status === 404) {
                        alert("El servidor no responde");
                        return [];
                    } else {
                        return resp.json();
                    }
                });
            return response
        });
    console.log({ data });
    return { data }
}

