import { getToken } from "@/context/AuthProvider";
import { publicAPI } from "Api/backend"

export const readNotification = async (id: number) => {
    try {
        const res = await publicAPI.patch('users/notifications/read', {
            notificationId: id,
        }, {
            headers: {
                Authorization: `Bearer ${await getToken()}`
            }
        })
        console.log(res);
        return res.data
    } catch (err) {
        console.error(JSON.stringify(err.response));
    }
}

export const getNotifications = async () => {
    try {
        const res = await publicAPI.get('users/notifications', {
            headers: {
                Authorization: `Bearer ${await getToken()}`
            }
        })
        return res.data
    } catch (err) {
        console.error(JSON.stringify(err.response));
        throw err;
    }
}