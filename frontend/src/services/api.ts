interface IResource<T> {
    url: string;
    method: string;
    data?: T;
}

const api = async <T>(resource: IResource<T>) => {
    const options = {
        method: resource.method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(resource.data)
    };
    const response = await fetch(resource.url, options);
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
    return data;
};

export default api;
