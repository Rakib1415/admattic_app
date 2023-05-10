export const getCurrentUser = (key: string) => {
    return JSON.parse(localStorage.getItem(key) || '');
};

export type Token = {
    id: number;
    heading?: string;
    description?: string;
    token?: string;
    event?: string;
};

export const nextTokenId = (tokenItems: Token[]) => {
    let nextId = tokenItems.reduce((acc, curr) => Math.max(acc, curr.id), -1);
    return ++nextId;
};
