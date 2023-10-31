// Function to get a priority tag based on a numeric priority value
const getPriorityTag = (priority) => {
    switch (priority) {
        case 1: return "Low";
        case 2: return "Medium";
        case 3: return "High";
        case 4: return "Urgent";
        default: return "No Priority";
    }
}

// Function to get a user's name by their ID from a list of users
const getUserName = (users, id) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) return users[i].name;
    }

    return "No Name Found";
}

// Function to order and group data based on ordering and grouping criteria
const orderData = (ordering_way, grouping_way, data) => {
    if (ordering_way === grouping_way) {
        if (ordering_way === "priority") {
            const keysArray = Array.from(data.keys());
            keysArray.sort((a, b) => b.priority - a.priority);
        } else if (ordering_way === "title") {
            const keysArray = Array.from(data.keys());
            keysArray.sort((a, b) => a.title.localeCompare(b.title));
        }
        return data;
    }

    if (ordering_way === "priority") {
        const keysArray = Object.keys(data);
        for (const key of keysArray) {
            data[key].sort((a, b) => b.priority - a.priority);
        }
    } else {
        const keysArray = Object.keys(data);
        for (const key of keysArray) {
            data[key].sort((a, b) => a.title.localeCompare(b.title));
        }
    }

    return data;
}

export { getPriorityTag, getUserName, orderData };

