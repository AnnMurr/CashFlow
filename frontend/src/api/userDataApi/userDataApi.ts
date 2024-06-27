import { ICONS_EXPENSES_COLLECTION } from "../../consts/images";

export const createUserStore = (userToken: string) => {
    return fetch("https://662be069de35f91de159c3b9.mockapi.io/usersStorage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            uid: userToken,
            data: {
                categoriesExpenses: [
                    { name: "food", icon: ICONS_EXPENSES_COLLECTION[0] },
                    { name: "transport", icon: ICONS_EXPENSES_COLLECTION[1] },
                    { name: "house", icon: ICONS_EXPENSES_COLLECTION[2] },
                ],
                categoriesIncome: [{ name: "work", icon: ICONS_EXPENSES_COLLECTION[5] }],
                expenses: [],
                income: [],
            }
        })
    })
        .then(response => response)
        .catch(error => {
            throw new Error(error);
        })
}

export const getDataFromUserStore = (userToken: string) => {
    return fetch("https://662be069de35f91de159c3b9.mockapi.io/usersStorage")
        .then(response => response.json())
        .then(data => {
            return data.find((item: any) => item.uid === userToken);
        })
        .catch(error => {
            throw new Error(error);
        })
}

export const deleteUserStore = async (userToken: string) => {
    const userData = await getDataFromUserStore(userToken);

    if (!userData) throw new Error("User data not found in store");

    return fetch(`https://662be069de35f91de159c3b9.mockapi.io/usersStorage/${userData.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },

    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to delete user's data from store");
            }
            return response;
        })
        .catch(error => {
            throw new Error(error);
        })
}

export const changeUserData = async (userToken: string, updatedData: any) => {
    const userData = await getDataFromUserStore(userToken);
    
    if (!userData) throw new Error("User data not found in store");

    return fetch(`https://662be069de35f91de159c3b9.mockapi.io/usersStorage/${userData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to update user's data")
            } else {
                return response.json()
            }
        })
        .catch(error => {
            throw new Error(error);
        })
}


// [
//     {
//       "data": {
//       "categoriesExpenses": [{name: "food", icon: "sald,sald"}],
//       "categoriesIncome": [{name: "work", icon: "sasadsad"}],
//       income: [
//       {
//       date: 12.12.24, 
//       sum: 25, 
//       category: "work", 
//       icon: "dsad12",
//       description: "blabla"
//       }
//       ],
//       expenses: [
//       {
//       date: 12.12.24, 
//       sum: 25, 
//       category: "food", 
//       icon: "dsad12",
//       description: "blabla"
//       }
//       ]
//       },
//       "id": "1",
//       "uid": "66390c2cdaaa9b130d4bda1e"
//     }
//   ]