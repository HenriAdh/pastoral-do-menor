import { randomUUID } from 'node:crypto'

export class databasememory {
    #users = new Map()

    list(search) {
        return Array.from(this.#users.entries())
            .map((arrayUsers) => {
                const id = arrayUsers[0]
                const data = arrayUsers[1]

                return {
                    id,
                    ...data,
                }
            })
            .filter(user => {
                if (search) {
                    return user.name.includes(search);
                }

                return true;
            })
    }

    create(user) {
        const userId = randomUUID();

        this.#users.set(userId, user);
    }

    update(id, user) {
        this.#users.set(id, user);
    }

    delete(id) {
        this.#users.delete(id);
    }
}

