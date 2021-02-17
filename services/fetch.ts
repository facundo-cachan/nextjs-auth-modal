const { NEXT_PUBLIC_ENDPOINT } = process.env,
    f = (url: string, vars: object, method: string) => fetch(`${NEXT_PUBLIC_ENDPOINT}/${url}`, {
        method,
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(vars),
    })
        .then((response) => {
            if (response.status === 200) {
                return response
            } return response.statusText
        });
export const get = (url: string): Promise<Response> => fetch(`${NEXT_PUBLIC_ENDPOINT}/${url}`).then((r: Response) => r.json());
export const post = async (url: string, vars: object) => f(url, vars, "POST");
export const put = async (url: string, vars: object) => f(url, vars, "PUT");
