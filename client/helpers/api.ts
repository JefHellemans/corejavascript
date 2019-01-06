type BufferedUpdate = {
    url: string,
    data: any,
};

const BUFFER_TIMEOUT = 300; // buffer multiple keystrokes to one update
const bufferedUpdates: { [key: string]: BufferedUpdate } = {};

function fetchJSON(url: string, method: string, data: any) {
    return fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
}

function executeUpdate(id: string) {
    const update = bufferedUpdates[id];
    fetchJSON(update.url, "PUT", update.data);
    delete bufferedUpdates[id];
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

export function put(url: string, data: any) {
    const { id } = data;
    if (!id) {
        throw new Error("Cannot PUT on data that has no id");
    }
    const update = bufferedUpdates[id];
    if (!update) {
        bufferedUpdates[id] = { url, data };
        setTimeout(executeUpdate.bind(null, id), BUFFER_TIMEOUT);
    } else {
        update.url = url;
        update.data = data;
    }
}

export async function remove(url: string, data: any) {
    if (!data.id) {
        throw new Error("Cannot DELETE data that has no id");
    }
    await fetchJSON(url, "DELETE", data);
}
