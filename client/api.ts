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
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
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
    const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return await response.json() as T;
}
