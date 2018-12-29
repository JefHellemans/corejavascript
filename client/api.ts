function fetchJSON(url: string, method: string, data: any) {
    return fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
}

export async function get<T>(url: string): Promise<T> {
    const response = await fetch(url);
    return await response.json() as T;
}

export async function post<T>(url: string, data: T, list?: T[]): Promise<T> {
    let newItem;
    if (list) {
        list.push({ ...data });
        newItem = list[list.length - 1];
    }
    const response = await fetchJSON(url, "POST", data);
    const responseData = await response.json() as T;
    if (newItem) {
        (newItem as any).id = (responseData as any).id;
    }
    return responseData;
}

export async function put<T>(url: string, data: T): Promise<T> {
    if (!(data as any).id) {
        throw new Error("Cannot PUT on data that has no id");
    }
    const response = await fetchJSON(url, "PUT", data);
    return await response.json() as T;
}

export async function remove(url: string, data: any) {
    if (!data.id) {
        throw new Error("Cannot DELETE data that has no id");
    }
    await fetchJSON(url, "DELETE", data);
}
