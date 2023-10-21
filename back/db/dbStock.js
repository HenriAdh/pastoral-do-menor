export class databaseStock {
    #stock = new Map();

    list(search, identity, active) {
        return Array.from(this.#stock.entries())
        .map((arrayStock) => {
            const id = arrayStock[0]
            const data = arrayStock[1]

            return {
                id,
                ...data,
            }
        }).filter(item => {
            let loadItem = true;
            if (identity) {
                loadItem = item.id === identity ? item : true;
            } else if (search) {
                loadItem = item.includes(search) ? item : true;
            } else if (active) {
                loadItem = item.active === active ? item : true;
            }
            return loadItem;
        })
    }

    listIds(){
        return Array.from(this.#stock.entries())
        .map((arrayStock) => {
            const id = arrayStock[0]
            return {id};
        })
    }

    create(uid, item) {
        this.#stock.set(uid, item);
        return 'Item criado com sucesso.';
    }

    update(id, amount) {
        const item = this.list(id, id);
        const updatedItem = {
            category : item[0]['category'],
            material: item[0]['material'],
            uni: item[0]['uni'],
            description: item[0]['description'],
            location: item[0]['location'],
            dtReg: item[0]['dtReg'],
            active: item[0]['active'],
            amount: amount,
        };
        this.#stock.set(id, updatedItem);

        return 'Item alterado com sucesso.';
    }

    delete(id) {
        this.#stock.delete(id);

        return 'Item deletado com sucesso.';
    }
}

