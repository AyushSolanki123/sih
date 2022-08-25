import { Notify } from 'quasar'
export function notify(param) {
    Notify.create({
        progress: true,
        message: param.message,
        color: param.color,
        position: 'bottom-right',
        classes: "p-pa-md text-h5",
        type: param.type,
        icon: param.icon,
        showClose: true,
        actions: [{ icon: 'close', color: 'white' }]
    })
}