interface ItreeList {
    data: any;
    idKey: string;
    parentKey: string;
    childrenKey: string;
}
export const TreeList = ({
    data,
    idKey,
    parentKey,
    childrenKey,
}: ItreeList) => {
    const ID_KEY: string = idKey || "id";
    const PARENT_KEY: string = parentKey || "parent";
    const CHILDREN_KEY: string = childrenKey || "children";
    // tslint:disable-next-line: prefer-const
    let map: any = {};
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < data.length; i++) {
        // make cache
        if (data[i][ID_KEY]) {
            map[data[i][ID_KEY]] = data[i];
            data[i][CHILDREN_KEY] = [];
        }
    }
    for (let i = 0; i < data.length; i++) {
        if (data[i][PARENT_KEY]) {
            // is a child
            if (map[data[i][PARENT_KEY]]) {
                // for dirty data
                map[data[i][PARENT_KEY]][CHILDREN_KEY].push(data[i]); // add child to parent
                data.splice(i, 1); // remove from root
                i--; // iterator correction
            } else {
                data[i][PARENT_KEY] = 0; // clean dirty data
            }
        }
    }
    return data;
};
